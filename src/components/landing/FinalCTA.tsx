import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function FinalCTA() {
  return (
    <section className="container mx-auto px-4 py-20 max-w-3xl text-center">
      <h2 className="text-2xl md:text-3xl font-bold mb-4">
        Comece agora — de graça
      </h2>
      <p className="text-muted-foreground mb-8">
        Acesse as análises de hoje sem pagar nada. Sem cartão de crédito, sem
        pegadinha.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/cadastro"
          className={cn(
            buttonVariants({ size: "lg" }),
            "bg-emerald-600 hover:bg-emerald-700",
          )}
        >
          Criar conta grátis
        </Link>
        <Link
          href="/tips"
          className={buttonVariants({ size: "lg", variant: "outline" })}
        >
          Ver tips sem cadastro
        </Link>
      </div>
    </section>
  );
}

export function LegalFooter() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="text-xs text-muted-foreground space-y-2">
          <p>
            <strong>Aviso legal:</strong> o conteúdo deste site é
            exclusivamente informativo e não constitui recomendação de aposta.
            Green Pro AI não opera apostas — apenas realiza análise estatística
            de jogos. Toda decisão de aposta é de responsabilidade do usuário.
          </p>
          <p>
            Aposte com responsabilidade. Jogos de azar podem causar
            dependência. Conforme Lei nº 14.790/2023, proibido para menores de
            18 anos. Se precisar de ajuda, ligue 188 (CVV).
          </p>
          <p className="pt-4">
            © {new Date().getFullYear()} Green Pro AI. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
