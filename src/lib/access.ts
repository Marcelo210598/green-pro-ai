import type { TipWithGame, Plan } from "@/lib/types";

/**
 * Regras de visibilidade por plano — centralizadas aqui.
 *
 * MVP (agora): PAYMENTS_ENABLED=false → tudo liberado para validação.
 * Depois: free = 1 apostável (maior confiança) + 2 informativos (odd_baixa)
 *         pro = todos os apostáveis
 *         premium = tudo + grupo Telegram VIP
 */
export function paymentsEnabled(): boolean {
  return process.env.PAYMENTS_ENABLED === "true";
}

type Gated = TipWithGame & {
  locked: boolean;
  requiredPlan?: "pro" | "premium";
};

export function applyGating(
  tips: TipWithGame[],
  plan: Plan = "free",
): Gated[] {
  // Validação aberta — tudo desbloqueado
  if (!paymentsEnabled()) {
    return tips.map((t) => ({ ...t, locked: false }));
  }

  // Premium e Pro veem tudo (Premium tem Telegram adicional, mas no site é igual)
  if (plan === "pro" || plan === "premium") {
    return tips.map((t) => ({ ...t, locked: false }));
  }

  // Free: 1 apostável (maior conf) + 2 informativos odd_baixa
  const apostaveis = tips
    .filter((t) => t.status === "apostavel")
    .sort((a, b) => b.confidenceScore - a.confidenceScore);
  const informativos = tips.filter((t) => t.status === "odd_baixa").slice(0, 2);

  const freeIds = new Set<number>();
  if (apostaveis[0]) freeIds.add(apostaveis[0].id);
  for (const t of informativos) freeIds.add(t.id);

  return tips.map((t) => ({
    ...t,
    locked: !freeIds.has(t.id),
    requiredPlan: "pro" as const,
  }));
}
