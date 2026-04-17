import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur">
      <div className="container mx-auto flex h-14 items-center justify-between px-4 max-w-6xl">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <span className="text-emerald-500">●</span>
          <span>
            Green Pro <span className="text-emerald-500">AI</span>
          </span>
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          <Link
            href="/tips"
            className={buttonVariants({ variant: "ghost", size: "sm" })}
          >
            Tips
          </Link>
          <Link
            href="/historico"
            className={buttonVariants({ variant: "ghost", size: "sm" })}
          >
            Histórico
          </Link>
          <Link
            href="/login"
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "ml-2 hidden sm:inline-flex",
            )}
          >
            Entrar
          </Link>
          <Link
            href="/cadastro"
            className={cn(
              buttonVariants({ size: "sm" }),
              "bg-emerald-600 hover:bg-emerald-700",
            )}
          >
            Cadastrar
          </Link>
        </nav>
      </div>
    </header>
  );
}
