import { useEffect, useRef } from 'react';
import { ArrowDown, ArrowUpRight, MoveRight } from 'lucide-react';
import './marketing.css';

type Props = { onPost: () => void; onFind: () => void };

export default function FreightHero({ onPost, onFind }: Props) {
  const scene = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = scene.current;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!el) return;
    let frame = 0;
    const move = (event: PointerEvent) => {
      if (motion.matches || event.pointerType !== 'mouse') return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        el.style.setProperty('--scene-x', `${(event.clientX / rect.width - .5) * -10}px`);
        el.style.setProperty('--scene-y', `${(event.clientY / rect.height - .5) * -6}px`);
      });
    };
    const reset = () => { cancelAnimationFrame(frame); el.style.setProperty('--scene-x', '0px'); el.style.setProperty('--scene-y', '0px'); };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', reset);
    motion.addEventListener('change', reset);
    return () => { cancelAnimationFrame(frame); el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', reset); motion.removeEventListener('change', reset); };
  }, []);

  return (
    <section className="freight-hero" ref={scene} aria-labelledby="freight-title">
      <picture className="freight-scene">
        <source media="(max-width: 640px)" srcSet="/freight-hero-960.webp" />
        <img src="/freight-hero-1920.webp" width="1672" height="941" fetchPriority="high" alt="A container truck travelling along an open highway at dusk" />
      </picture>
      <div className="freight-shade" />
      <div className="freight-intro"><span className="freight-cross">+</span> BUILT FOR THE LONG HAUL <span className="freight-edition">INDIA / EST. IN MOTION</span></div>
      <div className="freight-title-wrap">
        <h1 id="freight-title">MOVE.<br /><span>DON’T WAIT.</span></h1>
        <div className="freight-caption"><span className="freight-tick" /> A FULL TRUCK. AN OPEN ROAD. A BETTER WAY.</div>
      </div>
      <div className="freight-route" aria-label="Illustrative freight corridor from Delhi to Jaipur">
        <span className="freight-micro">THE ROAD AHEAD <span>01 / NH 48</span></span>
        <div className="freight-cities"><span>DELHI</span><MoveRight size={25} strokeWidth={1} /><span>JAIPUR</span></div>
        <svg viewBox="0 0 280 42" fill="none" aria-hidden="true"><path d="M5 28H78L109 10H191L224 28H275" stroke="currentColor" opacity=".25" /><path className="freight-route-path" d="M5 28H78L109 10H191L224 28H275" stroke="#DE622B" strokeWidth="2" /><circle cx="5" cy="28" r="4" fill="#DE622B" /><circle cx="275" cy="28" r="4" fill="#DE622B" /></svg>
        <div className="freight-route-foot"><span>LOAD <span className="freight-orange">↔</span> TRUCK</span><span>ILLUSTRATIVE CORRIDOR</span></div>
      </div>
      <div className="freight-bottom">
        <p>India’s freight network,<br /><span>without the waiting.</span></p>
        <div className="freight-actions"><button className="freight-primary" onClick={onPost}>POST A LOAD <ArrowUpRight size={21} /></button><button className="freight-secondary" onClick={onFind}>FIND LOADS <MoveRight size={21} /></button></div>
        <button className="freight-explore" onClick={onFind} aria-label="Explore the freight marketplace"><span>LESS IDLE.<br />MORE MILES.</span><ArrowDown size={21} /></button>
      </div>
      <div className="freight-index"><span>CONNECTING AMBITION TO EVERY MILE.</span><span>Y2W — INDIA’S FREIGHT NETWORK <span className="freight-orange">↗</span></span></div>
    </section>
  );
}
