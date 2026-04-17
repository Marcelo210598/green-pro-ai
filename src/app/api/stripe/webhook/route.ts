import { NextResponse } from "next/server";
import { paymentsReady } from "@/lib/stripe";

/**
 * Stub do webhook Stripe. Quando ativar:
 * 1. Validar assinatura com STRIPE_WEBHOOK_SECRET
 * 2. Tratar eventos: checkout.session.completed, customer.subscription.updated, deleted
 * 3. Atualizar Subscription no Prisma
 */
export async function POST() {
  if (!paymentsReady()) {
    return NextResponse.json(
      { error: "Pagamentos ainda não disponíveis" },
      { status: 503 },
    );
  }

  return NextResponse.json(
    { error: "Não implementado" },
    { status: 501 },
  );
}
