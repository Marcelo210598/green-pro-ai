export type Plan = "free" | "pro" | "premium";

export type TipStatus =
  | "apostavel"
  | "odd_baixa"
  | "odd_alta"
  | "edge_insuficiente"
  | "sem_odd";

export type TipWithGame = {
  id: number;
  market: string;
  tipDescription: string;
  odd: number;
  oddBetano: number | null;
  oddBet365: number | null;
  confidenceScore: number;
  edge: number;
  reasoning: string[];
  flags: string[];
  status: TipStatus;
  postedAt: string | null;
  game: {
    id: number;
    homeTeam: string;
    awayTeam: string;
    league: string;
    kickoffAt: string;
    homeScore: number | null;
    awayScore: number | null;
    status: string;
  };
  result: {
    outcome: "green" | "red" | "void";
    profitUnits: number;
  } | null;
};

export type Stats = {
  totalTips: number;
  greens: number;
  reds: number;
  voids: number;
  roiAccumulated: number;
  bankUnits: number;
  winRate: number;
};
