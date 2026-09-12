import { useEffect, useRef } from 'react';

/** Writes transient scroll values directly to the scene, not through React renders. */
export function useScrollScene(mode: 'passing' | 'sticky' = 'passing') {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let visible = true;
    const render = () => {
      frame = 0;
      const box = element.getBoundingClientRect();
      const height = window.innerHeight;
      const raw = mode === 'sticky'
        ? (74 - box.top) / Math.max(1, box.height - height + 74)
        : (height * .85 - box.top) / Math.max(1, box.height * .85);
      const progress = media.matches ? 1 : Math.max(0, Math.min(1, raw));
      element.style.setProperty('--progress', String(progress));
      element.style.setProperty('--travel', `${(progress - .5) * 60}px`);
      element.dataset.stage = progress < .28 ? 'searching' : progress < .68 ? 'connecting' : 'matched';
      element.dataset.reducedMotion = String(media.matches);
      element.querySelectorAll<SVGPathElement>('[data-route]').forEach((route, index) => {
        const amount = Math.max(0, Math.min(1, progress * 2.8 - index * .19));
        route.style.strokeDashoffset = String(1 - amount);
      });
      element.querySelectorAll<HTMLElement>('[data-reveal]').forEach((line, index) => {
        const amount = Math.max(0, Math.min(1, progress * 3.2 - index * .52));
        line.style.setProperty('--reveal', String(amount));
      });
    };
    const schedule = () => { if (visible && !frame) frame = requestAnimationFrame(render); };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) schedule();
    }, { rootMargin: '100px' });
    observer.observe(element);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    media.addEventListener('change', render);
    render();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      media.removeEventListener('change', render);
    };
  }, [mode]);
  return ref;
}
