import { Request, Response } from 'express';

export const handleEvent = (req: Request, res: Response) => {
  if (!req.is('json')) throw new Error('Invalid content type');
  const data = req.body;
  if (!data || typeof data !== 'object') throw new Error('Invalid data');
  console.log(data);
  res.end();
};

export const getLatestEvent = (req: Request, res: Response) => {
  res.json({
    message: 'getLatestEvent',
  });
};
