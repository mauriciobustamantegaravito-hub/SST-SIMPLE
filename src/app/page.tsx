import { AnimatedBackground, AnimatedScore } from "@/components/AnimatedEffects";

const Arrow = () => (
  <svg aria-hidden="true" width="15" height="15" viewBox="0 0 15 15" fill="none">
    <path d="M3 12 12 3M5 3h7v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Check = () => <span aria-hidden="true">✓</span>;

const BrandMark = () => (
  <span className="brand-mark" aria-hidden="true">
    <svg viewBox="0 0 32 32" focusable="false">
      <path d="M22.8 8.5c-2.4-1.5-5-2.1-7.3-1.6-2.4.5-3.9 2-3.9 3.8 0 2.2 1.9 3.2 5.3 4.1 3.3.9 4.7 1.8 4.7 3.7 0 2.4-2.1 4.2-5.3 4.2-2.4 0-4.5-.8-6.4-2.4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M20.6 11.2c1.5-2.2 3.5-3.1 5.5-3.2-.2 2.5-1.5 4.3-4.2 4.8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  </span>
);

export default function Home() {
  return (
    <main className="site-shell">
      <AnimatedBackground />
      <header className="container nav">
        <a className="brand" href="#inicio" aria-label="Saanva SST, inicio"><BrandMark /><span>SAANVA SST</span></a>
        <nav className="nav-links" aria-label="Navegación principal">
          <a href="#propuesta">La propuesta</a><a href="#kit">El kit</a><a href="#planes">Planes</a>
          <a className="nav-cta" href="#contacto">Conocer más <Arrow /></a>
        </nav>
      </header>

      <section id="inicio" className="container hero">
        <div className="hero-grid">
          <div>
            <span className="eyebrow">SAANVA SST · Seguridad y Salud en el Trabajo</span>
            <h1 className="display">Organiza tu negocio y mejora la seguridad de tu equipo.</h1>
            <p className="hero-copy">Identifica qué puedes mejorar en el orden y la limpieza de tu negocio, registra acciones con responsables y fechas, y haz seguimiento a tus pendientes. Te guiamos paso a paso.</p>
            <div className="actions"><a className="button button-primary" href="/kit">Empezar paso a paso <Arrow /></a><a className="button button-secondary" href="#kit">Ver cómo funciona</a></div><p className="hero-copy">1. Registra tu negocio → 2. Revisa sus condiciones → 3. Define mejoras → 4. Sigue tu avance</p>
          </div>
          <div className="board" aria-label="Vista previa del tablero Saanva SST">
            <div className="board-inner">
              <div className="board-top"><div><div className="board-label">Ejemplo de cómo verás tu avance</div><div className="board-name">Mi negocio, hoy</div></div><div className="board-date">AVANCE<br />2026</div></div>
              <div className="board-main"><AnimatedScore target={68} /><div><h3>Vas avanzando.</h3><p>Pequeñas acciones visibles para que el orden y la prevención no se queden en una carpeta.</p></div></div>
              <div className="checklist"><div className="check"><span className="check-dot"><Check /></span><span>Pasillos y salidas despejados</span></div><div className="check"><span className="check-dot"><Check /></span><span>Rutina de apertura registrada</span></div><div className="check"><span className="check-dot">·</span><span>Revisar acción pendiente</span></div></div>
              <p className="board-note">Ejemplo ilustrativo: este 68 no es el resultado de tu negocio. El resultado 5S mide organización, no certifica cumplimiento legal.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="intro-strip" aria-label="Público objetivo"><div className="container"><div className="strip-item"><span className="strip-label">Pensado para</span><span className="strip-value">Quienes hacen que el negocio funcione</span></div><div className="strip-item"><span className="strip-label">Contexto</span><span className="strip-value">Plazas</span></div><div className="strip-item"><span className="strip-label">Contexto</span><span className="strip-value">Tiendas</span></div><div className="strip-item"><span className="strip-label">Ciudad inicial</span><span className="strip-value">Bogotá D.C.</span></div></div></section>

      <section id="propuesta" className="container section-pad"><div className="section-head"><div><span className="eyebrow">La idea</span><h2 className="display">No te falta compromiso. Te falta una forma simple de seguirlo.</h2></div><p>Tu día está lleno de ventas, clientes, proveedores e inventario. Saanva SST acerca la prevención a esa realidad, sin llenarla de palabras difíciles.</p></div><div className="story-grid"><div className="story-copy"><h3>Del pendiente en la libreta al siguiente paso claro.</h3><p>SAANVA SST te guía para registrar tu negocio, revisar sus condiciones de orden y limpieza y organizar tareas de mejora. No se trata solo de llenar fichas: se trata de saber qué hacer después.</p><div className="pullquote">“Lo importante es que puedas aplicarlo en tu puesto, incluso en un día ocupado.”</div></div><div className="route" aria-label="Recorrido de Saanva SST"><article className="route-card"><div className="route-number">01</div><h4>Evalúa</h4><p>Observa 25 criterios de orden y hábitos con ejemplos cercanos a tu actividad.</p></article><article className="route-card"><div className="route-number">02</div><h4>Actúa</h4><p>Convierte los hallazgos en acciones con responsable y fecha.</p></article><article className="route-card"><div className="route-number">03</div><h4>Mejora</h4><p>Marca las acciones realizadas y revisa las que siguen pendientes.</p></article></div></div></section>

      <section id="kit" className="kit-section section-pad"><div className="container"><div className="section-head"><div><span className="eyebrow">Kit digital 5S + SST</span><h2 className="display">Cómo funciona: cuatro pasos para empezar.</h2></div><p>Abre cada ficha en este orden. 5S es una revisión de clasificación, orden, limpieza, estandarización y hábitos. Tus datos se guardan en este navegador; no se sincronizan entre dispositivos.</p></div><div className="kit-deck" aria-label="Caja de herramientas, desliza para explorar"><a className="kit-card" href="/kit/mi-negocio"><span className="kit-index">01 / CONFIGURA</span><h3>Mi negocio</h3><p>Registra el nombre, la actividad y los datos básicos de tu negocio.</p></a><a className="kit-card" href="/kit/auditoria-5s"><span className="kit-index">02 / OBSERVA</span><h3>Auditoría 5S</h3><p>25 criterios prácticos para mirar, ordenar y priorizar.</p></a><a className="kit-card" href="/kit/plan-de-accion"><span className="kit-index">03 / RESUELVE</span><h3>Plan de acción</h3><p>Anota el problema, la mejora que harás, el responsable y la fecha límite.</p></a><a className="kit-card" href="/kit/seguimiento"><span className="kit-index">04 / SOSTÉN</span><h3>Seguimiento</h3><p>Consulta cuántas tareas has completado y qué acciones siguen pendientes.</p></a></div><p className="deck-hint">Desliza para explorar la baraja <span aria-hidden="true">→</span></p></div></section>

      <section className="demo section-pad"><div className="container demo-grid"><div><span className="eyebrow">Así se construye el hábito</span><h2 className="display">Una cosa clara a la vez.</h2><p className="demo-copy">Por ejemplo: si encuentras cajas en un pasillo, regístralo en el plan de acción, asigna quién despejará el paso y una fecha. Después marca la tarea como realizada y revisa tu avance.</p><div className="actions"><a className="button button-primary" href="#planes">Explorar la propuesta <Arrow /></a></div></div><div className="timeline"><article className="timeline-item"><div className="timeline-index">01</div><div className="timeline-content"><h3>Conoce tu punto de partida</h3><p>Registra solo la información necesaria del negocio y el contexto del puesto.</p></div></article><article className="timeline-item"><div className="timeline-index">02</div><div className="timeline-content"><h3>Encuentra lo prioritario</h3><p>Usa preguntas y ejemplos sencillos para detectar condiciones que necesitan atención.</p></div></article><article className="timeline-item"><div className="timeline-index">03</div><div className="timeline-content"><h3>Haz seguimiento</h3><p>Vuelve al plan de acción, marca las tareas realizadas y consulta el seguimiento.</p></div></article></div></div></section>

      <section id="planes" className="container section-pad"><div className="section-head"><div><span className="eyebrow">Portafolio inicial</span><h2 className="display">Empieza con una herramienta. Crece con acompañamiento.</h2></div><p>Conoce los paquetes de SAANVA SST. Contáctanos para confirmar qué incluye cada uno y elegir el apoyo que necesitas.</p></div><div className="offers"><article className="offer featured"><div className="offer-top"><h3>Kit digital<br />5S + SST</h3><span className="offer-price">$150.000 COP</span></div><p>Una base editable para comenzar a ordenar actividades, registros, rutinas y seguimiento.</p><ul className="offer-list"><li>Plantillas editables y lista 5S</li><li>Cronograma visual y formatos de apoyo</li><li>Recursos de microaprendizaje</li></ul></article><article className="offer"><div className="offer-top"><h3>Acompañamiento</h3><span className="offer-price">$250.000 COP</span></div><p>Revisión inicial, adaptación de herramientas, capacitación y seguimiento. Alcance y duración por definir.</p><ul className="offer-list"><li>Orientación personalizada</li><li>Herramientas adaptadas al negocio</li><li>Seguimiento acordado</li></ul><div className="actions"><a className="button button-primary" href="https://wa.me/573212604316">Consultar acompañamiento</a></div></article></div><p className="disclaimer">Precios en pesos colombianos. Confirma el alcance del servicio antes de contratar. Saanva SST no promete certificación ni reemplaza evaluaciones profesionales, obligaciones legales o asesoría idónea cuando corresponda.</p></section>

      <footer id="contacto" className="footer"><div className="container footer-grid"><div><a className="brand" href="#inicio"><BrandMark /><span>SAANVA SST</span></a><p>Orden que se ve. Seguridad que se vive.<br />Proyecto académico y emprendedor en construcción.</p></div><div className="footer-meta"><p>Contacto: <a href="tel:+573212604316">321‑260‑4316</a></p><div className="actions"><a className="button button-primary" href="https://wa.me/573212604316">Escríbenos por WhatsApp</a></div><br />SAANVA SST / V.01<br />BOGOTÁ D.C. / 2026</div></div></footer>
    </main>
  );
}

