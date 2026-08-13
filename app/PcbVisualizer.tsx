'use client';

import { useEffect, useRef, useState } from 'react';

type Stage = 0 | 1 | 2;
type Light = 'lab' | 'studio' | 'dark';

const stageLabels = ['Bare Board', 'Solder Components', 'Fully Assembled'];
const components = [
  { id: 'mcu', label: 'ESP32 MCU', x: 0.48, y: 0.43, color: '#66f6df', pin: 'GPIO 18 · 3V3 · GND' },
  { id: 'sensor', label: 'Sensor Module', x: 0.25, y: 0.33, color: '#ffd166', pin: 'VIN · SDA · SCL' },
  { id: 'headers', label: 'I/O Headers', x: 0.75, y: 0.64, color: '#f8fafc', pin: 'GPIO 0–16 · UART' },
  { id: 'leds', label: 'Status LEDs', x: 0.72, y: 0.28, color: '#ff5d76', pin: 'PWR · LINK · ALERT' },
];

export default function PcbVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number | null>(null);
  const [stage, setStage] = useState<Stage>(2);
  const [light, setLight] = useState<Light>('lab');
  const [explode, setExplode] = useState(false);
  const [showPins, setShowPins] = useState(true);
  const [visible, setVisible] = useState<Record<string, boolean>>({ mcu: true, sensor: true, headers: true, leds: true });
  const [rotation, setRotation] = useState({ x: -0.15, y: 0.3 });
  const [zoom, setZoom] = useState(1);
  const drag = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const draw = (time: number) => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(320, rect.width);
      const height = Math.max(320, rect.height);
      if (canvas.width !== width * dpr || canvas.height !== height * dpr) { canvas.width = width * dpr; canvas.height = height * dpr; }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const bg = light === 'dark' ? '#050b14' : light === 'studio' ? '#172130' : '#0b1824';
      ctx.fillStyle = bg; ctx.fillRect(0, 0, width, height);
      ctx.strokeStyle = light === 'dark' ? '#172c3d' : '#24485a'; ctx.globalAlpha = 0.45; ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 32) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke(); }
      for (let y = 0; y < height; y += 32) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke(); }
      ctx.globalAlpha = 1;
      const cx = width / 2, cy = height / 2 + 14, scale = Math.min(width, height) * 0.66 * zoom;
      const skewX = Math.sin(rotation.y) * scale * 0.08, skewY = Math.sin(rotation.x) * scale * 0.07;
      const boardW = scale, boardH = scale * 0.58;
      const bx = cx - boardW / 2 + skewX, by = cy - boardH / 2 + skewY;
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(rotation.y * 0.13); ctx.transform(1, rotation.x * 0.18, rotation.y * 0.12, 1, 0, 0); ctx.translate(-cx, -cy);
      ctx.shadowColor = '#18d9c0'; ctx.shadowBlur = light === 'dark' ? 8 : 24; ctx.fillStyle = '#123d46'; ctx.fillRect(bx, by, boardW, boardH);
      ctx.shadowBlur = 0; ctx.strokeStyle = '#4ef0d7'; ctx.lineWidth = 2; ctx.strokeRect(bx, by, boardW, boardH);
      ctx.strokeStyle = '#5fd7c466'; ctx.lineWidth = 1;
      for (let i = 0; i < 11; i++) { const yy = by + 30 + i * 20; ctx.beginPath(); ctx.moveTo(bx + 20, yy); ctx.lineTo(bx + boardW * 0.42, yy); ctx.lineTo(bx + boardW * 0.54, yy + (i % 2 ? 20 : -20)); ctx.lineTo(bx + boardW - 22, yy + (i % 3) * 10); ctx.stroke(); }
      ctx.fillStyle = '#0b222b'; ctx.fillRect(bx + boardW * 0.37, by + boardH * 0.28, boardW * 0.26, boardH * 0.38); ctx.strokeStyle = '#83fff0'; ctx.strokeRect(bx + boardW * 0.37, by + boardH * 0.28, boardW * 0.26, boardH * 0.38);
      for (let i = 0; i < 10; i++) { ctx.fillStyle = '#ffd166'; ctx.fillRect(bx + 18 + i * 18, by + 8, 7, 4); ctx.fillRect(bx + 18 + i * 18, by + boardH - 12, 7, 4); }
      const reveal = stage === 0 ? 0 : stage === 1 ? 0.58 : 1;
      components.forEach((item, index) => {
        if (!visible[item.id]) return;
        const isRevealed = reveal >= (index === 0 ? 0.25 : index === 1 ? 0.45 : index === 2 ? 0.7 : 0.9);
        if (!isRevealed) return;
        const lift = explode ? 26 + index * 12 : 0;
        const px = bx + boardW * item.x + (explode ? (index % 2 ? -lift : lift) : 0);
        const py = by + boardH * item.y - lift;
        ctx.save(); ctx.shadowColor = item.color; ctx.shadowBlur = 16; ctx.fillStyle = item.id === 'mcu' ? '#183849' : '#203b49';
        const w = item.id === 'headers' ? 66 : item.id === 'mcu' ? 74 : 54, h = item.id === 'mcu' ? 42 : 30;
        ctx.fillRect(px - w / 2, py - h / 2, w, h); ctx.shadowBlur = 0; ctx.strokeStyle = item.color; ctx.strokeRect(px - w / 2, py - h / 2, w, h);
        if (item.id === 'leds') { ctx.fillStyle = '#ff5d76'; ctx.beginPath(); ctx.arc(px - 10, py, 5 + Math.sin(time / 350) * 1.5, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.arc(px + 10, py, 5, 0, Math.PI * 2); ctx.fill(); }
        if (item.id === 'headers') { ctx.fillStyle = '#cbd5e1'; for (let n = -3; n <= 3; n++) ctx.fillRect(px + n * 8 - 2, py - 12, 4, 24); }
        ctx.fillStyle = item.color; ctx.font = '700 9px monospace'; ctx.textAlign = 'center'; ctx.fillText(item.label, px, py + h / 2 + 14);
        if (showPins && explode) { ctx.strokeStyle = item.color; ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.moveTo(px, py + h / 2); ctx.lineTo(px, py + h / 2 + 32); ctx.stroke(); ctx.setLineDash([]); ctx.fillStyle = '#d9fffa'; ctx.font = '8px monospace'; ctx.fillText(item.pin, px, py + h / 2 + 43); }
        ctx.restore();
      });
      ctx.restore();
      ctx.fillStyle = '#66f6df'; ctx.font = '700 9px monospace'; ctx.textAlign = 'left'; ctx.fillText('PCB // ASSEMBLY SIMULATION', 18, 24); ctx.fillStyle = '#86a8b5'; ctx.font = '9px monospace'; ctx.textAlign = 'right'; ctx.fillText(`ROT ${Math.round(rotation.y * 57)}°  ·  ZOOM ${zoom.toFixed(1)}×`, width - 18, 24);
      frameRef.current = requestAnimationFrame(draw);
    };
    frameRef.current = requestAnimationFrame(draw);
    return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current); };
  }, [stage, light, explode, showPins, visible, rotation, zoom]);

  const onPointerDown = (event: React.PointerEvent<HTMLCanvasElement>) => { drag.current = { x: event.clientX, y: event.clientY }; event.currentTarget.setPointerCapture(event.pointerId); };
  const onPointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => { if (!drag.current) return; const dx = event.clientX - drag.current.x; const dy = event.clientY - drag.current.y; drag.current = { x: event.clientX, y: event.clientY }; setRotation(r => ({ x: Math.max(-0.8, Math.min(0.8, r.x + dy * 0.006)), y: r.y + dx * 0.006 })); };
  return <section className="pcb-lab" id="pcb-lab">
    <div className="pcb-heading"><div><div className="section-label">07 / INTERACTIVE LAB</div><h2>Watch an electronics assembly <em>come alive.</em></h2><p>Drag the board, inspect the pinout, and step through a simulated PCB build sequence.</p></div><div className="hud-chip"><i /> WEBGL-STYLE CANVAS <span>ONLINE</span></div></div>
    <div className="pcb-workbench">
      <div className="pcb-canvas-wrap"><canvas ref={canvasRef} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={() => { drag.current = null; }} onWheel={e => { e.preventDefault(); setZoom(z => Math.max(.75, Math.min(1.35, z - e.deltaY * .001))); }} aria-label="Interactive 3D-style PCB assembly canvas" /><div className="canvas-hint">DRAG TO ROTATE <span>·</span> SCROLL TO ZOOM</div></div>
      <aside className="pcb-controls">
        <div className="control-head"><span>ASSEMBLY CONTROL</span><b>SYS. 07</b></div>
        <label className="range-label">BUILD STAGE <strong>{String(stage + 1).padStart(2, '0')} / 03</strong></label><input className="stage-range" type="range" min="0" max="2" step="1" value={stage} onChange={e => setStage(Number(e.target.value) as Stage)} /><div className="stage-labels">{stageLabels.map((label, i) => <button className={stage === i ? 'active' : ''} key={label} onClick={() => setStage(i as Stage)}>{label}</button>)}</div>
        <div className="control-divider" />
        <label className="range-label">COMPONENT VISIBILITY</label>{components.map(item => <button className={`toggle-row ${visible[item.id] ? 'on' : ''}`} key={item.id} onClick={() => setVisible(v => ({ ...v, [item.id]: !v[item.id] }))}><i />{item.label}<span>{visible[item.id] ? 'ON' : 'OFF'}</span></button>)}
        <div className="control-divider" /><label className="range-label">LIGHTING PRESET</label><div className="preset-row">{(['lab', 'studio', 'dark'] as Light[]).map(p => <button className={light === p ? 'active' : ''} key={p} onClick={() => setLight(p)}>{p.toUpperCase()}</button>)}</div>
        <div className="control-divider" /><button className={`mode-button ${explode ? 'active' : ''}`} onClick={() => setExplode(v => !v)}><span>EXPLODE VIEW</span><b>{explode ? 'ACTIVE' : 'OFF'}</b></button><button className={`mode-button ${showPins ? 'active' : ''}`} onClick={() => setShowPins(v => !v)}><span>PINOUT INSPECTOR</span><b>{showPins ? 'VISIBLE' : 'HIDDEN'}</b></button>
      </aside>
    </div>
    <div className="pcb-caption"><span><b>WHAT THIS DEMONSTRATES</b>Interactive engineering communication: translating a physical electronics workflow into a clear, responsive digital experience.</span><span><b>BUILD NOTE</b>This same approach can be adapted for IoT dashboards, access-control systems, sensor networks, and technical training tools.</span></div>
  </section>;
}
