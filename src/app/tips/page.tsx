import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { TipCard } from "@/components/tips/TipCard";
import { getTipsToday } from "@/lib/queries";
import { applyGating } from "@/lib/access";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Tips do Dia — Green Pro AI",
  description: "Análises estatísticas de apostas esportivas para hoje",
};

export default async function TipsPage() {
  const rawTips = await getTipsToday();
  const tips = applyGating(rawTips, "free");

  const today = format(new Date(), "EEEE, dd 'de' MMMM 'de' yyyy", {
    locale: ptBR,
  });

  return (
    <main className="container mx-auto px-4 py-8 max-w-6xl">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Tips do Dia</h1>
        <p className="text-muted-foreground mt-1 capitalize">{today}</p>
      </header>

      {tips.length === 0 ? (
        <div className="rounded-lg border border-dashed p-10 text-center">
          <p className="text-lg font-medium">Nenhuma análise disponível hoje</p>
          <p className="text-sm text-muted-foreground mt-2">
            O bot analisa os jogos todas as manhãs às 8h (BRT). Volte mais
            tarde.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tips.map((t) => (
            <TipCard
              key={t.id}
              tip={t}
              locked={t.locked}
              requiredPlan={t.requiredPlan}
            />
          ))}
        </div>
      )}

      <footer className="mt-12 rounded-lg border bg-muted/40 p-4 text-xs text-muted-foreground">
        <p>
          <strong>Aviso legal:</strong> este conteúdo é exclusivamente
          informativo e não constitui recomendação de aposta. Aposte com
          responsabilidade. Jogos de azar podem causar dependência. Proibido
          para menores de 18 anos.
        </p>
      </footer>
    </main>
  );
}
