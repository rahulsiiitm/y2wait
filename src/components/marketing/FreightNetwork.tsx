import { useScrollScene } from './useScrollScene';
import './freight-story.css';

type Listing = { origin?: string; destination?: string; currentLoc?: string; destLoc?: string };
type Props = { loads: Listing[]; trucks: Listing[]; status: 'loading' | 'ready' | 'unavailable' };
const cities = [
  ['DELHI', 280, 145], ['JAIPUR', 220, 215], ['AHMEDABAD', 125, 300],
  ['MUMBAI', 175, 395], ['NAGPUR', 325, 335], ['HYDERABAD', 330, 440],
  ['BENGALURU', 295, 555], ['CHENNAI', 380, 540], ['KOLKATA', 505, 310], ['LUCKNOW', 380, 225],
] as const;
const routes = [
  'M280 145 Q215 155 220 215', 'M220 215 Q145 235 125 300',
  'M125 300 Q125 360 175 395', 'M280 145 Q370 140 380 225',
  'M220 215 Q290 250 325 335', 'M380 225 Q465 230 505 310',
  'M175 395 Q255 365 325 335', 'M325 335 Q355 385 330 440',
  'M175 395 Q195 510 295 555', 'M330 440 Q370 475 380 540',
  'M295 555 Q335 580 380 540', 'M505 310 Q440 395 330 440',
];

export default function FreightNetwork({ loads, trucks, status }: Props) {
  const ref = useScrollScene();
  const corridors = new Set([...loads, ...trucks].flatMap(item => {
    const from = item.origin || item.currentLoc;
    const to = item.destination || item.destLoc;
    return from && to ? [`${from.trim().toLowerCase()}→${to.trim().toLowerCase()}`] : [];
  })).size;
  const count = (value: number) => status === 'ready' ? String(value).padStart(2, '0') : '—';
  return <section className="freight-story network-scene" ref={ref} aria-labelledby="network-title">
    <div className="story-chapter"><span><b>02</b> / THE NETWORK</span><span>ONE COUNTRY. COUNTLESS CONNECTIONS.</span></div>
    <div className="network-layout">
      <div className="network-editorial"><h2 id="network-title">INDIA<br />DOESN’T<br /><em>STOP.</em></h2><p>Neither should your next load.<br />From the first mile to the return journey,<br />keep opportunity moving.</p><span className="story-coordinate">28°36′ N &nbsp; 77°12′ E <i /> CONNECTED BY ROAD</span></div>
      <div className="network-atlas" role="img" aria-label="Schematic freight routes linking Delhi, Jaipur, Ahmedabad, Mumbai, Nagpur, Hyderabad, Bengaluru, Chennai, Kolkata and Lucknow">
        <svg viewBox="0 0 650 680" fill="none" aria-hidden="true">
          <defs><pattern id="freight-grid" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".8" fill="#f5f3ef" opacity=".14" /></pattern></defs>
          <rect width="650" height="680" fill="url(#freight-grid)" />
          <g className="network-survey"><ellipse cx="320" cy="340" rx="270" ry="280" /><ellipse cx="320" cy="340" rx="210" ry="225" /><path d="M30 340H610M320 35V645M80 80L570 600M70 585L570 100" /></g>
          <path className="network-terrain" d="M259 51L305 69L323 111L369 159L438 182L485 193L544 166L586 192L559 239L516 250L501 300L460 347L421 385L396 451L384 527L344 588L310 626L279 583L251 526L227 483L205 430L171 409L134 360L91 335L106 294L143 276L150 232L191 204L215 156L207 118Z" />
          {routes.map((path, index) => <g key={path}><path d={path} className="network-route-base" /><path d={path} data-route={index} pathLength="1" className="network-route-lit" /></g>)}
          {cities.map(([name, x, y]) => <g key={name} className="network-city"><circle cx={x} cy={y} r="10" className="network-city-ring" /><circle cx={x} cy={y} r="3" fill="#DE622B" /><text x={x + 13} y={y - 10}>{name}</text></g>)}
          <text x="46" y="626" className="network-map-note">IND / FREIGHT CORRIDORS</text><text x="46" y="643" className="network-map-note">SCHEMATIC — NOT TO SCALE</text>
        </svg>
      </div>
      <dl className="network-numbers" aria-label="Current marketplace snapshot">
        <div><dt>LOADS LISTED</dt><dd>{count(loads.length)}<span>↗</span></dd></div>
        <div><dt>TRUCKS LISTED</dt><dd>{count(trucks.length)}</dd></div>
        <div><dt>CORRIDORS LISTED</dt><dd>{count(corridors)}</dd></div>
        <p className="network-data-state">{status === 'ready' ? 'MARKETPLACE SNAPSHOT' : status === 'loading' ? 'CONNECTING TO MARKETPLACE' : 'MARKETPLACE DATA UNAVAILABLE'}</p>
      </dl>
    </div>
    <div className="story-bottom-rule"><span>EVERY POINT IS A POSSIBILITY.</span><span>SCROLL TO FOLLOW THE ROAD <b>↓</b></span></div>
  </section>;
}
