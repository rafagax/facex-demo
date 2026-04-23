import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import './App.css';

/* ══════════════════════════════════════════
   WORD-BY-WORD KINETIC TITLE REVEAL
   ══════════════════════════════════════════ */
const KineticTitle = ({ text, delay = 0, className = '' }) => {
  const words = text.split(' ');
  return (
    <span className={`kinetic-title ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="kinetic-word-wrap">
          <motion.span
            className="kinetic-word"
            initial={{ y: '115%', opacity: 0 }}
            whileInView={{ y: '0%', opacity: 1 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{
              duration: 1.1,
              delay: delay + i * 0.09,
              ease: [0.76, 0, 0.24, 1]
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

/* ══════════════════════════════════════════
   ANIMATED 1PX LINE
   ══════════════════════════════════════════ */
const LineReveal = ({ accent = false, delay = 0 }) => (
  <motion.div
    className={accent ? 'line-accent' : 'line-separator'}
    initial={{ scaleX: 0 }}
    whileInView={{ scaleX: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 1.6, delay, ease: [0.76, 0, 0.24, 1] }}
    style={{ transformOrigin: 'left' }}
  />
);

/* ══════════════════════════════════════════
   BENTO CARD w/ SPOTLIGHT EFFECT
   ══════════════════════════════════════════ */
const BentoCard = ({ children, className = '', style = {}, area }) => {
  const cardRef = useRef(null);
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, opacity: 0 });

  const handleMouseMove = useCallback((e) => {
    const rect = cardRef.current.getBoundingClientRect();
    setSpotlight({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      opacity: 1
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setSpotlight(prev => ({ ...prev, opacity: 0 }));
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className={`bento-card ${className}`}
      style={{ gridArea: area, ...style }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Spotlight radial that follows the cursor */}
      <div
        className="bento-spotlight"
        style={{
          left: spotlight.x,
          top: spotlight.y,
          opacity: spotlight.opacity
        }}
      />
      {children}
    </motion.div>
  );
};

/* ══════════════════════════════════════════
   FAKE MINI BAR CHART (CSS-only data UI)
   ══════════════════════════════════════════ */
const MiniBars = ({ heights = [60, 80, 45, 90, 55, 70, 40, 85], accent = false }) => (
  <div className="mini-bars">
    {heights.map((h, i) => (
      <motion.div
        key={i}
        className={`mini-bar ${accent ? 'mini-bar--accent' : ''}`}
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: i * 0.06, ease: 'easeOut' }}
        style={{ height: `${h}%`, transformOrigin: 'bottom' }}
      />
    ))}
  </div>
);

/* ══════════════════════════════════════════
   FAKE PROGRESS BAR
   ══════════════════════════════════════════ */
const ProgressBar = ({ label, value, delay = 0 }) => (
  <div className="progress-item">
    <div className="progress-meta">
      <span className="progress-label">{label}</span>
      <span className="progress-value">{value}%</span>
    </div>
    <div className="progress-track">
      <motion.div
        className="progress-fill"
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay, ease: [0.76, 0, 0.24, 1] }}
      />
    </div>
  </div>
);

/* ══════════════════════════════════════════
   CANVAS PARTICLE NETWORK
   ══════════════════════════════════════════ */
const CyberCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    const mouse = { x: width / 2, y: height / 2 };

    const onMouseMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onResize);

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.size = Math.random() * 1.2 + 0.3;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }
      draw() {
        ctx.fillStyle = 'rgba(200,220,255,0.12)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const particles = Array.from({ length: 60 }, () => new Particle());
    let raf;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.update();
        p.draw();
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 160) {
          ctx.strokeStyle = `rgba(0,220,255,${0.35 - dist / 460})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
          p.x -= dx * 0.008;
          p.y -= dy * 0.008;
        }
        particles.forEach(q => {
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 100) {
            ctx.strokeStyle = `rgba(180,200,255,${0.06 - d / 1700})`;
            ctx.lineWidth = 0.4;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        });
      });
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="cyber-canvas" />;
};

/* ══════════════════════════════════════════
   TICKER
   ══════════════════════════════════════════ */
const Ticker = () => {
  const items = [
    '// SYSTEM: ONLINE', 'BIOMETRY STREAM ACTIVE',
    'SYS_OP: OPTIMAL', 'ISO 9001:2015 CERTIFIED',
    'EST. 1991', '200+ CLIENTS', '300+ PROJECTS',
    'NODE: PANAMÁ HQ', 'LATAM COVERAGE: ██████ 95%'
  ];
  const repeated = [...items, ...items];
  return (
    <div className="ticker-wrapper">
      <div className="ticker-track">
        {repeated.map((item, i) => (
          <span key={i} className="ticker-item">{item}</span>
        ))}
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════
   MAIN APP
   ══════════════════════════════════════════ */
function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  const springConfig = { stiffness: 350, damping: 30 };
  const cx = useSpring(useMotionValue(-100), springConfig);
  const cy = useSpring(useMotionValue(-100), springConfig);

  useEffect(() => {
    const onMove = (e) => {
      cx.set(e.clientX);
      cy.set(e.clientY);
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    const onOver = (e) => {
      setIsHovering(
        !!e.target.closest('a, button, .bento-card, .sector-row, .hover-link')
      );
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
    };
  }, []);

  const services = [
    {
      title: "Estrategia, Organización y Personas",
      abbr: "EOP",
      description: "Orientación estratégica, análisis organizacional, gestión del cambio y racionalización de equipos.",
      link: "https://facex.com/eop/",
      area: "eop",
      bars: [55, 75, 90, 60, 85, 70, 95, 65],
      progress: [{ label: 'CHANGE MGT', value: 92 }, { label: 'STRATEGY', value: 87 }]
    },
    {
      title: "Procesos, Modelos y Sistemas de Gestión",
      abbr: "PMS",
      description: "Transformación de procesos bajo estándares ISO y modelos BPM de clase mundial.",
      link: "https://facex.com/pms/",
      area: "pms",
      bars: [80, 50, 95, 70, 85, 60, 75, 90],
      progress: [{ label: 'ISO DEPLOY', value: 96 }, { label: 'BPM INDEX', value: 89 }]
    },
    {
      title: "Ingeniería, Mantenimiento y Operaciones",
      abbr: "EMO",
      description: "Soluciones de ingeniería industrial enfocadas en optimización de procesos y excelencia operacional.",
      link: "https://facex.com/emo/",
      area: "emo",
      bars: [65, 90, 55, 80, 45, 95, 70, 85],
      progress: [{ label: 'OEE RATE', value: 94 }, { label: 'UPTIME', value: 98 }]
    },
    {
      title: "Gestión de Proyectos y Tecnología",
      abbr: "PIT",
      description: "Gestión de proyectos PMO e implementaciones tecnológicas avanzadas con los enfoques más novedosos.",
      link: "https://facex.com/pit/",
      area: "pit",
      bars: [90, 65, 80, 45, 95, 70, 88, 60],
      progress: [{ label: 'PMO INDEX', value: 91 }, { label: 'DELIVERY', value: 95 }]
    }
  ];

  const locations = [
    { country: "Panamá", isHQ: true, phone: "+507 834-5060", email: "ventas@facex.com", address: "PH Bay Mall Plaza, Av. Balboa, P3, Of. 304" },
    { country: "Perú", phone: "+51 1 718-5177", email: "peru@facex.com", address: "Calle Las Flores 234, Of. 203, San Isidro" },
    { country: "Ecuador", phone: "+593 99 578 4484", email: "ecuador@facex.com", address: "Av. Suiza y Checoslovaquia, Edif. Miletus" },
    { country: "Colombia", phone: "+57 300 929 1607", email: "colombia@facex.com", address: "Cra. 87 No. 17-35, Torres de Capellania" },
    { country: "Rep. Dominicana", phone: "+1 829 791-9000", email: "rd@facex.com", address: "Calle 4, Jardines Metropolitanos, Edif. Gilsa B1" },
    { country: "Venezuela", phone: "+58 212 335-7788", email: "venezuela@facex.com", address: "Av. Colinas de Bello Monte, Edif. CC Bello Monte" }
  ];

  const navLinks = [
    { label: "Nosotros", href: "#about" },
    { label: "Servicios", href: "#services" },
    { label: "Sectores", href: "#sectors" },
    { label: "Contacto", href: "#contact" }
  ];

  return (
    <>
      {/* FILM GRAIN */}
      <div className="grain" />

      {/* AMBIENT BACKGROUND GLOWS */}
      <div className="ambient-layer">
        <div className="glow glow--blue" />
        <div className="glow glow--purple" />
        <div className="glow glow--teal" />
      </div>

      {/* CUSTOM CURSOR */}
      <div className="cursor-wrap">
        <motion.div className="cursor-dot" style={{ x: cx, y: cy, translateX:'-50%', translateY:'-50%' }} />
        <motion.div
          className="cursor-ring"
          style={{ x: cx, y: cy, translateX:'-50%', translateY:'-50%' }}
          animate={{ scale: isHovering ? 1.6 : 1, borderColor: isHovering ? '#00f0ff' : 'rgba(255,255,255,0.25)' }}
          transition={{ duration: 0.2 }}
        />
      </div>

      {/* ── NAV ── */}
      <nav className="nav">
        <div className="nav-inner">
          <a href="#hero" className="nav-brand">
            <span className="status-dot" />
            <span className="nav-brand-name">FACEX</span>
            <span className="nav-brand-sub">GROUP</span>
          </a>
          <button
            className={`hamburger ${menuOpen ? 'active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>
          <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
            {navLinks.map((l, i) => (
              <li key={i}><a href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</a></li>
            ))}
            <li>
              <a href="https://facex.com/contactenos/" className="nav-cta" target="_blank" rel="noopener noreferrer">
                INICIAR CONSULTA
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero" id="hero">
        <CyberCanvas />
        <div className="hero-inner">
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="status-dot" />
            <span>EST. 1991 — CONSULTORÍA INTERNACIONAL</span>
          </motion.div>

          <h1 className="hero-title">
            <KineticTitle text="IMPULSAMOS" delay={0.1} />
            <br />
            <KineticTitle text="LA" delay={0.3} />
            {' '}
            <KineticTitle text="EXCELENCIA" delay={0.4} className="hero-title--outline" />
            <br />
            <KineticTitle text="EMPRESARIAL" delay={0.55} />
          </h1>

          <motion.div
            className="hero-line-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <LineReveal accent delay={0.9} />
          </motion.div>

          <div className="hero-bottom">
            <motion.p
              className="hero-sub"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            >
              Ingeniería táctica de procesos, optimización biométrica de organizaciones y
              despliegue inteligente de consultoría de alto estándar. Más de 30 años
              transformando empresas a nivel global.
            </motion.p>
            <motion.div
              className="hero-buttons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.8 }}
            >
              <a href="#services" className="btn btn--fill">Servicios Activos</a>
              <a
                href="https://facex.com/wp-content/uploads/2023/10/BROCHURE-FACEX-CONSULTING-GROUP-10-2023-2024.pdf"
                className="btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                Brochure ↗
              </a>
            </motion.div>
          </div>

          {/* HERO STATS ROW */}
          <div className="hero-stats">
            {[
              { num: '30+', label: 'AÑOS', bars: [40,60,70,55,80,90,85,75] },
              { num: '200+', label: 'CLIENTES', bars: [60,80,50,95,70,85,65,90] },
              { num: '300+', label: 'PROYECTOS', bars: [70,45,90,65,80,55,95,75] },
              { num: '06', label: 'PAÍSES', bars: [80,60,75,90,50,85,65,95] },
            ].map((s, i) => (
              <motion.div
                key={i}
                className="hero-stat"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 + i * 0.1, duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
              >
                <span className="hero-stat-num">{s.num}</span>
                <span className="hero-stat-label">{s.label}</span>
                <MiniBars heights={s.bars} accent={i === 0} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TICKER ── */}
      <Ticker />

      {/* ── ABOUT ── */}
      <section className="section" id="about">
        <div className="section-header">
          <motion.span
            className="section-tag"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            [ CORE // CONÓZCANOS ]
          </motion.span>
          <LineReveal delay={0.1} />
          <KineticTitle text="NUESTRO ADN" delay={0.2} className="section-title-kinetic" />
          <motion.p
            className="about-intro"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.4 }}
          >
            FACEX Consulting Group opera en la intersección entre conocimiento élite y ejecución de alto impacto.
            Desplegamos herramientas, metodologías y recursos altamente especializados guiados por los más
            estrictos estándares ISO, modelos de excelencia de clase mundial y el enfoque BPM.
          </motion.p>
        </div>

        {/* ADN BENTO */}
        <div className="bento-about">
          {[
            { idx: '001', tag: 'MISIÓN', title: 'Táctica y Estrategia', text: 'Provisión hiper-efectiva de consultoría diferenciada. Movilizamos talento élite para garantizar retornos y transformar empresas desde sus cimientos.', bars: [60,80,55,90,70,85,45,75] },
            { idx: '002', tag: 'VISIÓN', title: 'Hegemonía de la Calidad', text: 'Posicionamiento de liderazgo total. Estructuramos la excelencia como normativa en todos los modelos de negocio que tocamos.', bars: [80,55,90,65,75,45,95,70] },
            { idx: '003', tag: 'VALORES', title: 'Manifiesto Operativo', text: 'Excelencia. Sinergia total. Excedentes de valor puros. Integridad radical. Innovación constante. Tenacidad resolutiva.' , bars: [45,90,60,80,70,55,85,75] },
          ].map((item, i) => (
            <BentoCard key={i} className="bento-about__card" area={`a${i+1}`}>
              <div className="card-header-row">
                <span className="card-tag">[ {item.idx} — {item.tag} ]</span>
                <span className="status-dot" />
              </div>
              <h3 className="card-title">{item.title}</h3>
              <p className="card-text">{item.text}</p>
              <MiniBars heights={item.bars} />
            </BentoCard>
          ))}
        </div>
      </section>

      {/* ── SERVICES BENTO ── */}
      <section className="section" id="services">
        <div className="section-header">
          <motion.span className="section-tag" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            [ SUBSISTEMAS DE CONSULTORÍA ]
          </motion.span>
          <LineReveal delay={0.1} />
          <KineticTitle text="SERVICIOS AVANZADOS" delay={0.2} className="section-title-kinetic" />
        </div>

        <div className="bento-services">
          {services.map((svc, i) => (
            <BentoCard key={i} className={`bento-services__card bento-services__card--${svc.area}`} area={svc.area}>
              <div className="card-header-row">
                <span className="card-tag">[ IDX:{String(i+1).padStart(3,'0')} — {svc.abbr} ]</span>
                <span className="live-badge"><span className="status-dot" /> LIVE</span>
              </div>
              <h3 className="card-title card-title--lg">{svc.title}</h3>
              <p className="card-text">{svc.description}</p>
              <div className="card-data-block">
                {svc.progress.map((p, j) => (
                  <ProgressBar key={j} label={p.label} value={p.value} delay={0.2 + j * 0.15} />
                ))}
              </div>
              <MiniBars heights={svc.bars} accent />
              <a href={svc.link} className="card-link hover-link" target="_blank" rel="noopener noreferrer">
                ACCEDER AL MÓDULO →
              </a>
            </BentoCard>
          ))}

          {/* fifth spanning card: contact CTA */}
          <BentoCard className="bento-services__card bento-services__cta" area="cta">
            <div className="card-header-row">
              <span className="card-tag">[ CONTACT // DIRECT ]</span>
              <span className="status-dot" />
            </div>
            <p className="cta-label">¿Listo para transformar su organización?</p>
            <a
              href="https://facex.com/contactenos/"
              className="btn btn--fill cta-btn hover-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              INICIAR CONSULTA AHORA
            </a>
            <div className="cta-stat-row">
              <div className="cta-stat"><span>200+</span> Clientes</div>
              <div className="cta-stat"><span>300+</span> Proyectos</div>
              <div className="cta-stat"><span>06</span> Países</div>
            </div>
          </BentoCard>
        </div>
      </section>

      {/* ── SECTORS ── */}
      <section className="section" id="sectors">
        <div className="section-header">
          <motion.span className="section-tag" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            [ APLICABILIDAD SECTORIAL ]
          </motion.span>
          <LineReveal delay={0.1} />
          <KineticTitle text="SECTORES" delay={0.2} className="section-title-kinetic" />
        </div>
        <div className="sectors-list">
          {[
            "Energía, Hidrocarburos y Petroquímica",
            "Infraestructura, Gobierno y Salud",
            "Laboratorios de Calibración y Ensayo",
            "Manufactura y Servicios",
            "Servicios Financieros",
            "Tecnología y Telecomunicaciones"
          ].map((sector, i) => (
            <motion.div
              className="sector-row"
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-10px' }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <span className="sector-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="sector-name">{sector}</span>
              <span className="sector-arrow">→</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── VALUE PROPS BENTO ── */}
      <section className="section section--dark">
        <div className="section-header">
          <motion.span className="section-tag" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            [ PROPUESTA DE VALOR ]
          </motion.span>
          <LineReveal delay={0.1} />
          <KineticTitle text="POR QUÉ FACEX" delay={0.2} className="section-title-kinetic" />
        </div>
        <div className="bento-value">
          {[
            { title: "Experiencia Internacional", desc: "30+ años en operación global en múltiples industrias y culturas corporativas.", val: 30 },
            { title: "Alta Especialización", desc: "Empresa mediana con alta especialización vs. corporaciones generalistas.", val: 94 },
            { title: "Equipo Multidisciplinario", desc: "Expertos de élite con presencia local en cada país.", val: 88 },
            { title: "Metodología Probada", desc: "200+ clientes y 300+ proyectos con metodologías de clase mundial.", val: 97 },
            { title: "Oficina PMO", desc: "FACEX PMO garantiza la gestión óptima de todos los proyectos.", val: 92 },
            { title: "Énfasis Total", desc: "Dedicación absoluta y compromiso inquebrantable con el éxito.", val: 99 }
          ].map((item, i) => (
            <BentoCard key={i} className="bento-value__card">
              <span className="card-tag">[ {String(i + 1).padStart(2, '0')} ]</span>
              <h4 className="card-title">{item.title}</h4>
              <p className="card-text">{item.desc}</p>
              <ProgressBar label="PERFORMANCE" value={item.val} delay={0.1} />
            </BentoCard>
          ))}
        </div>
      </section>

      {/* ── CONTACT / LOCATIONS ── */}
      <section className="section" id="contact">
        <div className="section-header">
          <motion.span className="section-tag" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            [ NODOS FÍSICOS GLOBALES ]
          </motion.span>
          <LineReveal delay={0.1} />
          <KineticTitle text="OFICINAS" delay={0.2} className="section-title-kinetic" />
        </div>
        <div className="bento-locations">
          {locations.map((loc, i) => (
            <BentoCard key={i} className="bento-loc__card">
              <div className="card-header-row">
                <span className="card-tag">[ NODE {String(i + 1).padStart(2, '0')} ]</span>
                {loc.isHQ && <span className="hq-badge">CORE HQ</span>}
              </div>
              <h3 className="card-title">{loc.country}</h3>
              <div className="location-data">
                <div className="location-row"><span className="loc-label">CH</span><span>{loc.phone}</span></div>
                <div className="location-row"><span className="loc-label">IP</span><span>{loc.email}</span></div>
                <div className="location-row"><span className="loc-label">COORD</span><span>{loc.address}</span></div>
              </div>
            </BentoCard>
          ))}
        </div>

        <div className="social-strip">
          {[
            { label: 'WhatsApp', href: 'https://wa.me/5078345060' },
            { label: 'Telegram', href: 'https://t.me/FACEXCONSULTING' },
            { label: 'LinkedIn', href: 'https://www.linkedin.com/company/facexconsulting' },
            { label: 'ventas@facex.com', href: 'mailto:ventas@facex.com' },
          ].map((s, i) => (
            <React.Fragment key={i}>
              {i > 0 && <span className="social-sep" />}
              <a href={s.href} className="social-link hover-link" target="_blank" rel="noopener noreferrer">{s.label}</a>
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-inner">
          <span className="footer-copy">// STATUS: SECURE © {new Date().getFullYear()} — Facex International Holding Inc.</span>
          <div className="footer-links">
            <a href="https://facex.com/politicas-de-calidad/" target="_blank" rel="noopener noreferrer">Policies</a>
            <a href="https://facex.com/terminos-y-condiciones/" target="_blank" rel="noopener noreferrer">Terms</a>
            <a href="https://facex.com/politica-de-privacidad/" target="_blank" rel="noopener noreferrer">Privacy</a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;