import { prisma } from "@/lib/db";
import type { TipStatus, TipWithGame, Stats } from "@/lib/types";

const MIN_ODD = 1.65;
const MAX_ODD = 2.8;
const MIN_EDGE = 0.05;

function deriveStatus(tip: {
  odd: number;
  oddBetano: number | null;
  oddBet365: number | null;
  edge: number;
}): TipStatus {
  const anyOdd = tip.oddBetano ?? tip.oddBet365 ?? tip.odd;
  if (!anyOdd) return "sem_odd";
  if (anyOdd < MIN_ODD) return "odd_baixa";
  if (anyOdd > MAX_ODD) return "odd_alta";
  if (tip.edge < MIN_EDGE) return "edge_insuficiente";
  return "apostavel";
}

function toNumber(v: unknown): number {
  if (v === null || v === undefined) return 0;
  if (typeof v === "number") return v;
  return Number(v.toString());
}

function serializeTip(t: Awaited<ReturnType<typeof fetchTipsRaw>>[number]): TipWithGame {
  const odd = toNumber(t.odd);
  const oddBetano = t.oddBetano !== null ? toNumber(t.oddBetano) : null;
  const oddBet365 = t.oddBet365 !== null ? toNumber(t.oddBet365) : null;
  const edge = toNumber(t.edge);

  return {
    id: t.id,
    market: t.market,
    tipDescription: t.tipDescription,
    odd,
    oddBetano,
    oddBet365,
    confidenceScore: toNumber(t.confidenceScore),
    edge,
    reasoning: t.reasoning ?? [],
    flags: t.flags ?? [],
    status: deriveStatus({ odd, oddBetano, oddBet365, edge }),
    postedAt: t.postedAt?.toISOString() ?? null,
    game: t.game
      ? {
          id: t.game.id,
          homeTeam: t.game.homeTeam,
          awayTeam: t.game.awayTeam,
          league: t.game.league,
          kickoffAt: t.game.kickoffAt.toISOString(),
          homeScore: t.game.homeScore,
          awayScore: t.game.awayScore,
          status: t.game.status,
        }
      : {
          id: 0,
          homeTeam: "—",
          awayTeam: "—",
          league: "—",
          kickoffAt: new Date().toISOString(),
          homeScore: null,
          awayScore: null,
          status: "unknown",
        },
    result: t.result
      ? {
          outcome: t.result.outcome as "green" | "red" | "void",
          profitUnits: toNumber(t.result.profitUnits),
        }
      : null,
  };
}

async function fetchTipsRaw(where: Parameters<typeof prisma.tip.findMany>[0]) {
  return prisma.tip.findMany({
    ...where,
    include: { game: true, result: true },
    orderBy: { postedAt: "desc" },
  });
}

export async function getTipsForDate(date: Date): Promise<TipWithGame[]> {
  const start = new Date(date);
  start.setUTCHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setUTCDate(end.getUTCDate() + 1);

  const tips = await fetchTipsRaw({
    where: { postedAt: { gte: start, lt: end } },
  });

  return tips.map(serializeTip);
}

export async function getTipsToday(): Promise<TipWithGame[]> {
  return getTipsForDate(new Date());
}

export async function getRecentResults(limit = 20, offset = 0): Promise<TipWithGame[]> {
  const tips = await prisma.tip.findMany({
    where: { result: { isNot: null } },
    include: { game: true, result: true },
    orderBy: { postedAt: "desc" },
    take: limit,
    skip: offset,
  });

  return tips.map(serializeTip);
}

export async function countHistorico(): Promise<number> {
  return prisma.tip.count({ where: { result: { isNot: null } } });
}

export async function getStats(): Promise<Stats> {
  const results = await prisma.result.findMany({
    select: { outcome: true, profitUnits: true },
  });

  let greens = 0;
  let reds = 0;
  let voids = 0;
  let totalProfit = 0;
  let totalStaked = 0;

  for (const r of results) {
    const profit = toNumber(r.profitUnits);
    totalProfit += profit;
    if (r.outcome === "green") greens++;
    else if (r.outcome === "red") reds++;
    else if (r.outcome === "void") voids++;
    if (r.outcome !== "void") totalStaked += 1;
  }

  const totalTips = greens + reds + voids;
  const winRate = greens + reds > 0 ? (greens / (greens + reds)) * 100 : 0;
  const roiAccumulated = totalStaked > 0 ? (totalProfit / totalStaked) * 100 : 0;
  const bankUnits = 100 + totalProfit;

  return {
    totalTips,
    greens,
    reds,
    voids,
    roiAccumulated,
    bankUnits,
    winRate,
  };
}

export async function getHistorico(limit = 50, offset = 0): Promise<TipWithGame[]> {
  return getRecentResults(limit, offset);
}
