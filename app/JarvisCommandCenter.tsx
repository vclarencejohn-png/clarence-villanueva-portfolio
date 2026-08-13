'use client';

import { useEffect, useRef, useState } from 'react';

type Mode = 'STANDBY' | 'SCANNING' | 'READY';
type Panel = 'scan' | 'projects' | 'contact' | 'recruiter' | null;

const diagnostics = [
  ['Electronics & IoT', 94],
  ['Technical Support', 96],
  ['Security Systems', 92],
  ['AI-Assisted Development', 88],
];

export default function JarvisCommandCenter() {
  const [mode, setMode] = useState<Mode>('STANDBY');
  const [panel, setPanel] = useState<Panel>(null);
  const [message, setMessage] = useState('Awaiting command input.');
  const [pulse, setPulse] = useState(false);
  const [signal, setSignal] = useState(84);
  const [sequenceStep, setSequenceStep] = useState(0);
  const [copied, setCopied] = useState(false);
  const sequence = useRef(0);

  useEffect(() => {
    if (mode !== 'SCANNING') return;
    const finish = window.setTimeout(() => {
      setMode('READY');
      setMessage('Candidate profile ready. All portfolio systems verified.');
      setSignal(98);
    }, 1450);
    return () => window.clearTimeout(finish);
  }, [mode]);

  const runCommand = (nextMessage: string, nextSignal?: number) => {
    setPulse(false);
    window.requestAnimationFrame(() => setPulse(true));
    setMessage(nextMessage);
    setSignal(value => nextSignal ?? Math.min(99, value + 3));
  };

  const recordCommand = (command: 1 | 2 | 3) => {
    const expected = sequence.current + 1;
    const next = command === expected ? expected : command === 1 ? 1 : 0;
    sequence.current = next;
    setSequenceStep(next);
    if (next !== 3) return false;

    setPanel('recruiter');
    setMode('READY');
    setSignal(99);
    setMessage('Recruiter Mode unlocked. Candidate briefing assembled.');
    return true;
  };

  const scan = () => {
    if (mode === 'SCANNING') return;
    if (recordCommand(1)) return;
    setPanel('scan');
    setMode('SCANNING');
    setSignal(61);
    runCommand('Running candidate systems diagnostic...', 61);
  };

  const openProjects = () => {
    if (recordCommand(2)) return;
    setPanel('projects');
    runCommand('Project signal acquired. Two live systems are online.', 94);
  };

  const openContact = () => {
    if (recordCommand(3)) return;
    setPanel('contact');
    runCommand('Handshake channel ready. Secure contact links opened.', 97);
  };

  const closePanel = () => {
    setPanel(null);
    sequence.current = 0;
    setSequenceStep(0);
    setMessage('Command panel closed. Awaiting input.');
  };

  const copyEmail = () => {
    const email = 'vclarencejohn@gmail.com';
    const fallbackCopy = () => {
      const fallback = document.createElement('textarea');
      fallback.value = email;
      fallback.style.position = 'fixed';
      fallback.style.opacity = '0';
      document.body.appendChild(fallback);
      fallback.select();
      document.execCommand('copy');
      fallback.remove();
    };
    try {
      if (navigator.clipboard?.writeText) navigator.clipboard.writeText(email).catch(fallbackCopy);
      else fallbackCopy();
    } catch {
      fallbackCopy();
    }
    setCopied(true);
    setMessage('Email address copied. Handshake data ready.');
    window.setTimeout(() => setCopied(false), 1800);
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
    <div className="jarvis-sequence" aria-label="Recruiter Mode command sequence">
      <span>RECRUITER MODE</span>
      <div>{[1, 2, 3].map(step => <i key={step} className={sequenceStep >= step ? 'active' : ''}>{String(step).padStart(2, '0')}</i>)}</div>
      <b>{panel === 'recruiter' ? 'UNLOCKED' : 'PRESS 01 → 02 → 03'}</b>
    </div>
    <div className="jarvis-command-grid">
      <button onClick={scan} className={panel === 'scan' || mode === 'SCANNING' ? 'active' : ''}><span>01</span><b>{mode === 'SCANNING' ? 'SCANNING...' : 'RUN SYSTEM SCAN'}</b><small>DIAGNOSTICS ↗</small></button>
      <button onClick={openProjects} className={panel === 'projects' ? 'active' : ''}><span>02</span><b>PROJECT SIGNAL</b><small>OPEN DOSSIER ↗</small></button>
      <button onClick={openContact} className={panel === 'contact' ? 'active' : ''}><span>03</span><b>START HANDSHAKE</b><small>CONTACT LINK ↗</small></button>
    </div>
    <div className="jarvis-meter"><span>PROCESSING</span><b>{signal}%</b><i><em style={{ width: `${signal}%` }} /></i></div>

    {panel && <section className={`jarvis-dossier dossier-${panel}`} aria-label={`${panel} command panel`}>
      <header><div><small>JARVIS / ACTIVE MODULE</small><b>{panel === 'scan' ? 'CANDIDATE DIAGNOSTIC' : panel === 'projects' ? 'PROJECT SIGNALS' : panel === 'contact' ? 'HANDSHAKE CHANNEL' : 'RECRUITER MODE'}</b></div><button onClick={closePanel} aria-label="Close command panel">×</button></header>

      {panel === 'scan' && <div className="diagnostic-panel">
        <div className={`diagnostic-score ${mode === 'SCANNING' ? 'loading' : ''}`}><strong>{mode === 'SCANNING' ? '...' : '98%'}</strong><span>CANDIDATE READINESS</span></div>
        <div className="diagnostic-lines">{diagnostics.map(([name, score], index) => <div key={name as string} style={{ animationDelay: `${index * 120}ms` }}><span>{name}</span><i><em style={{ width: mode === 'SCANNING' ? '18%' : `${score}%` }} /></i><b>{mode === 'SCANNING' ? 'SCAN' : `${score}%`}</b></div>)}</div>
        <a className="dossier-action" href="/clarence-villanueva-resume.pdf" download>Download verified resume <b>↓</b></a>
      </div>}

      {panel === 'projects' && <div className="project-signals">
        <a href="https://smart-drainage-4z2l.vercel.app/" target="_blank" rel="noreferrer"><span><i />01 / LIVE SYSTEM</span><b>Smart Drainage</b><small>IoT monitoring, simulated events, alerts, and multi-unit status.</small><em>OPEN LIVE DEMO ↗</em></a>
        <a href="https://voltforge-gray.vercel.app" target="_blank" rel="noreferrer"><span><i />02 / LIVE SYSTEM</span><b>VoltForge</b><small>Electronics learning, engineering tools, simulation, and responsible AI.</small><em>OPEN WORKSPACE ↗</em></a>
      </div>}

      {panel === 'contact' && <div className="handshake-panel">
        <div className="handshake-status"><i /><span><b>AVAILABLE FOR OPPORTUNITIES</b>Remote, hybrid, and on-site roles</span></div>
        <div className="handshake-grid">
          <a href="mailto:vclarencejohn@gmail.com"><span>EMAIL CHANNEL</span><b>Send an email ↗</b></a>
          <a href="https://www.linkedin.com/in/clarence-john-villanueva-14b332350/" target="_blank" rel="noreferrer"><span>LINKEDIN</span><b>Open profile ↗</b></a>
          <a href="https://github.com/vclarencejohn-png" target="_blank" rel="noreferrer"><span>GITHUB</span><b>View repositories ↗</b></a>
          <button onClick={copyEmail}><span>QUICK ACTION</span><b>{copied ? 'Email copied ✓' : 'Copy email address'}</b></button>
        </div>
      </div>}

      {panel === 'recruiter' && <div className="recruiter-panel">
        <div className="recruiter-intro"><span>60-SECOND CANDIDATE BRIEF</span><h3>Clarence Villanueva</h3><p>Academically complete Electronics Engineering graduate combining hands-on technical support, IoT systems, customer service, and AI-assisted development.</p></div>
        <div className="recruiter-facts"><article><span>EDUCATION</span><b>BSECE · Batch 2026</b></article><article><span>RECENT EXPERIENCE</span><b>240-hour MTECH internship</b></article><article><span>PROOF OF WORK</span><b>2 live technical projects</b></article><article><span>AVAILABILITY</span><b>Remote · Hybrid · On-site</b></article></div>
        <div className="recruiter-skills"><span>Electronics</span><span>Technical Support</span><span>IoT</span><span>Networking</span><span>Security Systems</span><span>AI-Assisted Development</span></div>
        <div className="recruiter-actions"><a href="/clarence-villanueva-resume.pdf" download>Download resume ↓</a><a href="#projects">View projects ↗</a><a href="mailto:vclarencejohn@gmail.com">Contact Clarence ↗</a></div>
      </div>}
    </section>}
  </div>;
}
