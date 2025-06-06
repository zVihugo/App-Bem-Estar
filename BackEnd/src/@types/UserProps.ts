import { Role } from '@prisma/client';

export type UserProps = {
  id: string;
  name: string;
  email: string;
  password: string;
  dateOfBirth: string;
  faculty: string;
  course: string;
  role: Role;
};

export type JwtUserPayload = {
  id: string;
  email: string;
  role: Role;
};
