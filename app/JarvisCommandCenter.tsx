'use client';

import { useEffect, useState } from 'react';

type Mode = 'STANDBY' | 'SCANNING' | 'READY';

export default function JarvisCommandCenter() {
  const [mode, setMode] = useState<Mode>('STANDBY');
  const [message, setMessage] = useState('Awaiting command input.');
  const [pulse, setPulse] = useState(false);
  const [signal, setSignal] = useState(84);

  useEffect(() => {
    if (mode !== 'SCANNING') return;
    const finish = window.setTimeout(() => {
      setMode('READY');
      setMessage('System scan complete. Portfolio systems are ready.');
      setSignal(98);
    }, 1450);
    return () => window.clearTimeout(finish);
  }, [mode]);

  const runCommand = (nextMessage: string) => {
    setPulse(false);
    window.setTimeout(() => setPulse(true), 20);
    setMessage(nextMessage);
    setSignal(value => Math.min(99, value + 3));
  };

  const scan = () => {
    if (mode === 'SCANNING') return;
    setMode('SCANNING');
    setSignal(61);
    runCommand('Running systems diagnostic...');
  };

  return <div className="jarvis-command" aria-label="Interactive JARVIS-style command center">
    <div className="jarvis-topline"><span>JARVIS LINK / ACTIVE</span><b>NODE 07</b></div>
    <div className="jarvis-stage">
      <div className={`jarvis-radial ${pulse ? 'jarvis-pulse' : ''}`} aria-hidden="true"><i /><i /><i /></div>
      <button className={`jarvis-core ${mode === 'SCANNING' ? 'jarvis-scanning' : ''}`} onClick={scan} aria-label="Run portfolio system scan"><span className="jarvis-core-light" /><strong>CV</strong><small>{mode === 'SCANNING' ? 'SCANNING' : 'CORE ONLINE'}</small></button>
      <div className="jarvis-orbit-data">POWER <b>{signal}.8%</b><br />NETWORK <b>STABLE</b><br />MODE <b>{mode}</b></div>
      <div className="jarvis-robot-arm arm-left" aria-hidden="true"><span /><span /><span /></div>
      <div className="jarvis-robot-arm arm-right" aria-hidden="true"><span /><span /><span /></div>
      <div className="jarvis-crosshair" aria-hidden="true">+</div>
    </div>
    <div className="jarvis-message" role="status"><i />{message}</div>
    <div className="jarvis-command-grid">
      <button onClick={scan} className={mode === 'SCANNING' ? 'active' : ''}><span>01</span><b>{mode === 'SCANNING' ? 'SCANNING...' : 'RUN SYSTEM SCAN'}</b><small>DIAGNOSTICS ↗</small></button>
      <button onClick={() => runCommand('Project signal opened. Smart Drainage and VoltForge are online.')}><span>02</span><b>PROJECT SIGNAL</b><small>OPEN DOSSIER ↗</small></button>
      <button onClick={() => runCommand('Handshake channel ready. Let’s build something useful.')}><span>03</span><b>START HANDSHAKE</b><small>CONTACT LINK ↗</small></button>
    </div>
    <div className="jarvis-meter"><span>PROCESSING</span><b>{signal}%</b><i><em style={{ width: `${signal}%` }} /></i></div>
  </div>;
}
