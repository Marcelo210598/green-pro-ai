import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ResultBadge } from "@/components/tips/StatusBadge";
import { getHistorico, getStats } from "@/lib/queries";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Histórico — Green Pro AI",
};

export default async function HistoricoPage() {
  const [tips, stats] = await Promise.all([getHistorico(100), getStats()]);

  return (
    <main className="container mx-auto px-4 py-8 max-w-6xl">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Histórico de análises</h1>
        <p className="text-muted-foreground mt-1">
          Transparência total — todos os resultados são públicos.
        </p>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <StatBox label="Total" value={stats.totalTips} />
        <StatBox
          label="Greens"
          value={stats.greens}
          className="text-emerald-500"
        />
        <StatBox label="Reds" value={stats.reds} className="text-red-500" />
        <StatBox
          label="ROI"
          value={`${stats.roiAccumulated >= 0 ? "+" : ""}${stats.roiAccumulated.toFixed(1)}%`}
          className={
            stats.roiAccumulated >= 0 ? "text-emerald-500" : "text-red-500"
          }
        />
      </div>

      {tips.length === 0 ? (
        <div className="rounded-lg border border-dashed p-10 text-center">
          <p className="text-lg font-medium">Ainda sem histórico</p>
        </div>
      ) : (
        <div className="rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Jogo</TableHead>
                <TableHead>Mercado</TableHead>
                <TableHead className="text-right">Odd</TableHead>
                <TableHead className="text-center">Placar</TableHead>
                <TableHead className="text-center">Resultado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tips.map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="text-muted-foreground text-xs">
                    {format(new Date(t.game.kickoffAt), "dd/MM/yy", {
                      locale: ptBR,
                    })}
                  </TableCell>
                  <TableCell className="font-medium">
                    {t.game.homeTeam} vs {t.game.awayTeam}
                    <p className="text-xs text-muted-foreground">
                      {t.game.league}
                    </p>
                  </TableCell>
                  <TableCell>{t.tipDescription}</TableCell>
                  <TableCell className="text-right tabular-nums">
                    {t.odd.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-center tabular-nums">
                    {t.game.homeScore} x {t.game.awayScore}
                  </TableCell>
                  <TableCell className="text-center">
                    {t.result && <ResultBadge outcome={t.result.outcome} />}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </main>
  );
}

function StatBox({
  label,
  value,
  className,
}: {
  label: string;
  value: number | string;
  className?: string;
}) {
  return (
    <div className="rounded-lg border bg-card p-4 text-center">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={`text-2xl font-bold ${className ?? ""}`}>{value}</p>
    </div>
  );
}
