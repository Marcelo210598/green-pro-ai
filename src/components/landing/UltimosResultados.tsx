import Link from "next/link";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ResultBadge } from "@/components/tips/StatusBadge";
import { buttonVariants } from "@/components/ui/button";
import { getRecentResults } from "@/lib/queries";

export async function UltimosResultados() {
  const tips = await getRecentResults(7);

  if (tips.length === 0) return null;

  return (
    <section className="container mx-auto px-4 py-16 max-w-5xl">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
        Últimos resultados
      </h2>
      <p className="text-center text-sm text-muted-foreground mb-8">
        Histórico público — sem cherry-picking
      </p>

      <div className="rounded-lg border bg-card divide-y">
        {tips.map((t) => (
          <div
            key={t.id}
            className="flex items-center justify-between gap-4 p-4"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>
                  {format(new Date(t.game.kickoffAt), "dd/MM", {
                    locale: ptBR,
                  })}
                </span>
                <span>·</span>
                <span className="truncate">{t.game.league}</span>
              </div>
              <p className="font-medium truncate mt-0.5">
                {t.game.homeTeam} vs {t.game.awayTeam}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {t.tipDescription} · odd {t.odd.toFixed(2)}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className="text-sm font-semibold tabular-nums">
                {t.game.homeScore} x {t.game.awayScore}
              </span>
              {t.result && <ResultBadge outcome={t.result.outcome} />}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <Link
          href="/historico"
          className={buttonVariants({ variant: "outline" })}
        >
          Ver histórico completo →
        </Link>
      </div>
    </section>
  );
}
