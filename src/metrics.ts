import { Response } from 'express';
import { Gauge, register } from "prom-client";
import { getLatestMonitorEvent } from '@/db';

const temperature_galley = new Gauge({
  name: "temperature_galley",
  help: "Galley Temperature",
});
const temperature_fridge = new Gauge({
  name: "temperature_fridge",
  help: "Fridge Temperature",
});
const temperature_engine = new Gauge({
  name: "temperature_engine",
  help: "Engine Temperature",
});

const battery_voltage1 = new Gauge({
  name: "battery_voltage1",
  help: "Battery 1 Voltage",
});
const battery_voltage2 = new Gauge({
  name: "battery_voltage2",
  help: "Battery 2 Voltage",
});

const is_shorepower_connected = new Gauge({
  name: "is_shorepower_connected",
  help: "Shore Power Connected",
});
const is_bilgepump_running = new Gauge({
  name: "is_bilgepump_running",
  help: "Bilge Pump Running",
});

const longitude = new Gauge({
  name: "longitude",
  help: "Longitude",
});
const latitude = new Gauge({
  name: "latitude",
  help: "Latitude",
});

function round(v: number) {
  return Math.round(v * 100.0) / 100.0;
}

export const prepareMetrics = async (res: Response) => {
  const coreid = process.env.METRICS_ID as string;
  const latestMonitorEvent = await getLatestMonitorEvent(coreid);

  temperature_galley.set(round(0.0));
  temperature_fridge.set(round(0.0));
  temperature_engine.set(round(0.0));
  battery_voltage1.set(round(0.0));
  battery_voltage2.set(round(0.0));
  is_shorepower_connected.set(0);
  is_bilgepump_running.set(0);
  longitude.set(0.0);
  latitude.set(0.0);

  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
};
