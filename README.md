# Green Pro AI

Plataforma web que exibe análises esportivas geradas pelo bot Rei do Green (Railway). MVP em fase de validação — tudo grátis, estrutura preparada pra monetizar via Stripe depois.

## Stack

- **Next.js 16.2.4** (App Router, Server Components, Turbopack)
- **React 19** + TypeScript
- **Tailwind CSS v4** + shadcn/ui (base-ui)
- **Prisma 6** → PostgreSQL (Neon, banco compartilhado com o bot)
- **NextAuth v5** (Credentials + JWT)
- **Stripe** (stub desativado — `PAYMENTS_ENABLED=false`)

## Arquitetura

```
Bot (Railway, Python)  ──► Neon PostgreSQL ◄──  Site (Vercel, Next.js)
    ↳ gera análises         games, tips,            ↳ exibe tips + histórico
      e escreve no DB       results, daily_stats    ↳ auth + planos (free/pro/premium)
```

O site é **read-only** sobre os dados do bot. Não há lógica de análise aqui.

## Setup local

```bash
npm install
cp .env.example .env
# preencha DATABASE_URL (mesmo do bot) e NEXTAUTH_SECRET (openssl rand -hex 32)

npx prisma generate
npm run dev
```

Acesse http://localhost:3000.

### Variáveis obrigatórias

| Variável | Descrição |
|---|---|
| `DATABASE_URL` | Postgres Neon (mesmo do bot) |
| `NEXTAUTH_URL` | `http://localhost:3000` local, domínio prod |
| `NEXTAUTH_SECRET` | `openssl rand -hex 32` |
| `PAYMENTS_ENABLED` | `false` (MVP) → `true` quando ativar Stripe |

## Estrutura

```
src/
├── app/
│   ├── page.tsx             ← landing
│   ├── tips/page.tsx        ← tips do dia (com gating free/pro)
│   ├── historico/page.tsx   ← histórico público
│   ├── planos/page.tsx      ← 3 cards (Free/Pro/Premium)
│   ├── login/               ← LoginForm dentro de Suspense
│   ├── cadastro/
│   └── api/
│       ├── auth/[...nextauth]/
│       ├── register/        ← POST (bcrypt)
│       ├── tips/ stats/ historico/
│       └── stripe/          ← stubs (checkout/webhook)
├── components/
│   ├── landing/             ← Hero, StatsGrid, ComoFunciona, UltimosResultados, FinalCTA
│   ├── layout/Header.tsx
│   ├── tips/                ← TipCard, StatusBadge, LockOverlay
│   └── providers/SessionProvider.tsx
├── lib/
│   ├── db.ts                ← Prisma singleton
│   ├── auth.ts              ← NextAuth v5 config
│   ├── queries.ts           ← getTipsToday, getRecentResults, getStats
│   ├── access.ts            ← applyGating (free = 1 apostável + 2 info; pro = tudo)
│   ├── stripe.ts            ← PLAN_CATALOG + paymentsReady()
│   └── types.ts
└── types/next-auth.d.ts     ← Session/JWT com campo `plan`
```

## Gating de planos

- **Free:** 1 tip apostável (maior confiança) + 2 informativas por dia. Histórico 7 dias.
- **Pro (R$49/mês):** todas as tips + histórico completo + dashboard.
- **Premium (R$149/mês):** Pro + grupo Telegram VIP.

Enquanto `PAYMENTS_ENABLED=false`, `applyGating` libera tudo pra todo mundo (fase de validação).

## Ativar Stripe (quando chegar a hora)

1. `npm install stripe`
2. Criar produtos no dashboard Stripe (Pro mensal, Premium mensal).
3. Preencher `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` e os `stripePriceId` em `src/lib/stripe.ts`.
4. `PAYMENTS_ENABLED=true`.
5. Implementar `createCheckoutSession` em `src/lib/stripe.ts` e os handlers em `src/app/api/stripe/checkout/route.ts` e `webhook/route.ts`.

## Deploy Vercel

```bash
vercel --prod
```

Variáveis de ambiente no dashboard Vercel. `DATABASE_URL` aponta pro mesmo Neon do bot (não duplica dados).

## Aviso legal

Conteúdo exclusivamente informativo. Análise estatística, não recomendação de aposta. Conforme Lei nº 14.790/2023, proibido para menores de 18 anos.
