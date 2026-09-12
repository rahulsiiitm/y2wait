import { ArrowUpRight, MoveRight } from 'lucide-react';
import { useScrollScene } from './useScrollScene';
import './final-cta.css';

type Props = {
  onPost: () => void;
  onFind: () => void;
  onCarriers: () => void;
  onShippers: () => void;
  onEnterprise: () => void;
  onTracking: () => void;
  onAbout: () => void;
  onContact: () => void;
  onPrivacy: () => void;
  onTerms: () => void;
};

export default function FinalCtaFooterSection({
  onPost,
  onFind,
  onCarriers,
  onShippers,
  onEnterprise,
  onTracking,
  onAbout,
  onContact,
  onPrivacy,
  onTerms
}: Props) {
  const ref = useScrollScene();

  return (
    <section className="final-cta-scene" ref={ref} aria-labelledby="cta-title">
      {/* Chapter Marker */}
      <div className="cta-chapter-lead">
        <span><b>11</b> / DIRECT ACTION</span>
        <span>ZERO BROKERAGE • REAL-TIME ALLOCATION</span>
      </div>

      {/* Main Big Editorial Headline */}
      <div className="final-cta-core">
        <span className="final-cta-kicker">+ IMMEDIATE FREIGHT EXECUTION</span>
        <h2 id="cta-title">
          YOUR NEXT LOAD<br />
          SHOULDN’T BE<br />
          <span>A PHONE CALL AWAY.</span>
        </h2>

        {/* Action Buttons: Sharp Rectangles matching Hero */}
        <div className="final-cta-actions">
          <button className="final-cta-primary" onClick={onPost}>
            POST A LOAD <ArrowUpRight size={20} />
          </button>
          <button className="final-cta-secondary" onClick={onFind}>
            FIND FREIGHT <MoveRight size={20} />
          </button>
        </div>
      </div>

      {/* ===================================================
          MINIMAL RESTRAINED FOOTER
          =================================================== */}
      <footer className="minimal-freight-footer" aria-label="Freight Network Directory">
        <div className="footer-nav-grid">
          {/* Brand Col */}
          <div className="footer-brand-col">
            <div>
              <div className="footer-wordmark">
                Y2WAIT<span>.</span>
              </div>
              <div className="footer-tagline">
                INDIA’S FREIGHT & LOGISTICS MATCHMAKING NETWORK
              </div>
            </div>
          </div>

          {/* Product */}
          <div className="footer-link-col">
            <h4>PRODUCT</h4>
            <ul>
              <li>
                <button onClick={onFind}>Find Loads</button>
              </li>
              <li>
                <button onClick={onPost}>Post Load</button>
              </li>
              <li>
                <button onClick={onTracking}>Tracking</button>
              </li>
            </ul>
          </div>

          {/* Solutions */}
          <div className="footer-link-col">
            <h4>SOLUTIONS</h4>
            <ul>
              <li>
                <button onClick={onCarriers}>Carriers</button>
              </li>
              <li>
                <button onClick={onShippers}>Shippers</button>
              </li>
              <li>
                <button onClick={onEnterprise}>Enterprise</button>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="footer-link-col">
            <h4>COMPANY</h4>
            <ul>
              <li>
                <button onClick={onAbout}>About</button>
              </li>
              <li>
                <button onClick={onContact}>Contact</button>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="footer-link-col">
            <h4>LEGAL</h4>
            <ul>
              <li>
                <button onClick={onPrivacy}>Privacy</button>
              </li>
              <li>
                <button onClick={onTerms}>Terms</button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="footer-bottom-bar">
          <span>
            <strong>Y2W / INDIA'S FREIGHT NETWORK</strong>
          </span>
          <span>© 2026 Y2WAIT LOGISTICS TECHNOLOGIES PVT. LTD.</span>
        </div>
      </footer>
    </section>
  );
}
