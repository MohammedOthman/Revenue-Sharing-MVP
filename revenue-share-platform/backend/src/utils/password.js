import bcrypt from 'bcryptjs';

export const hashPassword = async (password) => {
  return bcrypt.hash(password, 12);
};

export const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

export const consumePasswordHashTime = async (password) => {
  await bcrypt.hash(password, 12);
};
