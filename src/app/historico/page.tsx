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
        <div className="rounded-lg border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="whitespace-nowrap">Data</TableHead>
                <TableHead>Jogo</TableHead>
                <TableHead className="hidden sm:table-cell">Mercado</TableHead>
                <TableHead className="hidden md:table-cell text-right">Odd</TableHead>
                <TableHead className="hidden sm:table-cell text-center">Placar</TableHead>
                <TableHead className="text-center">Resultado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tips.map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="text-muted-foreground text-xs whitespace-nowrap">
                    {format(new Date(t.game.kickoffAt), "dd/MM/yy", {
                      locale: ptBR,
                    })}
                  </TableCell>
                  <TableCell className="font-medium">
                    <span className="line-clamp-2 leading-tight">
                      {t.game.homeTeam} vs {t.game.awayTeam}
                    </span>
                    <p className="text-xs text-muted-foreground hidden sm:block">
                      {t.game.league}
                    </p>
                    <p className="text-xs text-muted-foreground sm:hidden">
                      {t.tipDescription} · {t.odd.toFixed(2)}
                    </p>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">{t.tipDescription}</TableCell>
                  <TableCell className="hidden md:table-cell text-right tabular-nums">
                    {t.odd.toFixed(2)}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-center tabular-nums">
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
