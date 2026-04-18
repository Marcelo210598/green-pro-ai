import { NextResponse } from "next/server";
import { getHistorico, countHistorico } from "@/lib/queries";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!rateLimit(getClientIp(request))) {
    return NextResponse.json({ error: "Rate limit excedido." }, { status: 429 });
  }

  const { searchParams } = new URL(request.url);
  const limit = Math.min(Number(searchParams.get("limit") ?? 50), 100);
  const offset = Math.max(Number(searchParams.get("offset") ?? 0), 0);

  try {
    const [historico, total] = await Promise.all([
      getHistorico(limit, offset),
      countHistorico(),
    ]);
    return NextResponse.json({ historico, total, limit, offset });
  } catch (error) {
    console.error("GET /api/historico failed:", error);
    return NextResponse.json(
      { error: "Falha ao buscar histórico" },
      { status: 500 },
    );
  }
}
