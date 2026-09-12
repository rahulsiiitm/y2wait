import { useState } from 'react';
import { ArrowUpRight, ShieldCheck, Truck } from 'lucide-react';
import { useScrollScene } from './useScrollScene';
import './roles.css';

type RoleId = 'shipper' | 'driver' | 'fleet' | 'enterprise';

type Props = {
  onShipper: () => void;
  onDriver: () => void;
  onFleet: () => void;
  onEnterprise: () => void;
};

interface RoleConfig {
  id: RoleId;
  index: string;
  name: string;
  tagline: string;
  premise: string;
  keyFeatures: { label: string; detail: string }[];
  primaryMetric: { label: string; value: string; note: string };
  secondaryMetric: { label: string; value: string; note: string };
  ctaLabel: string;
  uiHeader: string;
  uiBadge: string;
}

const ROLES: RoleConfig[] = [
  {
    id: 'shipper',
    index: '01',
    name: 'SHIPPER',
    tagline: 'DIRECT FREIGHT WITHOUT BROKER SPREADS.',
    premise: 'Post demanding loads in seconds. Access tens of thousands of verified commercial vehicles with instant rate transparency, live telemetry, and direct driver settlement.',
    keyFeatures: [
      { label: 'POST A LOAD IN 45 SECONDS', detail: 'Specify tonnage, trailer type, and target rate. Distributed immediately to nearby qualified trucks.' },
      { label: 'LIVE CARGO TELEMETRY', detail: 'End-to-end GPS visibility, toll checkpoint logs, and milestone alerts from pickup to final dock.' },
      { label: 'COMPARE TRANSPORT OPTIONS', detail: 'Evaluate closed containers vs. multi-axles based on real-time corridor market indices.' }
    ],
    primaryMetric: { label: 'BROKER COMMISSION SAVED', value: '100%', note: '0.0% deducted by middlemen' },
    secondaryMetric: { label: 'MATCH CONFIRMATION', value: '14 MIN', note: 'Average time to carrier booking' },
    ctaLabel: 'POST A LOAD AS SHIPPER',
    uiHeader: 'DISPATCH CONTROL CONSOLE / SHIPMENT #Y2-8821',
    uiBadge: 'SHIPPER OPERATIONAL VIEW'
  },
  {
    id: 'driver',
    index: '02',
    name: 'DRIVER',
    tagline: 'ZERO EMPTY MILES. FAST SETTLEMENT.',
    premise: 'Never deadhead back home. Find high-paying return loads along your exact corridor before you finish unloading, with instant fuel advances and verified consignors.',
    keyFeatures: [
      { label: 'NEARBY RETURN-LOAD OPPORTUNITIES', detail: 'Smart geofenced radar finds matching cargo heading back to your base depot.' },
      { label: 'INSTANT ADVANCE SETTLEMENT', detail: 'Receive 80% fuel and toll advances direct to your UPI/bank before rolling wheels.' },
      { label: 'SAFE QR VERIFIED HIGHWAY PASS', detail: 'One digital scan clears police and RTO checkpoints with pre-validated DL and permits.' }
    ],
    primaryMetric: { label: 'EMPTY RETURN REDUCTION', value: '88%', note: 'Vehicles reloaded within 4 hours' },
    secondaryMetric: { label: 'MONTHLY TAKE-HOME GAIN', value: '+₹38,000', note: 'Higher income from continuous round-trips' },
    ctaLabel: 'START HAULING AS DRIVER',
    uiHeader: 'CABIN COCKPIT / HR 55 AB 2190 TELEMETRY',
    uiBadge: 'DRIVER COCKPIT VIEW'
  },
  {
    id: 'fleet',
    index: '03',
    name: 'FLEET',
    tagline: 'MAXIMUM TRUCK UTILIZATION. CENTRALIZED TELEMETRY.',
    premise: 'Control 5 to 500 commercial vehicles across India. Track idle dwell times, balance regional demand, allocate drivers, and procure fleet consumables at wholesale rates.',
    keyFeatures: [
      { label: 'FLEET UTILIZATION MATRIX', detail: 'Real-time telemetry on every chassis: loaded, running empty, loading, or staged for service.' },
      { label: 'CENTRALIZED PERMIT & COMPLIANCE', detail: 'Automated alerts for national permits, fitness, insurance, and PUC renewal across the fleet.' },
      { label: 'FLEET MANDI GROUP-BUYING', detail: 'Direct access to OEM-certified tires, lubricants, and batteries at group volume discounts.' }
    ],
    primaryMetric: { label: 'FLEET UTILIZATION RATE', value: '94.2%', note: 'Active vehicle duty cycle' },
    secondaryMetric: { label: 'EMPTY RUNNING KM', value: '-36%', note: 'Significant fuel cost saving' },
    ctaLabel: 'ONBOARD YOUR FLEET',
    uiHeader: 'FLEET ALLOCATION HUB / 42 ACTIVE UNITS',
    uiBadge: 'FLEET DISPATCH VIEW'
  },
  {
    id: 'enterprise',
    index: '04',
    name: 'ENTERPRISE',
    tagline: 'HIGH-VOLUME PROCUREMENT & REVERSE AUCTIONS.',
    premise: 'Transform procurement cycles for industrial manufacturers and FMCG corporations. Host multi-corridor reverse bidding, enforce strict delivery SLAs, and sync with your ERP.',
    keyFeatures: [
      { label: 'DYNAMIC REVERSE AUCTIONS', detail: 'Transporters bid down in transparent rounds to guarantee the true market L1 clearing rate.' },
      { label: 'ENTERPRISE SLA AUDITING', detail: 'Contractually bound transit times, verified loss-prevention seals, and dedicated operations support.' },
      { label: 'ERP & SAP API INTEGRATION', detail: 'Real-time dispatch pipelines directly integrated with your enterprise supply chain software.' }
    ],
    primaryMetric: { label: 'ANNUAL FREIGHT SAVINGS', value: '14.8%', note: 'Benchmarked against conventional contracts' },
    secondaryMetric: { label: 'DEDICATED CAPACITY', value: '120K TONS', note: 'Guaranteed monthly contracted freight' },
    ctaLabel: 'REQUEST ENTERPRISE PROPOSAL',
    uiHeader: 'PROCUREMENT TERMINAL / RFQ-CORP-9482',
    uiBadge: 'ENTERPRISE AUCTION VIEW'
  }
];

export default function RoleNetworkSection(props: Props) {
  const ref = useScrollScene();
  const [activeRole, setActiveRole] = useState<RoleId>('shipper');

  const current = ROLES.find(r => r.id === activeRole) || ROLES[0];

  const handleRoleAction = () => {
    switch (activeRole) {
      case 'shipper':
        props.onShipper();
        break;
      case 'driver':
        props.onDriver();
        break;
      case 'fleet':
        props.onFleet();
        break;
      case 'enterprise':
        props.onEnterprise();
        break;
    }
  };

  return (
    <section className="freight-story roles-scene" ref={ref} aria-labelledby="roles-title">
      {/* Chapter Marker */}
      <div className="story-chapter">
        <span><b>06</b> / THE PARTICIPANTS</span>
        <span>ONE PLATFORM / DEDICATED ARCHITECTURE</span>
      </div>

      {/* Big Asymmetric Header */}
      <div className="roles-editorial-head">
        <div className="roles-headline-wrap">
          <span className="roles-kicker">+ INDUSTRIAL ECOSYSTEM</span>
          <h2 id="roles-title">
            BUILT FOR<br />
            EVERY SIDE<br />
            <span>OF FREIGHT.</span>
          </h2>
        </div>
        <p className="roles-lead-text">
          Freight is not one-size-fits-all. A solo driver needs immediate cash flow and return loads;
          a corporate shipper needs guaranteed SLA compliance and rate certainty. Y2Wait builds
          dedicated workflows tailored to each participant on India’s highways.
        </p>
      </div>

      {/* Large Typography Interactive Role Selector */}
      <div className="roles-typographic-nav" role="tablist" aria-label="Freight ecosystem participants">
        {ROLES.map(role => {
          const isCurrent = role.id === activeRole;
          return (
            <button
              key={role.id}
              className={`role-tab-btn ${isCurrent ? 'is-active' : ''}`}
              onClick={() => setActiveRole(role.id)}
              role="tab"
              aria-selected={isCurrent}
              tabIndex={0}
            >
              <span className="role-tab-index">{role.index}</span>
              <span className="role-tab-title">{role.name}</span>
              <span className="role-tab-indicator" />
            </button>
          );
        })}
      </div>

      {/* Dynamic Content Display Area */}
      <div className="role-stage-container">
        {/* Giant Watermark Background Typography */}
        <div className="role-watermark" aria-hidden="true">
          {current.name}
        </div>

        <div className="role-display-grid">
          {/* Left: Role Narrative & Key Features */}
          <div className="role-narrative-column">
            <div className="role-badge-tag">
              <span>{current.index} // PARTICIPANT PROFILE</span>
              <span className="live-dot">● ACTIVE WORKFLOW</span>
            </div>

            <h3 className="role-tagline">{current.tagline}</h3>
            <p className="role-premise">{current.premise}</p>

            <div className="role-features-list">
              {current.keyFeatures.map((feat, idx) => (
                <div key={idx} className="role-feature-item">
                  <span className="feature-num">0{idx + 1}</span>
                  <div>
                    <h4 className="feature-title">{feat.label}</h4>
                    <p className="feature-desc">{feat.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="role-metrics-row">
              <div className="metric-box">
                <span className="metric-val">{current.primaryMetric.value}</span>
                <span className="metric-lbl">{current.primaryMetric.label}</span>
                <span className="metric-note">{current.primaryMetric.note}</span>
              </div>
              <div className="metric-box">
                <span className="metric-val">{current.secondaryMetric.value}</span>
                <span className="metric-lbl">{current.secondaryMetric.label}</span>
                <span className="metric-note">{current.secondaryMetric.note}</span>
              </div>
            </div>

            <button className="role-cta-btn" onClick={handleRoleAction}>
              {current.ctaLabel} <ArrowUpRight size={18} />
            </button>
          </div>

          {/* Right: Operational Interactive Visual Terminal for Selected Role */}
          <div className="role-terminal-column">
            <div className="terminal-header">
              <div className="terminal-dots">
                <span className="tdot" />
                <span className="tdot" />
                <span className="tdot" />
              </div>
              <span className="terminal-title">{current.uiHeader}</span>
              <span className="terminal-mode">{current.uiBadge}</span>
            </div>

            <div className="terminal-body">
              {/* SHIPPER VIEW COMPOSITION */}
              {activeRole === 'shipper' && (
                <div className="terminal-view-content">
                  <div className="term-subbar">
                    <span>DISPATCH MANIFEST: DEL-BOM-091</span>
                    <span className="term-green">● CARRIER CONFIRMED</span>
                  </div>

                  <div className="term-route-header">
                    <div>
                      <span className="micro-city">DELHI (NH 48)</span>
                      <strong className="term-city">GURGAON INDUSTRIAL</strong>
                    </div>
                    <div className="term-arrow-block">
                      <span>1,410 KM</span>
                      <div className="term-line" />
                      <span>ETA 38H</span>
                    </div>
                    <div>
                      <span className="micro-city">MUMBAI (NH 48)</span>
                      <strong className="term-city">NHAVA SHEVA PORT</strong>
                    </div>
                  </div>

                  <div className="term-spec-grid">
                    <div className="tspec">
                      <span className="tspec-l">PAYLOAD</span>
                      <span className="tspec-v">24.5 TONNES</span>
                    </div>
                    <div className="tspec">
                      <span className="tspec-l">MATERIAL</span>
                      <span className="tspec-v">AUTO STAMPINGS</span>
                    </div>
                    <div className="tspec">
                      <span className="tspec-l">TRAILER</span>
                      <span className="tspec-v">32 FT MULTI-AXLE</span>
                    </div>
                    <div className="tspec">
                      <span className="tspec-l">DIRECT FARE</span>
                      <span className="tspec-v text-orange">₹1,18,000</span>
                    </div>
                  </div>

                  <div className="term-carrier-card">
                    <div className="carrier-avatar">
                      <Truck size={20} />
                    </div>
                    <div className="carrier-info">
                      <div className="c-name">
                        <span>HR 55 AH 9044</span>
                        <span className="c-tag">SAFE QR CERTIFIED</span>
                      </div>
                      <span className="c-sub">Driver: Harpreet Singh • 4.9 Rating • 120 Trips</span>
                    </div>
                    <button className="c-track-btn" onClick={handleRoleAction}>
                      TRACK GPS
                    </button>
                  </div>

                  <div className="term-telemetry-strip">
                    <span>TELEMETRY: CURRENTLY PASSING JAIPUR BYPASS • 64 KM/H • ON SCHEDULE</span>
                  </div>
                </div>
              )}

              {/* DRIVER VIEW COMPOSITION */}
              {activeRole === 'driver' && (
                <div className="terminal-view-content">
                  <div className="term-subbar">
                    <span>CURRENT CORRIDOR: JAIPUR DROP DOCK</span>
                    <span className="term-orange">● RETURN DEMAND DETECTED</span>
                  </div>

                  <div className="driver-active-trip">
                    <span className="trip-status">UNLOADING IN PROGRESS (EST. 45 MIN)</span>
                    <h3>DELHI → JAIPUR (COMPLETED)</h3>
                    <div className="trip-payout">TRIP SETTLED: ₹31,500 DIRECT TO UPI</div>
                  </div>

                  <div className="driver-recommended-load">
                    <div className="rec-badge">RECOMMENDED IMMEDIATE RETURN</div>
                    <div className="rec-route">
                      <strong>JAIPUR → DELHI (NCR)</strong>
                      <span className="rec-fare">₹29,800</span>
                    </div>
                    <div className="rec-meta">
                      <span>16T CERAMICS & TILES</span>
                      <span>PICKUP 17:00 TODAY</span>
                      <span>22FT CONTAINER</span>
                    </div>
                    <div className="rec-actions">
                      <button className="rec-accept-btn" onClick={handleRoleAction}>
                        LOCK RETURN LOAD ↗
                      </button>
                      <span className="rec-advance">80% ADVANCE (₹23,840) READY FOR TRANSFER</span>
                    </div>
                  </div>

                  <div className="driver-safe-passport">
                    <ShieldCheck size={16} className="text-green" />
                    <span>SAFE QR PASSPORT: DL, RC, PUC & ALL-INDIA PERMIT VALIDATED UNTIL DEC 2026</span>
                  </div>
                </div>
              )}

              {/* FLEET VIEW COMPOSITION */}
              {activeRole === 'fleet' && (
                <div className="terminal-view-content">
                  <div className="term-subbar">
                    <span>FLEET RADAR: 42 REGISTERED CHASSIS</span>
                    <span className="term-green">● 94.2% ACTIVE UTILIZATION</span>
                  </div>

                  <div className="fleet-status-table">
                    <div className="fleet-tr head">
                      <span>UNIT ID</span>
                      <span>CLASS</span>
                      <span>CORRIDOR</span>
                      <span>DUTY STATUS</span>
                      <span>SPEED</span>
                    </div>
                    <div className="fleet-tr">
                      <span className="f-bold">HR 55 AB 2190</span>
                      <span>22FT CONT</span>
                      <span>DEL → JAI</span>
                      <span className="badge-running">EN ROUTE</span>
                      <span>62 KM/H</span>
                    </div>
                    <div className="fleet-tr">
                      <span className="f-bold">MH 12 Q 4402</span>
                      <span>32FT MULTI</span>
                      <span>BOM → ADI</span>
                      <span className="badge-loading">LOADING DOCK</span>
                      <span>0 KM/H</span>
                    </div>
                    <div className="fleet-tr">
                      <span className="f-bold">KA 01 C 9110</span>
                      <span>16T CLOSED</span>
                      <span>BLR → MAA</span>
                      <span className="badge-running">EN ROUTE</span>
                      <span>58 KM/H</span>
                    </div>
                    <div className="fleet-tr">
                      <span className="f-bold">UP 32 ER 3321</span>
                      <span>28FT CONT</span>
                      <span>LKO → DEL</span>
                      <span className="badge-staged">STAGED</span>
                      <span>STANDBY</span>
                    </div>
                  </div>

                  <div className="fleet-mandi-bar">
                    <div className="mandi-item">
                      <span className="m-lbl">FLEET MANDI DISCOUNT</span>
                      <span className="m-val">18% OFF RADIAL TIRES</span>
                    </div>
                    <div className="mandi-item">
                      <span className="m-lbl">BULK FUEL SAVING</span>
                      <span className="m-val">₹2.40 / LITRE CASHBACK</span>
                    </div>
                  </div>
                </div>
              )}

              {/* ENTERPRISE VIEW COMPOSITION */}
              {activeRole === 'enterprise' && (
                <div className="terminal-view-content">
                  <div className="term-subbar">
                    <span>LIVE RFQ: CORP-AUCTION-9482</span>
                    <span className="term-orange">● CLOSING IN 02:14:05</span>
                  </div>

                  <div className="enterprise-rfq-card">
                    <div className="rfq-meta-top">
                      <div>
                        <span className="rfq-lbl">CORRIDOR TENDER</span>
                        <h4 className="rfq-name">MUMBAI → CHENNAI (HIGH VOLUME)</h4>
                      </div>
                      <div className="rfq-bids-count">
                        <span>24 BIDS LOGGED</span>
                      </div>
                    </div>

                    <div className="rfq-numbers">
                      <div>
                        <span className="rfq-num-lbl">MONTHLY VOLUME</span>
                        <span className="rfq-num-val">1,200 TONNES</span>
                      </div>
                      <div>
                        <span className="rfq-num-lbl">BENCHMARK START</span>
                        <span className="rfq-num-val strike">₹92,000 / TRUCK</span>
                      </div>
                      <div>
                        <span className="rfq-num-lbl">CURRENT L1 BEST BID</span>
                        <span className="rfq-num-val orange">₹76,400 / TRUCK</span>
                      </div>
                    </div>

                    <div className="rfq-progress-bar">
                      <div className="rfq-fill" style={{ width: '82%' }} />
                    </div>

                    <div className="rfq-audit-note">
                      <span>✓ 100% TRANSPORTERS PRE-AUDITED FOR ISO 9001 & TAPA SAFETY STANDARDS</span>
                    </div>
                  </div>

                  <div className="enterprise-integration-pills">
                    <span className="int-pill">SAP S/4HANA SYNCED</span>
                    <span className="int-pill">ORACLE SCM READY</span>
                    <span className="int-pill">REST WEBHOOKS ACTIVE</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="story-bottom-rule">
        <span>EVERY USER ROLE POWERED BY SPECIALIZED LOGISTICS ENGINES.</span>
        <span>NEXT: 07 / CENTRAL CONTROL TOWER <b>↓</b></span>
      </div>
    </section>
  );
}
