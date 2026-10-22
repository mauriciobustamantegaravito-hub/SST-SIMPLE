"use client";

import { useState } from "react";

export function SstAssistant() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function ask(event: React.FormEvent) {
    event.preventDefault();
    if (!question.trim() || loading) return;
    setLoading(true); setAnswer(""); setError("");
    try {
      const response = await fetch("/api/ask", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ question }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "No fue posible responder.");
      setAnswer(data.answer || "No recibí una respuesta.");
    } catch (err) { setError(err instanceof Error ? err.message : "No fue posible responder."); }
    finally { setLoading(false); }
  }

  return <section className="assistant-card" aria-labelledby="assistant-title">
    <div className="assistant-icon" aria-hidden="true">✦</div>
    <div className="assistant-copy"><span className="eyebrow">Orientación rápida</span><h2 id="assistant-title">Pregúntale al sistema</h2><p>Respuestas breves sobre el kit, las 5S y el siguiente paso. La conexión con n8n se activa con una URL privada de webhook.</p></div>
    <form onSubmit={ask} className="assistant-form"><label htmlFor="sst-question">Tu pregunta</label><div className="assistant-input-row"><input id="sst-question" value={question} onChange={e => setQuestion(e.target.value)} maxLength={1200} placeholder="¿Qué reviso primero en mi establecimiento?" /><button className="save-button" disabled={loading}>{loading ? "Consultando…" : "Preguntar"}</button></div></form>
    {answer && <div className="assistant-answer"><strong>Respuesta</strong><p>{answer}</p></div>}
    {error && <p className="assistant-error" role="alert">{error}</p>}
  </section>;
}
