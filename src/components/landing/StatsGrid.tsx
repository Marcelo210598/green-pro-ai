import { getStats } from "@/lib/queries";

export async function StatsGrid() {
  const stats = await getStats();

  const items = [
    {
      label: "Greens",
      value: stats.greens,
      className: "text-emerald-500",
    },
    {
      label: "Reds",
      value: stats.reds,
      className: "text-red-500",
    },
    {
      label: "Win Rate",
      value: `${stats.winRate.toFixed(1)}%`,
      className: "text-emerald-500",
    },
    {
      label: "ROI acumulado",
      value: `${stats.roiAccumulated >= 0 ? "+" : ""}${stats.roiAccumulated.toFixed(1)}%`,
      className:
        stats.roiAccumulated >= 0 ? "text-emerald-500" : "text-red-500",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-12 max-w-5xl">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
        Resultados reais, transparência total
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((item) => (
          <div
            key={item.label}
            className="rounded-lg border bg-card p-6 text-center"
          >
            <p className="text-sm text-muted-foreground mb-2">{item.label}</p>
            <p className={`text-3xl font-bold ${item.className}`}>
              {item.value}
            </p>
          </div>
        ))}
      </div>
      <p className="text-xs text-center text-muted-foreground mt-4">
        Stats atualizadas automaticamente após cada dia de jogos.
      </p>
    </section>
  );
}
