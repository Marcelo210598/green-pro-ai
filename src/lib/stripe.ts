/**
 * Stripe integration stub — DESATIVADO no MVP.
 *
 * Quando for ativar:
 * 1. npm install stripe
 * 2. Preencher STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET e NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY no .env
 * 3. Setar PAYMENTS_ENABLED=true
 * 4. Criar produtos no Stripe (Pro mensal e Premium mensal)
 * 5. Importar Stripe aqui e descomentar as funções.
 */

export const PLAN_CATALOG = {
  free: {
    name: "Free",
    price: 0,
    features: [
      "1 tip apostável por dia (maior confiança)",
      "2 análises informativas por dia",
      "Histórico público dos últimos 7 dias",
    ],
  },
  pro: {
    name: "Pro",
    price: 4900, // R$49,00
    features: [
      "Todos os tips apostáveis do dia",
      "Todas as análises informativas",
      "Histórico completo",
      "Dashboard pessoal com banca",
    ],
    stripePriceId: "",
  },
  premium: {
    name: "Premium",
    price: 14900, // R$149,00
    features: [
      "Tudo do Pro",
      "Grupo Telegram VIP com alertas em tempo real",
      "Suporte prioritário",
    ],
    stripePriceId: "",
  },
} as const;

export type PlanKey = keyof typeof PLAN_CATALOG;

export function paymentsReady(): boolean {
  return (
    process.env.PAYMENTS_ENABLED === "true" &&
    Boolean(process.env.STRIPE_SECRET_KEY)
  );
}

// Placeholder. Quando ativar Stripe, implementar aqui.
export async function createCheckoutSession(_params: {
  userId: string;
  plan: "pro" | "premium";
}): Promise<{ url: string }> {
  throw new Error(
    "Stripe não está ativo. Setar PAYMENTS_ENABLED=true e configurar chaves.",
  );
}
