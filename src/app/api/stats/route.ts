import { NextResponse } from "next/server";
import { getStats } from "@/lib/queries";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const stats = await getStats();
    return NextResponse.json(stats);
  } catch (error) {
    console.error("GET /api/stats failed:", error);
    return NextResponse.json(
      { error: "Falha ao buscar stats" },
      { status: 500 },
    );
  }
}
