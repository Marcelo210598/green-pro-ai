import { NextResponse } from "next/server";
import { paymentsReady } from "@/lib/stripe";

/**
 * Stub — retorna 503 enquanto PAYMENTS_ENABLED=false.
 * Quando ativar, implementar createCheckoutSession aqui.
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
