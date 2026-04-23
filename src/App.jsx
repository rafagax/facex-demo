import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './App.css';

/* ── Reusable Text Reveal Wrapper ── */
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

/* ── Animated 1px Line ── */
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

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const services = [
    {
      title: "Estrategia, Organización y Personas",
      abbr: "EOP",
      description: "Acompañamos a nuestros clientes en la orientación estratégica, análisis organizacional, gestión del cambio y racionalización de equipos que sustentan la operación y mejora continua de sus procesos.",
      link: "https://facex.com/eop/"
    },
    {
      title: "Procesos, Modelos y Sistemas de Gestión",
      abbr: "PMS",
      description: "Transformamos procesos hacia la excelencia, alineando estructuras organizacionales y desarrollando sistemas de gestión enfocados en estándares internacionales ISO y modelos de clase mundial.",
      link: "https://facex.com/pms/"
    },
    {
      title: "Ingeniería, Mantenimiento y Operaciones Industriales",
      abbr: "EMO",
      description: "Desarrollamos soluciones de ingeniería, mantenimiento y operaciones industriales enfocadas en la optimización de procesos, racionalización de recursos y excelencia operacional.",
      link: "https://facex.com/emo/"
    },
    {
      title: "Gestión de Proyectos y Tecnología de la Información",
      abbr: "PIT",
      description: "Ejecutamos servicios con gestión de proyectos innovadora, desarrollando soluciones tecnológicas adecuadas a las necesidades de nuestros clientes con los enfoques más novedosos.",
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

  const valueProps = [
    { title: "Experiencia Internacional", desc: "Más de 30 años diseñando y aplicando exitosamente servicios de consultoría en diversos países e industrias." },
    { title: "Alta Especialización", desc: "Empresa mediana con alto nivel de especialización, a diferencia de grandes corporaciones generalistas." },
    { title: "Equipo Multidisciplinario", desc: "Consultores del más alto nivel, especializados en diversas disciplinas, con presencia local en cada país." },
    { title: "Metodología Probada", desc: "Metodologías probadas en más de 200 clientes y 300 proyectos, basadas en esquemas de clase mundial." },
    { title: "Oficina de Gestión de Proyectos", desc: "FACEX PMO garantiza una óptima gestión de todos los proyectos desarrollados." },
    { title: "Énfasis en Cada Proyecto", desc: "Alta dedicación, esfuerzo y compromiso con el éxito en cada uno de nuestros proyectos." }
  ];

  const locations = [
    { country: "Panamá", isHQ: true, phone: "+507 834-5060", email: "ventas@facex.com", address: "PH Bay Mall Plaza, Av. Balboa, Piso 3, Of. 304, Panamá City." },
    { country: "Perú", phone: "+51 1 718-5177", email: "peru@facex.com", address: "Calle Las Flores 234, Of. 203, San Isidro, Lima." },
    { country: "Ecuador", phone: "+593 99 578 4484", email: "ecuador@facex.com", address: "Av. Suiza y Checoslovaquia, Edif. Miletus, PB 03-No.04, Quito." },
    { country: "Colombia", phone: "+57 300 929 1607", email: "colombia@facex.com", address: "Carrera 87 No. 17-35, Torres de Capellania Int. 2-201, Bogotá." },
    { country: "Rep. Dominicana", phone: "+1 829 791-9000", email: "rd@facex.com", address: "Calle 4, Jardines Metropolitanos, Edif. Gilsa B1, Santiago." },
    { country: "Venezuela", phone: "+58 212 335-7788", email: "venezuela@facex.com", address: "Av. Ppal. Colinas de Bello Monte, Edif. CC Bello Monte, P2, Of. 2-K, Caracas." }
  ];

  const navLinks = [
    { label: "Nosotros", href: "#about" },
    { label: "Servicios", href: "#services" },
    { label: "Sectores", href: "#sectors" },
    { label: "Contacto", href: "#contact" }
  ];

  return (
    <>
      <div className="grain" />

      {/* ═══ NAVIGATION ═══ */}
      <nav className="nav">
        <div className="nav-inner">
          <a href="#hero" className="nav-brand">
            <span className="status-dot" />
            <span className="nav-brand-name">FACEX</span>
            <span className="nav-brand-sub">Consulting Group</span>
          </a>

          <button
            className={`hamburger ${menuOpen ? 'active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>

          <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
            {navLinks.map((link, i) => (
              <li key={i}>
                <a href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</a>
              </li>
            ))}
            <li>
              <a href="https://facex.com/contactenos/" className="nav-cta" target="_blank" rel="noopener noreferrer">
                Solicitar Consulta
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <section className="hero" id="hero">
        <div className="hero-inner">
          <div className="hero-tag">
            <Reveal>
              <span className="tag">[ EST. 1991 — Consultoría Empresarial ]</span>
            </Reveal>
          </div>

          <h1 className="hero-title">
            <Reveal>IMPULSAMOS</Reveal>
            <Reveal delay={0.1}>LA <span className="accent-word">EXCELENCIA</span></Reveal>
            <Reveal delay={0.2}>EMPRESARIAL</Reveal>
          </h1>

          <div className="hero-line">
            <LineReveal accent delay={0.4} />
          </div>

          <div className="hero-bottom">
            <Reveal delay={0.5}>
              <p className="hero-sub">
                Servicios de consultoría de alto valor agregado, innovadores
                y orientados a resultados. Permita que su empresa alcance
                su máximo potencial con más de 30 años de experiencia en
                transformación empresarial.
              </p>
            </Reveal>
            <Reveal delay={0.6}>
              <div className="hero-cta-group">
                <a href="#services" className="btn btn--fill">Explorar Servicios</a>
                <a
                  href="https://facex.com/wp-content/uploads/2023/10/BROCHURE-FACEX-CONSULTING-GROUP-10-2023-2024.pdf"
                  className="btn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Brochure ↗
                </a>
              </div>
            </Reveal>
          </div>

          <div className="hero-stats">
            {[
              { num: "30+", label: "Años" },
              { num: "200+", label: "Clientes" },
              { num: "300+", label: "Proyectos" },
              { num: "06", label: "Países" }
            ].map((s, i) => (
              <Reveal key={i} delay={0.7 + i * 0.1}>
                <div className="hero-stat">
                  <span className="hero-stat-num">{s.num}</span>
                  <span className="hero-stat-label">{s.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ABOUT / ADN ═══ */}
      <section className="section" id="about">
        <div className="section-header">
          <Reveal>
            <span className="section-tag">[ Conózcanos ]</span>
          </Reveal>
          <LineReveal delay={0.1} />
          <div style={{ marginTop: 'clamp(24px, 3vh, 40px)' }}>
            <Reveal delay={0.2}>
              <h2 className="section-title">NUESTRO ADN</h2>
            </Reveal>
          </div>
          <Reveal delay={0.3}>
            <p className="about-intro">
              FACEX Consulting Group es una empresa de consultoría enfocada en servicios
              de alto valor agregado, fundamentados en una amplia base de conocimientos,
              metodologías probadas, tecnologías de punta y un Sistema de Gestión de
              Excelencia certificado bajo Normas Internacionales ISO y el enfoque BPM.
            </p>
          </Reveal>
        </div>

        <div className="about-items">
          {[
            {
              idx: "001 — MISIÓN",
              title: "Excelencia en Gestión",
              text: "Prestar servicios de consultoría integrales, adaptables y diferenciados, con personal calificado, generando valor para nuestros grupos de interés y enfocados en superar las expectativas de nuestros clientes hacia una transformación de excelencia empresarial."
            },
            {
              idx: "002 — VISIÓN",
              title: "Liderazgo Global",
              text: "Ser reconocidos como una empresa de consultoría con altos niveles de profesionalismo, excelencia y calidad de resultados, posicionándonos como líderes en nuestras áreas de conocimiento con proyección global internacional."
            },
            {
              idx: "003 — VALORES",
              title: "Principios Fundamentales",
              text: "Excelencia — Trabajamos para hacerlo mejor cada vez. Sinergia — Equipos entre aliados y clientes. Integridad — Conducta ética en todos los ámbitos. Innovación — Creatividad constante. Tenacidad — Dedicación y empeño."
            }
          ].map((item, i) => (
            <motion.div
              className="about-item"
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

      {/* ═══ SERVICES ═══ */}
      <section className="section" id="services">
        <div className="section-header">
          <Reveal>
            <span className="section-tag">[ Servicios de Consultoría ]</span>
          </Reveal>
          <LineReveal delay={0.1} />
          <div style={{ marginTop: 'clamp(24px, 3vh, 40px)' }}>
            <Reveal delay={0.2}>
              <h2 className="section-title">CONSULTORÍA<br />ESPECIALIZADA</h2>
            </Reveal>
          </div>
        </div>

        <div className="services-list">
          {services.map((service, i) => (
            <motion.div
              className={`service-item ${i % 2 !== 0 ? 'service-item--reverse' : ''}`}
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="service-title-col">
                <span className="service-idx">[ IDX: {String(i + 1).padStart(3, '0')} — {service.abbr} ]</span>
                <Reveal>
                  <h3 className="service-name">{service.title}</h3>
                </Reveal>
              </div>
              <div className="service-desc-col">
                <p className="service-desc">{service.description}</p>
                <a href={service.link} className="service-link" target="_blank" rel="noopener noreferrer">
                  Explorar →
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══ SECTORS ═══ */}
      <section className="section" id="sectors">
        <div className="section-header">
          <Reveal>
            <span className="section-tag">[ Experiencia Sectorial ]</span>
          </Reveal>
          <LineReveal delay={0.1} />
          <div style={{ marginTop: 'clamp(24px, 3vh, 40px)' }}>
            <Reveal delay={0.2}>
              <h2 className="section-title">SECTORES</h2>
            </Reveal>
          </div>
        </div>

        <div className="sectors-list">
          {sectors.map((sector, i) => (
            <motion.div
              className="sector-row"
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

      {/* ═══ VALUE PROPOSITION ═══ */}
      <section className="section">
        <div className="section-header">
          <Reveal>
            <span className="section-tag">[ Propuesta de Valor ]</span>
          </Reveal>
          <LineReveal delay={0.1} />
          <div style={{ marginTop: 'clamp(24px, 3vh, 40px)' }}>
            <Reveal delay={0.2}>
              <h2 className="section-title">POR QUÉ<br />FACEX</h2>
            </Reveal>
          </div>
        </div>

        <div className="value-grid">
          {valueProps.map((item, i) => (
            <motion.div
              className="value-item"
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <span className="value-idx">[ {String(i + 1).padStart(2, '0')} ]</span>
              <h4 className="value-title">{item.title}</h4>
              <p className="value-text">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══ CENTERS ═══ */}
      <section className="section" id="centers">
        <div className="section-header">
          <Reveal>
            <span className="section-tag">[ Centros Especializados ]</span>
          </Reveal>
          <LineReveal delay={0.1} />
          <div style={{ marginTop: 'clamp(24px, 3vh, 40px)' }}>
            <Reveal delay={0.2}>
              <h2 className="section-title">CENTROS</h2>
            </Reveal>
          </div>
        </div>

        <div className="centers-grid">
          <motion.div
            className="center-item"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="center-idx">[ FACEX EDUCATION ]</span>
            <h3 className="center-name">Centro de Formación</h3>
            <p className="center-text">
              Especializado en el desarrollo del talento humano empresarial
              y certificado con la Norma ISO 21001:2018 en Sistemas de Gestión
              para Organizaciones Educativas. Unimos teoría y práctica mediante
              metodologías avanzadas con altos estándares de calidad.
            </p>
            <a href="http://www.facexeducation.com/" className="center-link" target="_blank" rel="noopener noreferrer">
              facexeducation.com →
            </a>
          </motion.div>

          <motion.div
            className="center-item"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <span className="center-idx">[ FACEX EXCELLENCE ]</span>
            <h3 className="center-name">Centro de Excelencia</h3>
            <p className="center-text">
              Enfocado en impulsar el crecimiento empresarial por medio del
              modelado, optimización y automatización de procesos según el
              enfoque BPM, estándar BPMN y herramientas BPMS. Desarrollo de
              modelos de gestión alineados a estándares de clase mundial.
            </p>
            <a href="https://facex.com/" className="center-link" target="_blank" rel="noopener noreferrer">
              facexcellence.com →
            </a>
          </motion.div>
        </div>
      </section>

      {/* ═══ CONTACT / GLOBAL PRESENCE ═══ */}
      <section className="section" id="contact">
        <div className="section-header">
          <Reveal>
            <span className="section-tag">[ Presencia Global ]</span>
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
              className="location-item"
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
            >
              <div className="location-country">
                {loc.country}
                {loc.isHQ && <span className="hq-badge">HQ</span>}
              </div>
              <div className="location-data">
                <div className="location-row">
                  <span className="location-label">T</span>
                  <span>{loc.phone}</span>
                </div>
                <div className="location-row">
                  <span className="location-label">E</span>
                  <span>{loc.email}</span>
                </div>
                <div className="location-row">
                  <span className="location-label">A</span>
                  <span>{loc.address}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="social-links">
          <a href="https://wa.me/5078345060" className="social-link" target="_blank" rel="noopener noreferrer">WhatsApp</a>
          <span className="social-sep" />
          <a href="https://t.me/FACEXCONSULTING" className="social-link" target="_blank" rel="noopener noreferrer">Telegram</a>
          <span className="social-sep" />
          <a href="https://www.linkedin.com/company/facexconsulting" className="social-link" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <span className="social-sep" />
          <a href="mailto:ventas@facex.com" className="social-link">ventas@facex.com</a>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="footer">
        <div className="footer-inner">
          <span className="footer-copy">
            © {new Date().getFullYear()} Facex International Holding Inc.
          </span>
          <div className="footer-links">
            <a href="https://facex.com/politicas-de-calidad/" target="_blank" rel="noopener noreferrer">Políticas</a>
            <a href="https://facex.com/terminos-y-condiciones/" target="_blank" rel="noopener noreferrer">Términos</a>
            <a href="https://facex.com/politica-de-privacidad/" target="_blank" rel="noopener noreferrer">Privacidad</a>
            <a href="https://facex.com/contactenos/" target="_blank" rel="noopener noreferrer">Contacto</a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;