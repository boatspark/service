import { Request, Response } from 'express';
import { saveMonitorEvent, saveAlertEvent, getLatestMonitorEvent } from '@/db';

export const handleEvent = async (req: Request, res: Response) => {
  try {
    // Validate request
    if (!req.is('json')) throw new Error('Invalid content type');
    const data = req.body;
    if (!data || typeof data !== 'object') throw new Error('Invalid data');
    if (!data.name || !data.data || !data.coreid || !data.published_at) throw new Error('Invalid event data');
    console.log(data);

    if (data.name === "boatspark/monitor") {
      // Save monitor event to database
      await saveMonitorEvent({
        coreid: data.coreid,
        data: data.data,
        published_at: new Date(data.published_at)
      });
      console.log("Monitor event saved");
    } else if (data.name === "boatspark/alert") {
      // Notify user of alert
      console.log("TODO: send alert notification");
      // Save alert in database
      await saveAlertEvent({
        coreid: data.coreid,
        data: data.data,
        published_at: new Date(data.published_at)
      });
      console.log("Alert event saved");
    } else {
      throw new Error('Invalid event type');
    }

    res.end();
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

// Return the latest monitor event for a given coreid
export const getLatestEvent = async (req: Request, res: Response) => {
  try {
    const coreid = req.query.id as string;
    const latestMonitorEvent = await getLatestMonitorEvent(coreid);

    res.json(latestMonitorEvent);
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error.message);
  }
};
