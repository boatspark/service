import { Request, Response } from 'express';

export const handleTest = async (req: any, res: Response) => {
  const userid = req.user.userid;
  res.status(200).json({ message: 'test', id: userid });
};
