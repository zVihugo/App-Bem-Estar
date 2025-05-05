import dotenv from 'dotenv';

dotenv.config();

export const config = {
  PORT: process.env.PORT,
  SALT_ROUNDS: Number(process.env.SALT_ROUNDS),
  JWT_SECRET: process.env.JWT_SECRET as string,
};
