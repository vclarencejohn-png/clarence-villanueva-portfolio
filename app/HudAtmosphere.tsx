'use client';

import { useEffect } from 'react';

const particles = [
  [8, 18, 0], [17, 42, 1.8], [26, 12, 3.2], [34, 76, 2.4],
  [44, 24, 4.2], [52, 64, 1.2], [61, 14, 5], [68, 82, 2.8],
  [77, 28, 4.6], [86, 56, 1.6], [93, 16, 3.7], [12, 87, 5.4],
  [39, 45, 6.1], [58, 40, 3.6], [72, 68, 0.8], [89, 90, 4.8],
];

export default function HudAtmosphere() {
  useEffect(() => {
    let frame = 0;
    const onPointerMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const x = ((event.clientX / window.innerWidth) - 0.5) * 18;
        const y = ((event.clientY / window.innerHeight) - 0.5) * 12;
        document.documentElement.style.setProperty('--hud-parallax-x', `${x.toFixed(2)}px`);
        document.documentElement.style.setProperty('--hud-parallax-y', `${y.toFixed(2)}px`);
      });
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, []);

  return (
    <div className="hud-atmosphere" aria-hidden="true">
      <div className="hud-grid" />
      <div className="hud-vignette" />
      <div className="hud-orbit hud-orbit-a" />
      <div className="hud-orbit hud-orbit-b" />
      <div className="hud-radar hud-radar-left"><i /><b>01 / SIGNAL</b></div>
      <div className="hud-radar hud-radar-right"><i /><b>07 / NODE</b></div>
      <div className="hud-trace hud-trace-a"><i /><i /><i /></div>
      <div className="hud-trace hud-trace-b"><i /><i /><i /></div>
      <div className="hud-readout hud-readout-left"><span>LIVE TELEMETRY</span><b>LINK 98.4%</b><i /></div>
      <div className="hud-readout hud-readout-right"><span>ENVIRONMENT</span><b>STABLE / 26°C</b><i /></div>
      <div className="hud-particles">
        {particles.map(([left, top, delay], index) => (
          <i key={index} style={{ left: `${left}%`, top: `${top}%`, animationDelay: `-${delay}s` }} />
        ))}
      </div>
    </div>
  );
}
