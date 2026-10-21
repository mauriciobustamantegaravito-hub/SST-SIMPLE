import { NextResponse } from "next/server";

const MAX_QUESTION_LENGTH = 1200;

export async function POST(request: Request) {
  const webhookUrl = process.env.N8N_SST_WEBHOOK_URL;
  const webhookSecret = process.env.N8N_SST_WEBHOOK_SECRET;

  if (!webhookUrl) {
    return NextResponse.json({ error: "El asistente todavía no está conectado." }, { status: 503 });
  }

  let body: { question?: unknown; conversationId?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  const question = typeof body.question === "string" ? body.question.trim() : "";
  if (!question || question.length > MAX_QUESTION_LENGTH) {
    return NextResponse.json({ error: "Escribe una pregunta de hasta 1.200 caracteres." }, { status: 400 });
  }

  const payload = {
    source: "sst-simple-web",
    question,
    conversationId: typeof body.conversationId === "string" ? body.conversationId.slice(0, 120) : undefined,
    context: {
      product: "SST Simple",
      scope: ["kit digital 5S + SST", "auditoría 5S", "plan de acción", "seguimiento"],
      safety: "Responde como orientación general. No presentes la respuesta como certificación ni asesoría profesional.",
    },
  };

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(webhookSecret ? { "X-SST-Simple-Secret": webhookSecret } : {}),
      },
      body: JSON.stringify(payload),
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) {
      return NextResponse.json({ error: "El asistente no pudo responder en este momento." }, { status: 502 });
    }

    const result = await response.json().catch(() => ({}));
    const answer = typeof result.answer === "string"
      ? result.answer
      : typeof result.output === "string"
        ? result.output
        : typeof result.text === "string"
          ? result.text
          : "No recibí una respuesta clara. Intenta de nuevo.";

    return NextResponse.json({ answer: answer.slice(0, 5000) });
  } catch {
    return NextResponse.json({ error: "No fue posible contactar el asistente." }, { status: 502 });
  }
}
