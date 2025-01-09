import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export const saveMonitorEvent = async (data: { coreid: string, data: string, published_at: Date }) => {
  return prisma.monitorEvent.create({
    data: {
      coreid: data.coreid,
      data: data.data,
      published_at: data.published_at,
    },
  });
};

export const saveAlertEvent = async (data: { coreid: string, data: string, published_at: Date }) => {
  return prisma.alertEvent.create({
    data: {
      coreid: data.coreid,
      data: data.data,
      published_at: data.published_at,
    },
  });
};

export const getLatestMonitorEvent = async (coreid: string) => {
  if (!coreid) throw new Error('Missing coreid');
  return prisma.monitorEvent.findFirst({
    where: { coreid },
    orderBy: { published_at: 'desc' },
  });
};

export const getLatestAlertEvent = async (coreid: string) => {
  if (!coreid) throw new Error('Missing coreid');
  return prisma.alertEvent.findFirst({
    where: { coreid },
    orderBy: { published_at: 'desc' },
  });
};

export const registerUser = async (username: string, password: string, email: string) => {
  // Validate the inputs
  if (!username || !password || !email) {
    throw new Error('All fields are required');
  }

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { username },
  });

  if (existingUser) {
    return -1;
  }

  // Hash password before saving it
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user
  const newUser = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });

  return newUser.id;
};

export const authenticateUser = async (username: string, password: string) => {
  // Find the user by username
  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user) {
    return -1;
  }

  // Compare passwords
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return -1;
  }

  return user.id;
};

export const userById = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      devices: {
        include: {
          sensors: true,
        },
      },
    },
  });
  if (!user) return undefined;
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};
