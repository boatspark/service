import express from 'express';
import { Request, Response } from 'express';
import { handleEvent, getLatestEvent } from './device';
import { handleLogin, authenticateAccessToken, refreshAccessToken } from './auth';
import { getUserInfo, latestEvent } from './app';
import basicAuth from 'express-basic-auth';

export const router = express.Router();

const deviceRouter = express.Router();
router.use(express.json());
router.use("/device", deviceRouter);

deviceRouter.use(basicAuth({
  users: { [process.env.AUTH_USER as string]: process.env.AUTH_PASS as string },
  unauthorizedResponse: () => {
    return { message: 'Unauthorized' };
  }
}));
deviceRouter.post('/event', handleEvent);
deviceRouter.get('/latest', getLatestEvent);

router.post('/login', handleLogin);
router.post('/refresh', refreshAccessToken);

const appRouter = express.Router();
router.use("/app", appRouter);
appRouter.use(authenticateAccessToken);
appRouter.get('/user', getUserInfo);
appRouter.post('/latest', latestEvent);

// Handle undefined routes
router.use((req: Request, res: Response) => {
  console.error("Unknown route: ", req.originalUrl);
  res.status(401).json({ message: 'Unauthorized' });
});
