import PcbVisualizer from './PcbVisualizer';

const skills = [
  ["Security Systems", "Access control · Biometric terminals · CCTV and video management"],
  ["Technical Support", "System configuration · Diagnostics · Testing · Documentation"],
  ["Installation", "Low-voltage wiring · Hardware setup · Device integration"],
  ["AI-Assisted Development", "Vibe coding · Rapid prototyping · Web dashboards · Continuous learning"],
];

const experiences = [
  { period: "Jun - Jul 2026 · 240 hours", role: "Technical Support Intern", company: "MTECH Biometrics Ltd. Corporation", text: "Configured, wired, tested, and troubleshot access-control, biometric, CCTV, visitor-management, and barrier systems for demonstrations and technical support." },
  { period: "Jan 2024 - Feb 2025", role: "Customer Service Representative", company: "Telepro Limited Corp.", text: "Resolved customer inquiries through phone and chat while maintaining accuracy and service quality during high-volume interactions." },
  { period: "Jan 2021 - Present", role: "Part-Time Delivery Rider", company: "Foodpanda Philippines", text: "Manage delivery schedules independently while handling routes, timing, and customer concerns reliably." },
  { period: "2019 - 2023", role: "Service, Production & Maintenance", company: "McDonald's Biñan Highway", text: "Supported customer service, production, transactions, and routine maintenance in a fast-paced operation." },
];

export default function Home() {
  return (
    <main>
      <header className="nav-shell">
        <a className="brand" href="#top" aria-label="Clarence Villanueva home"><span>CV</span><b>Clarence Villanueva</b></a>
        <nav aria-label="Primary navigation">
          <a href="#about">About</a><a href="#skills">Skills</a><a href="#projects">Projects</a><a href="#experience">Experience</a><a href="#contact">Contact</a>
        </nav>
        <a className="nav-cta" href="/clarence-villanueva-resume.pdf" download>Resume ↓</a>
      </header>

      <section className="hero" id="top">
        <div className="hero-grid-bg" />
        <div className="hero-copy reveal">
          <p className="eyebrow"><i /> Electronics Engineering · Batch 2026 · Santa Rosa, Laguna</p>
          <h1>Building smarter systems for <em>real-world problems.</em></h1>
          <p className="hero-lede">I&apos;m Clarence, an academically complete Electronics Engineering graduate from Batch 2026 with hands-on experience in technical support, security systems, IoT, and AI-assisted development. I use vibe coding to turn practical ideas into working prototypes and I&apos;m committed to continuously improving my software skills.</p>
          <div className="actions"><a className="button primary" href="#projects">Explore my work <span>↓</span></a><a className="button ghost" href="#contact">Let&apos;s connect</a></div>
          <div className="availability"><span>●</span> Open to entry-level technical, engineering, and operations opportunities</div>
        </div>
        <div className="hero-visual" aria-label="Abstract connected engineering system visualization">
          <div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="core"><span>ESP</span><b>32</b></div>
          <div className="node n1"><b>01</b><span>SENSOR</span></div><div className="node n2"><b>02</b><span>LTE</span></div><div className="node n3"><b>03</b><span>ALERT</span></div>
          <div className="telemetry"><small>SYSTEM STATUS</small><strong><i/> MONITORING</strong><div><span/><span/><span/><span/><span/></div></div>
        </div>
        <div className="scroll-note">SCROLL TO EXPLORE <span>↓</span></div>
      </section>

      <section className="section about" id="about">
        <div className="section-label">01 / ABOUT</div>
        <div className="about-copy"><p className="kicker">Technical curiosity. Practical experience.</p><h2>Learning fast and building systems that <em>work reliably.</em></h2></div>
        <div className="about-text"><p>I academically completed my BS Electronics Engineering at AMA Computer College - Biñan Campus as part of Batch 2026. My experience spans access control, biometric devices, CCTV and video systems, low-voltage wiring, system testing, IoT, and customer support.</p><p>I&apos;m also knowledgeable in vibe coding and AI-assisted development, which I use to build and improve functional web dashboards and prototypes. I bring a hands-on mindset, clear communication, and a strong willingness to learn from feedback.</p><div className="facts"><span><b>Based in</b>Santa Rosa, Laguna</span><span><b>Academic status</b>Complete · Batch 2026</span></div></div>
      </section>

      <section className="section skills-section" id="skills">
        <div className="section-head"><div><div className="section-label">02 / CAPABILITIES</div><h2>What I work with.</h2></div><p>A growing toolkit built through coursework, prototyping, and field experience.</p></div>
        <div className="skill-grid">{skills.map((skill, i) => <article className="skill-card" key={skill[0]}><span>0{i+1}</span><div className={`skill-icon icon-${i}`} aria-hidden="true">{i===0?"⌁":i===1?"⚡":i===2?"⌘":"◉"}</div><h3>{skill[0]}</h3><p>{skill[1]}</p></article>)}</div>
      </section>

      <section className="section projects" id="projects">
        <div className="section-head"><div><div className="section-label">03 / FEATURED WORK</div><h2>Projects with purpose.</h2></div></div>
        <article className="featured-card">
          <div className="project-content"><div className="project-top"><span className="project-no">01</span><span className="pill">THESIS PROJECT</span></div><p className="kicker">Smart Infrastructure · IoT · Web Dashboard</p><h3>Smart Roadside Drainage with Integrated Debris Storage &amp; Sensor-Based Monitoring</h3><p>An intelligent drainage system designed to detect rising water and accumulated debris before they become serious hazards—supporting faster response and preventive maintenance. I developed its responsive monitoring dashboard through AI-assisted development and iterative prototyping, demonstrating my ability to create similar monitoring systems for other real-world applications.</p><div className="tech"><span>ESP32</span><span>JSN-SR04T</span><span>Float Switch</span><span>LTE</span><span>Web Dashboard</span><span>AI-Assisted Development</span></div><ul><li>Real-time drainage status monitoring</li><li>Multi-unit dashboard and alerts</li><li>Preventive maintenance visibility</li></ul><div className="demo-note"><b>How to explore the demo</b><span>Open the live dashboard, then click <strong>“Open portfolio demo.”</strong> The demo includes system information and simulated random drainage events so you can see how the application responds to normal, warning, full, overflow, and disconnected conditions.</span></div><a className="project-live" href="https://smart-drainage-4z2l.vercel.app/" target="_blank" rel="noreferrer">Open dashboard &amp; try demo mode <b>↗</b></a></div>
          <a className="project-preview" href="https://smart-drainage-4z2l.vercel.app/" target="_blank" rel="noreferrer" aria-label="Open the Smart Drainage portfolio demonstration"><img src="/smart-drainage-dashboard.png" alt="Smart Drainage portfolio demo showing system information and simulated drainage conditions"/><span>Click “Open portfolio demo” on the login screen <b>↗</b></span></a>
        </article>
        <article className="featured-card voltforge-card">
          <a className="project-preview voltforge-preview" href="https://voltforge-gray.vercel.app" target="_blank" rel="noreferrer" aria-label="Open the VoltForge electronics engineering workspace"><img src="/voltforge-preview.png" alt="VoltForge electronics learning and engineering workspace home screen"/><span>Explore the live engineering workspace <b>↗</b></span><i className="preview-glow" aria-hidden="true"/></a>
          <div className="project-content"><div className="project-top"><span className="project-no">02</span><span className="pill">FULL-STACK PROJECT</span></div><p className="kicker">Electronics Education · Engineering Tools · AI</p><h3>VoltForge — Engineering, made buildable.</h3><p>A free, local-first electronics learning and engineering workspace that brings research, design, simulation, documentation, and guided learning into one responsive application.</p><div className="tech"><span>Next.js</span><span>TypeScript</span><span>Supabase</span><span>AI-Assisted Learning</span><span>PCB Tools</span><span>PWA</span></div><ul><li>Datasheet intelligence with cited answers</li><li>Schematic, SPICE, and PCB workspaces</li><li>Interactive lessons and engineering calculators</li><li>Local-first projects, notes, and progress</li></ul><div className="demo-note"><b>What this demonstrates</b><span>I can plan and build complex, user-focused web applications that combine engineering knowledge, interactive tools, data workflows, and responsible AI-assisted features.</span></div><a className="project-live" href="https://voltforge-gray.vercel.app" target="_blank" rel="noreferrer">Launch VoltForge <b>↗</b></a></div>
        </article>
      </section>

      <PcbVisualizer />

      <section className="section experience" id="experience">
        <div className="section-head"><div><div className="section-label">04 / EXPERIENCE</div><h2>Experience beyond the classroom.</h2></div><p>Technical work and service roles that strengthened my reliability, adaptability, and people skills.</p></div>
        <div className="timeline">{experiences.map((x,i) => <article key={x.role}><div className="timeline-dot">{i+1}</div><p>{x.period}</p><h3>{x.role}</h3><small>{x.company}</small><span>{x.text}</span></article>)}</div>
      </section>

      <section className="section credentials" id="education">
        <div className="education-card"><div className="section-label">05 / EDUCATION</div><span className="big-number">BSECE</span><p>Bachelor of Science in</p><h2>Electronics Engineering</h2><small>AMA Computer College - Biñan Campus · Batch 2026</small><div className="progress"><span style={{width:"100%"}}/></div></div>
        <div className="certs" id="certifications"><div className="section-label">06 / TRAINING &amp; CERTIFICATES</div><h2>Always learning.</h2><div className="cert-list"><article><span>01</span><div><h3>CCNA: Introduction to Networks</h3><p>Cisco Networking Academy · AMA Computer University · April 20, 2026</p></div><a href="/ccna-introduction-to-networks-certificate.pdf" target="_blank" rel="noreferrer">VIEW ↗</a></article><article><span>02</span><div><h3>Electrical Installation &amp; Maintenance Training</h3><p>Santa Rosa Manpower Training Center · 2024</p></div><b>COMPLETED</b></article><article><span>03</span><div><h3>SMART Technopreneurship 101</h3><p>Completed September 2025</p></div><a href="https://drive.google.com/file/d/12SuBX07tjaC7Y_fpXu_Z38gHwVyh6399/view" target="_blank" rel="noreferrer">VIEW ↗</a></article><article><span>04</span><div><h3>English for Business &amp; Entrepreneurship</h3><p>Completed September 2025</p></div><a href="https://drive.google.com/file/d/10HNKul7j_6EJffjU-xe1Id6DiUzoPBEd/view" target="_blank" rel="noreferrer">VIEW ↗</a></article></div></div>
      </section>

      <section className="contact" id="contact">
        <p className="eyebrow"><i/> GET IN TOUCH</p><h2>Let&apos;s build something<br/><em>that matters.</em></h2><p>I&apos;m open to entry-level opportunities in technical support, electronics, security systems, customer service, and operations.</p><div className="actions"><a className="button light" href="mailto:vclarencejohn@gmail.com">Send me an email ↗</a><a className="button line" href="https://github.com/vclarencejohn-png" target="_blank" rel="noreferrer">GitHub</a></div>
        <div className="contact-links"><a href="https://github.com/vclarencejohn-png" target="_blank" rel="noreferrer">GitHub ↗</a><a href="mailto:vclarencejohn@gmail.com">vclarencejohn@gmail.com</a><a id="resume" href="/clarence-villanueva-resume.pdf" download>Download Resume ↓</a></div>
      </section>
      <footer><a className="brand" href="#top"><span>CV</span><b>Clarence Villanueva</b></a><p>Designed &amp; built with purpose · © 2026</p><a href="#top">BACK TO TOP ↑</a></footer>
    </main>
  );
}
