import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import './App.css';

/* ══════════════════════════════════════════
   WORD-BY-WORD MASK REVEAL
   ══════════════════════════════════════════ */
const WordReveal = ({ text, delay = 0, as = 'span', className = '' }) => {
  const Tag = motion[as] || motion.span;
  const words = text.split(' ');
  return (
    <span className={`word-reveal ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="word-mask">
          <motion.span
            className="word-inner"
            initial={{ y: '105%' }}
            whileInView={{ y: '0%' }}
            viewport={{ once: true, margin: '-10px' }}
            transition={{ duration: 0.9, delay: delay + i * 0.1, ease: [0.76, 0, 0.24, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

/* ══════════════════════════════════════════
   FADE IN ON SCROLL
   ══════════════════════════════════════════ */
const FadeIn = ({ children, delay = 0, y = 20 }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-20px' }}
    transition={{ duration: 0.9, delay, ease: [0.76, 0, 0.24, 1] }}
  >
    {children}
  </motion.div>
);

/* ══════════════════════════════════════════
   LINE REVEAL
   ══════════════════════════════════════════ */
const Line = ({ delay = 0, cyan = false }) => (
  <motion.div
    className={cyan ? 'divider divider--cyan' : 'divider'}
    initial={{ scaleX: 0 }}
    whileInView={{ scaleX: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 1.4, delay, ease: [0.76, 0, 0.24, 1] }}
    style={{ transformOrigin: 'left' }}
  />
);

/* ══════════════════════════════════════════
   PARTICLE CANVAS — HERO ONLY
   ══════════════════════════════════════════ */
const ParticleCanvas = () => {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W = canvas.width = canvas.offsetWidth;
    let H = canvas.height = canvas.offsetHeight;
    const mouse = { x: W / 2, y: H / 2 };

    const onMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onResize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('resize', onResize);

    const N = 50;
    const pts = Array.from({ length: N }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
    }));

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;

        // Dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.09)';
        ctx.fill();

        // Connection to mouse
        const dm = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        if (dm < 140) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(0,243,255,${(1 - dm / 140) * 0.22})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }

        // Connection to nearby particles
        pts.forEach(q => {
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 90) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(255,255,255,${(1 - d / 90) * 0.04})`;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        });
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', onResize);
    };
  }, []);
  return <canvas ref={ref} className="particle-canvas" />;
};

/* ══════════════════════════════════════════
   SERVICE CARD
   ══════════════════════════════════════════ */
const ServiceCard = ({ service, index }) => {
  const cardRef = useRef(null);
  const [glow, setGlow] = useState({ x: 0, y: 0, show: false });

  const onMove = useCallback((e) => {
    const r = cardRef.current.getBoundingClientRect();
    setGlow({ x: e.clientX - r.left, y: e.clientY - r.top, show: true });
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className="svc-card"
      onMouseMove={onMove}
      onMouseLeave={() => setGlow(g => ({ ...g, show: false }))}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Spotlight */}
      <div
        className="svc-spotlight"
        style={{
          left: glow.x, top: glow.y,
          opacity: glow.show ? 1 : 0
        }}
      />
      {/* Content */}
      <div className="svc-top">
        <span className="svc-code">[ SEC: {String(index + 1).padStart(3, '0')} ]</span>
        <span className="svc-abbr">{service.abbr}</span>
      </div>
      <h3 className="svc-title">{service.title}</h3>
      <p className="svc-desc">{service.description}</p>
      <a href={service.link} className="svc-link" target="_blank" rel="noopener noreferrer">
        Ver detalles →
      </a>
    </motion.div>
  );
};

/* ══════════════════════════════════════════
   MAIN APP
   ══════════════════════════════════════════ */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovering, setHovering] = useState(false);

  // Spring cursor
  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const sx = useSpring(mx, { stiffness: 500, damping: 40 });
  const sy = useSpring(my, { stiffness: 500, damping: 40 });

  useEffect(() => {
    const onMove = (e) => { mx.set(e.clientX); my.set(e.clientY); };
    const onOver = (e) => {
      setHovering(!!e.target.closest('a, button, .svc-card'));
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
      description: "Orientación estratégica, análisis organizacional, gestión del cambio y desarrollo de capacidades humanas.",
      link: "https://facex.com/eop/"
    },
    {
      title: "Procesos, Modelos y Sistemas de Gestión",
      abbr: "PMS",
      description: "Transformación de procesos hacia la excelencia bajo estándares internacionales ISO y el enfoque BPM.",
      link: "https://facex.com/pms/"
    },
    {
      title: "Ingeniería, Mantenimiento y Operaciones",
      abbr: "EMO",
      description: "Soluciones de ingeniería industrial orientadas a la optimización de activos y excelencia operacional.",
      link: "https://facex.com/emo/"
    },
    {
      title: "Gestión de Proyectos y Tecnología",
      abbr: "PIT",
      description: "Gestión avanzada de proyectos PMO e implementaciones tecnológicas con los enfoques más innovadores.",
      link: "https://facex.com/pit/"
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

  const locations = [
    { country: "Panamá", isHQ: true, phone: "+507 834-5060", email: "ventas@facex.com", address: "PH Bay Mall Plaza, Av. Balboa, Piso 3, Of. 304" },
    { country: "Perú", phone: "+51 1 718-5177", email: "peru@facex.com", address: "Calle Las Flores 234, Of. 203, San Isidro, Lima" },
    { country: "Ecuador", phone: "+593 99 578 4484", email: "ecuador@facex.com", address: "Av. Suiza y Checoslovaquia, Edif. Miletus, Quito" },
    { country: "Colombia", phone: "+57 300 929 1607", email: "colombia@facex.com", address: "Cra. 87 No. 17-35, Torres de Capellania, Bogotá" },
    { country: "Rep. Dominicana", phone: "+1 829 791-9000", email: "rd@facex.com", address: "Calle 4, Jardines Metropolitanos, Edif. Gilsa B1, Santiago" },
    { country: "Venezuela", phone: "+58 212 335-7788", email: "venezuela@facex.com", address: "Av. Colinas de Bello Monte, Edif. CC Bello Monte, P2, Of. 2-K, Caracas" }
  ];

  return (
    <>
      {/* FILM GRAIN */}
      <div className="grain" aria-hidden="true" />

      {/* AMBIENT GLOW */}
      <div className="bg-glow" aria-hidden="true">
        <div className="bg-glow__orb bg-glow__orb--a" />
        <div className="bg-glow__orb bg-glow__orb--b" />
      </div>

      {/* CUSTOM CURSOR */}
      <div className="cursor" aria-hidden="true">
        <motion.div
          className="cursor__ring"
          style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
          animate={{
            width: hovering ? 44 : 28,
            height: hovering ? 44 : 28,
            borderColor: hovering ? 'rgba(0,243,255,0.7)' : 'rgba(255,255,255,0.25)'
          }}
          transition={{ duration: 0.25 }}
        />
        <motion.div
          className="cursor__dot"
          style={{ x: mx, y: my, translateX: '-50%', translateY: '-50%' }}
        />
      </div>

      {/* ══════════════════════════════════════
          NAV
          ══════════════════════════════════════ */}
      <nav className="nav" role="navigation">
        <div className="nav__inner">
          {/* Logo */}
          <a href="#hero" className="nav__brand">
            <span className="nav__brand-dot" aria-hidden="true" />
            <span className="nav__brand-name">FACEX</span>
            <span className="nav__brand-divider" aria-hidden="true" />
            <span className="nav__brand-sub">Consulting Group</span>
          </a>

          {/* Desktop links */}
          <ul className={`nav__links ${menuOpen ? 'nav__links--open' : ''}`} role="list">
            {['#about', '#services', '#sectors', '#contact'].map((href, i) => (
              <li key={i}>
                <a href={href} onClick={() => setMenuOpen(false)}>
                  {['Nosotros', 'Servicios', 'Sectores', 'Contacto'][i]}
                </a>
              </li>
            ))}
            <li>
              <a
                href="https://facex.com/contactenos/"
                className="nav__cta"
                target="_blank"
                rel="noopener noreferrer"
              >
                Solicitar Consulta
              </a>
            </li>
          </ul>

          {/* Hamburger */}
          <button
            className={`hamburger ${menuOpen ? 'hamburger--active' : ''}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* ══════════════════════════════════════
          HERO
          ══════════════════════════════════════ */}
      <section className="hero" id="hero">
        <ParticleCanvas />

        <div className="hero__inner">
          {/* Tag line */}
          <FadeIn delay={0.1}>
            <p className="hero__eyebrow">
              <span className="cyan-dot" aria-hidden="true" />
              EST. 1991 — Consultoría Internacional
            </p>
          </FadeIn>

          {/* Main title */}
          <h1 className="hero__title">
            <WordReveal text="Impulsamos" delay={0.2} />
            <br />
            <WordReveal text="la Excelencia" delay={0.35} className="hero__title--outline" />
            <br />
            <WordReveal text="Empresarial" delay={0.55} />
          </h1>

          {/* Accent line */}
          <div className="hero__line">
            <Line cyan delay={0.8} />
          </div>

          {/* Sub copy + CTAs */}
          <div className="hero__footer">
            <FadeIn delay={0.9} y={16}>
              <p className="hero__sub">
                Servicios de consultoría de alto valor agregado, innovadores y orientados
                a resultados concretos. Presencia en 6 países con más de 300 proyectos
                ejecutados exitosamente.
              </p>
            </FadeIn>
            <FadeIn delay={1.05} y={16}>
              <div className="hero__ctas">
                <a href="#services" className="btn btn--solid">Explorar Servicios</a>
                <a
                  href="https://facex.com/wp-content/uploads/2023/10/BROCHURE-FACEX-CONSULTING-GROUP-10-2023-2024.pdf"
                  className="btn btn--ghost"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Descargar Brochure ↗
                </a>
              </div>
            </FadeIn>
          </div>

          {/* Metrics */}
          <div className="hero__metrics">
            {[
              { num: '30+', label: 'Años de experiencia' },
              { num: '200+', label: 'Clientes atendidos' },
              { num: '300+', label: 'Proyectos exitosos' },
              { num: '06', label: 'Países con oficinas' },
            ].map((m, i) => (
              <motion.div
                key={i}
                className="metric"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + i * 0.1, duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
              >
                <span className="metric__num">{m.num}</span>
                <span className="metric__label">{m.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          DATA TICKER
          ══════════════════════════════════════ */}
      <div className="ticker" aria-hidden="true">
        <div className="ticker__track">
          {Array(4).fill([
            '// SISTEMA ACTIVO', 'ISO 9001:2015', 'EST. 1991',
            'PANAMÁ HQ', '200+ CLIENTES', '300+ PROYECTOS', 'LATAM COVERAGE'
          ]).flat().map((t, i) => (
            <span key={i} className="ticker__item">{t}</span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════
          ABOUT
          ══════════════════════════════════════ */}
      <section className="section" id="about">
        <div className="section__inner">
          <header className="section__header">
            <FadeIn>
              <span className="section__tag">[ Conózcanos ]</span>
            </FadeIn>
            <Line delay={0.1} />
            <div className="section__title-wrap">
              <WordReveal text="Nuestro ADN" delay={0.2} className="section__title" />
            </div>
          </header>

          <FadeIn delay={0.3}>
            <p className="about__lead">
              FACEX Consulting Group es una empresa de consultoría enfocada en servicios de
              alto valor agregado, fundamentados en metodologías probadas, tecnologías de punta
              y un Sistema de Gestión de Excelencia certificado bajo Normas ISO y el enfoque BPM.
            </p>
          </FadeIn>

          <div className="about__rows">
            {[
              {
                code: 'ADN: 001', label: 'MISIÓN',
                title: 'Excelencia en Gestión',
                text: 'Prestar servicios de consultoría integrales, adaptables y diferenciados, generando valor para nuestros grupos de interés y enfocados en superar las expectativas de nuestros clientes.'
              },
              {
                code: 'ADN: 002', label: 'VISIÓN',
                title: 'Liderazgo Global',
                text: 'Ser reconocidos como empresa de consultoría con altos niveles de profesionalismo, excelencia y calidad de resultados, posicionándonos como líderes con proyección internacional.'
              },
              {
                code: 'ADN: 003', label: 'VALORES',
                title: 'Principios Fundamentales',
                text: 'Excelencia — Sinergia — Excedente de Valor — Integridad — Innovación — Tenacidad. Trabajamos y nos preparamos para hacerlo mejor cada vez.'
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="about__row"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.8, delay: i * 0.12 }}
              >
                <div className="about__row-meta">
                  <span className="about__row-code">[ {item.code} ]</span>
                  <span className="about__row-label">{item.label}</span>
                </div>
                <div className="about__row-body">
                  <h3 className="about__row-title">{item.title}</h3>
                  <p className="about__row-text">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SERVICES
          ══════════════════════════════════════ */}
      <section className="section section--alt" id="services">
        <div className="section__inner">
          <header className="section__header">
            <FadeIn>
              <span className="section__tag">[ Servicios de Consultoría ]</span>
            </FadeIn>
            <Line delay={0.1} />
            <div className="section__title-wrap">
              <WordReveal text="Consultoría Especializada" delay={0.2} className="section__title" />
            </div>
            <FadeIn delay={0.4}>
              <p className="section__sub">
                Soluciones innovadoras, oportunas y orientadas a resultados prácticos y medibles.
              </p>
            </FadeIn>
          </header>

          <div className="svc-grid">
            {services.map((svc, i) => (
              <ServiceCard key={i} service={svc} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTORS
          ══════════════════════════════════════ */}
      <section className="section" id="sectors">
        <div className="section__inner">
          <header className="section__header">
            <FadeIn>
              <span className="section__tag">[ Experiencia Sectorial ]</span>
            </FadeIn>
            <Line delay={0.1} />
            <div className="section__title-wrap">
              <WordReveal text="Sectores" delay={0.2} className="section__title" />
            </div>
          </header>

          <div className="sectors">
            {sectors.map((name, i) => (
              <motion.div
                key={i}
                className="sector"
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-10px' }}
                transition={{ duration: 0.6, delay: i * 0.07 }}
              >
                <span className="sector__num">{String(i + 1).padStart(2, '0')}</span>
                <span className="sector__name">{name}</span>
                <span className="sector__arrow">→</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          VALUE PROPS
          ══════════════════════════════════════ */}
      <section className="section section--alt">
        <div className="section__inner">
          <header className="section__header">
            <FadeIn>
              <span className="section__tag">[ Propuesta de Valor ]</span>
            </FadeIn>
            <Line delay={0.1} />
            <div className="section__title-wrap">
              <WordReveal text="Por qué FACEX" delay={0.2} className="section__title" />
            </div>
          </header>

          <div className="value-grid">
            {[
              { title: "Experiencia Internacional", desc: "Más de 30 años diseñando y aplicando servicios de consultoría en diversos países e industrias." },
              { title: "Alta Especialización", desc: "Empresa mediana con alto nivel de especialización, a diferencia de grandes corporaciones generalistas." },
              { title: "Equipo Multidisciplinario", desc: "Consultores del más alto nivel especializados en diversas disciplinas con presencia local en cada país." },
              { title: "Metodología Probada", desc: "Metodologías aplicadas en más de 200 clientes y 300 proyectos, basadas en esquemas de clase mundial." },
              { title: "Oficina PMO", desc: "FACEX PMO garantiza una óptima gestión de todos los proyectos desarrollados por nuestra empresa." },
              { title: "Énfasis en Resultados", desc: "Alta dedicación, esfuerzo y compromiso con el éxito de cada proyecto de consultoría." },
            ].map((v, i) => (
              <motion.div
                key={i}
                className="value-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10px' }}
                transition={{ duration: 0.7, delay: i * 0.08 }}
              >
                <span className="value-card__code">[ {String(i + 1).padStart(2, '0')} ]</span>
                <h4 className="value-card__title">{v.title}</h4>
                <p className="value-card__text">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CONTACT / LOCATIONS
          ══════════════════════════════════════ */}
      <section className="section" id="contact">
        <div className="section__inner">
          <header className="section__header">
            <FadeIn>
              <span className="section__tag">[ Presencia Global ]</span>
            </FadeIn>
            <Line delay={0.1} />
            <div className="section__title-wrap">
              <WordReveal text="Nuestras Oficinas" delay={0.2} className="section__title" />
            </div>
            <FadeIn delay={0.4}>
              <p className="section__sub">
                Con más de 30 años de trayectoria, lideramos la transformación empresarial
                en Latinoamérica desde 6 países estratégicos.
              </p>
            </FadeIn>
          </header>

          <div className="locations-grid">
            {locations.map((loc, i) => (
              <motion.div
                key={i}
                className="loc-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10px' }}
                transition={{ duration: 0.7, delay: i * 0.08 }}
              >
                <div className="loc-card__header">
                  <h3 className="loc-card__country">{loc.country}</h3>
                  {loc.isHQ && <span className="loc-card__badge">HQ</span>}
                </div>
                <dl className="loc-card__data">
                  <div className="loc-card__row">
                    <dt>Teléfono</dt>
                    <dd>{loc.phone}</dd>
                  </div>
                  <div className="loc-card__row">
                    <dt>Email</dt>
                    <dd>{loc.email}</dd>
                  </div>
                  <div className="loc-card__row">
                    <dt>Dirección</dt>
                    <dd>{loc.address}</dd>
                  </div>
                </dl>
              </motion.div>
            ))}
          </div>

          {/* Social strip */}
          <div className="social-strip">
            {[
              { label: 'WhatsApp', href: 'https://wa.me/5078345060' },
              { label: 'Telegram', href: 'https://t.me/FACEXCONSULTING' },
              { label: 'LinkedIn', href: 'https://www.linkedin.com/company/facexconsulting' },
              { label: 'ventas@facex.com', href: 'mailto:ventas@facex.com' },
            ].map((s, i) => (
              <React.Fragment key={i}>
                {i > 0 && <span className="social-strip__sep" aria-hidden="true" />}
                <a href={s.href} className="social-strip__link" target={s.href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer">
                  {s.label}
                </a>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FOOTER
          ══════════════════════════════════════ */}
      <footer className="footer">
        <div className="footer__inner">
          <span className="footer__copy">
            © {new Date().getFullYear()} Facex International Holding Inc. Todos los derechos reservados.
          </span>
          <nav className="footer__links" aria-label="Footer navigation">
            <a href="https://facex.com/politicas-de-calidad/" target="_blank" rel="noopener noreferrer">Políticas</a>
            <a href="https://facex.com/terminos-y-condiciones/" target="_blank" rel="noopener noreferrer">Términos</a>
            <a href="https://facex.com/politica-de-privacidad/" target="_blank" rel="noopener noreferrer">Privacidad</a>
          </nav>
        </div>
      </footer>

      {/* ══════════════════════════════════════
          WHATSAPP FLOATING BUTTON
          ══════════════════════════════════════ */}
      <motion.a
        href="https://wa.me/5078345060"
        className="wa-float"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.5, ease: 'backOut' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        <span>WhatsApp</span>
      </motion.a>
    </>
  );
}