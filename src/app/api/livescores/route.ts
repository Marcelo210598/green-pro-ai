import { NextResponse } from "next/server";

export const revalidate = 300; // cache 5 minutos no edge

const TOKEN = process.env.FOOTBALL_DATA_TOKEN;
const BASE = "https://api.football-data.org/v4";

const COMPETITIONS: Record<string, string> = {
  PL: "Premier League",
  PD: "La Liga",
  BL1: "Bundesliga",
  SA: "Serie A",
  FL1: "Ligue 1",
  CL: "Champions League",
  BSA: "Brasileirão",
  PPL: "Liga Portugal",
  DED: "Eredivisie",
};

const STATUS_LABEL: Record<string, string> = {
  SCHEDULED: "",
  TIMED: "",
  IN_PLAY: "AO VIVO",
  PAUSED: "HT",
  FINISHED: "FT",
  SUSPENDED: "SUSP",
  POSTPONED: "ADIADO",
  CANCELLED: "CANCEL",
  AWARDED: "FT",
};

async function fetchComp(code: string, today: string) {
  if (!TOKEN) return [];
  try {
    const res = await fetch(
      `${BASE}/competitions/${code}/matches?dateFrom=${today}&dateTo=${today}`,
      {
        headers: { "X-Auth-Token": TOKEN },
        next: { revalidate: 300 },
      },
    );
    if (!res.ok) return [];
    const data = await res.json();
    return (data.matches ?? []) as Record<string, unknown>[];
  } catch {
    return [];
  }
}

export async function GET() {
  if (!TOKEN) {
    return NextResponse.json({ error: "Token não configurado" }, { status: 503 });
  }

  const today = new Date().toISOString().split("T")[0];

  // Busca todas as competições em paralelo
  const results = await Promise.all(
    Object.entries(COMPETITIONS).map(async ([code, leagueName]) => {
      const matches = await fetchComp(code, today);
      return matches.map((m) => {
        const score = m.score as Record<string, Record<string, number | null>>;
        const ft = score?.fullTime ?? {};
        const home = (m.homeTeam as Record<string, string>)?.shortName ?? (m.homeTeam as Record<string, string>)?.name ?? "";
        const away = (m.awayTeam as Record<string, string>)?.shortName ?? (m.awayTeam as Record<string, string>)?.name ?? "";
        const status = String(m.status ?? "");
        const minute = (m as Record<string, unknown>).minute as number | undefined;

        const homeScore = ft.home ?? null;
        const awayScore = ft.away ?? null;
        const hasScore = homeScore !== null && awayScore !== null;

        let statusLabel = STATUS_LABEL[status] ?? status;
        if (status === "IN_PLAY" && minute) statusLabel = `${minute}'`;

        const utcDate = String(m.utcDate ?? "");
        const kickoff = utcDate
          ? new Date(utcDate).toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
              timeZone: "America/Sao_Paulo",
            })
          : "";

        return {
          id: m.id,
          league: leagueName,
          leagueCode: code,
          home,
          away,
          homeScore,
          awayScore,
          hasScore,
          status,
          statusLabel,
          kickoff,
        };
      });
    }),
  );

  const all = results.flat().sort((a, b) => {
    // Ao vivo primeiro, depois finalizados, depois agendados
    const order = { IN_PLAY: 0, PAUSED: 1, FINISHED: 2 };
    const oa = order[a.status as keyof typeof order] ?? 3;
    const ob = order[b.status as keyof typeof order] ?? 3;
    return oa - ob;
  });

  return NextResponse.json({ matches: all, updatedAt: new Date().toISOString() });
}
