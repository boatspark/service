import { Request, Response } from 'express';
import { getLatestMonitorEvent, userById } from '@/db';

export const getUserInfo = async (req: any, res: Response) => {
  try {
    const userid = req.user.userid;
    if (!userid) {
      res.status(500).json({ message: 'Invalid user' });
      return;
    }
    const user = await userById(userid);
    res.status(200).json(user);
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
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
