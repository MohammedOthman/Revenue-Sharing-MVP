import bcrypt from 'bcryptjs';
import env from '../config/env.js';

export const PASSWORD_MIN_LENGTH = 8;

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(env.bcryptRounds);
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};
