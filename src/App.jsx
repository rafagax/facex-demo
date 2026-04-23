import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './App.css';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Configuración de animación reutilizable
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const fadeInVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } }
  };

  const scaleInVariant = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const services = [
    {
      title: "Estrategia, Organización y Personas",
      abbr: "EOP",
      description: "Acompañamos a nuestros clientes en la orientación estratégica, análisis organizacional, gestión del cambio y racionalización de equipos que sustentan la operación y mejora continua de sus procesos.",
      link: "https://facex.com/eop/",
      icon: "⚡"
    },
    {
      title: "Procesos, Modelos y Sistemas de Gestión",
      abbr: "PMS",
      description: "Transformamos procesos hacia la excelencia, alineando estructuras organizacionales y desarrollando sistemas de gestión enfocados en estándares internacionales ISO y modelos de clase mundial.",
      link: "https://facex.com/pms/",
      icon: "⚙️"
    },
    {
      title: "Ingeniería, Mantenimiento y Operaciones Industriales",
      abbr: "EMO",
      description: "Desarrollamos soluciones de ingeniería, mantenimiento y operaciones industriales enfocadas en la optimización de procesos, racionalización de recursos y excelencia operacional.",
      link: "https://facex.com/emo/",
      icon: "🏭"
    },
    {
      title: "Gestión de Proyectos y Tecnología de la Información",
      abbr: "PIT",
      description: "Ejecutamos servicios con gestión de proyectos innovadora, desarrollando soluciones tecnológicas adecuadas a las necesidades de nuestros clientes con los enfoques más novedosos.",
      link: "https://facex.com/pit/",
      icon: "💻"
    }
  ];

  const sectors = [
    { name: "Energía, Hidrocarburos y Petroquímica", icon: "🔋" },
    { name: "Infraestructura, Gobierno y Salud", icon: "🏛️" },
    { name: "Laboratorios de Calibración y Ensayo", icon: "🔬" },
    { name: "Manufactura y Servicios", icon: "🏗️" },
    { name: "Servicios Financieros", icon: "💹" },
    { name: "Tecnología y Telecomunicaciones", icon: "📡" }
  ];

  const valueProps = [
    { number: "30+", label: "Años de Experiencia" },
    { number: "200+", label: "Clientes Atendidos" },
    { number: "300+", label: "Proyectos Exitosos" },
    { number: "6", label: "Países con Oficinas" }
  ];

  const locations = [
    {
      country: "Panamá",
      isHQ: true,
      phone: "+507 834-5060",
      email: "ventas@facex.com",
      address: "PH Bay Mall Plaza, Avenida Balboa, Piso 3, Oficina 304. Panamá City."
    },
    {
      country: "Perú",
      phone: "+51 1 718-5177",
      email: "peru@facex.com",
      address: "Calle Las Flores 234, Ofic. 203, San Isidro. Lima."
    },
    {
      country: "Ecuador",
      phone: "+593 99 578 4484",
      email: "ecuador@facex.com",
      address: "Av. Suiza y Checoslovaquia, Edif. Miletus, PB 03-No.04. Quito."
    },
    {
      country: "Colombia",
      phone: "+57 300 929 1607",
      email: "colombia@facex.com",
      address: "Carrera 87 No. 17-35, Torres de Capellania Interior 2-201. Bogotá."
    },
    {
      country: "República Dominicana",
      phone: "+1 829 791-9000",
      email: "rd@facex.com",
      address: "Calle 4, Los Jardines Metropolitanos, Edif. Gilsa B1, Santiago de los Caballeros."
    },
    {
      country: "Venezuela",
      phone: "+58 212 335-7788",
      email: "venezuela@facex.com",
      address: "Av. Ppal. Colinas de Bello Monte, Edif. Centro Comercial Bello Monte, Piso 2, Ofic. 2-K. Caracas."
    }
  ];

  const navLinks = [
    { label: "Inicio", href: "#hero" },
    { label: "Nosotros", href: "#about" },
    { label: "Servicios", href: "#services" },
    { label: "Sectores", href: "#sectors" },
    { label: "Centros", href: "#centers" },
    { label: "Contacto", href: "#contact" }
  ];

  return (
    <>
      <div className="bg-grid"></div>

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="navbar-inner">
          <a href="#hero" className="navbar-logo">
            <span className="glow-text">FACEX</span>
            <span className="logo-sub">CONSULTING GROUP</span>
          </a>

          <button
            className={`hamburger ${menuOpen ? 'active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span></span><span></span><span></span>
          </button>

          <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
            {navLinks.map((link, i) => (
              <li key={i}>
                <a href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</a>
              </li>
            ))}
            <li>
              <a
                href="https://facex.com/contactenos/"
                className="nav-cta"
                target="_blank"
                rel="noopener noreferrer"
              >
                Solicitar Consulta
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* SECCIÓN HERO */}
      <section className="hero" id="hero">
        <motion.div
          className="hero-badge"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Consultoría Especializada desde 1991
        </motion.div>

        <motion.h1
          className="title"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          Impulsamos la <span className="glow-text">Excelencia</span><br />
          Empresarial
        </motion.h1>

        <motion.p
          className="subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Servicios de consultoría de alto valor agregado, innovadores y orientados a resultados.
          Permita que su empresa alcance su máximo potencial con FACEX Consulting Group.
        </motion.p>

        <motion.div
          className="hero-buttons"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <a href="#services" className="btn-primary">Explorar Servicios</a>
          <a
            href="https://facex.com/wp-content/uploads/2023/10/BROCHURE-FACEX-CONSULTING-GROUP-10-2023-2024.pdf"
            className="btn-outline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Descargar Brochure
          </a>
        </motion.div>

        <motion.div
          className="hero-stats"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          {valueProps.map((stat, i) => (
            <div className="hero-stat" key={i}>
              <span className="hero-stat-number glow-text">{stat.number}</span>
              <span className="hero-stat-label">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* SECCIÓN NOSOTROS / ADN */}
      <section className="about-section" id="about">
        <motion.h2
          className="title" style={{ fontSize: '3rem' }}
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          Nuestro <span className="glow-text">ADN</span>
        </motion.h2>

        <motion.p
          className="subtitle about-intro"
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          FACEX Consulting Group es una empresa de consultoría enfocada en servicios de alto valor agregado,
          fundamentados en una amplia base de conocimientos, metodologías probadas e innovadoras, tecnologías de punta,
          un Sistema de Gestión de Excelencia (SIGEX) y un enfoque basado en Normas Internacionales ISO,
          Modelos de Excelencia de clase mundial y el enfoque BPM.
        </motion.p>

        <div className="about-grid">
          <motion.div
            className="about-card"
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="about-card-icon">🎯</div>
            <h3>Misión</h3>
            <p>Prestar servicios de consultoría integrales, adaptables y diferenciados, con personal calificado,
              generando valor para nuestros grupos de interés y enfocados en superar las expectativas de nuestros clientes
              hacia una transformación de excelencia empresarial.</p>
          </motion.div>

          <motion.div
            className="about-card"
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="about-card-icon">🔭</div>
            <h3>Visión</h3>
            <p>Ser reconocidos como una empresa de consultoría con altos niveles de profesionalismo, excelencia
              y calidad de resultados, posicionándonos como líderes en nuestras áreas de conocimiento
              con proyección global internacional.</p>
          </motion.div>

          <motion.div
            className="about-card"
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div className="about-card-icon">💎</div>
            <h3>Valores</h3>
            <p>Excelencia · Sinergia · Excedente de Valor · Integridad · Innovación · Tenacidad.
              Trabajamos y nos preparamos para hacerlo bien y mejor cada vez, con conducta ética y creatividad constante.</p>
          </motion.div>
        </div>
      </section>

      {/* SECCIÓN DE SERVICIOS DE CONSULTORÍA */}
      <section className="services-section" id="services">
        <motion.h2
          className="title" style={{ fontSize: '3rem' }}
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          Servicios de <span className="glow-text">Consultoría</span>
        </motion.h2>

        <motion.p
          className="subtitle"
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Soluciones de consultoría innovadoras, oportunas y orientadas a un esquema práctico, económico y por resultados.
        </motion.p>

        <div className="services-grid">
          {services.map((service, index) => (
            <motion.div
              className="service-card"
              key={index}
              variants={fadeUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
            >
              <div className="scanner-line" style={{ animationDelay: `${index * 0.7}s` }}></div>
              <div className="service-icon">{service.icon}</div>
              <span className="service-abbr">{service.abbr}</span>
              <h3 className="glow-text">{service.title}</h3>
              <p style={{ color: '#a0a0a0' }}>{service.description}</p>
              <a href={service.link} className="service-link" target="_blank" rel="noopener noreferrer">
                Leer más →
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECCIÓN DE SECTORES */}
      <section className="sectors-section" id="sectors">
        <motion.h2
          className="title" style={{ fontSize: '3rem' }}
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          Sectores de <span className="glow-text">Experiencia</span>
        </motion.h2>

        <motion.p
          className="subtitle"
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Más de tres décadas de experiencia en diversos sectores industriales a nivel internacional.
        </motion.p>

        <motion.div
          className="sectors-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {sectors.map((sector, index) => (
            <motion.div
              className="sector-card"
              key={index}
              variants={scaleInVariant}
            >
              <span className="sector-icon">{sector.icon}</span>
              <h4>{sector.name}</h4>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* SECCIÓN PROPUESTA DE VALOR */}
      <section className="value-section">
        <motion.h2
          className="title" style={{ fontSize: '3rem' }}
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          Propuesta de <span className="glow-text">Valor</span>
        </motion.h2>

        <div className="value-grid">
          {[
            {
              title: "Experiencia Internacional",
              desc: "Más de 30 años diseñando y aplicando exitosamente servicios de consultoría en diversos países e industrias."
            },
            {
              title: "Alta Especialización",
              desc: "Empresa mediana con alto nivel de especialización en áreas de conocimiento, a diferencia de grandes corporaciones generalistas."
            },
            {
              title: "Equipo Multidisciplinario",
              desc: "Consultores del más alto nivel, especializados en diversas disciplinas, con presencia local en cada país de operación."
            },
            {
              title: "Metodología Probada",
              desc: "Metodologías diseñadas y probadas en más de 200 clientes y 300 proyectos, basadas en esquemas de clase mundial."
            },
            {
              title: "Oficina de Gestión de Proyectos",
              desc: "FACEX PMO garantiza una óptima gestión de todos los proyectos desarrollados por nuestra empresa."
            },
            {
              title: "Énfasis en Cada Proyecto",
              desc: "Alta dedicación, esfuerzo y compromiso con el éxito en todos y cada uno de nuestros proyectos de consultoría."
            }
          ].map((item, index) => (
            <motion.div
              className="value-card"
              key={index}
              variants={fadeUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="scanner-line" style={{ animationDelay: `${index * 0.5}s` }}></div>
              <h4 className="glow-text">{item.title}</h4>
              <p>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECCIÓN CENTROS ESPECIALIZADOS */}
      <section className="centers-section" id="centers">
        <motion.h2
          className="title" style={{ fontSize: '3rem' }}
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          Centros <span className="glow-text">Especializados</span>
        </motion.h2>

        <div className="centers-grid">
          <motion.div
            className="center-card"
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="scanner-line"></div>
            <div className="center-icon">🎓</div>
            <h3 className="glow-text">Centro de Formación</h3>
            <p style={{ color: '#a0a0a0' }}>
              Especializado en el desarrollo del talento humano empresarial y certificado con la
              Norma ISO 21001:2018 en Sistemas de Gestión para Organizaciones Educativas.
              Unimos la teoría con la práctica mediante metodologías avanzadas de aprendizaje
              con altos estándares de calidad y tecnologías educativas modernas.
            </p>
            <a href="http://www.facexeducation.com/" className="service-link" target="_blank" rel="noopener noreferrer">
              facexeducation.com →
            </a>
          </motion.div>

          <motion.div
            className="center-card"
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="scanner-line" style={{ animationDelay: '1.5s' }}></div>
            <div className="center-icon">🏆</div>
            <h3 className="glow-text">Centro de Excelencia</h3>
            <p style={{ color: '#a0a0a0' }}>
              Enfocado en impulsar el crecimiento de los negocios por medio del modelado, optimización
              y automatización de procesos según el enfoque BPM, el estándar BPMN y herramientas BPMS.
              Desarrollo de modelos y sistemas de gestión eficaces alineados a estándares de clase mundial.
            </p>
            <a href="https://facex.com/" className="service-link" target="_blank" rel="noopener noreferrer">
              facexcellence.com →
            </a>
          </motion.div>
        </div>
      </section>

      {/* SECCIÓN DE CONTACTO / PRESENCIA GLOBAL */}
      <section className="contact-section" id="contact">
        <motion.h2
          className="title"
          style={{ fontSize: '3rem' }}
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Presencia <span className="glow-text">Global</span>
        </motion.h2>

        <motion.p
          className="subtitle"
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Con más de 30 años de trayectoria, FACEX Consulting Group lidera la transformación empresarial
          en Latinoamérica con presencia en 6 países y proyección global internacional.
        </motion.p>

        <div className="locations-grid">
          {locations.map((loc, index) => (
            <motion.div
              key={index}
              className="location-card"
              variants={fadeUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h3>
                {loc.country}
                {loc.isHQ && <span className="hq-badge">Sede Principal</span>}
              </h3>
              <ul className="location-info">
                <li>
                  <span className="icon">📞</span>
                  <span>{loc.phone}</span>
                </li>
                <li>
                  <span className="icon">✉️</span>
                  <span>{loc.email}</span>
                </li>
                <li>
                  <span className="icon">📍</span>
                  <span>{loc.address}</span>
                </li>
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="social-container">
          <motion.a
            href="https://wa.me/5078345060"
            className="social-pill"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>💬</span> WhatsApp
          </motion.a>
          <motion.a
            href="https://t.me/FACEXCONSULTING"
            className="social-pill"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>✈️</span> Telegram
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/company/facexconsulting"
            className="social-pill"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>🔗</span> LinkedIn
          </motion.a>
          <motion.a
            href="mailto:ventas@facex.com"
            className="social-pill"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>📧</span> ventas@facex.com
          </motion.a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="main-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <span className="glow-text" style={{ fontSize: '1.4rem', fontWeight: 700 }}>FACEX</span>
            <span style={{ opacity: 0.6, fontSize: '0.8rem', marginLeft: '8px' }}>CONSULTING GROUP</span>
          </div>
          <p className="footer-copy">
            © {new Date().getFullYear()} Facex International Holding Inc. Todos los derechos reservados.
          </p>
          <div className="footer-links">
            <a href="https://facex.com/politicas-de-calidad/" target="_blank" rel="noopener noreferrer">Políticas de Calidad</a>
            <a href="https://facex.com/terminos-y-condiciones/" target="_blank" rel="noopener noreferrer">Términos y Condiciones</a>
            <a href="https://facex.com/politica-de-privacidad/" target="_blank" rel="noopener noreferrer">Política de Privacidad</a>
            <a href="https://facex.com/contactenos/" target="_blank" rel="noopener noreferrer">Contacto</a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;