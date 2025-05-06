import { PrismaClient } from '@prisma/client';
import { UpdateProfileDTO } from '../../../dtos/user/UpdateProfileDTO';
import { User } from '../../models/User';
import { IUserRepository } from './IUserRepository';
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  public static build(prisma: PrismaClient) {
    return new UserRepository(prisma);
  }

  public async save(data: User): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.getPassword(),
        dateOfBirth: data.dateOfBirth,
        faculty: data.faculty,
        course: data.course,
      },
    });

    return User.create({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      dateOfBirth: user.dateOfBirth,
      faculty: user.faculty,
      course: user.course,
    });
  }

  public async find(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) return null;

    return User.create({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      dateOfBirth: user.dateOfBirth,
      faculty: user.faculty,
      course: user.course,
    });
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) return null;

    return User.create({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      dateOfBirth: user.dateOfBirth,
      faculty: user.faculty,
      course: user.course,
    });
  }

  public async updatePassword(id: string, password: string): Promise<void> {
    const data = {
      password: password,
    };
    await this.prisma.user.update({ where: { id }, data });
  }

  public async updateProfile(
    id: string,
    data: UpdateProfileDTO
  ): Promise<User> {
    const user = await this.prisma.user.update({
      where: { id },
      data: {
        name: data.name,
        dateOfBirth: data.dateOfBirth,
        faculty: data.faculty,
        course: data.course,
      },
    });

    return User.create({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      dateOfBirth: user.dateOfBirth,
      faculty: user.faculty,
      course: user.course,
    });
  }

  public async delete(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
}
