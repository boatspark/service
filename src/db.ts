import { PrismaClient } from '@prisma/client';

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
