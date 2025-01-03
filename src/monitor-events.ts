import { Request, Response } from 'express';

export const handleEvent = (req: Request, res: Response) => {
  // Validate request
  if (!req.is('json')) throw new Error('Invalid content type');
  const data = req.body;
  if (!data || typeof data !== 'object') throw new Error('Invalid data');
  if (!data.event || !data.data || !data.coreid || !data.published_at) throw new Error('Invalid event data');
  console.log(data);

  if (data.event === "boatspark/monitor") {
    // Save monitor event to database
    console.log("TODO: save event data");
  } else if (data.event === "boatspark/alert") {
    // Notify user of alert
    console.log("TODO: send alert notification");
    // Save alert in database
    console.log("TODO: save alert data");
  } else {
    throw new Error('Invalid event type');
  }

  res.end();
};

export const getLatestEvent = (req: Request, res: Response) => {
  res.json({
    message: 'getLatestEvent',
  });
};
