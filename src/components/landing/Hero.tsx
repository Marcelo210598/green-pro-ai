import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-950/40 via-background to-background">
      <div className="container mx-auto px-4 py-20 md:py-28 max-w-5xl">
        <div className="text-center space-y-6">
          <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-medium tracking-wider uppercase">
            Análise estatística · IA · 12+ mercados
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Green Pro <span className="text-emerald-500">AI</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Apostas esportivas analisadas por inteligência artificial. Odds
            reais, probabilidade calculada, edge matemático — sem achismo.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <Link
              href="/tips"
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-emerald-600 hover:bg-emerald-700",
              )}
            >
              Ver tips de hoje
            </Link>
            <Link
              href="/historico"
              className={buttonVariants({ size: "lg", variant: "outline" })}
            >
              Ver histórico
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
