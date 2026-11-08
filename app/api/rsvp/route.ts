import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Body = {
  nombre?: unknown;
  acompanado?: unknown;
  acompanantes?: unknown;
};

function asBool(value: unknown) {
  return value === true || value === "true" || value === "Sí" || value === "si";
}

export async function POST(request: Request) {
  const scriptUrl = process.env.GOOGLE_SCRIPT_URL?.trim();
  if (!scriptUrl) {
    return NextResponse.json(
      { ok: false, error: "Falta configurar GOOGLE_SCRIPT_URL" },
      { status: 503 },
    );
  }

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "Datos inválidos" }, { status: 400 });
  }

  const nombre = String(body.nombre ?? "").trim();
  if (nombre.length < 2 || nombre.length > 80) {
    return NextResponse.json({ ok: false, error: "Nombre inválido" }, { status: 400 });
  }

  const acompanado = asBool(body.acompanado);
  const rawCount = Number(body.acompanantes ?? 0);
  const acompanantes = acompanado
    ? Math.min(10, Math.max(1, Number.isFinite(rawCount) ? Math.floor(rawCount) : 1))
    : 0;

  try {
    const res = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        nombre,
        acompanado,
        acompanantes,
        total: 1 + acompanantes,
      }),
      redirect: "follow",
    });

    const text = await res.text();
    let parsed: { ok?: boolean; error?: string } = {};
    try {
      parsed = JSON.parse(text) as { ok?: boolean; error?: string };
    } catch {
      parsed = { ok: res.ok };
    }

    if (!res.ok || parsed.ok === false) {
      return NextResponse.json(
        { ok: false, error: parsed.error || "No se pudo guardar en la planilla" },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "No se pudo conectar con la planilla" },
      { status: 502 },
    );
  }
}
