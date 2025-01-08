import { Request, Response } from 'express';
import { getLatestMonitorEvent } from '@/db';

export const handleTest = async (req: any, res: Response) => {
  const userid = req.user.userid;
  res.status(200).json({ message: 'test', id: userid });
};

export const latestEvent = async (req: Request, res: Response) => {
  try {
    const { coreid } = req.body;
    if (!coreid) {
      res.status(400).json({ message: 'Invalid request' });
      return;
    }
    const latestMonitorEvent = await getLatestMonitorEvent(coreid);

    res.json(latestMonitorEvent);
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
};
