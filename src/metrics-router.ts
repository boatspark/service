import express from 'express';
import { Request, Response } from 'express';
import { prepareMetrics } from '@/metrics';

const getMetrics = async (req: Request, res: Response) => {
  try {
    const latestMonitorEvent = await prepareMetrics(res);
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

export const router = express.Router();
router.get('/', getMetrics);
