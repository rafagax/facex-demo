import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

/* ── REUSABLE TEXT REVEAL WRAPPER ── */
const Reveal = ({ children, delay = 0 }) => (
  <div className="reveal-wrap">
    <motion.div
      initial={{ y: '110%' }}
      whileInView={{ y: '0%' }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 1, delay, ease: [0.76, 0, 0.24, 1] }}
    >
      {children}
    </motion.div>
  </div>
);

/* ── ANIMATED 1PX LINE ── */
const LineReveal = ({ accent = false, delay = 0 }) => (
  <motion.div
    className={accent ? 'line-accent' : 'line-separator'}
    initial={{ scaleX: 0 }}
    whileInView={{ scaleX: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 1.4, delay, ease: [0.76, 0, 0.24, 1] }}
    style={{ transformOrigin: 'left' }}
  />
);

/* ── INFINITE DATA TICKER ── */
const Ticker = ({ text }) => {
  return (
    <div className="ticker-wrapper">
      <div className="ticker-content">
        {Array(8).fill("").map((_, i) => (
          <span key={i}>{text}</span>
        ))}
      </div>
    </div>
  );
};

/* ── INTERACTIVE CANVAS BACKGROUND ── */
const CyberCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let particles = [];
    const mouse = { x: width / 2, y: height / 2 };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5;
        this.size = Math.random() * 1.5;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }
      draw() {
        ctx.fillStyle = 'rgba(255,255,255,0.15)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < 70; i++) particles.push(new Particle());

    let animationFrameId;
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.strokeStyle = `rgba(255,255,255,${0.08 - dist / 1500})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }

        const dxM = particles[i].x - mouse.x;
        const dyM = particles[i].y - mouse.y;
        const distM = Math.sqrt(dxM * dxM + dyM * dyM);
        if (distM < 180) {
          ctx.strokeStyle = `rgba(0, 240, 255, ${0.4 - distM / 450})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
          
          // Magnetic pull effect
          particles[i].x -= dxM * 0.01;
          particles[i].y -= dyM * 0.01;
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="cyber-canvas" />;
};

/* ── DOM REVEAL IMAGE ON HOVER WRAPPER FOR SERVICES ── */
const HoverImageReveal = ({ service, index }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      className={`service-item ${index % 2 !== 0 ? 'service-item--reverse' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="service-title-col">
        <span className="service-idx">[ IDX: {String(index + 1).padStart(3, '0')} — {service.abbr} ]</span>
        <Reveal>
          <h3 className="service-name" data-hover={service.title}>{service.title}</h3>
        </Reveal>
      </div>
      <div className="service-desc-col">
        <p className="service-desc">{service.description}</p>
        <a href={service.link} className="service-link" target="_blank" rel="noopener noreferrer">
          Explorar Detalles →
        </a>
      </div>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="service-image-reveal"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, x: mousePos.x - 125, y: mousePos.y - 80 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            <img src={service.img} alt={service.title} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ── MAIN COMPONENT ── */
function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHoveringLink, setIsHoveringLink] = useState(false);

  // Custom Cursor Tracker
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    
    const handleMouseOver = (e) => {
      const isInteractable = e.target.tagName.toLowerCase() === 'a' || 
                             e.target.tagName.toLowerCase() === 'button' ||
                             e.target.closest('.hover-target');
      setIsHoveringLink(isInteractable);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    }
  }, []);

  const services = [
    {
      title: "Estrategia, Organización y Personas",
      abbr: "EOP",
      description: "Acompañamos a nuestros clientes en la orientación estratégica, análisis organizacional, gestión del cambio y racionalización de equipos que sustentan la operación y mejora continua de sus procesos.",
      link: "https://facex.com/eop/",
      img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Procesos, Modelos y Sistemas de Gestión",
      abbr: "PMS",
      description: "Transformamos procesos hacia la excelencia, alineando estructuras organizacionales y desarrollando sistemas de gestión enfocados en estándares internacionales ISO y modelos de clase mundial.",
      link: "https://facex.com/pms/",
      img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Ingeniería, Mantenimiento y Operaciones Industriales",
      abbr: "EMO",
      description: "Desarrollamos soluciones de ingeniería, mantenimiento y operaciones industriales enfocadas en la optimización de procesos, racionalización de recursos y excelencia operacional.",
      link: "https://facex.com/emo/",
      img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Gestión de Proyectos y Tecnología de la Información",
      abbr: "PIT",
      description: "Ejecutamos servicios con gestión de proyectos innovadora, desarrollando soluciones tecnológicas adecuadas a las necesidades de nuestros clientes con los enfoques más novedosos.",
      link: "https://facex.com/pit/",
      img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80"
    }
  ];

  const sectors = [
    "Energía, Hidrocarburos y Petroquímica",
    "Infraestructura, Gobierno y Salud",
    "Laboratorios de Calibración y Ensayo",
    "Manufactura y Servicios",
    "Servicios Financieros",
    "Tecnología y Telecomunicaciones"
  ];

  const valueProps = [
    { title: "Experiencia Internacional", desc: "Más de 30 años diseñando y aplicando exitosamente servicios de consultoría en diversos países e industrias." },
    { title: "Alta Especialización", desc: "Empresa mediana con alto nivel de especialización, a diferencia de grandes corporaciones generalistas." },
    { title: "Equipo Multidisciplinario", desc: "Consultores del más alto nivel, especializados en diversas disciplinas, con presencia local en cada país." },
    { title: "Metodología Probada", desc: "Metodologías probadas en más de 200 clientes y 300 proyectos, basadas en esquemas de clase mundial." },
    { title: "Oficina de Proyectos", desc: "FACEX PMO garantiza una óptima gestión de todos los proyectos desarrollados globalmente." },
    { title: "Énfasis Estratégico", desc: "Alta dedicación, esfuerzo y compromiso inquebrantable con el éxito en cada uno de nuestros acuerdos." }
  ];

  const locations = [
    { country: "Panamá", isHQ: true, phone: "+507 834-5060", email: "ventas@facex.com", address: "PH Bay Mall Plaza, Av. Balboa, Piso 3, Of. 304, Panamá City." },
    { country: "Perú", phone: "+51 1 718-5177", email: "peru@facex.com", address: "Calle Las Flores 234, Of. 203, San Isidro, Lima." },
    { country: "Ecuador", phone: "+593 99 578 4484", email: "ecuador@facex.com", address: "Av. Suiza y Checoslovaquia, Edif. Miletus, PB 03-No.04, Quito." },
    { country: "Colombia", phone: "+57 300 929 1607", email: "colombia@facex.com", address: "Carrera 87 No. 17-35, Torres de Capellania Int. 2-201, Bogotá." },
    { country: "Rep. Dominicana", phone: "+1 829 791-9000", email: "rd@facex.com", address: "Calle 4, Jardines Metropolitanos, Edif. Gilsa B1, Santiago." },
    { country: "Venezuela", phone: "+58 212 335-7788", email: "venezuela@facex.com", address: "Av. Ppal. Colinas de Bello Monte, Edif. CC Bello Monte, P2, Of. 2-K, Caracas." }
  ];

  return (
    <>
      <div className="grain" />
      
      {/* ── CUSTOM CURSOR HTML ── */}
      <div className="cursor-wrapper">
        <motion.div
          className="cursor-dot"
          animate={{ x: mousePos.x - 4, y: mousePos.y - 4 }}
          transition={{ type: "tween", ease: "linear", duration: 0 }}
        />
        <motion.div
          className="cursor-ring"
          animate={{ 
            x: mousePos.x - 16, 
            y: mousePos.y - 16,
            scale: isHoveringLink ? 1.5 : 1,
            backgroundColor: isHoveringLink ? 'rgba(0, 240, 255, 0.1)' : 'transparent',
            borderColor: isHoveringLink ? '#00f0ff' : 'rgba(255, 255, 255, 0.3)'
          }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
        />
      </div>

      {/* ═══ NAVIGATION ═══ */}
      <nav className="nav hover-target">
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
            {[
              { label: "Nosotros", href: "#about" },
              { label: "Servicios", href: "#services" },
              { label: "Sectores", href: "#sectors" },
              { label: "Contacto", href: "#contact" }
            ].map((link, i) => (
              <li key={i}>
                <a href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</a>
              </li>
            ))}
            <li>
              <a href="https://facex.com/contactenos/" className="nav-cta" target="_blank" rel="noopener noreferrer">
                ACCESO DIRECTO
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* ═══ HERO WITH CANVAS BACKGROUND ═══ */}
      <section className="hero" id="hero">
        <CyberCanvas />
        <div className="hero-inner">
          <div className="hero-tag">
            <Reveal>
              <span className="tag">[ EST. 1991 — Inteligencia y Biometría ]</span>
            </Reveal>
          </div>

          <h1 className="hero-title">
            <Reveal>IMPULSAMOS</Reveal>
            <Reveal delay={0.1}>
              LA <span className="accent-word hover-target">EXCELENCIA</span>
            </Reveal>
            <Reveal delay={0.2}>EMPRESARIAL</Reveal>
          </h1>

          <div className="hero-line">
            <LineReveal accent delay={0.4} />
          </div>

          <div className="hero-bottom">
            <Reveal delay={0.5}>
              <p className="hero-sub">
                Ingeniería táctica de datos, análisis de procesos y optimización biométrica.
                Implementamos soluciones de inteligencia empresarial de alto nivel adaptables
                al estándar global de seguridad y eficiencia analítica garantizada.
              </p>
            </Reveal>
            <Reveal delay={0.6}>
              <div className="hero-cta-group">
                <a href="#services" className="btn btn--fill">Módulos Activos</a>
                <a
                  href="https://facex.com/wp-content/uploads/2023/10/BROCHURE-FACEX-CONSULTING-GROUP-10-2023-2024.pdf"
                  className="btn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Documentación Oficial ↗
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ PERPETUAL DATA TICKER ═══ */}
      <Ticker text="// PROCESSING BIOMETRIC STREAM // KERNEL ONLINE // FACEX DEEP LEARNING ACTIVE // SYS OP: OPTIMAL " />

      {/* ═══ ABOUT / ADN ═══ */}
      <section className="section" id="about">
        <div className="section-header">
          <Reveal>
            <span className="section-tag">[ CORE // CONÓZCANOS ]</span>
          </Reveal>
          <LineReveal delay={0.1} />
          <div style={{ marginTop: 'clamp(24px, 3vh, 40px)' }}>
            <Reveal delay={0.2}>
              <h2 className="section-title">NUESTRO ADN</h2>
            </Reveal>
          </div>
          <Reveal delay={0.3}>
            <p className="about-intro">
              FACEX Consulting Group opera en la intersección de altos conocimientos y ejecución. 
              Desplegamos herramientas, metodologías y recursos altamente especializados guiados 
              por los más estrictos estándares de la industrialización BPM e ISO, dictaminando 
              el estándar a seguir en el sur global.
            </p>
          </Reveal>
        </div>

        <div className="about-items">
          {[
            {
              idx: "001 — MISIÓN",
              title: "Táctica y Estrategia",
              text: "Provisión hiper-efectiva de consultoría diferenciada. Movilizamos talento élite internacional para garantizar retornos y transformar empresas desde sus cimientos biológicos y sistemáticos."
            },
            {
              idx: "002 — VISIÓN",
              title: "Hegemonía de la Calidad",
              text: "Perseguimos agresivamente un posicionamiento de liderazgo. No es suficiente ser un competidor, nuestra visión abarca estructurar la excelencia como la normativa principal de cualquier modelo de negocio."
            },
            {
              idx: "003 — VALORES",
              title: "Manifiesto Operativo",
              text: "Excelencia. Sinergia total. Generación de excedentes de valor puros. Integridad radical sin fisuras. Innovación constante. Tenacidad resolutiva bajo cualquier contexto de presión."
            }
          ].map((item, i) => (
            <motion.div
              className="about-item hover-target"
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
            >
              <div>
                <span className="about-item-idx">[ {item.idx} ]</span>
              </div>
              <div>
                <Reveal delay={i * 0.1}>
                  <h3 className="about-item-title">{item.title}</h3>
                </Reveal>
                <p className="about-item-text">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══ SERVICES WITH ON-HOVER IMAGE REVEAL ═══ */}
      <section className="section" id="services">
        <div className="section-header">
          <Reveal>
            <span className="section-tag">[ SUBSISTEMAS DE CONSULTORÍA ]</span>
          </Reveal>
          <LineReveal delay={0.1} />
          <div style={{ marginTop: 'clamp(24px, 3vh, 40px)' }}>
            <Reveal delay={0.2}>
              <h2 className="section-title">SERVICIOS<br />AVANZADOS</h2>
            </Reveal>
          </div>
        </div>

        <div className="services-list">
          {services.map((service, i) => (
            <HoverImageReveal service={service} index={i} key={i} />
          ))}
        </div>
      </section>

      {/* ═══ VALUE PROPOSITION & SECTORS ═══ */}
      <section className="section" id="sectors" style={{ background: '#020202' }}>
        <div className="section-header">
          <Reveal>
            <span className="section-tag">[ METRICS ]</span>
          </Reveal>
          <LineReveal delay={0.1} />
          <div style={{ marginTop: 'clamp(24px, 3vh, 40px)' }}>
            <Reveal delay={0.2}>
              <h2 className="section-title">INFRAESTRUCTURA</h2>
            </Reveal>
          </div>
        </div>

        <div className="value-grid hover-target">
          {valueProps.map((item, i) => (
            <motion.div
              className="value-item"
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <span className="value-idx">[ {String(i + 1).padStart(2, '0')} ]</span>
              <h4 className="value-title">{item.title}</h4>
              <p className="value-text">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="sectors-list" style={{ marginTop: 'clamp(60px, 10vh, 120px)' }}>
           <Reveal><span className="section-tag" style={{display: 'block', marginBottom: '20px'}}>[ APLICABILIDAD POR SECTOR ]</span></Reveal>
          {sectors.map((sector, i) => (
            <motion.div
              className="sector-row hover-target"
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <span className="sector-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="sector-name">{sector}</span>
              <span className="sector-arrow">→</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══ CENTERS ═══ */}
      <section className="section" id="centers">
        <div className="section-header">
          <Reveal>
            <span className="section-tag">[ OPERACIONES CENTRALIZADAS ]</span>
          </Reveal>
          <LineReveal delay={0.1} />
        </div>

        <div className="centers-grid">
          <motion.div
            className="center-item hover-target"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="center-idx">[ ACADEMY NODE 01 ]</span>
            <h3 className="center-name">Centro de Formación</h3>
            <p className="center-text">
              Certificación formal ISO 21001:2018. Despliegue de programas 
              estructurados para elevar el potencial analítico y las métricas 
              de retención de arquitectos de datos y operadores en el sistema.
            </p>
            <a href="http://www.facexeducation.com/" className="center-link" target="_blank" rel="noopener noreferrer">
              iniciar_conexion() →
            </a>
          </motion.div>

          <motion.div
            className="center-item hover-target"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <span className="center-idx">[ EXCELLENCE NODE 02 ]</span>
            <h3 className="center-name">Centro de Excelencia</h3>
            <p className="center-text">
              Modelado puro, automatización nativa de procesos mediante BPM,
              aplicaciones BPMS y el desarrollo integral de sistemas altamente 
              cohesivos que logran asimetría favorable contra la competencia.
            </p>
            <a href="https://facex.com/" className="center-link" target="_blank" rel="noopener noreferrer">
              escalar_sistemas() →
            </a>
          </motion.div>
        </div>
      </section>

      {/* ═══ CONTACT / GLOBAL PRESENCE ═══ */}
      <section className="section" id="contact" style={{ paddingBottom: '0' }}>
        <div className="section-header">
          <Reveal>
            <span className="section-tag">[ NODOS FÍSICOS GLOBALES ]</span>
          </Reveal>
          <LineReveal delay={0.1} />
          <div style={{ marginTop: 'clamp(24px, 3vh, 40px)' }}>
            <Reveal delay={0.2}>
              <h2 className="section-title">OFICINAS</h2>
            </Reveal>
          </div>
        </div>

        <div className="locations-grid">
          {locations.map((loc, i) => (
            <motion.div
              className="location-item hover-target"
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
            >
              <div className="location-country">
                {loc.country}
                {loc.isHQ && <span className="hq-badge">CORE</span>}
              </div>
              <div className="location-data">
                <div className="location-row">
                  <span className="location-label">CH</span>
                  <span>{loc.phone}</span>
                </div>
                <div className="location-row">
                  <span className="location-label">IP</span>
                  <span>{loc.email}</span>
                </div>
                <div className="location-row">
                  <span className="location-label">COORD</span>
                  <span style={{maxWidth: '85%'}}>{loc.address}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="social-links hover-target">
          <a href="https://wa.me/5078345060" className="social-link" target="_blank" rel="noopener noreferrer">WhatsApp</a>
          <span className="social-sep" />
          <a href="https://t.me/FACEXCONSULTING" className="social-link" target="_blank" rel="noopener noreferrer">Telegram</a>
          <span className="social-sep" />
          <a href="https://www.linkedin.com/company/facexconsulting" className="social-link" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <span className="social-sep" />
          <a href="mailto:ventas@facex.com" className="social-link">Mail Server</a>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="footer">
        <div className="footer-inner">
          <span className="footer-copy">
            // STATUS: SECURE © {new Date().getFullYear()} Facex International Holding Inc.
          </span>
          <div className="footer-links">
            <a href="https://facex.com/politicas-de-calidad/" target="_blank" rel="noopener noreferrer">QA / Políticas</a>
            <a href="https://facex.com/terminos-y-condiciones/" target="_blank" rel="noopener noreferrer">EULA / Términos</a>
            <a href="https://facex.com/politica-de-privacidad/" target="_blank" rel="noopener noreferrer">Crypto / Privacidad</a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;