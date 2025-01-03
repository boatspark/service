import express from 'express';
import { handleEvent, getLatestEvent } from '@/monitor-events';
import basicAuth from 'express-basic-auth';

export const router = express.Router();

router.use(basicAuth({
  users: { [process.env.AUTH_USER as string]: process.env.AUTH_PASS as string },
  unauthorizedResponse: 'Unauthorized'
}));
router.use(express.json());

router.post('/event', handleEvent);
router.get('/latest', getLatestEvent);
