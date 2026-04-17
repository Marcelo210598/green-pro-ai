import Link from "next/link";
import { Check } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PLAN_CATALOG, paymentsReady } from "@/lib/stripe";

export const metadata = {
  title: "Planos — Green Pro AI",
};

export default function PlanosPage() {
  const canSubscribe = paymentsReady();

  return (
    <main className="container mx-auto px-4 py-16 max-w-5xl">
      <header className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold">Planos</h1>
        <p className="text-muted-foreground mt-3">
          Comece grátis. Faça upgrade quando quiser mais.
        </p>
      </header>

      {!canSubscribe && (
        <div className="mb-8 rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4 text-center text-sm">
          🚀 Estamos em fase de validação — <strong>tudo grátis</strong> por
          tempo limitado. Crie sua conta agora.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {(Object.keys(PLAN_CATALOG) as Array<keyof typeof PLAN_CATALOG>).map(
          (key) => {
            const plan = PLAN_CATALOG[key];
            const isFree = key === "free";
            const highlighted = key === "pro";

            return (
              <div
                key={key}
                className={`rounded-lg border bg-card p-6 flex flex-col ${
                  highlighted
                    ? "ring-2 ring-emerald-500 relative"
                    : ""
                }`}
              >
                {highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                    Mais popular
                  </div>
                )}
                <h2 className="text-xl font-bold">{plan.name}</h2>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-3xl font-bold">
                    {isFree ? "R$0" : `R$${(plan.price / 100).toFixed(0)}`}
                  </span>
                  {!isFree && (
                    <span className="text-sm text-muted-foreground">/mês</span>
                  )}
                </div>

                <ul className="mt-6 space-y-2 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 mt-0.5 text-emerald-500 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6">
                  {isFree ? (
                    <Link
                      href="/cadastro"
                      className={cn(
                        buttonVariants({ variant: "outline" }),
                        "w-full",
                      )}
                    >
                      Começar grátis
                    </Link>
                  ) : (
                    <Button
                      className="w-full bg-emerald-600 hover:bg-emerald-700"
                      disabled={!canSubscribe}
                    >
                      {canSubscribe ? "Assinar" : "Em breve"}
                    </Button>
                  )}
                </div>
              </div>
            );
          },
        )}
      </div>
    </main>
  );
}
