import crypto from 'crypto';
import {
  createUser, findUserByEmail, findUserById, getAllUsers,
  updateUser, deleteUser, countUsers, updateUserPassword,
} from '../models/user.model.js';
import { createResetToken, findValidToken, markTokenUsed } from '../models/passwordReset.model.js';
import { generateToken } from '../utils/jwt.js';
import { comparePassword } from '../utils/password.js';
import { sendEmail, isEmailConfigured } from '../utils/mailer.js';
import { toSnakeCaseKeys } from '../utils/normalize.js';
import env from '../config/env.js';

const appUrl = (req) => env.appBaseUrl || `${req.protocol}://${req.get('host')}`;

export const register = async (req, res) => {
  try {
    const { email, password, fullName } = req.body;

    const existingUsers = await countUsers();
    const isBootstrap = existingUsers === 0;
    const isAdminRequest = req.user?.role === 'admin';

    // Open self-signup is off by default for a finance tool: the first account
    // becomes admin (bootstrap), after that admins create accounts — unless
    // ALLOW_OPEN_REGISTRATION=true is set explicitly.
    if (!isBootstrap && !isAdminRequest && !env.allowOpenRegistration) {
      return res.status(403).json({
        error: 'Registration is disabled. Ask an administrator to create your account.',
      });
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Role is never taken from anonymous input; admins may set it explicitly.
    const role = isBootstrap ? 'admin' : isAdminRequest && req.body.role ? req.body.role : 'user';

    const user = await createUser(email, password, fullName, role);
    const token = generateToken(user);

    res.status(201).json({
      message: 'User registered successfully',
      user: { id: user.id, email: user.email, fullName: user.full_name, role: user.role },
      token,
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await comparePassword(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(user);

    res.json({
      message: 'Login successful',
      user: { id: user.id, email: user.email, fullName: user.full_name, role: user.role },
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Failed to login' });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await findUserByEmail(email);

    // Always 200 with the same message — never reveal whether an email exists.
    if (user) {
      const token = await createResetToken(user.id, 'reset', 60);
      const link = `${appUrl(req)}/reset-password?token=${token}`;
      await sendEmail({
        to: user.email,
        subject: 'Reset your Reven password',
        text: `Hi ${user.full_name},\n\nReset your password using this link (valid for 1 hour):\n${link}\n\nIf you didn't request this, you can ignore this email.`,
      }).catch((err) => console.error('Password reset email failed:', err.message));
    }

    res.json({ message: 'If an account exists for that email, a reset link has been sent.' });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ error: 'Failed to process request' });
  }
};

export const checkResetToken = async (req, res) => {
  try {
    const record = await findValidToken(req.params.token);
    res.json({ valid: Boolean(record), purpose: record?.purpose || null });
  } catch (error) {
    console.error('Check reset token error:', error);
    res.status(500).json({ error: 'Failed to check token' });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;
    const record = await findValidToken(token);

    if (!record) {
      return res.status(400).json({ error: 'This link is invalid or has expired. Request a new one.' });
    }

    await updateUserPassword(record.user_id, password);
    await markTokenUsed(record.id);

    res.json({ message: 'Password set successfully. You can now log in.' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ error: 'Failed to reset password' });
  }
};

// Admin-only: create a teammate account and send a set-password link.
// No one — including the admin — ever knows the user's password.
export const inviteUser = async (req, res) => {
  try {
    const { email, fullName } = req.body;
    const role = req.body.role === 'admin' ? 'admin' : 'user';

    const existing = await findUserByEmail(email);
    if (existing) {
      return res.status(409).json({ error: 'A user with this email already exists' });
    }

    const randomPassword = crypto.randomBytes(24).toString('hex');
    const user = await createUser(email, randomPassword, fullName, role);
    const token = await createResetToken(user.id, 'invite', 72 * 60);
    const setupLink = `${appUrl(req)}/reset-password?token=${token}&welcome=1`;

    let emailDelivered = false;
    try {
      const result = await sendEmail({
        to: email,
        subject: `You've been invited to Reven`,
        text: `Hi ${fullName},\n\n${req.user.email} invited you to the Reven partner platform.\nSet your password and log in here (link valid for 72 hours):\n${setupLink}`,
      });
      emailDelivered = result.delivered;
    } catch (err) {
      console.error('Invite email failed:', err.message);
    }

    res.status(201).json({
      message: emailDelivered
        ? 'Invitation sent by email'
        : 'User created. Email is not configured — share the setup link below manually.',
      user: { id: user.id, email: user.email, fullName: user.full_name, role: user.role },
      emailDelivered,
      // Safe to return to the inviting admin; it's how they hand off access
      // when no email service is configured.
      ...(emailDelivered ? {} : { setupLink }),
    });
  } catch (error) {
    console.error('Invite user error:', error);
    res.status(500).json({ error: 'Failed to invite user' });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await findUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ user });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Failed to get profile' });
  }
};

export const getAllUsersController = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json({ users });
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({ error: 'Failed to get users' });
  }
};

export const updateUserController = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = toSnakeCaseKeys(req.body);

    const user = await updateUser(id, updates);
    if (!user) {
      return res.status(404).json({ error: 'User not found or no updates provided' });
    }

    res.json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
};

export const deleteUserController = async (req, res) => {
  try {
    const { id } = req.params;
    if (parseInt(id, 10) === req.user.id) {
      return res.status(400).json({ error: 'You cannot delete your own account' });
    }
    await deleteUser(id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};
