import { useState } from 'react';
import { ArrowUpRight, MoveRight, Search, ShieldCheck, SlidersHorizontal, Clock } from 'lucide-react';
import { useScrollScene } from './useScrollScene';
import './marketplace.css';

type Props = {
  onPost: () => void;
  onFind: (corridor?: string) => void;
};

interface FreightItem {
  id: string;
  origin: string;
  originCode: string;
  destination: string;
  destCode: string;
  corridor: string;
  distanceKm: number;
  rateTotal: number;
  ratePerKm: number;
  weightTons: number;
  material: string;
  truckType: string;
  pickupTime: string;
  shipper: string;
  verified: boolean;
  tags: string[];
  routeCoords: { from: [number, number]; to: [number, number]; mid: [number, number] };
}

const MARKET_LISTINGS: FreightItem[] = [
  {
    id: 'Y2-901',
    origin: 'DELHI',
    originCode: 'DEL',
    destination: 'JAIPUR',
    destCode: 'JAI',
    corridor: 'NH 48',
    distanceKm: 268,
    rateTotal: 31500,
    ratePerKm: 112,
    weightTons: 12,
    material: 'INDUSTRIAL MACHINERY',
    truckType: '22 FT CONTAINER',
    pickupTime: 'TODAY 16:30',
    shipper: 'TATA AUTOCOMP SYSTEMS',
    verified: true,
    tags: ['INSTANT ADVANCE', 'TOLL INCLUDED'],
    routeCoords: { from: [280, 145], to: [220, 215], mid: [250, 175] }
  },
  {
    id: 'Y2-902',
    origin: 'MUMBAI',
    originCode: 'BOM',
    destination: 'AHMEDABAD',
    destCode: 'ADI',
    corridor: 'NH 48 / EXPRESSWAY',
    distanceKm: 524,
    rateTotal: 58800,
    ratePerKm: 110,
    weightTons: 21,
    material: 'POLYMER GRANULES',
    truckType: '32 FT MULTI-AXLE',
    pickupTime: 'TODAY 19:00',
    shipper: 'RELIANCE PETROCHEM LOGISTICS',
    verified: true,
    tags: ['FAST FASTAG SETTLEMENT', 'RETURN PRIORITY'],
    routeCoords: { from: [175, 395], to: [125, 300], mid: [145, 345] }
  },
  {
    id: 'Y2-903',
    origin: 'BENGALURU',
    originCode: 'BLR',
    destination: 'CHENNAI',
    destCode: 'MAA',
    corridor: 'NH 44 / NH 48',
    distanceKm: 346,
    rateTotal: 39500,
    ratePerKm: 114,
    weightTons: 16,
    material: 'AUTOMOTIVE SPARES',
    truckType: '24 FT CLOSE BODY',
    pickupTime: 'TOMORROW 06:00',
    shipper: 'TVS MOBILITY FREIGHT',
    verified: true,
    tags: ['VERIFIED SHIPPER', 'DOOR PICKUP'],
    routeCoords: { from: [295, 555], to: [380, 540], mid: [335, 550] }
  },
  {
    id: 'Y2-904',
    origin: 'PUNE',
    originCode: 'PNQ',
    destination: 'HYDERABAD',
    destCode: 'HYD',
    corridor: 'NH 65',
    distanceKm: 562,
    rateTotal: 64200,
    ratePerKm: 114,
    weightTons: 25,
    material: 'FABRICATED STEEL',
    truckType: '32 FT OPEN TRAILER',
    pickupTime: 'TODAY 21:30',
    shipper: 'BHARAT FORGE FREIGHT',
    verified: true,
    tags: ['HEAVY HAUL', 'PREMIUM RATE'],
    routeCoords: { from: [185, 415], to: [330, 440], mid: [255, 430] }
  },
  {
    id: 'Y2-905',
    origin: 'DELHI',
    originCode: 'DEL',
    destination: 'LUCKNOW',
    destCode: 'LKO',
    corridor: 'YAMUNA / AGRA EXP',
    distanceKm: 535,
    rateTotal: 56000,
    ratePerKm: 104,
    weightTons: 18,
    material: 'CONSUMER ELECTRONICS',
    truckType: '28 FT CONTAINER',
    pickupTime: 'TOMORROW 09:00',
    shipper: 'HAVEELLS INDIA DISPATCH',
    verified: true,
    tags: ['GPS SEALED', 'SECURE FREIGHT'],
    routeCoords: { from: [280, 145], to: [380, 225], mid: [330, 185] }
  }
];

export default function MarketplaceSection({ onPost, onFind }: Props) {
  const ref = useScrollScene();
  const [selectedId, setSelectedId] = useState<string>('Y2-901');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [trailerFilter, setTrailerFilter] = useState<string>('ALL');
  const [mobileTab, setMobileTab] = useState<'list' | 'radar'>('list');

  const selectedItem = MARKET_LISTINGS.find(item => item.id === selectedId) || MARKET_LISTINGS[0];

  const filteredListings = MARKET_LISTINGS.filter(item => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q ||
      item.origin.toLowerCase().includes(q) ||
      item.destination.toLowerCase().includes(q) ||
      item.material.toLowerCase().includes(q) ||
      item.truckType.toLowerCase().includes(q) ||
      item.corridor.toLowerCase().includes(q);

    const matchesTrailer = trailerFilter === 'ALL' ||
      (trailerFilter === 'CONTAINER' && item.truckType.includes('CONTAINER')) ||
      (trailerFilter === 'MULTI_AXLE' && item.truckType.includes('MULTI-AXLE')) ||
      (trailerFilter === 'OPEN' && item.truckType.includes('OPEN'));

    return matchesSearch && matchesTrailer;
  });

  return (
    <section className="freight-story marketplace-scene" ref={ref} aria-labelledby="marketplace-title">
      {/* Continuous connection line from Section 04 */}
      <div className="marketplace-lead-connector" aria-hidden="true">
        <div className="lead-connector-line" />
        <span className="lead-connector-badge">04 ↔ 05 TRANSITION / LIVE NETWORK ACTIVE</span>
      </div>

      {/* Chapter header */}
      <div className="story-chapter">
        <span><b>05</b> / THE MARKETPLACE</span>
        <span>LIVE FREIGHT FLOOR / INDIA LOGISTICS GRID</span>
      </div>

      {/* Editorial Intro Banner */}
      <div className="marketplace-editorial-head">
        <div className="marketplace-headline-wrap">
          <span className="marketplace-kicker">+ DIRECT OPERATIONAL MATCHMAKING</span>
          <h2 id="marketplace-title">
            FIND THE LOAD.<br />
            <span>TAKE THE ROAD.</span>
          </h2>
        </div>
        <div className="marketplace-editorial-meta">
          <p>
            No hidden brokerage. Direct transporter-to-shipper connection.
            Every load verified with genuine material specifications and guaranteed rates.
          </p>
          <div className="marketplace-quick-actions">
            <button className="market-btn-primary" onClick={() => onFind(selectedItem.origin)}>
              BOOK CORRIDOR FREIGHT <ArrowUpRight size={16} />
            </button>
            <button className="market-btn-secondary" onClick={onPost}>
              LIST A LOAD FOR BID <MoveRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile list / radar switcher */}
      <div className="marketplace-mobile-toggle" role="tablist">
        <button
          className={mobileTab === 'list' ? 'is-active' : ''}
          onClick={() => setMobileTab('list')}
          role="tab"
          aria-selected={mobileTab === 'list'}
        >
          FREIGHT MANIFESTS ({filteredListings.length})
        </button>
        <button
          className={mobileTab === 'radar' ? 'is-active' : ''}
          onClick={() => setMobileTab('radar')}
          role="tab"
          aria-selected={mobileTab === 'radar'}
        >
          CORRIDOR RADAR
        </button>
      </div>

      {/* Main 3-Column Marketplace Architecture */}
      <div className="marketplace-grid">
        {/* LEFT COLUMN: FILTERS & RADAR TELEMETRY */}
        <aside className="marketplace-sidebar">
          <div className="sidebar-group">
            <div className="sidebar-heading">
              <SlidersHorizontal size={13} />
              <span>SEARCH CORRIDORS</span>
            </div>
            <div className="market-search-box">
              <Search size={14} className="search-icon" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Filter by city, material, trailer..."
                aria-label="Filter freight listings"
              />
              {searchQuery && (
                <button className="search-clear" onClick={() => setSearchQuery('')}>×</button>
              )}
            </div>
          </div>

          <div className="sidebar-group">
            <div className="sidebar-heading">
              <span>TRAILER CONFIGURATION</span>
              <span className="sidebar-count">04</span>
            </div>
            <div className="market-filter-chips">
              {[
                { id: 'ALL', label: 'ALL VEHICLES' },
                { id: 'CONTAINER', label: 'CONTAINER' },
                { id: 'MULTI_AXLE', label: 'MULTI-AXLE' },
                { id: 'OPEN', label: 'OPEN TRAILER' }
              ].map(chip => (
                <button
                  key={chip.id}
                  className={`filter-chip ${trailerFilter === chip.id ? 'is-selected' : ''}`}
                  onClick={() => setTrailerFilter(chip.id)}
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>

          <div className="sidebar-telemetry">
            <div className="telemetry-row">
              <span className="telemetry-label">NETWORK LIQUIDITY</span>
              <span className="telemetry-value"><span className="pulse-dot" /> HIGH DEMAND</span>
            </div>
            <div className="telemetry-row">
              <span className="telemetry-label">AVERAGE CORRIDOR INDEX</span>
              <span className="telemetry-value">₹112 / KM</span>
            </div>
            <div className="telemetry-row">
              <span className="telemetry-label">DISPATCH ACCELERATION</span>
              <span className="telemetry-value">94% SAME DAY</span>
            </div>
            <div className="telemetry-row">
              <span className="telemetry-label">COMMISSION CUT</span>
              <span className="telemetry-value highlight">0.0% PURE PROFIT</span>
            </div>
          </div>

          <div className="sidebar-guarantee">
            <ShieldCheck size={18} className="shield-icon" />
            <div>
              <strong>100% VERIFIED TRUCK PASSPORT</strong>
              <p>Every assigned vehicle has checked RC, national permit, and commercial insurance.</p>
            </div>
          </div>
        </aside>

        {/* CENTER COLUMN: EDITORIAL FREIGHT MANIFEST ROWS */}
        <main className={`marketplace-manifests ${mobileTab === 'radar' ? 'mobile-hidden' : ''}`}>
          <div className="manifest-table-header">
            <span>ROUTE & CORRIDOR</span>
            <span>CAPACITY & CARGO</span>
            <span>SETTLEMENT RATE</span>
            <span className="align-right">ACTION</span>
          </div>

          <div className="manifest-rows">
            {filteredListings.length === 0 ? (
              <div className="manifest-empty">
                <span>NO LOADS MATCH YOUR CRITERIA</span>
                <button onClick={() => { setSearchQuery(''); setTrailerFilter('ALL'); }}>
                  RESET ALL FILTERS
                </button>
              </div>
            ) : (
              filteredListings.map(item => {
                const isSelected = item.id === selectedId;
                return (
                  <article
                    key={item.id}
                    className={`manifest-row ${isSelected ? 'is-selected' : ''}`}
                    onClick={() => setSelectedId(item.id)}
                    onMouseEnter={() => setSelectedId(item.id)}
                    tabIndex={0}
                    role="button"
                    aria-selected={isSelected}
                  >
                    <div className="manifest-col-route">
                      <div className="route-cities">
                        <span className="city-name">{item.origin}</span>
                        <MoveRight size={14} className="route-arrow" />
                        <span className="city-name">{item.destination}</span>
                      </div>
                      <div className="route-meta">
                        <span className="corridor-badge">{item.corridor}</span>
                        <span className="corridor-dist">{item.distanceKm} KM</span>
                        <span className="pickup-clock">
                          <Clock size={10} /> {item.pickupTime}
                        </span>
                      </div>
                      <div className="shipper-name">
                        <ShieldCheck size={11} className="verified-check" />
                        <span>{item.shipper}</span>
                      </div>
                    </div>

                    <div className="manifest-col-specs">
                      <div className="spec-item">
                        <span className="spec-val">{item.weightTons}T</span>
                        <span className="spec-label">{item.material}</span>
                      </div>
                      <div className="spec-trailer">
                        <span>{item.truckType}</span>
                      </div>
                      <div className="spec-tags">
                        {item.tags.map(t => (
                          <span key={t} className="manifest-tag">{t}</span>
                        ))}
                      </div>
                    </div>

                    <div className="manifest-col-rate">
                      <div className="rate-amount">
                        ₹{item.rateTotal.toLocaleString('en-IN')}
                      </div>
                      <div className="rate-per-km">
                        ₹{item.ratePerKm} / KM
                      </div>
                      <span className="rate-note">NO BROKERAGE</span>
                    </div>

                    <div className="manifest-col-action">
                      <button
                        className="row-book-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          onFind(`${item.origin} → ${item.destination}`);
                        }}
                      >
                        <span>MATCH</span>
                        <ArrowUpRight size={14} />
                      </button>
                    </div>
                  </article>
                );
              })
            )}
          </div>

          <div className="manifest-footer-bar">
            <span>SHOWING {filteredListings.length} OF {MARKET_LISTINGS.length} ACTIVE DIRECT LOADS</span>
            <span className="live-ticker">● LIVE MONGODB FREIGHT INDEX SYNCED</span>
          </div>
        </main>

        {/* RIGHT COLUMN: CORRIDOR RADAR & ROUTE TELEMETRY */}
        <aside className={`marketplace-radar ${mobileTab === 'list' ? 'mobile-hidden' : ''}`}>
          <div className="radar-header">
            <div>
              <span className="radar-title">CORRIDOR RADAR VIEW</span>
              <span className="radar-sub">{selectedItem.corridor} TELEMETRY</span>
            </div>
            <span className="radar-pulse">● LIVE SCAN</span>
          </div>

          <div className="radar-canvas-wrap">
            <svg viewBox="0 0 360 260" fill="none" className="radar-map-svg" aria-hidden="true">
              <defs>
                <pattern id="radar-grid-sq" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#090909" strokeWidth="0.5" opacity="0.08" />
                </pattern>
              </defs>
              <rect width="360" height="260" fill="url(#radar-grid-sq)" />

              {/* Radar circular sweeps */}
              <circle cx="180" cy="130" r="110" stroke="#090909" strokeWidth="0.6" strokeDasharray="3 4" opacity="0.12" />
              <circle cx="180" cy="130" r="70" stroke="#090909" strokeWidth="0.6" opacity="0.1" />
              <line x1="180" y1="20" x2="180" y2="240" stroke="#090909" strokeWidth="0.5" opacity="0.08" />
              <line x1="30" y1="130" x2="330" y2="130" stroke="#090909" strokeWidth="0.5" opacity="0.08" />

              {/* Active Route Path */}
              <path
                d={`M 60 180 Q 170 70 300 110`}
                className="radar-base-path"
              />
              <path
                d={`M 60 180 Q 170 70 300 110`}
                className="radar-active-path"
              />

              {/* Origin Node */}
              <g className="radar-node origin">
                <circle cx="60" cy="180" r="14" fill="#de622b" fillOpacity="0.12" />
                <circle cx="60" cy="180" r="4" fill="#de622b" />
                <text x="60" y="206" textAnchor="middle" className="radar-node-label">{selectedItem.origin}</text>
                <text x="60" y="218" textAnchor="middle" className="radar-node-sub">PICKUP</text>
              </g>

              {/* Waypoint pulse */}
              <circle cx="170" cy="118" r="3" fill="#090909" opacity="0.5" />
              <circle cx="170" cy="118" r="10" stroke="#de622b" strokeWidth="0.7" opacity="0.6" className="radar-ping" />
              <text x="170" y="105" textAnchor="middle" className="radar-waypoint-text">{selectedItem.corridor}</text>

              {/* Destination Node */}
              <g className="radar-node dest">
                <circle cx="300" cy="110" r="14" fill="#090909" fillOpacity="0.08" />
                <circle cx="300" cy="110" r="4" fill="#090909" />
                <text x="300" y="136" textAnchor="middle" className="radar-node-label">{selectedItem.destination}</text>
                <text x="300" y="148" textAnchor="middle" className="radar-node-sub">DROP</text>
              </g>
            </svg>
          </div>

          <div className="radar-dossier">
            <div className="dossier-headline">
              <h3>{selectedItem.origin} <MoveRight size={15} /> {selectedItem.destination}</h3>
              <span className="dossier-id">{selectedItem.id}</span>
            </div>

            <dl className="dossier-specs">
              <div>
                <dt>TRANSIT ESTIMATE</dt>
                <dd>{Math.round(selectedItem.distanceKm / 48)} HOURS</dd>
              </div>
              <div>
                <dt>CARGO WEIGHT</dt>
                <dd>{selectedItem.weightTons} TONNES</dd>
              </div>
              <div>
                <dt>TRUCK CLASS</dt>
                <dd>{selectedItem.truckType}</dd>
              </div>
              <div>
                <dt>SETTLEMENT</dt>
                <dd className="orange-text">₹{selectedItem.rateTotal.toLocaleString('en-IN')}</dd>
              </div>
            </dl>

            <div className="dossier-shipper-card">
              <span className="card-lbl">VERIFIED CONSIGNOR</span>
              <div className="card-val">{selectedItem.shipper}</div>
              <div className="card-sub">KYC Verified • 48 Successful Dispatches • Zero Disputes</div>
            </div>

            <button
              className="dossier-cta-btn"
              onClick={() => onFind(`${selectedItem.origin} → ${selectedItem.destination}`)}
            >
              ACCEPT THIS MANIFEST <ArrowUpRight size={17} />
            </button>
          </div>
        </aside>
      </div>

      <div className="story-bottom-rule">
        <span>AUTHENTIC INDIAN FREIGHT TRANSACTIONS. NO MEDIATED MARKUPS.</span>
        <span>NEXT: BUILT FOR EVERY PARTICIPANT <b>↓</b></span>
      </div>
    </section>
  );
}
