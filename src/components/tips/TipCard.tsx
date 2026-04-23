import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { StatusBadge, ResultBadge } from "./StatusBadge";
import { LockOverlay } from "./LockOverlay";
import type { TipWithGame } from "@/lib/types";

type Props = {
  tip: TipWithGame;
  locked?: boolean;
  requiredPlan?: "pro" | "premium";
};

export function TipCard({ tip, locked = false, requiredPlan = "pro" }: Props) {
  const confidencePct = (tip.confidenceScore * 100).toFixed(0);
  const edgePct = (tip.edge * 100).toFixed(1);
  const kickoff = new Date(tip.game.kickoffAt);

  return (
    <LockOverlay locked={locked} requiredPlan={requiredPlan}>
      <Card className="h-full">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <div className="space-y-0.5">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                {tip.game.league}
              </p>
              <CardTitle className="text-base leading-tight">
                {tip.game.homeTeam}{" "}
                <span className="text-muted-foreground">vs</span>{" "}
                {tip.game.awayTeam}
              </CardTitle>
              <p className="text-xs text-muted-foreground">
                {format(kickoff, "dd/MM 'às' HH:mm", { locale: ptBR })}
              </p>
            </div>
            <StatusBadge status={tip.status} />
          </div>
        </CardHeader>

        <CardContent className="space-y-3">
          <div>
            <p className="text-xs text-muted-foreground">Mercado</p>
            <p className="font-semibold">{tip.tipDescription}</p>
          </div>

          <Separator />

          <div className="grid grid-cols-3 gap-2 text-sm">
            <div>
              <p className="text-xs text-muted-foreground">Betano</p>
              <p className="font-semibold">
                {tip.oddBetano ? tip.oddBetano.toFixed(2) : "—"}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Bet365</p>
              <p className="font-semibold">
                {tip.oddBet365 ? tip.oddBet365.toFixed(2) : "—"}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Confiança</p>
              <p className="font-semibold text-emerald-600">
                {confidencePct}%
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Edge: {edgePct}%</span>
            {tip.result && (
              <div className="flex items-center gap-1.5">
                <span>
                  {tip.game.homeScore} x {tip.game.awayScore}
                </span>
                <ResultBadge outcome={tip.result.outcome} />
              </div>
            )}
          </div>

          {tip.reasoning && tip.reasoning.length > 0 && (
            <>
              <Separator />
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Por quê?
                </p>
                <ul className="space-y-1">
                  {tip.reasoning.map((reason, i) => (
                    <li key={i} className="text-xs text-muted-foreground flex gap-1.5">
                      <span className="text-emerald-500 shrink-0">•</span>
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </LockOverlay>
  );
}
