import { useState, useEffect } from 'react';
import { ArrowUpRight, ShieldAlert, MoveRight, Compass, Terminal } from 'lucide-react';
import { useScrollScene } from './useScrollScene';
import './control-tower.css';

type Props = {
  onOpenDashboard?: () => void;
};

interface TowerShipment {
  id: string;
  routeShort: string;
  origin: string;
  dest: string;
  truck: string;
  driver: string;
  status: 'IN TRANSIT' | 'PICKUP STAGED' | 'EN ROUTE' | 'UNLOADING';
  pickup: string;
  value: number;
  speed: string;
  eta: string;
  coords: { x: number; y: number };
}

const ACTIVE_SHIPMENTS: TowerShipment[] = [
  {
    id: 'SH-101',
    routeShort: 'DEL → JAI',
    origin: 'DELHI',
    dest: 'JAIPUR',
    truck: 'HR 55 AB 2190',
    driver: 'Rakesh Kumar',
    status: 'IN TRANSIT',
    pickup: '16:30',
    value: 31500,
    speed: '62 KM/H',
    eta: '18:45 IST',
    coords: { x: 230, y: 118 }  // midpoint DEL→JAI
  },
  {
    id: 'SH-102',
    routeShort: 'BOM → ADI',
    origin: 'MUMBAI',
    dest: 'AHMEDABAD',
    truck: 'MH 04 GP 8812',
    driver: 'Manjit Singh',
    status: 'PICKUP STAGED',
    pickup: '17:15',
    value: 42000,
    speed: '0 KM/H',
    eta: 'DOCK READY',
    coords: { x: 124, y: 305 }  // midpoint BOM→ADI
  },
  {
    id: 'SH-103',
    routeShort: 'BLR → MAA',
    origin: 'BENGALURU',
    dest: 'CHENNAI',
    truck: 'KA 02 MG 4501',
    driver: 'S. Narayanan',
    status: 'IN TRANSIT',
    pickup: '14:00',
    value: 26800,
    speed: '58 KM/H',
    eta: '19:10 IST',
    coords: { x: 318, y: 494 }  // midpoint BLR→MAA
  },
  {
    id: 'SH-104',
    routeShort: 'PUN → HYD',
    origin: 'PUNE',
    dest: 'HYDERABAD',
    truck: 'MH 12 TR 9934',
    driver: 'Vikas Patil',
    status: 'EN ROUTE',
    pickup: '11:20',
    value: 38400,
    speed: '54 KM/H',
    eta: '20:30 IST',
    coords: { x: 220, y: 421 }  // midpoint PUN→HYD
  },
  {
    id: 'SH-105',
    routeShort: 'DEL → LKO',
    origin: 'DELHI',
    dest: 'LUCKNOW',
    truck: 'UP 32 EN 6019',
    driver: 'Amit Tiwari',
    status: 'UNLOADING',
    pickup: '08:30',
    value: 29000,
    speed: '0 KM/H',
    eta: 'AT DESTINATION',
    coords: { x: 358, y: 175 }  // at Lucknow
  }
];

export default function ControlTowerSection({ onOpenDashboard }: Props) {
  const ref = useScrollScene();
  const [selectedShipment, setSelectedShipment] = useState<TowerShipment>(ACTIVE_SHIPMENTS[0]);
  const [clockTime, setClockTime] = useState('16:42:18 IST');

  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      const h = String(d.getHours()).padStart(2, '0');
      const m = String(d.getMinutes()).padStart(2, '0');
      const s = String(d.getSeconds()).padStart(2, '0');
      setClockTime(`${h}:${m}:${s} IST`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="freight-story tower-scene" ref={ref} aria-labelledby="tower-title">
      {/* Chapter Marker */}
      <div className="story-chapter">
        <span><b>07</b> / CONTROL TOWER</span>
        <span>Y2WAIT OPERATIONS NERVE CENTER / ALL INDIA RADAR</span>
      </div>

      {/* Editorial Headline with Telemetry Readout */}
      <div className="tower-editorial-head">
        <div className="tower-headline-wrap">
          <span className="tower-kicker">+ OPERATIONAL NERVE CENTER</span>
          <h2 id="tower-title">
            EVERY LOAD.<br />
            <span>ONE VIEW.</span>
          </h2>
        </div>
        <div className="tower-clock-panel">
          <div className="tower-live-indicator">
            <span className="pulse-beacon" />
            <span>GRID TELEMETRY ONLINE</span>
          </div>
          <div className="tower-clock-val">{clockTime}</div>
          <span className="tower-coords">TERMINAL REF: LAT 28°38′N / LONG 77°13′E</span>
        </div>
      </div>

      {/* --------------------------------
          TOP METRICS: Flat typography, rules, no card containers
          -------------------------------- */}
      <div className="tower-metrics-strip" aria-label="Control tower live operational metrics">
        <div className="tower-metric-cell">
          <div className="metric-header">
            <span className="m-tag">01 // TELEMETRY</span>
            <span className="m-state">LIVE</span>
          </div>
          <div className="m-num">08</div>
          <div className="m-title">ACTIVE LOADS</div>
          <span className="m-desc">Direct matched shipments moving on corridors</span>
        </div>

        <div className="tower-metric-cell">
          <div className="metric-header">
            <span className="m-tag">02 // CORRIDOR</span>
            <span className="m-state">HIGHWAY SPEED</span>
          </div>
          <div className="m-num">05</div>
          <div className="m-title">IN TRANSIT</div>
          <span className="m-desc">Cruising speed avg 58.4 km/h with GPS seal</span>
        </div>

        <div className="tower-metric-cell">
          <div className="metric-header">
            <span className="m-tag">03 // CAPACITY</span>
            <span className="m-state">AVAILABLE</span>
          </div>
          <div className="m-num">24</div>
          <div className="m-title">AVAILABLE TRUCKS</div>
          <span className="m-desc">Verified commercial chassis staged at key nodes</span>
        </div>

        <div className="tower-metric-cell alert-cell">
          <div className="metric-header">
            <span className="m-tag">04 // ATTENTION</span>
            <span className="m-state alert">ACTION REQ</span>
          </div>
          <div className="m-num orange">03</div>
          <div className="m-title">NEEDS ATTENTION</div>
          <span className="m-desc">2 route delays • 1 bid closing • 3 docs expiring</span>
        </div>
      </div>

      {/* --------------------------------
          MAIN AREA: Large Live Map + Needs Attention Log
          -------------------------------- */}
      <div className="tower-main-grid">
        {/* LEFT: Large Live Radar Map */}
        <div className="tower-map-console">
          <div className="map-console-bar">
            <div className="console-brand">
              <Compass size={14} className="text-orange" />
              <span>RADAR DISPLAY // CORRIDOR OVERVIEW</span>
            </div>
            <div className="console-meta">
              <span>SCAN FREQ: 1.2S</span>
              <span className="separator">|</span>
              <span className="text-green">ALL NODES SYNCHRONIZED</span>
            </div>
          </div>

          <div className="tower-svg-wrapper">
            {/* ── Real India Geographic Map ─────────────────────── */}
            <svg viewBox="0 0 520 600" fill="none" className="tower-map-svg" aria-hidden="true">
              <defs>
                {/* Subtle coordinate grid */}
                <pattern id="india-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M30 0L0 0 0 30" fill="none" stroke="#ffffff" strokeWidth="0.4" opacity="0.04" />
                </pattern>
                {/* Active route glow */}
                <filter id="route-glow">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                {/* Orange glow for active node */}
                <filter id="orange-glow">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>

              {/* Background */}
              <rect width="520" height="600" fill="#070a0e" />
              <rect width="520" height="600" fill="url(#india-grid)" />

              {/* ── Real India outline (simplified cartographic path) ── */}
              <g opacity="0.9">
                {/* Main peninsula / Deccan */}
                <path
                  d="
                    M 235 30
                    L 280 32 L 340 42 L 390 58 L 430 78 L 450 100 L 460 125 L 455 150
                    L 445 168 L 430 180 L 420 195 L 415 215 L 420 235 L 415 255
                    L 400 270 L 390 290 L 380 310 L 370 330 L 358 355
                    L 345 375 L 330 395 L 318 415 L 308 435 L 300 460
                    L 292 480 L 285 500 L 278 520 L 272 538 L 268 555 L 265 570
                    L 262 556 L 258 538 L 252 518 L 246 498 L 240 476
                    L 230 455 L 218 432 L 205 410 L 190 388 L 178 365
                    L 162 340 L 148 315 L 136 292 L 125 270 L 118 248
                    L 112 225 L 110 202 L 112 180 L 116 158 L 120 140
                    L 128 120 L 140 100 L 158 82 L 182 62 L 210 44 L 235 30
                  "
                  stroke="#1e3a5f"
                  strokeWidth="1.5"
                  fill="#0d1f35"
                  opacity="0.7"
                />
                {/* Gujarat peninsula */}
                <path
                  d="M 112 202 L 90 210 L 72 225 L 62 245 L 64 262 L 78 270 L 95 265 L 110 248"
                  stroke="#1e3a5f"
                  strokeWidth="1"
                  fill="#0d1f35"
                  opacity="0.6"
                />
                {/* NE India bump */}
                <path
                  d="M 415 80 L 440 68 L 465 70 L 480 85 L 478 102 L 462 112 L 448 105 L 435 95 L 425 88"
                  stroke="#1e3a5f"
                  strokeWidth="1"
                  fill="#0d1f35"
                  opacity="0.55"
                />
                {/* Kashmir top */}
                <path
                  d="M 235 30 L 220 18 L 200 12 L 178 14 L 160 22 L 148 35 L 150 50 L 165 58 L 182 62"
                  stroke="#1e3a5f"
                  strokeWidth="1"
                  fill="#0d1f35"
                  opacity="0.5"
                />
              </g>

              {/* ── Dim state border suggestion lines ── */}
              <g opacity="0.08" stroke="#ffffff" strokeWidth="0.6" strokeDasharray="3 4">
                <line x1="235" y1="30" x2="265" y2="570" />
                <line x1="112" y1="202" x2="460" y2="125" />
                <line x1="120" y1="140" x2="415" y2="215" />
                <line x1="136" y1="292" x2="420" y2="235" />
                <line x1="162" y1="340" x2="380" y2="310" />
              </g>

              {/* ── Latitude / Longitude reference lines ── */}
              <g opacity="0.05" stroke="#6699cc" strokeWidth="0.5">
                {/* ~Tropic of Cancer ~23.5° (roughly y=300) */}
                <line x1="60" y1="295" x2="470" y2="295" strokeDasharray="6 4" />
                {/* Equator far south, not shown */}
                <text x="62" y="292" fontSize="6" fill="#4499bb" opacity="0.6" letterSpacing="0.5">23.5°N TROPIC</text>
              </g>

              {/* ── NATIONAL HIGHWAY CORRIDORS ── */}
              {/* GQ Golden Quadrilateral: Delhi-Mumbai-Chennai-Kolkata */}
              <g opacity="0.25" stroke="#4a7fa5" strokeWidth="1.4">
                {/* Delhi → Jaipur → Ahmedabad → Mumbai (NH 48/8) */}
                <path d="M 264 78 Q 210 115 195 160 Q 155 210 120 262 Q 108 300 128 348" strokeDasharray="none"/>
                {/* Mumbai → Pune → Hyderabad → Chennai (NH 48) */}
                <path d="M 128 348 Q 148 375 162 400 Q 210 430 280 442 Q 335 450 355 480"/>
                {/* Delhi → Lucknow → Kolkata (NH 19/2) */}
                <path d="M 264 78 Q 318 128 358 175 Q 400 218 430 240"/>
                {/* Hyderabad → Bengaluru */}
                <path d="M 280 442 Q 278 475 275 508"/>
              </g>

              {/* ── ACTIVE Y2W CORRIDORS: brighter accent ── */}
              <g>
                {/* DEL → JAI */}
                <path d="M 264 78 L 195 160" stroke="#de622b" strokeWidth="1.8" opacity="0.55" filter="url(#route-glow)" />
                {/* BOM → ADI */}
                <path d="M 128 348 L 120 262" stroke="#de622b" strokeWidth="1.4" opacity="0.35" />
                {/* BLR → MAA */}
                <path d="M 275 508 L 355 480" stroke="#de622b" strokeWidth="1.8" opacity="0.55" filter="url(#route-glow)" />
                {/* PUN → HYD */}
                <path d="M 162 400 L 280 442" stroke="#de622b" strokeWidth="1.4" opacity="0.4" />
                {/* DEL → LKO */}
                <path d="M 264 78 L 358 175" stroke="#de622b" strokeWidth="1.4" opacity="0.35" />
              </g>

              {/* ── CITY NODES ── */}
              {/* Helper: cities at geographically-accurate approximate positions */}
              {/* Delhi ~28.6°N 77.2°E */}
              <g className="tower-city-node">
                <circle cx="264" cy="78" r="5" fill="#ffffff" opacity="0.15"/>
                <circle cx="264" cy="78" r="2.5" fill="#a0aec0"/>
                <text x="270" y="74" className="city-lbl" textAnchor="start">DELHI</text>
                <text x="270" y="82" className="city-coord" textAnchor="start">28.6°N 77.2°E</text>
              </g>
              {/* Jaipur ~26.9°N 75.8°E */}
              <g className="tower-city-node">
                <circle cx="195" cy="160" r="4" fill="#ffffff" opacity="0.12"/>
                <circle cx="195" cy="160" r="2" fill="#a0aec0"/>
                <text x="178" y="158" className="city-lbl" textAnchor="end">JAIPUR</text>
              </g>
              {/* Ahmedabad ~23.0°N 72.6°E */}
              <g className="tower-city-node">
                <circle cx="120" cy="262" r="4" fill="#ffffff" opacity="0.12"/>
                <circle cx="120" cy="262" r="2" fill="#a0aec0"/>
                <text x="105" y="260" className="city-lbl" textAnchor="end">AHMEDABAD</text>
              </g>
              {/* Mumbai ~18.9°N 72.8°E */}
              <g className="tower-city-node">
                <circle cx="128" cy="348" r="5" fill="#ffffff" opacity="0.15"/>
                <circle cx="128" cy="348" r="2.5" fill="#a0aec0"/>
                <text x="112" y="346" className="city-lbl" textAnchor="end">MUMBAI</text>
                <text x="112" y="354" className="city-coord" textAnchor="end">18.9°N 72.8°E</text>
              </g>
              {/* Pune ~18.5°N 73.9°E */}
              <g className="tower-city-node">
                <circle cx="162" cy="400" r="3.5" fill="#ffffff" opacity="0.1"/>
                <circle cx="162" cy="400" r="1.8" fill="#a0aec0"/>
                <text x="147" y="398" className="city-lbl" textAnchor="end">PUNE</text>
              </g>
              {/* Hyderabad ~17.4°N 78.5°E */}
              <g className="tower-city-node">
                <circle cx="280" cy="442" r="4" fill="#ffffff" opacity="0.12"/>
                <circle cx="280" cy="442" r="2" fill="#a0aec0"/>
                <text x="293" y="440" className="city-lbl">HYDERABAD</text>
              </g>
              {/* Bengaluru ~12.9°N 77.6°E */}
              <g className="tower-city-node">
                <circle cx="275" cy="508" r="5" fill="#ffffff" opacity="0.15"/>
                <circle cx="275" cy="508" r="2.5" fill="#a0aec0"/>
                <text x="258" y="506" className="city-lbl" textAnchor="end">BENGALURU</text>
                <text x="258" y="514" className="city-coord" textAnchor="end">12.9°N 77.6°E</text>
              </g>
              {/* Chennai ~13.1°N 80.3°E */}
              <g className="tower-city-node">
                <circle cx="355" cy="480" r="4" fill="#ffffff" opacity="0.12"/>
                <circle cx="355" cy="480" r="2" fill="#a0aec0"/>
                <text x="362" y="478" className="city-lbl">CHENNAI</text>
              </g>
              {/* Lucknow ~26.8°N 80.9°E */}
              <g className="tower-city-node">
                <circle cx="358" cy="175" r="4" fill="#ffffff" opacity="0.12"/>
                <circle cx="358" cy="175" r="2" fill="#a0aec0"/>
                <text x="365" y="173" className="city-lbl">LUCKNOW</text>
              </g>
              {/* Kolkata ~22.5°N 88.4°E */}
              <g className="tower-city-node">
                <circle cx="432" cy="240" r="4" fill="#ffffff" opacity="0.1"/>
                <circle cx="432" cy="240" r="2" fill="#a0aec0"/>
                <text x="438" y="238" className="city-lbl">KOLKATA</text>
              </g>

              {/* ── ACTIVE SHIPMENT NODES ── */}
              {ACTIVE_SHIPMENTS.map(item => {
                const isCurrent = item.id === selectedShipment.id;
                return (
                  <g key={item.id} className="map-shipment-marker" onClick={() => setSelectedShipment(item)} style={{ cursor: 'pointer' }}>
                    {isCurrent && (
                      <>
                        <circle cx={item.coords.x} cy={item.coords.y} r="22" fill="#de622b" fillOpacity="0.08"/>
                        <circle cx={item.coords.x} cy={item.coords.y} r="11" stroke="#de622b" strokeWidth="1" strokeDasharray="2 3" className="spin-radar"/>
                      </>
                    )}
                    <circle cx={item.coords.x} cy={item.coords.y} r={isCurrent ? 6 : 4} fill={isCurrent ? '#de622b' : '#ffffff'} opacity={isCurrent ? 1 : 0.55} filter={isCurrent ? 'url(#orange-glow)' : ''} />
                    <text x={item.coords.x + 9} y={item.coords.y + 4} className={`marker-txt ${isCurrent ? 'is-active' : ''}`}>{item.truck}</text>
                  </g>
                );
              })}

              {/* ── Map legend bottom-right ── */}
              <g>
                <rect x="348" y="30" width="155" height="52" rx="2" fill="#090d14" opacity="0.88"/>
                <rect x="348" y="30" width="155" height="52" rx="2" stroke="#ffffff" strokeWidth="0.5" opacity="0.1"/>
                <text x="358" y="44" fontSize="6" fontWeight="700" letterSpacing="1.2" fill="#737069">ACTIVE CORRIDOR</text>
                <line x1="358" y1="51" x2="390" y2="51" stroke="#de622b" strokeWidth="1.8"/>
                <text x="395" y="54" fontSize="6" fill="#a0aec0">Y2W TRACKED ROUTE</text>
                <text x="358" y="64" fontSize="6" fontWeight="700" letterSpacing="1.2" fill="#737069">NATIONAL HIGHWAY</text>
                <line x1="358" y1="71" x2="390" y2="71" stroke="#4a7fa5" strokeWidth="1.2" strokeDasharray="3 2" opacity="0.7"/>
                <text x="395" y="74" fontSize="6" fill="#a0aec0">GQ / NH NETWORK</text>
              </g>
            </svg>

            {/* Selected Vehicle Floating HUD */}
            <div className="map-vehicle-hud">
              <div className="hud-top">
                <span className="hud-label">TRACKED CHASSIS</span>
                <span className="hud-status">{selectedShipment.status}</span>
              </div>
              <div className="hud-title">{selectedShipment.truck}</div>
              <div className="hud-route">{selectedShipment.origin} <MoveRight size={12} /> {selectedShipment.dest}</div>
              <div className="hud-metrics">
                <div>
                  <span>SPEED</span>
                  <strong>{selectedShipment.speed}</strong>
                </div>
                <div>
                  <span>ETA</span>
                  <strong>{selectedShipment.eta}</strong>
                </div>
                <div>
                  <span>DRIVER</span>
                  <strong>{selectedShipment.driver}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Needs Attention Operations Alert Panel */}
        <div className="tower-alerts-console">
          <div className="alerts-head">
            <div className="alerts-title-row">
              <ShieldAlert size={16} className="text-orange" />
              <h3>NEEDS ATTENTION</h3>
            </div>
            <span className="alert-count-pill">03 CRITICAL ITEMS</span>
          </div>

          <div className="alerts-list">
            {/* Alert Item 1: Delay */}
            <div className="alert-card priority-high">
              <div className="alert-meta">
                <span className="alert-badge delay">DELAY RISK</span>
                <span className="alert-time">16:12 IST</span>
              </div>
              <h4>HR 38 Y 9021 • JAIPUR BYPASS</h4>
              <p>Congestion at Shahpura flyover resulting in +28 min travel delay. Driver notified with NH 48 diversion route.</p>
              <div className="alert-footer">
                <span>CONSIGNOR: TATA AUTOCOMP</span>
                <button className="alert-action-btn">REROUTE ↗</button>
              </div>
            </div>

            {/* Alert Item 2: Bid Closing */}
            <div className="alert-card priority-medium">
              <div className="alert-meta">
                <span className="alert-badge rfq">RFQ CLOSING</span>
                <span className="alert-time">02:41:18 REMAINING</span>
              </div>
              <h4>PUNE → CHENNAI (RFQ Y2-48291)</h4>
              <p>Final round of reverse bidding closing soon. Current L1 standing at ₹4,18,000 across 18 verified fleet bids.</p>
              <div className="alert-footer">
                <span>VOLUME: 120T STEEL</span>
                <button className="alert-action-btn">VIEW RFQ ↗</button>
              </div>
            </div>

            {/* Alert Item 3: Document Expiry */}
            <div className="alert-card priority-low">
              <div className="alert-meta">
                <span className="alert-badge doc">DOC EXPIRY</span>
                <span className="alert-time">48 HOURS</span>
              </div>
              <h4>MH 12 AB 4582 (TATA 1109)</h4>
              <p>National carrier permit expires on 14 Sept. Safe QR passport flagged for renewal upload.</p>
              <div className="alert-footer">
                <span>OWNER: VIKAS ROADWAYS</span>
                <button className="alert-action-btn">UPLOAD ↗</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --------------------------------
          BOTTOM: Shipment Manifest Operations Table
          -------------------------------- */}
      <div className="tower-manifest-console">
        <div className="manifest-console-bar">
          <div className="mbar-left">
            <Terminal size={14} className="text-orange" />
            <span>ACTIVE FREIGHT MANIFEST LOG // LIVE TELEMETRY</span>
          </div>
          <div className="mbar-right">
            <span>SHOWING 5 OF 8 ACTIVE TRANSACTIONS</span>
          </div>
        </div>

        <div className="tower-table-wrapper">
          <table className="tower-manifest-table">
            <thead>
              <tr>
                <th>ROUTE</th>
                <th>TRUCK / CHASSIS</th>
                <th>DRIVER</th>
                <th>STATUS</th>
                <th>PICKUP TIME</th>
                <th>VALUE</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {ACTIVE_SHIPMENTS.map(row => {
                const isSelected = row.id === selectedShipment.id;
                return (
                  <tr
                    key={row.id}
                    className={isSelected ? 'is-active-row' : ''}
                    onClick={() => setSelectedShipment(row)}
                  >
                    <td className="col-route">
                      <strong>{row.routeShort}</strong>
                      <span>{row.origin} to {row.dest}</span>
                    </td>
                    <td className="col-truck">
                      <span>{row.truck}</span>
                    </td>
                    <td className="col-driver">
                      <span>{row.driver}</span>
                    </td>
                    <td className="col-status">
                      <span className={`status-pill ${row.status.toLowerCase().replace(' ', '-')}`}>
                        ● {row.status}
                      </span>
                    </td>
                    <td className="col-pickup">
                      <span>{row.pickup}</span>
                    </td>
                    <td className="col-value">
                      <strong>₹{row.value.toLocaleString('en-IN')}</strong>
                    </td>
                    <td className="col-action">
                      <button
                        className="table-inspect-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedShipment(row);
                        }}
                      >
                        INSPECT
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="manifest-bottom-action">
          <div className="console-summary-text">
            Y2WAIT NERVE CENTER PROTOCOL 4.2 • CONNECTED TO ALL REGIONAL RTO & FASTAG GATEWAYS
          </div>
          {onOpenDashboard && (
            <button className="enter-console-btn" onClick={onOpenDashboard}>
              ACCESS FULL COMMAND DESK <ArrowUpRight size={16} />
            </button>
          )}
        </div>
      </div>

      <div className="story-bottom-rule">
        <span>TOTAL HIGHWAY TRANSPARENCY. COMPLETE DISPATCH VISIBILITY.</span>
        <span>NEXT: 08 / ENTERPRISE PROCUREMENT AUCTIONS <b>↓</b></span>
      </div>
    </section>
  );
}
