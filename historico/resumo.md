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

## Estado atual (19/04/2026)

### Site (green-pro-ai.vercel.app)
- ✅ Rate limiting in-memory (30 req/min APIs, 5 req/min /register)
- ✅ Histórico paginado (50/pág, prev/next, X–Y de Z total)
- ✅ Ticker de jogos ao vivo no rodapé (9 campeonatos, atualiza 5min)
- ✅ /cadastro funcional (auto-login após criar conta)
- ✅ /login, /tips, /historico, /planos funcionando

### Bot (Railway)
- ✅ Cache em memória 1h (get_team_last_games, get_h2h — sem chamadas duplicadas)
- ✅ fetch_fixture_stats() para buscar cartões/escanteios pós-jogo
- ✅ job_results() verifica cartões/escanteios corretamente (não vira mais void)
- ✅ _check_outcome extraído para src/analysis/outcome.py (sem dependências externas)
- ✅ 59 testes unitários passando (pytest tests/ -v)
- ✅ Job matinal 08h BRT + resultados 15h/17h/19h/21h/23h BRT

### Banca
- R$50,63 | 7G 3R | ROI +1,3% | desde 12/04/2026

### Próximos passos
1. Push notifications
2. Dashboard pessoal (P&L por usuário)
3. Filtros de tips
4. Backtesting público
5. Verificação de email (Resend — quando tiver domínio)
6. Ativar Stripe quando tiver usuários
7. Comunidade/Telegram público
