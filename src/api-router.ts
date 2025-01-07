import express from 'express';
import { handleEvent, getLatestEvent } from '@/device-api';
import { handleLogin, authenticateJWT } from '@/auth-api';
import { handleTest } from './app-api';
import basicAuth from 'express-basic-auth';

export const router = express.Router();

const deviceRouter = express.Router();
router.use("/device", deviceRouter);
router.use(express.json());

deviceRouter.use(basicAuth({
  users: { [process.env.AUTH_USER as string]: process.env.AUTH_PASS as string },
  unauthorizedResponse: 'Unauthorized'
}));
deviceRouter.post('/event', handleEvent);
deviceRouter.get('/latest', getLatestEvent);

router.post('/login', handleLogin);
const appRouter = express.Router();
router.use("/app", appRouter);
appRouter.use(authenticateJWT);
appRouter.get('/test', handleTest);
