import { BarChart3, Brain, CheckCircle2 } from "lucide-react";

const steps = [
  {
    icon: BarChart3,
    title: "1. Coleta de dados",
    description:
      "Histórico real de cada time nas últimas 10 partidas via SofaScore + football-data.org. Ligas europeias, brasileiras e CONMEBOL.",
  },
  {
    icon: Brain,
    title: "2. Análise estatística",
    description:
      "Cálculo de probabilidade em 12+ mercados (BTTS, Over/Under, 1X2, Chance Dupla, Cartões, Escanteios). Edge matemático vs odd da casa.",
  },
  {
    icon: CheckCircle2,
    title: "3. Tips publicados",
    description:
      "Apostáveis quando: confiança ≥65%, odd entre 1.65 e 2.80, edge positivo ≥5%. Transparência total — todas as análises são publicadas.",
  },
];

export function ComoFunciona() {
  return (
    <section className="container mx-auto px-4 py-16 max-w-5xl">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
        Como funciona
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.title}
              className="rounded-lg border bg-card p-6 text-center"
            >
              <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <Icon className="w-6 h-6 text-emerald-500" />
              </div>
              <h3 className="font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">
                {step.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
