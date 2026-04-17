import Link from "next/link";
import { Lock } from "lucide-react";

type Props = {
  children: React.ReactNode;
  locked?: boolean;
  requiredPlan?: "pro" | "premium";
};

/**
 * LockOverlay — envolve qualquer conteúdo e aplica blur + CTA quando locked=true.
 * MVP: sempre desativado (locked=false). Ativa quando pagamentos forem ligados.
 */
export function LockOverlay({
  children,
  locked = false,
  requiredPlan = "pro",
}: Props) {
  if (!locked) return <>{children}</>;

  return (
    <div className="relative">
      <div className="pointer-events-none select-none blur-sm opacity-60">
        {children}
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm rounded-lg">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Lock className="h-4 w-4" />
          Disponível no plano {requiredPlan.toUpperCase()}
        </div>
        <Link
          href="/planos"
          className="mt-2 text-xs text-emerald-600 hover:underline"
        >
          Ver planos →
        </Link>
      </div>
    </div>
  );
}
