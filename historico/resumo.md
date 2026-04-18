# Green Pro AI — Resumo Geral

## O que é
Plataforma web que exibe as análises esportivas geradas pelo bot Rei do Green (Railway/Python). MVP em fase de validação — tudo grátis por tempo limitado, estrutura preparada pra monetizar via Stripe depois.

## Stack
- Next.js 16.2.4 (App Router, Turbopack) + TypeScript
- Tailwind v4 + shadcn/ui (base-ui)
- Prisma 6 → Neon PostgreSQL (banco compartilhado com o bot)
- NextAuth v5 (Credentials + JWT)
- Stripe stub (desativado, PAYMENTS_ENABLED=false)

## Arquitetura
```
Bot (Railway, Python) ──► Neon PostgreSQL ◄── Site (Vercel, Next.js)
  ↳ gera tips e escreve    games, tips,          ↳ exibe tips + histórico
    no banco               results, stats         ↳ auth + planos
```

## Links
- **Produção**: https://green-pro-ai.vercel.app
- **GitHub**: https://github.com/Marcelo210598/green-pro-ai
- **Vercel**: team marcelo-di-foggia-juniors-projects / projeto green-pro-ai

## Planos
- **Free**: 1 tip apostável (maior confiança) + 2 informativas por dia
- **Pro** (R$49/mês): todas as tips + histórico completo + dashboard
- **Premium** (R$149/mês): Pro + Telegram VIP

Enquanto PAYMENTS_ENABLED=false → tudo liberado pra todo mundo (validação).

## Para ativar Stripe (quando chegar a hora)
1. `npm install stripe`
2. Criar produtos no dashboard Stripe
3. Preencher stripePriceId em `src/lib/stripe.ts`
4. Setar STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
5. PAYMENTS_ENABLED=true nas env vars da Vercel
6. Implementar createCheckoutSession e handlers do webhook

## Estado atual (17/04/2026)
MVP 100% funcional em produção. Próximo passo: testar end-to-end no fim de semana.
