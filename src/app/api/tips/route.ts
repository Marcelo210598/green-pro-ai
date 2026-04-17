import { NextResponse } from "next/server";
import { getTipsForDate, getTipsToday } from "@/lib/queries";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const dateParam = searchParams.get("date");

  try {
    const tips = dateParam
      ? await getTipsForDate(new Date(dateParam))
      : await getTipsToday();

    return NextResponse.json({ tips });
  } catch (error) {
    console.error("GET /api/tips failed:", error);
    return NextResponse.json(
      { error: "Falha ao buscar tips" },
      { status: 500 },
    );
  }
}
