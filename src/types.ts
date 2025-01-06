/**
 * Enum representing different power sources.
 */
export enum PowerSource {
  UNKNOWN = 0,
  /** Powered by VIN. */
  VIN = 1,

  /** Powered by a computer that is acting as a USB host. */
  USB_HOST = 2,

  /** Powered by a USB power adapter that supports DPDM but is not a USB host. */
  USB_ADAPTER = 3,

  /** Powered by On-The-Go (OTG) device. */
  USB_OTG = 4,

  /** Powered by battery connected to LiPo connector or Li+. */
  BATTERY = 5
};

/**
 * Type representing a monitor event.
 */
export type MonitorEvent = {
  /** Firmware version */
  v: number;
  /** Temperature beacons */
  beacons: {
    /** MAC address */
    mac: string;
    /** Signal strength */
    rssi: number;
    /** Temperature (C * 100) */
    t: number;
    /** Humidity (% * 100) */
    h: number;
    /** Battery percentage (%) */
    b: number;
    /** Battery voltage (V * 100) */
    v: number;
  }[];
  /** GPS data */
  gps: {
    /** Timestamp (ISO 8601) */
    t: string;
    /** Fix status (0 = no fix, 1 = fix) */
    fix: number;
    // Remaining fields are only present if fix is 1
    /** Number of satellites */
    sat?: number;
    /** Latitude (deg * 10^7) */
    lat?: number;
    /** Longitude (deg * 10^7) */
    lng?: number;
    /** Speed over ground (knots) */
    sog?: number;
    /** Course over ground (deg) */
    cog?: number;
    /** Altitude (m) */
    alt?: number;
    /** Position dilution of precision */
    pdop?: number;
    /** Fix quality (0 = Invalid, 1 = GPS, 2 = DGPS) */
    q?: number;
    /** 3D fix quality (1 = Nofix, 2 = 2D fix, 3 = 3D fix) */
    q3?: number;
  };
  gpio: {
    /** Battery 1 voltage (V * 100) */
    b1: number;
    /** Battery 2 voltage (V * 100) */
    b2: number;
    /** Shore power status (0 = off, 1 = on) */
    sp: number;
    /** Shore power cycle (number of times shore power has been lost) */
    spc: number;
    /** Bilge pump status (0 = off, 1 = on) */
    bp: number;
    /** Bilge pump cycle (number of times bilge pump has been activated) */
    bpc: number;
    /** Engine status (0 = off, 1 = on) */
    eng: number;
    /** Engine cycle (number of times engine has been started) */
    engc: number;
  };
  sys: {
    /** Power source */
    ps: PowerSource;
    /** Battery state of charge (% * 10) or -1 if disconnected */
    soc: number;
    /** Amount of free memory in the system in bytes */
    mem: number;
    /** Cellular signal strength as a percentage (% * 10) */
    ss: number;
    /** Cellular signal quality as a percentage (% * 10) */
    sq: number;
  };
};

/**
 * Enum representing different alert states.
 */
export enum AlertState {
  ALERT_NONE = 0,
  ALERT_BILGEPUMP = 1,
  ALERT_SHOREPOWER_LOST = 2,
  ALERT_SHOREPOWER_RESTORED = 4,
  ALERT_ENGINE_ON = 8,
  ALERT_ENGINE_OFF = 16,
}

/**
 * Type representing an alert event.
 */
export type AlertEvent = {
  alert: AlertState;
  gpio: {
    /** Battery 1 voltage (V * 100) */
    b1: number;
    /** Battery 2 voltage (V * 100) */
    b2: number;
    /** Shore power status (0 = off, 1 = on) */
    sp: number;
    /** Shore power cycle (number of times shore power has been lost) */
    spc: number;
    /** Bilge pump status (0 = off, 1 = on) */
    bp: number;
    /** Bilge pump cycle (number of times bilge pump has been activated) */
    bpc: number;
    /** Engine status (0 = off, 1 = on) */
    eng: number;
    /** Engine cycle (number of times engine has been started) */
    engc: number;
  };
  sys: {
    /** Power source */
    ps: PowerSource;
    /** Battery state of charge (% * 10) or -1 if disconnected */
    soc: number;
    /** Amount of free memory in the system in bytes */
    mem: number;
    /** Cellular signal strength as a percentage (% * 10) */
    ss: number;
    /** Cellular signal quality as a percentage (% * 10) */
    sq: number;
  };
};