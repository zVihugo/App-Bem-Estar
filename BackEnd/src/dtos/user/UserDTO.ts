import { Role } from '@prisma/client';

export interface UserDTO {
  id: string;
  name: string;
  email: string;
  dateOfBirth: string;
  faculty: string;
  course: string;
  role: Role;
}
