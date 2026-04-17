import { Suspense } from "react";
import Link from "next/link";
import { LoginForm } from "./LoginForm";

export default function LoginPage() {
  return (
    <main className="container mx-auto px-4 py-16 max-w-md">
      <div className="rounded-lg border bg-card p-6 space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold">Entrar</h1>
          <p className="text-sm text-muted-foreground">
            Acesse sua conta Green Pro AI
          </p>
        </div>

        <Suspense fallback={<div className="h-48" />}>
          <LoginForm />
        </Suspense>

        <p className="text-center text-sm text-muted-foreground">
          Ainda não tem conta?{" "}
          <Link
            href="/cadastro"
            className="text-emerald-500 hover:underline font-medium"
          >
            Criar conta grátis
          </Link>
        </p>
      </div>
    </main>
  );
}
