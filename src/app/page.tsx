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
            <span className="eyebrow">Acompañamiento práctico en SST</span>
            <h1 className="display" aria-label="La prevención también puede ser simple."><span className="hero-word">La</span>{" "}<span className="hero-word">prevención</span>{" "}<span className="hero-word">también</span>{" "}<span className="hero-word">puede</span>{" "}<span className="hero-word">ser</span>{" "}<em className="hero-word">simple.</em></h1>
            <p className="hero-copy">Una forma clara de organizar tu puesto, identificar lo prioritario y convertir la seguridad en una rutina posible para tu negocio.</p>
            <div className="actions"><a className="button button-primary" href="#propuesta">Ver cómo funciona <Arrow /></a><a className="button button-secondary" href="#kit">Conocer el kit</a></div>
          </div>
          <div className="board" aria-label="Vista previa del tablero Saanva SST">
            <div className="board-inner">
              <div className="board-top"><div><div className="board-label">Saanva SST / tablero de control</div><div className="board-name">Mi negocio, hoy</div></div><div className="board-date">AVANCE<br />2026</div></div>
              <div className="board-main"><AnimatedScore target={68} /><div><h3>Vas avanzando.</h3><p>Pequeñas acciones visibles para que el orden y la prevención no se queden en una carpeta.</p></div></div>
              <div className="checklist"><div className="check"><span className="check-dot"><Check /></span><span>Pasillos y salidas despejados</span></div><div className="check"><span className="check-dot"><Check /></span><span>Rutina de apertura registrada</span></div><div className="check"><span className="check-dot">·</span><span>Revisar acción pendiente</span></div></div>
              <p className="board-note">* Vista conceptual. El resultado 5S es una medida de organización y no equivale a cumplimiento legal.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="intro-strip" aria-label="Público objetivo"><div className="container"><div className="strip-item"><span className="strip-label">Pensado para</span><span className="strip-value">Quienes hacen que el negocio funcione</span></div><div className="strip-item"><span className="strip-label">Contexto</span><span className="strip-value">Plazas</span></div><div className="strip-item"><span className="strip-label">Contexto</span><span className="strip-value">Tiendas</span></div><div className="strip-item"><span className="strip-label">Ciudad inicial</span><span className="strip-value">Bogotá D.C.</span></div></div></section>

      <section id="propuesta" className="container section-pad"><div className="section-head"><div><span className="eyebrow">La idea</span><h2 className="display">No te falta compromiso. Te falta una forma simple de seguirlo.</h2></div><p>Tu día está lleno de ventas, clientes, proveedores e inventario. Saanva SST acerca la prevención a esa realidad, sin llenarla de palabras difíciles.</p></div><div className="story-grid"><div className="story-copy"><h3>Del pendiente en la libreta al siguiente paso claro.</h3><p>La propuesta combina orientación, herramientas editables, microaprendizaje y seguimiento. No se trata solo de entregar formatos: se trata de ayudarte a usarlos.</p><div className="pullquote">“Lo importante es que puedas aplicarlo en tu puesto, incluso en un día ocupado.”</div></div><div className="route" aria-label="Recorrido de Saanva SST"><article className="route-card"><div className="route-number">01</div><h4>Evalúa</h4><p>Observa 25 criterios de orden y hábitos con ejemplos cercanos a tu actividad.</p></article><article className="route-card"><div className="route-number">02</div><h4>Actúa</h4><p>Convierte los hallazgos en acciones con responsable, prioridad y fecha.</p></article><article className="route-card"><div className="route-number">03</div><h4>Mejora</h4><p>Programa, registra y revisa lo que cambia con el paso de las semanas.</p></article></div></div></section>

      <section id="kit" className="kit-section section-pad"><div className="container"><div className="section-head"><div><span className="eyebrow">Kit digital 5S + SST</span><h2 className="display">Una caja de herramientas para volver visible el cuidado.</h2></div><p>El kit reúne los formatos de trabajo y los ordena para que tengan sentido en la jornada.</p></div><div className="kit-deck" aria-label="Caja de herramientas, desliza para explorar"><a className="kit-card" href="/kit/mi-negocio"><span className="kit-index">01 / CONFIGURA</span><h3>Mi negocio</h3><p>La ficha mínima para adaptar el tablero a tu puesto o tienda.</p></a><a className="kit-card" href="/kit/auditoria-5s"><span className="kit-index">02 / OBSERVA</span><h3>Auditoría 5S</h3><p>25 criterios prácticos para mirar, ordenar y priorizar.</p></a><a className="kit-card" href="/kit/plan-de-accion"><span className="kit-index">03 / RESUELVE</span><h3>Plan de acción</h3><p>Hallazgos, medidas, responsables, fechas y evidencias.</p></a><a className="kit-card" href="/kit/seguimiento"><span className="kit-index">04 / SOSTÉN</span><h3>Rutinas</h3><p>Cronograma, inspecciones, peligros y microcapacitaciones.</p></a></div><p className="deck-hint">Desliza para explorar la baraja <span aria-hidden="true">→</span></p></div></section>

      <section className="demo section-pad"><div className="container demo-grid"><div><span className="eyebrow">Así se construye el hábito</span><h2 className="display">Una cosa clara a la vez.</h2><p className="demo-copy">La página que estamos creando no mostrará una plataforma complicada. Mostrará cómo una persona ocupada puede avanzar con pasos pequeños y visibles.</p><div className="actions"><a className="button button-primary" href="#planes">Explorar la propuesta <Arrow /></a></div></div><div className="timeline"><article className="timeline-item"><div className="timeline-index">01</div><div className="timeline-content"><h3>Conoce tu punto de partida</h3><p>Registra solo la información necesaria del negocio y el contexto del puesto.</p></div></article><article className="timeline-item"><div className="timeline-index">02</div><div className="timeline-content"><h3>Encuentra lo prioritario</h3><p>Usa preguntas y ejemplos sencillos para detectar condiciones que necesitan atención.</p></div></article><article className="timeline-item"><div className="timeline-index">03</div><div className="timeline-content"><h3>Haz seguimiento</h3><p>Vuelve al tablero, revisa pendientes y conserva evidencia de lo que sí cambió.</p></div></article></div></div></section>

      <section id="planes" className="container section-pad"><div className="section-head"><div><span className="eyebrow">Portafolio inicial</span><h2 className="display">Empieza con una herramienta. Crece con acompañamiento.</h2></div><p>Estos valores aparecen como hipótesis iniciales en el documento de trabajo. Se validarán con comerciantes antes de publicarlos como oferta final.</p></div><div className="offers"><article className="offer featured"><div className="offer-top"><h3>Kit digital<br />5S + SST</h3><span className="offer-price">$59.900</span></div><p>Una base editable para comenzar a ordenar actividades, registros, rutinas y seguimiento.</p><ul className="offer-list"><li>Plantillas editables y lista 5S</li><li>Cronograma visual y formatos de apoyo</li><li>Recursos de microaprendizaje</li></ul></article><article className="offer"><div className="offer-top"><h3>Acompañamiento</h3><span className="offer-price">$250.000</span></div><p>Revisión inicial, adaptación de herramientas, capacitación y seguimiento. Alcance y duración por definir.</p><ul className="offer-list"><li>Orientación personalizada</li><li>Herramientas adaptadas al negocio</li><li>Seguimiento acordado</li></ul></article></div><p className="disclaimer">Los precios son hipótesis de validación. Saanva SST no promete certificación ni reemplaza evaluaciones profesionales, obligaciones legales o asesoría idónea cuando corresponda.</p></section>

      <footer id="contacto" className="footer"><div className="container footer-grid"><div><a className="brand" href="#inicio"><BrandMark /><span>SAANVA SST</span></a><p>Orden que se ve. Seguridad que se vive.<br />Proyecto académico y emprendedor en construcción.</p></div><div className="footer-meta">SAANVA SST / V.01<br />BOGOTÁ D.C. / 2026</div></div></footer>
    </main>
  );
}

