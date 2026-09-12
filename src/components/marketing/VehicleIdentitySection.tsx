import { ArrowUpRight, Check } from 'lucide-react';
import { useScrollScene } from './useScrollScene';
import './vehicle-identity.css';

type Props = {
  onVerify: () => void;
};

const VERIFIED_DOCUMENTS = [
  { name: 'RC — Registration Certificate', status: 'VALID', expiry: 'EXP 2031', isExpiring: false },
  { name: 'Commercial Motor Insurance', status: 'VALID', expiry: 'Active Coverage', isExpiring: false },
  { name: 'National All-India Permit', status: 'VALID', expiry: 'Authorised Goods Carrier', isExpiring: false },
  { name: 'PUC — Pollution Under Control', status: 'NOV 2026', expiry: 'Upcoming Renewal', isExpiring: true },
  { name: 'Commercial Driver Licence', status: 'VALID', expiry: 'HMV Class — Active', isExpiring: false }
];

export default function VehicleIdentitySection({ onVerify }: Props) {
  const ref = useScrollScene();

  return (
    <section className="freight-story identity-scene" ref={ref} aria-labelledby="identity-title">

      {/* Lead connector */}
      <div className="identity-lead-transition" aria-hidden="true">
        <div className="identity-transition-rule" />
        <span className="identity-transition-tag">08 ↔ 09 / ENTERPRISE TO FLEET IDENTITY</span>
      </div>

      {/* Chapter stamp + Headline */}
      <div className="story-chapter" style={{ padding: '0 4%', marginBottom: 24 }}>
        <span><b>09</b> / VEHICLE IDENTITY</span>
        <span>DIGITAL FLEET PASSPORT / REAL-TIME CLEARANCE</span>
      </div>

      <div className="identity-head-strip">
        <div>
          <span className="identity-kicker">+ INSTANT COMPLIANCE & SAFETY ASSURANCE</span>
          <h2 id="identity-title">
            TRUST<br />
            <span>TRAVELS TOO.</span>
          </h2>
        </div>
        <div className="identity-meta-desc">
          <p>
            Every Y2Wait network truck carries a unified physical and digital identity.
            Dock masters and shippers verify registration, fitness, permits, and driver
            legitimacy in seconds — no paperwork, no delays.
          </p>
        </div>
      </div>

      {/* ── Main Body: Passport document + Cinematic Truck photo ── */}
      <div className="identity-body">

        {/* Left: Technical Document Passport */}
        <div className="passport-document-col">

          {/* Authority Bar */}
          <div className="passport-doc-authority-bar">
            <div>
              <div className="authority-name">Y2WAIT NATIONAL FLEET PASSPORT</div>
              <div className="authority-sub">Ministry of Road Transport & Highways Standards</div>
            </div>
            <div className="passport-verified-stamp">
              <i aria-hidden="true" />
              VERIFIED
            </div>
          </div>

          {/* Vehicle Plate & ID */}
          <div className="vehicle-plate-block">
            <div className="vehicle-model-chip">
              TATA 1109 · 6-WHEELER CONTAINER
            </div>
            <div className="vehicle-plate-number">MH 12 AB 4582</div>
            <div className="vehicle-system-id">
              Y2WAIT VEHICLE ID: <strong>YT-MH-48291</strong>
            </div>
          </div>

          {/* Documents Verification Table */}
          <div className="passport-docs-table">
            {VERIFIED_DOCUMENTS.map((doc) => (
              <div key={doc.name} className="doc-row">
                <div>
                  <div className="doc-name">{doc.name}</div>
                  <div className="doc-expiry">{doc.expiry}</div>
                </div>
                <div className={`doc-status ${doc.isExpiring ? 'is-expiring' : 'is-valid'}`}>
                  <span className="doc-status-dot" aria-hidden="true" />
                  {doc.status}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <button className="passport-btn-primary" onClick={onVerify}>
            VERIFY ANY VEHICLE <ArrowUpRight size={18} />
          </button>
        </div>

        {/* Right: Cinematic Truck Photo + QR Strip */}
        <div className="passport-visual-col">

          {/* Full-bleed editorial truck photo */}
          <div className="passport-truck-photo">
            <img
              src="/freight-truck-editorial.jpg"
              alt="Y2Wait verified Tata freight truck — Maharashtra registered"
              width="960"
              height="540"
              loading="lazy"
            />

            {/* Technical annotation chips */}
              <div className="truck-annotation-layer" aria-hidden="true">
                <div className="truck-annotation-chip annotation-top-left">
                  <i /> TATA SIGNA / 22 FT CONTAINER
                </div>
                <div className="truck-annotation-chip annotation-top-right">
                  <i /> Y2W FLEET CERTIFIED
                </div>
                <div className="truck-annotation-chip annotation-bottom-left">
                  <Check size={10} style={{ color: '#22c55e' }} />
                  ALL DOCUMENTS VALID
                </div>
              </div>

            {/* Orange number plate bar */}
            <div className="truck-plate-overlay">
              MH 12 AB 4582
              <span>REGISTERED · MAHARASHTRA</span>
            </div>
          </div>

          {/* QR Code + ID pod at bottom */}
          <div className="passport-qr-strip">
            {/* QR Code block */}
            <div className="qr-box" aria-label="Scannable Vehicle QR Code">
              <svg viewBox="0 0 100 100" fill="none">
                <rect width="100" height="100" fill="#090909" />
                {/* Top-Left finder */}
                <rect x="8" y="8" width="26" height="26" fill="#f5f3ef" />
                <rect x="12" y="12" width="18" height="18" fill="#090909" />
                <rect x="16" y="16" width="10" height="10" fill="#de622b" />
                {/* Top-Right finder */}
                <rect x="66" y="8" width="26" height="26" fill="#f5f3ef" />
                <rect x="70" y="12" width="18" height="18" fill="#090909" />
                <rect x="74" y="16" width="10" height="10" fill="#de622b" />
                {/* Bottom-Left finder */}
                <rect x="8" y="66" width="26" height="26" fill="#f5f3ef" />
                <rect x="12" y="70" width="18" height="18" fill="#090909" />
                <rect x="16" y="74" width="10" height="10" fill="#de622b" />
                {/* Data dots */}
                <rect x="40" y="10" width="6" height="6" fill="#f5f3ef" />
                <rect x="50" y="10" width="6" height="6" fill="#f5f3ef" />
                <rect x="60" y="10" width="6" height="6" fill="#de622b" />
                <rect x="40" y="20" width="6" height="6" fill="#de622b" />
                <rect x="56" y="22" width="6" height="6" fill="#f5f3ef" />
                <rect x="10" y="40" width="6" height="6" fill="#f5f3ef" />
                <rect x="20" y="40" width="6" height="6" fill="#de622b" />
                <rect x="30" y="40" width="6" height="6" fill="#f5f3ef" />
                <rect x="40" y="40" width="6" height="6" fill="#f5f3ef" />
                <rect x="50" y="40" width="6" height="6" fill="#f5f3ef" />
                <rect x="60" y="40" width="6" height="6" fill="#de622b" />
                <rect x="70" y="40" width="6" height="6" fill="#f5f3ef" />
                <rect x="84" y="40" width="6" height="6" fill="#f5f3ef" />
                <rect x="10" y="50" width="6" height="6" fill="#de622b" />
                <rect x="26" y="50" width="6" height="6" fill="#f5f3ef" />
                <rect x="46" y="50" width="6" height="6" fill="#f5f3ef" />
                <rect x="60" y="50" width="6" height="6" fill="#f5f3ef" />
                <rect x="76" y="50" width="6" height="6" fill="#de622b" />
                <rect x="40" y="66" width="6" height="6" fill="#f5f3ef" />
                <rect x="54" y="66" width="6" height="6" fill="#de622b" />
                <rect x="68" y="66" width="6" height="6" fill="#f5f3ef" />
                <rect x="82" y="68" width="6" height="6" fill="#f5f3ef" />
                <rect x="40" y="78" width="6" height="6" fill="#de622b" />
                <rect x="54" y="78" width="6" height="6" fill="#f5f3ef" />
                <rect x="66" y="80" width="6" height="6" fill="#f5f3ef" />
                <rect x="80" y="80" width="6" height="6" fill="#f5f3ef" />
              </svg>
            </div>

            <div className="qr-info">
              <div className="qr-info-label">PHYSICAL CABIN SCANNER QR</div>
              <div className="qr-info-id">YT-MH-48291</div>
              <div className="qr-info-sub">Scan to verify documents, driver ID & live location</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer stamp */}
      <div className="identity-foot-stamp">
        <span>SECURITY DOSSIER / TAMPER-PROOF NFC & QR IDENTIFICATION</span>
        <span>VALIDATED AGAINST TRANSPORT DEPARTMENT RECORDS</span>
      </div>
    </section>
  );
}
