import {
  createUser, findUserByEmail, findUserById, getAllUsers,
  updateUser, deleteUser, countUsers,
} from '../models/user.model.js';
import { generateToken } from '../utils/jwt.js';
import { comparePassword } from '../utils/password.js';
import { toSnakeCaseKeys } from '../utils/normalize.js';
import env from '../config/env.js';

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
