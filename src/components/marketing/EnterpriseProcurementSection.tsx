import { useState, useEffect } from 'react';
import { ArrowUpRight, MoveRight, Clock, TrendingDown } from 'lucide-react';
import { useScrollScene } from './useScrollScene';
import './enterprise.css';

type Props = {
  onProcure: () => void;
  onExplore: () => void;
};

interface BidItem {
  rank: string;
  bidder: string;
  fleet: string;
  quoteFormatted: string;
  quoteValue: number;
  delta: string;
  timeAgo: string;
  isBest?: boolean;
}

const BID_HISTORY: BidItem[] = [
  {
    rank: '01',
    bidder: 'TCI FREIGHT NETWORK',
    fleet: '40 FT MULTI-AXLE (14 TRUCKS)',
    quoteFormatted: '₹4,18,000',
    quoteValue: 418000,
    delta: '-₹62,000 (-12.9%)',
    timeAgo: '2 MIN AGO',
    isBest: true
  },
  {
    rank: '02',
    bidder: 'CJ DARCL LOGISTICS',
    fleet: '32 FT CONTAINER (10 TRUCKS)',
    quoteFormatted: '₹4,31,000',
    quoteValue: 431000,
    delta: '-₹49,000 (-10.2%)',
    timeAgo: '18 MIN AGO'
  },
  {
    rank: '03',
    bidder: 'VRL LOGISTICS CONSORTIUM',
    fleet: '32 FT TRAILER (12 TRUCKS)',
    quoteFormatted: '₹4,52,000',
    quoteValue: 452000,
    delta: '-₹28,000 (-5.8%)',
    timeAgo: '42 MIN AGO'
  },
  {
    rank: '04',
    bidder: 'MAHESHWARI BULK CARRIERS',
    fleet: 'MULTI-AXLE TRAILER (8 TRUCKS)',
    quoteFormatted: '₹4,80,000',
    quoteValue: 480000,
    delta: 'BASE CEILING',
    timeAgo: '1 HR AGO'
  }
];

export default function EnterpriseProcurementSection({ onProcure, onExplore }: Props) {
  const ref = useScrollScene();

  // Active countdown timer: decrements subtly every second
  const [secondsRemaining, setSecondsRemaining] = useState(2 * 3600 + 41 * 60 + 18); // 02:41:18

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTimer = (totalSecs: number) => {
    const hours = Math.floor(totalSecs / 3600);
    const minutes = Math.floor((totalSecs % 3600) / 60);
    const seconds = totalSecs % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <section className="freight-story enterprise-scene" ref={ref} aria-labelledby="enterprise-title">
      {/* Visual rhythm connector from Section 07 */}
      <div className="enterprise-lead-transition" aria-hidden="true">
        <div className="enterprise-transition-rule" />
        <span className="enterprise-transition-tag">07 ↔ 08 / CONTROL TOWER TO ENTERPRISE SCALE</span>
      </div>

      {/* Chapter header */}
      <div className="story-chapter">
        <span><b>08</b> / ENTERPRISE PROCUREMENT</span>
        <span>ILLUSTRATIVE RFQ / SAMPLE CONTRACT AUCTION</span>
      </div>

      {/* Editorial Headline Header */}
      <div className="enterprise-head">
        <div>
          <span className="enterprise-kicker">+ INDUSTRIAL SCALE PROCUREMENT</span>
          <h2 id="enterprise-title">
            MOVE<br />
            <span>AT SCALE.</span>
          </h2>
        </div>
        <div className="enterprise-meta-desc">
          <p>
            For manufacturers, plant operators, and bulk shippers. Consolidate annual corridors,
            run automated reverse-auctions, and secure committed transporter capacity at benchmark freight rates.
          </p>
        </div>
      </div>

      {/* Main Terminal Grid */}
      <div className="enterprise-terminal-grid">
        {/* Left: Primary Dossier + Trajectory Visualizer + Order Book */}
        <div className="rfq-primary-dossier">
          {/* Top Primary RFQ Specs Strip */}
          <dl className="rfq-header-strip">
            <div>
              <dt>IDENTIFIER</dt>
              <dd>RFQ Y2-48291</dd>
            </div>
            <div>
              <dt>COMMITTED CORRIDOR</dt>
              <dd className="rfq-route-cities">
                PUNE <MoveRight size={16} aria-hidden="true" /> CHENNAI
              </dd>
            </div>
            <div>
              <dt>VOLUME ALLOCATION</dt>
              <dd>120 T / WEEK</dd>
            </div>
            <div>
              <dt>MATERIAL SPECIFICATION</dt>
              <dd>STEEL COMPONENTS</dd>
            </div>
          </dl>

          {/* Price Trajectory Downward Step Curve */}
          <div className="bid-trajectory-box">
            <div className="trajectory-meta-bar">
              <span className="trajectory-title">
                PRICE DISCOVERY TRAJECTORY / DESCENDING REVERSE-AUCTION
              </span>
              <span className="trajectory-delta">
                <TrendingDown size={12} style={{ display: 'inline', marginRight: 4 }} />
                -₹62,000 SAVINGS VS BASE
              </span>
            </div>

            {/* Downward staircase visualization */}
            <div className="trajectory-steps-flow">
              {/* Step 1: Base Ceiling */}
              <div className="trajectory-step-col">
                <span className="step-label">STAGE 01 / INITIAL</span>
                <span className="step-bidder">MAHESHWARI CARRIERS</span>
                <div className="step-bar-wrap">
                  <div className="step-bar" style={{ height: 130 }} />
                </div>
                <div className="step-price-tag">₹4.80L</div>
              </div>

              {/* Step 2: Intermediate */}
              <div className="trajectory-step-col">
                <span className="step-label">STAGE 02 / REVISED</span>
                <span className="step-bidder">VRL LOGISTICS</span>
                <div className="step-bar-wrap">
                  <div className="step-bar" style={{ height: 105 }} />
                </div>
                <div className="step-price-tag">₹4.52L</div>
              </div>

              {/* Step 3: Tightening */}
              <div className="trajectory-step-col">
                <span className="step-label">STAGE 03 / TIGHT</span>
                <span className="step-bidder">CJ DARCL TRANSWAYS</span>
                <div className="step-bar-wrap">
                  <div className="step-bar" style={{ height: 75 }} />
                </div>
                <div className="step-price-tag">₹4.31L</div>
              </div>

              {/* Step 4: Active Best Bid */}
              <div className="trajectory-step-col is-active-bid">
                <span className="step-label" style={{ color: '#de622b', fontWeight: 700 }}>
                  STAGE 04 / ACTIVE
                </span>
                <span className="step-bidder">TCI FREIGHT NETWORK</span>
                <div className="step-bar-wrap">
                  <div className="step-bar" style={{ height: 45 }} />
                </div>
                <div className="step-price-tag">₹4.18L</div>
                <span className="step-badge">BEST BID</span>
              </div>
            </div>
          </div>

          {/* Depth / Order Book Table */}
          <div className="rfq-orderbook-box">
            <div className="orderbook-head-row">
              <div>RANK</div>
              <div>BIDDER CONSORTIUM</div>
              <div>DEDICATED FLEET</div>
              <div>QUOTE / TRIP</div>
              <div style={{ textAlign: 'right' }}>DELTA & TIME</div>
            </div>

            {BID_HISTORY.map((bid) => (
              <div key={bid.rank} className={`orderbook-row ${bid.isBest ? 'is-winning' : ''}`}>
                <div className="row-rank">{bid.rank}</div>
                <div>
                  <div className="row-bidder">{bid.bidder}</div>
                  {bid.isBest && (
                    <span style={{ fontSize: 8, color: '#de622b', letterSpacing: 0.8, fontWeight: 700 }}>
                      CURRENT LEADING BID
                    </span>
                  )}
                </div>
                <div className="row-fleet">{bid.fleet}</div>
                <div className="row-quote">{bid.quoteFormatted}</div>
                <div className="row-meta">
                  <div style={{ color: bid.isBest ? '#de622b' : '#737069', fontWeight: 600 }}>{bid.delta}</div>
                  <div style={{ fontSize: 8, color: '#8c8880' }}>{bid.timeAgo}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Rail: Telemetry & Actions */}
        <div className="rfq-terminal-sidebar">
          {/* Live countdown */}
          <div className="terminal-timer-card">
            <span className="timer-kicker">
              <Clock size={11} style={{ display: 'inline', marginRight: 4 }} />
              AUCTION CLOSES IN
            </span>
            <div className="timer-digits">{formatTimer(secondsRemaining)}</div>
            <div className="timer-subline">Automated allocation upon closure</div>
          </div>

          {/* Best Bid Callout */}
          <div className="terminal-bestbid-card">
            <span className="bestbid-label">BEST ACTIVE BID</span>
            <div className="bestbid-amount">
              ₹4,18,000<span>*</span>
            </div>
            <div className="bestbid-metrics">
              <div>
                <span>ACTIVE BIDS</span>
                <br />
                <strong>18 PARTICIPANTS</strong>
              </div>
              <div>
                <span>BASE RATE</span>
                <br />
                <strong style={{ textDecoration: 'line-through' }}>₹4,80,000</strong>
              </div>
            </div>
          </div>

          {/* Enterprise Procurement Metrics */}
          <div style={{ borderBottom: '1px solid #09090915', paddingBottom: 16 }}>
            <span style={{ fontSize: 7, letterSpacing: 1.2, fontWeight: 700, color: '#8c8880', textTransform: 'uppercase' }}>
              PROCUREMENT PARAMETERS
            </span>
            <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 8, fontSize: 10, color: '#615e58' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Contract Type:</span>
                <strong style={{ color: '#090909' }}>Annual Committed Volume</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Trip Frequency:</span>
                <strong style={{ color: '#090909' }}>10 Trucks / Week</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Transit SLA:</span>
                <strong style={{ color: '#090909' }}>48 Hours Max</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Payment Terms:</span>
                <strong style={{ color: '#090909' }}>T+7 Escrow Direct</strong>
              </div>
            </div>
          </div>

          {/* Sharp action CTAs consistent with Hero */}
          <div className="terminal-actions">
            <button className="terminal-btn-primary" onClick={onProcure}>
              OPEN ENTERPRISE RFQ <ArrowUpRight size={18} />
            </button>
            <button className="terminal-btn-secondary" onClick={onExplore}>
              VIEW FREIGHT CONTRACTS <MoveRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Footer stamp */}
      <div className="enterprise-foot-stamp">
        <span>Y2WAIT ENTERPRISE PROTOCOL / SAMPLE REVERSE-AUCTION TERMINAL</span>
        <span>AUDITED ESCROW SETTLEMENT • ZERO BROKER MARGINS</span>
      </div>
    </section>
  );
}
