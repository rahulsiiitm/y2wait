import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import './marketing.css';

type Props = {
  loggedIn: boolean;
  onHome: () => void;
  onFind: () => void;
  onCarriers: () => void;
  onShippers: () => void;
  onEnterprise: () => void;
  onSolutions: () => void;
  onSignIn: () => void;
  onStart: () => void;
};

export default function MarketingNav(props: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const scroll = () => setScrolled(window.scrollY > 28);
    scroll();
    window.addEventListener('scroll', scroll, { passive: true });
    return () => window.removeEventListener('scroll', scroll);
  }, []);
  useEffect(() => {
    if (!open) return;
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') { setOpen(false); toggle.current?.focus(); } };
    const closeDesktop = () => { if (window.innerWidth > 1080) setOpen(false); };
    window.addEventListener('keydown', escape);
    window.addEventListener('resize', closeDesktop);
    return () => { window.removeEventListener('keydown', escape); window.removeEventListener('resize', closeDesktop); };
  }, [open]);
  const links = [['Find loads', props.onFind], ['For carriers', props.onCarriers], ['For shippers', props.onShippers], ['Enterprise', props.onEnterprise], ['Solutions', props.onSolutions]] as const;
  const activate = (action: () => void) => { setOpen(false); action(); };
  return <header className={`marketing-nav${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}>
    <a className="marketing-skip" href="#freight-title">Skip to content</a>
    <button className="marketing-logo" onClick={props.onHome} aria-label="Y2Wait home">y2wait<span>↗</span></button>
    <nav className="marketing-desktop" aria-label="Main navigation">{links.map(([label, action]) => <button key={label} onClick={action}>{label}</button>)}</nav>
    <div className="marketing-account"><button className="marketing-signin" onClick={props.onSignIn}>{props.loggedIn ? 'Dashboard' : 'Sign in'}</button><button className="marketing-start" onClick={props.onStart}>{props.loggedIn ? 'MY ACCOUNT' : 'GET STARTED'}<ArrowUpRight size={17} /></button><button ref={toggle} className="marketing-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="marketing-mobile" aria-label={open ? 'Close navigation' : 'Open navigation'}>{open ? <X /> : <Menu />}</button></div>
    {open && <nav id="marketing-mobile" className="marketing-mobile" aria-label="Mobile navigation">{links.map(([label, action], i) => <button key={label} onClick={() => activate(action)}><span>0{i + 1}</span>{label}<ArrowUpRight size={20} /></button>)}<button onClick={() => activate(props.onSignIn)}><span>06</span>{props.loggedIn ? 'Dashboard' : 'Sign in'}<ArrowUpRight size={20} /></button></nav>}
  </header>;
}
