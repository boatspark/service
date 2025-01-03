/**
 * Device power source value.
 */
export enum PowerSource {
  UNKNOWN = 0,
  VIN = 1,        // Powered by VIN
  USB_HOST = 2,   // Powered by a computer that is acting as a USB host
  USB_ADAPTER = 3,// Powered by a USB power adapter that supports DPDM but is not a USB host
  USB_OTG = 4,    // Powered by On-The-Go (OTG) device
  BATTERY = 5     // Powered by battery connected to LiPo connector or Li+
};

/**
 * Regular monitor event data.
 */
export type MonitorEvent = {
  v: number;      // Firmware version
  beacons: {      // Temperature beacons
    mac: string;  // MAC address
    rssi: number; // Signal strength
    t: number;    // Temperature (C * 100)
    h: number;    // Humidity (% * 100)
    b: number;    // Battery percentage (%)
    v: number;    // Battery voltage (V * 100)
  }[];
  gps: {          // GPS data
    t: string;    // Timestamp (ISO 8601)
    fix: number;  // Fix status (0 = no fix, 1 = fix)
    // Remaining fields are only present if fix is 1
    sat?: number;  // Number of satellites
    lat?: number;  // Latitude (deg * 10^7)
    lng?: number;  // Longitude (deg * 10^7)
    sog?: number;  // Speed over ground (knots)
    cog?: number;  // Course over ground (deg)
    alt?: number;  // Altitude (m)
    pdop?: number; // Position dilution of precision
    q?: number;    // Fix quality (0 = Invalid, 1 = GPS, 2 = DGPS)
    q3?: number;   // 3D fix quality (1 = Nofix, 2 = 2D fix, 3 = 3D fix)
  };
  gpio: {
    b1: number;   // Battery 1 voltage (V * 100)
    b2: number;   // Battery 2 voltage (V * 100)
    sp: number;   // Shore power status (0 = off, 1 = on)
    spc: number;  // Shore power cycle (number of times shore power has been lost)
    bp: number;   // Bilge pump status (0 = off, 1 = on)
    bpc: number;  // Bilge pump cycle (number of times bilge pump has been activated)
    eng: number;  // Engine status (0 = off, 1 = on)
    engc: number; // Engine cycle (number of times engine has been started)
  };
  sys: {
    ps: PowerSource; // Power source
    soc: number;  // Battery state of charge (% * 10) or -1 if disconnected
    mem: number;  // Amount of free memory in the system in bytes
    ss: number;   // Cellular signal strength as a percentage (% * 10)
    sq: number;   // Cellular signal quality as a percentage (% * 10)
  };
};

/**
 * AlertState is a bit field with one or more states.
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
 * Data from alert event.
 */
export type AlertEvent = {
  alert: AlertState;
  gpio: {
    b1: number;   // Battery 1 voltage (V * 100)
    b2: number;   // Battery 2 voltage (V * 100)
    sp: number;   // Shore power status (0 = off, 1 = on)
    spc: number;  // Shore power cycle (number of times shore power has been lost)
    bp: number;   // Bilge pump status (0 = off, 1 = on)
    bpc: number;  // Bilge pump cycle (number of times bilge pump has been activated)
    eng: number;  // Engine status (0 = off, 1 = on)
    engc: number; // Engine cycle (number of times engine has been started)
  };
  sys: {
    ps: PowerSource; // Power source
    soc: number;  // Battery state of charge (% * 10) or -1 if disconnected
    mem: number;  // Amount of free memory in the system in bytes
    ss: number;   // Cellular signal strength as a percentage (% * 10)
    sq: number;   // Cellular signal quality as a percentage (% * 10)
  };
};