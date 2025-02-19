import { Response } from 'express';
import { Gauge, register } from "prom-client";
import { getLatestMonitorEvent } from '@/db';
import { MonitorEvent } from '../types';

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

const processEvent = (data: string) => {
  let boat = {
    temperature: {
      galley: 0.0,
      fridge: 0.0,
      engine: 0.0
    },
    battery: {
      voltage1: 0.0,
      voltage2: 0.0
    },
    is_bilgepump_running: false,
    is_shorepower_connected: false,
    location: {
      longitude: 0.0,
      latitude: 0.0
    }
  };

  const event: MonitorEvent = JSON.parse(data);
  if (event.v !== 1 && event.v !== 2) throw new Error('Invalid event version');
  const galleyMac = process.env.TEMP_GALLEY_MAC as string;
  const fridgeMac = process.env.TEMP_FRIDGE_MAC as string;
  const engineMac = process.env.TEMP_ENGINE_MAC as string;
  if (!galleyMac || !fridgeMac || !engineMac) throw new Error('Missing temperature MACs');

  event.beacons.forEach(beacon => {
    if (beacon.mac === galleyMac) {
      boat.temperature.galley = beacon.t / 100.0;
    } else if (beacon.mac === fridgeMac) {
      boat.temperature.fridge = beacon.t / 100.0;
    } else if (beacon.mac === engineMac) {
      boat.temperature.engine = beacon.t / 100.0;
    }
  });

  if (event.gps.fix) {
    boat.location.latitude = event.gps.lat as number / 10000000.0;
    boat.location.longitude = event.gps.lng as number / 10000000.0;
  }

  boat.battery.voltage1 = event.gpio.b1 / 100.0;
  boat.battery.voltage2 = event.gpio.b2 / 100.0;
  boat.is_bilgepump_running = event.gpio.bp > 0;
  boat.is_shorepower_connected = event.gpio.sp > 0;

  return boat;
};

export const prepareMetrics = async (res: Response) => {
  const coreid = process.env.METRICS_ID as string;
  if (!coreid) throw new Error('METRICS_ID is not set');
  const latestMonitorEvent = await getLatestMonitorEvent(coreid);
  if (!latestMonitorEvent) throw new Error('No monitor event found');

  const boat = processEvent(latestMonitorEvent.data);

  temperature_galley.set(round(boat.temperature.galley));
  temperature_fridge.set(round(boat.temperature.fridge));
  temperature_engine.set(round(boat.temperature.engine));
  battery_voltage1.set(round(boat.battery.voltage1));
  battery_voltage2.set(round(boat.battery.voltage2));
  is_bilgepump_running.set(boat.is_bilgepump_running ? 1 : 0);
  is_shorepower_connected.set(boat.is_shorepower_connected ? 1 : 0);
  longitude.set(boat.location.longitude);
  latitude.set(boat.location.latitude);

  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
};
