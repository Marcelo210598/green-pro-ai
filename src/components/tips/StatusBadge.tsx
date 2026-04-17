import { Badge } from "@/components/ui/badge";
import type { TipStatus } from "@/lib/types";

const config: Record<
  TipStatus,
  { label: string; className: string }
> = {
  apostavel: {
    label: "✅ Apostável",
    className: "bg-emerald-600 text-white hover:bg-emerald-600",
  },
  odd_baixa: {
    label: "🔴 Odd baixa",
    className: "bg-red-600 text-white hover:bg-red-600",
  },
  odd_alta: {
    label: "🟡 Odd alta",
    className: "bg-yellow-500 text-black hover:bg-yellow-500",
  },
  edge_insuficiente: {
    label: "🔵 Edge insuficiente",
    className: "bg-blue-600 text-white hover:bg-blue-600",
  },
  sem_odd: {
    label: "❓ Sem odd",
    className: "bg-gray-500 text-white hover:bg-gray-500",
  },
};

export function StatusBadge({ status }: { status: TipStatus }) {
  const { label, className } = config[status];
  return <Badge className={className}>{label}</Badge>;
}

export function ResultBadge({
  outcome,
}: {
  outcome: "green" | "red" | "void";
}) {
  const map = {
    green: {
      label: "GREEN",
      className: "bg-emerald-600 text-white hover:bg-emerald-600",
    },
    red: { label: "RED", className: "bg-red-600 text-white hover:bg-red-600" },
    void: {
      label: "VOID",
      className: "bg-gray-500 text-white hover:bg-gray-500",
    },
  };
  const { label, className } = map[outcome];
  return <Badge className={className}>{label}</Badge>;
}
