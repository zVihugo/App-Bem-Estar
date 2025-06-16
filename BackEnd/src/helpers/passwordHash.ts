import bcrypt from 'bcrypt';
import { config } from '../config/config';

export const passwordHash = (password: string) => {
  const salt = bcrypt.genSaltSync(config.SALT_ROUNDS);
  return bcrypt.hashSync(password, salt);
};
