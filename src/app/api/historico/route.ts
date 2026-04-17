import { NextResponse } from "next/server";
import { getHistorico } from "@/lib/queries";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = Math.min(Number(searchParams.get("limit") ?? 100), 500);

  try {
    const historico = await getHistorico(limit);
    return NextResponse.json({ historico });
  } catch (error) {
    console.error("GET /api/historico failed:", error);
    return NextResponse.json(
      { error: "Falha ao buscar histórico" },
      { status: 500 },
    );
  }
}
