"use client";

import { useEffect, useMemo, useState } from "react";
import { SstAssistant } from "@/components/SstAssistant";

const businessDefaults = { name: "", plaza: "", location: "", activity: "", workers: "", city: "Bogotá D.C." };
const criteria = [
  "Productos vencidos o dañados retirados", "Utensilios útiles y equipos dañados identificados", "Cajas y costales fuera de las zonas de paso", "Efectos personales separados de la mercancía", "Residuos y mercancía no conforme separados",
  "Mercancía identificada y rotada", "Herramientas con sitio fijo", "Rutas y pasillos libres", "Cableado y zona de cobro ordenados", "Estantes y productos estables",
  "Superficies higienizadas", "Pisos limpios y secos", "Residuos manejados correctamente", "Equipos y utensilios higiénicos", "Sin indicios visibles de plagas",
  "Rutina de limpieza visible", "Zonas y equipos señalizados", "Normas de higiene comunicadas", "Frecuencias y responsables definidos", "Productos almacenados protegidos",
  "Inspecciones periódicas registradas", "Acciones correctivas documentadas", "Personal conoce riesgos y reglas", "Rutina diaria cumplida", "Resultados revisados y mejorados",
];

type Action = { id: number; finding: string; measure: string; responsible: string; due: string; done: boolean };

function useStored<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try { const raw = localStorage.getItem(key); if (raw) setValue(JSON.parse(raw)); } catch {}
      setHydrated(true);
    });
    return () => cancelAnimationFrame(frame);
  }, [key]);
  useEffect(() => { if (hydrated) { try { localStorage.setItem(key, JSON.stringify(value)); } catch {} } }, [key, value, hydrated]);
  return [value, setValue] as const;
}

function ToolIcon({ kind }: { kind: "business" | "audit" | "action" | "track" }) {
  const paths = { business: "M4 7h16v12H4zM7 7V4h10v3M8 12h8M8 16h5", audit: "M6 3h12v18H6zM9 8h6M9 12h6M9 16h4", action: "M5 5h14v14H5zM8 12l2 2 5-5", track: "M4 19V5M4 19h16M8 15l3-4 3 2 4-6" };
  return <span className="metric-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={paths[kind]} /></svg></span>;
}

export function KitOverview() {
  return <>
    <div className="screen-heading"><span className="eyebrow">Espacio de trabajo</span><h1 className="display">Ordena tu siguiente paso.</h1><p>Este es el espacio funcional del kit. Cada pantalla guarda sus datos en este navegador para que podamos probarlo con comerciantes.</p></div>
    <div className="metric-grid"><div className="metric-card"><ToolIcon kind="business" /><span>01</span><strong>Configura</strong><p>Cuéntanos lo mínimo sobre tu establecimiento.</p><a href="/kit/mi-negocio">Abrir ficha →</a></div><div className="metric-card accent"><ToolIcon kind="audit" /><span>02</span><strong>Evalúa</strong><p>Revisa 25 criterios de orden y hábitos.</p><a href="/kit/auditoria-5s">Abrir auditoría →</a></div><div className="metric-card dark"><ToolIcon kind="action" /><span>03</span><strong>Actúa</strong><p>Convierte un hallazgo en una tarea concreta.</p><a href="/kit/plan-de-accion">Crear acción →</a></div><div className="metric-card soft"><ToolIcon kind="track" /><span>04</span><strong>Mejora</strong><p>Lee el avance y decide qué sigue.</p><a href="/kit/seguimiento">Ver seguimiento →</a></div></div>
    <div className="notice-card"><strong>Datos de esta sesión</strong><p>No envía datos a un servidor ni sustituye una evaluación profesional de SST. Esta experiencia permite validar la claridad y el flujo de trabajo.</p></div>
  </>;
}

const establishments = ["Plaza de Palo Quemado", "Corabastos"];
const activities = ["Frutas y verduras", "Carnes y pescados", "Abarrotes", "Comidas preparadas", "Flores y plantas"];

function ChoiceField({ title, options, value, onChange, customLabel }: { title: string; options: string[]; value: string; onChange: (value: string) => void; customLabel: string }) {
  const [custom, setCustom] = useState(false);
  const isCustom = custom || (!!value && !options.includes(value));
  return <fieldset className="guide-field"><legend>{title}</legend><div className="choice-grid">{options.map(option => <button type="button" className="choice-button" aria-pressed={!isCustom && value === option} key={option} onClick={() => { setCustom(false); onChange(option); }}>{option}</button>)}<button type="button" className="choice-button" aria-pressed={isCustom} onClick={() => { setCustom(true); if (options.includes(value)) onChange(""); }}>Otro</button></div>{isCustom && <div className="form-grid"><label className="wide">{customLabel}<input value={value} onChange={e => onChange(e.target.value)} /></label></div>}</fieldset>;
}

export function BusinessScreen() {
  const [business, setBusiness] = useStored("sst-simple-business", businessDefaults);
  const [saved, setSaved] = useState(false);
  const update = (key: keyof typeof businessDefaults, value: string) => setBusiness({ ...business, [key]: value });
  return <>
    <div className="screen-heading compact"><span className="eyebrow">01 / Configura</span><h1 className="display">Primero, conozcamos tu establecimiento.</h1><p>Solo pedimos información de contexto para adaptar las herramientas. No incluyas datos personales innecesarios.</p></div>
    <form className="form-card" onSubmit={(e) => { e.preventDefault(); setSaved(true); setTimeout(() => setSaved(false), 2200); }}>
      <section className="guide-card"><h2>1. ¿Cómo se llama tu negocio?</h2><p id="name-help">Es el nombre comercial del establecimiento, no el nombre de la persona responsable. Si antes escribiste tu nombre, lo conservamos: puedes revisarlo y cambiarlo tú.</p><div className="form-grid"><label className="wide">Nombre comercial<input aria-describedby="name-help" value={business.name} onChange={e => update("name", e.target.value)} placeholder="Ej. Frutas La 12" /></label></div></section>
      <section className="guide-card"><h2>2. ¿Dónde trabajas?</h2><p>Elige tu establecimiento o escribe otro. La ubicación ayuda a reconocer el local dentro del mercado.</p><ChoiceField title="Plaza o establecimiento" options={establishments} value={business.plaza} onChange={value => update("plaza", value)} customLabel="Otro establecimiento" /><div className="form-grid"><label>Ubicación del establecimiento<input value={business.location} onChange={e => update("location", e.target.value)} placeholder="Ej. Pasillo 3, local 18" /></label><label>Ciudad<input value={business.city} onChange={e => update("city", e.target.value)} /></label></div></section>
      <section className="guide-card"><h2>3. ¿Qué haces y con quién?</h2><p>Selecciona la actividad más cercana a la tuya. Puedes volver y ajustar esta ficha cuando lo necesites.</p><ChoiceField title="Actividad principal" options={activities} value={business.activity} onChange={value => update("activity", value)} customLabel="Otra actividad" /><div className="form-grid"><label>Número de trabajadores<select value={business.workers} onChange={e => update("workers", e.target.value)}><option value="">Selecciona</option><option>Trabajo solo</option><option>1–3</option><option>4–6</option><option>Más de 6</option></select></label></div></section>
      <p className="muted-note">Los cambios se guardan automáticamente solo en este navegador; no se envían a un servidor.</p><a className="button button-secondary" href="/kit/auditoria-5s">Siguiente: auditoría 5S →</a>
      <div className="form-footer"><span className="muted-note">Guardado local en este navegador.</span><button className="save-button" type="submit">{saved ? "Guardado ✓" : "Guardar ficha"}</button></div>
    </form>
  </>;
}

export function AuditScreen() {
  const [scores, setScores] = useStored<(string | number)[]>("sst-simple-audit", Array(25).fill(""));
  const answered = scores.filter(score => score !== "" && score != null).length;
  const points = scores.reduce<number>((sum, score) => sum + (score === "N/A" ? 0 : Number(score) || 0), 0);
  const total = scores.reduce<number>((sum, score) => sum + (score !== "N/A" && score !== "" && score != null ? 2 : 0), 0);
  const result = total ? Math.round((points / total) * 100) : 0;
  const [current, setCurrent] = useState(0);
  const selected = scores[current] === undefined ? "" : String(scores[current]);
  const choose = (value: string) => { const next = [...scores]; next[current] = value; setScores(next); };
  const move = (index: number) => { setCurrent(index); requestAnimationFrame(() => document.getElementById("criterion-title")?.focus()); };
  return <>
    <div className="screen-heading compact"><span className="eyebrow">02 / Evalúa</span><h1 className="display">Mira antes de corregir.</h1><p>Responde cada criterio con 0, 1, 2 o N/A. Los blancos todavía no cuentan en el resultado.</p></div>
    <div className="audit-summary"><div><span>Contestados</span><strong>{answered}/25</strong></div><div><span>Resultado 5S</span><strong>{result}%</strong></div><div className="audit-progress"><span>Avance de la revisión</span><i><b style={{ width: `${(answered / 25) * 100}%` }} /></i></div></div>
    <section className="form-card audit-step" aria-labelledby="criterion-title"><h2 id="criterion-title" tabIndex={-1}><span>Criterio {current + 1} de 25</span>{criteria[current]}</h2><p>Observa tu establecimiento. Elige la opción que describe lo que ves hoy y después pulsa Siguiente. N/A significa que este criterio no aplica a tu actividad.</p><div className="choice-grid" role="group" aria-labelledby="criterion-title">{[["0", "No cumple"], ["1", "Parcial"], ["2", "Cumple"], ["N/A", "No aplica"]].map(([value, label]) => <button type="button" className="choice-button" key={value} aria-pressed={selected === value} onClick={() => choose(value)}>{value} · {label}</button>)}</div><p role="status" className="muted-note">{selected ? `Respuesta seleccionada: ${selected}. Puedes cambiarla antes de continuar.` : "Pendiente: responde o elige dejarlo para después."}</p><div className="step-controls"><button type="button" className="choice-button" disabled={current === 0} onClick={() => move(current - 1)}>Anterior criterio</button>{current < 24 ? <><button type="button" className="save-button" disabled={!selected} onClick={() => move(current + 1)}>Siguiente criterio</button><button type="button" className="choice-button" disabled={!!selected} onClick={() => move(current + 1)}>Dejar pendiente y seguir</button></> : <a className="button button-secondary" href="/kit/plan-de-accion">{selected ? "Continuar al plan de acción" : "Dejar pendiente e ir al plan"} →</a>}<button type="button" className="choice-button" disabled={!selected} onClick={() => choose("")}>Quitar respuesta</button></div></section>
    <nav className="audit-review" aria-label="Revisar criterios"><h2>Volver a cualquier criterio</h2><p>Los números muestran tu respuesta; — significa pendiente. Todo se guarda en este navegador.</p><div className="review-grid">{criteria.map((criterion, index) => <button type="button" className="choice-button" key={criterion} aria-current={index === current ? "step" : undefined} aria-label={`Revisar criterio ${index + 1}: ${criterion}. ${scores[index] === "" || scores[index] == null ? "Pendiente" : scores[index]}`} onClick={() => move(index)}>{index + 1}<small>{scores[index] === "" || scores[index] == null ? "—" : scores[index]}</small></button>)}</div></nav>
    <p className="disclaimer">El resultado es una medida de organización 5S. No equivale a certificación ni a porcentaje de cumplimiento legal del SG-SST.</p>
  </>;
}

const actionPresets = [
  { finding: "Cajas en zonas de paso", measure: "Definir una zona de almacenamiento y despejar los pasillos." },
  { finding: "Piso húmedo o resbaloso", measure: "Secar el piso, señalizar la zona y revisar la causa de la humedad." },
  { finding: "Herramientas sin sitio fijo", measure: "Asignar y marcar un lugar para cada herramienta al terminar de usarla." },
  { finding: "Residuos sin separar", measure: "Ubicar recipientes identificados y acordar una rutina de retiro de residuos." },
  { finding: "Rutina de limpieza sin responsable", measure: "Definir una rutina visible con frecuencias y una persona responsable." },
];

export function ActionScreen() {
  const [items, setItems] = useStored<Action[]>("sst-simple-actions", []);
  const [form, setForm] = useState({ finding: "", measure: "", responsible: "", due: "" });
  const submit = (e: React.FormEvent) => { e.preventDefault(); if (!form.finding.trim()) return; setItems([...items, { ...form, id: Date.now(), done: false }]); setForm({ finding: "", measure: "", responsible: "", due: "" }); };
  return <>
    <div className="screen-heading compact"><span className="eyebrow">03 / Actúa</span><h1 className="display">Un hallazgo se vuelve una acción.</h1><p>Escribe qué encontraste y cuál es la medida concreta que quieres probar.</p></div>
    <form className="form-card" onSubmit={submit}>
      <fieldset className="guide-field"><legend>1. Elige un hallazgo frecuente o crea el tuyo</legend><p>Son ejemplos, no resultados de tu auditoría. Al elegir uno se propone una medida; revísala y adáptala antes de agregar la acción. Cambiar de ejemplo reemplaza el texto del borrador, no tus acciones guardadas.</p><div className="choice-grid">{actionPresets.map(preset => <button type="button" className="choice-button" key={preset.finding} aria-pressed={form.finding === preset.finding} onClick={() => setForm({ ...form, ...preset })}>{preset.finding}</button>)}<button type="button" className="choice-button" onClick={() => document.getElementById("action-finding")?.focus()}>Otro hallazgo</button></div></fieldset>
      <h2 className="guide-title">2. Ajusta la tarea y acuerda quién y cuándo</h2><p className="muted-note">Puedes escribir tu propio hallazgo y medida en los campos siguientes. El borrador solo se registra al pulsar Agregar acción.</p><div className="form-grid"><label className="wide">Hallazgo<textarea id="action-finding" required value={form.finding} onChange={e => setForm({ ...form, finding: e.target.value })} placeholder="Ej. Hay cajas en la zona de paso" /></label><label className="wide">Medida correctiva<textarea required value={form.measure} onChange={e => setForm({ ...form, measure: e.target.value })} placeholder="Ej. Definir una zona de almacenamiento y señalizarla" /></label><label>Responsable<input required value={form.responsible} onChange={e => setForm({ ...form, responsible: e.target.value })} placeholder="Nombre o rol acordado" /></label><label>Fecha límite<input required type="date" value={form.due} onChange={e => setForm({ ...form, due: e.target.value })} /></label></div><div className="form-footer"><span className="muted-note" role="status">{items.length} acción(es) registradas en este navegador.</span><button className="save-button" type="submit">Agregar acción</button></div></form>
    <div className="action-list">{items.length === 0 ? <div className="empty-card">Todavía no hay acciones. Registra el primer hallazgo arriba.</div> : items.map(item => <article className={`action-item ${item.done ? "done" : ""}`} key={item.id}><button type="button" className="check-action" aria-pressed={item.done} aria-label={`${item.done ? "Reabrir" : "Marcar realizada"}: ${item.finding}`} onClick={() => setItems(items.map(current => current.id === item.id ? { ...current, done: !current.done } : current))}>{item.done ? "✓" : ""}</button><div><strong>{item.finding}</strong><p>{item.measure || "Sin medida definida todavía."}</p><small>{item.responsible || "Sin responsable"} · {item.due || "Sin fecha"}</small></div></article>)}</div>
  </>;
}

export function FollowUpScreen() {
  const [business] = useStored<typeof businessDefaults>("sst-simple-business", businessDefaults);
  const [scores] = useStored<(string | number)[]>("sst-simple-audit", Array(25).fill(""));
  const [items] = useStored<Action[]>("sst-simple-actions", []);
  const answered = scores.filter(score => score !== "" && score != null).length;
  const closed = items.filter(item => item.done).length;
  const percentage = items.length ? Math.round((closed / items.length) * 100) : 0;
  const status = useMemo(() => business.name ? `Trabajando en ${business.name}` : "Ficha de negocio pendiente", [business.name]);
  return <>
    <div className="screen-heading compact"><span className="eyebrow">04 / Mejora</span><h1 className="display">Lo que se registra, se puede mejorar.</h1><p>{status}. Este resumen reúne lo diligenciado en las pantallas anteriores.</p></div>
    <div className="summary-board"><div className="summary-score"><strong>{percentage}%</strong><span>acciones cerradas</span></div><div className="summary-list"><div><span>Auditoría 5S</span><b>{answered}/25 criterios</b></div><div><span>Plan de acción</span><b>{closed}/{items.length} cerradas</b></div><div><span>Próximo paso</span><b>{items.some(item => !item.done) ? "Revisar pendientes" : "Registrar una acción"}</b></div></div></div>
    <div className="notice-card"><strong>Qué sigue</strong><p>Validar esta experiencia con comerciantes, ajustar el lenguaje y definir qué información debe guardarse en una futura versión con cuenta y base de datos.</p></div><SstAssistant />
  </>;
}
