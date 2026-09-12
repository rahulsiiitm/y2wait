import { useScrollScene } from './useScrollScene';
import './cinematic.css';

export default function CinematicBreakSection() {
  const ref = useScrollScene();

  return (
    <section className="cinematic-break-scene" ref={ref} aria-labelledby="cinematic-title">
      {/* Full bleed cinematic backdrop with slow parallax */}
      <picture className="cinematic-backdrop" aria-hidden="true">
        <source media="(max-width: 640px)" srcSet="/freight-night-960.webp" />
        <img
          src="/freight-night-1920.webp"
          alt="Night freight corridor across India"
          width="1920"
          height="1080"
          loading="lazy"
        />
      </picture>

      {/* Vignette atmosphere */}
      <div className="cinematic-film-shade" aria-hidden="true" />

      {/* Single Orange Route Line Travelling Across Frame */}
      <div className="cinematic-route-thread" aria-hidden="true">
        <svg viewBox="0 0 1200 60" fill="none" preserveAspectRatio="none">
          <path d="M0 30 Q 300 10, 600 35 T 1200 25" className="cinematic-lead-wire" />
          <path d="M0 30 Q 300 10, 600 35 T 1200 25" className="cinematic-active-pulse" />
        </svg>
      </div>

      {/* Top minimal stamp */}
      <div className="cinematic-top-stamp">
        <span><b>10</b> / INTERLUDE</span>
        <span>THE ROAD NEVER SLEEPS</span>
      </div>

      {/* Giant Film Headline */}
      <div className="cinematic-title-wrap">
        <span className="cinematic-kicker">+ HIGHWAY FREIGHT CORRIDOR</span>
        <h2 id="cinematic-title">
          EVERY ROAD<br />
          <span>BECOMES AN</span><br />
          OPPORTUNITY.
        </h2>
      </div>

      {/* Bottom Atmosphere Bar */}
      <div className="cinematic-bottom-bar">
        <div className="cinematic-subline">
          LESS IDLE. <span>MORE MILES.</span>
        </div>
        <div className="cinematic-telemetry">
          <span>28.6139° N, 77.2090° E</span> • <span>NH 48 / NH 44 ARTERIAL NETWORK</span>
        </div>
      </div>
    </section>
  );
}
