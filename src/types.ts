export type MonitorEvent = {
  v: number;
  beacons: {
    mac: string;
    rssi: number;
    t: number;
    h: number;
    b: number;
    v: number;
  }[];
  gps: {
    t: string;
    fix: number;
    sat: number;
    lat: number;
    lng: number;
    sog: number;
    cog: number;
    alt: number;
    pdop: number;
    q: number;
    q3: number;
  };
  gpio: {
    b1: number;
    b2: number;
    sp: number;
    spc: number;
    bp: number;
    bpc: number;
    eng: number;
    engc: number;
  };
  sys: {
    ps: number;
    soc: number;
    mem: number;
    ss: number;
    sq: number;
  };
};

export enum AlertState {
  ALERT_NONE = 0,
  ALERT_BILGEPUMP = 1,
  ALERT_SHOREPOWER_LOST = 2,
  ALERT_SHOREPOWER_RESTORED = 4,
  ALERT_ENGINE_ON = 8,
  ALERT_ENGINE_OFF = 16,
}

export type AlertEvent = {
  alert: AlertState;
  gpio: {
    b1: number;
    b2: number;
    sp: number;
    spc: number;
    bp: number;
    bpc: number;
    eng: number;
    engc: number;
  };
  sys: {
    ps: number;
    soc: number;
    mem: number;
    ss: number;
    sq: number;
  };
};