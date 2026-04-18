"use client";

import { useEffect, useRef, useState } from "react";

interface MatchItem {
  id: unknown;
  league: string;
  home: string;
  away: string;
  homeScore: number | null;
  awayScore: number | null;
  hasScore: boolean;
  status: string;
  statusLabel: string;
  kickoff: string;
}

function MatchChip({ m }: { m: MatchItem }) {
  const isLive = m.status === "IN_PLAY" || m.status === "PAUSED";
  const isFt = m.status === "FINISHED";

  return (
    <span className="inline-flex items-center gap-1.5 px-3 whitespace-nowrap text-xs">
      <span className="text-muted-foreground opacity-60">{m.league}</span>
      <span className={isLive ? "text-emerald-400 font-semibold" : "text-foreground"}>
        {m.home}
      </span>
      {m.hasScore ? (
        <>
          <span className={`font-bold tabular-nums ${isLive ? "text-emerald-400" : isFt ? "text-muted-foreground" : "text-foreground"}`}>
            {m.homeScore} - {m.awayScore}
          </span>
          {m.statusLabel && (
            <span className={`text-[10px] px-1 rounded ${isLive ? "bg-emerald-500/20 text-emerald-400" : "text-muted-foreground"}`}>
              {m.statusLabel}
            </span>
          )}
        </>
      ) : (
        <span className="text-muted-foreground tabular-nums">{m.kickoff}</span>
      )}
      <span className={isLive ? "text-emerald-400 font-semibold" : "text-foreground"}>
        {m.away}
      </span>
      <span className="text-muted-foreground opacity-30 ml-1">·</span>
    </span>
  );
}

export function LiveTicker() {
  const [matches, setMatches] = useState<MatchItem[]>([]);
  const [updatedAt, setUpdatedAt] = useState<string>("");
  const trackRef = useRef<HTMLDivElement>(null);

  async function load() {
    try {
      const res = await fetch("/api/livescores", { cache: "no-store" });
      if (!res.ok) return;
      const data = await res.json();
      setMatches(data.matches ?? []);
      setUpdatedAt(data.updatedAt ?? "");
    } catch {
      // silencioso — ticker não crítico
    }
  }

  useEffect(() => {
    load();
    const interval = setInterval(load, 5 * 60 * 1000); // 5 min
    return () => clearInterval(interval);
  }, []);

  if (matches.length === 0) return null;

  // Duplica para loop contínuo
  const items = [...matches, ...matches];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur h-8 overflow-hidden flex items-center">
      {/* Label fixo */}
      <div className="shrink-0 flex items-center gap-1.5 pl-3 pr-2 border-r border-border h-full bg-emerald-950/50">
        <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500">
          Ao Vivo
        </span>
      </div>

      {/* Faixa rolante */}
      <div className="flex-1 overflow-hidden">
        <div
          ref={trackRef}
          className="flex animate-ticker"
          style={{ width: "max-content" }}
        >
          {items.map((m, i) => (
            <MatchChip key={`${String(m.id)}-${i}`} m={m} />
          ))}
        </div>
      </div>

      {/* Timestamp discreto */}
      {updatedAt && (
        <div className="shrink-0 px-2 text-[9px] text-muted-foreground opacity-40 hidden sm:block">
          {new Date(updatedAt).toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      )}
    </div>
  );
}
