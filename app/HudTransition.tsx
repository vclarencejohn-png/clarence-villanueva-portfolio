'use client';

import { useEffect, useRef, useState } from 'react';

export default function HudTransition() {
  const [active, setActive] = useState(false);
  const [label, setLabel] = useState('ROUTING COMMAND');
  const timer = useRef<number | null>(null);

  useEffect(() => {
    const activate = (nextLabel: string) => {
      if (timer.current) window.clearTimeout(timer.current);
      setActive(false);
      setLabel(nextLabel || 'ROUTING COMMAND');
      window.requestAnimationFrame(() => setActive(true));
      timer.current = window.setTimeout(() => setActive(false), 760);
    };

    const onClick = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      const control = target?.closest('a, button') as HTMLAnchorElement | HTMLButtonElement | null;
      if (!control || control.hasAttribute('disabled')) return;

      const nextLabel = (control.getAttribute('aria-label') || control.textContent || 'ROUTING COMMAND')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 34)
        .toUpperCase();

      if (control instanceof HTMLAnchorElement) {
        const url = new URL(control.href, window.location.href);
        const isSamePageHash = url.origin === window.location.origin && url.pathname === window.location.pathname && Boolean(url.hash);
        if (isSamePageHash && control.target !== '_blank') {
          event.preventDefault();
          activate(nextLabel);
          const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          window.setTimeout(() => {
            const destination = document.querySelector(url.hash);
            if (destination) destination.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
            window.history.replaceState(null, '', url.hash);
          }, reducedMotion ? 0 : 430);
          return;
        }
      }

      activate(nextLabel);
    };

    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('click', onClick);
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  return (
    <div className={`hud-transition${active ? ' is-active' : ''}`} aria-hidden="true">
      <div className="hud-transition-flash" />
      <div className="hud-burst">
        <i /><i /><i /><i /><i /><i /><i /><i />
        <span /><span /><span />
      </div>
      <div className="hud-transition-copy"><small>JARVIS / COMMAND ROUTE</small><b>{label}</b></div>
    </div>
  );
}
