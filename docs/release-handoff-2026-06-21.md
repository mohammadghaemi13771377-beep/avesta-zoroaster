# AVESTA-ZOROASTER Release Handoff - 2026-06-21

## What is in this release

- Cinematic RTL-first AVESTA-ZOROASTER platform built with Next.js 14, TypeScript and Tailwind CSS.
- Compact public navigation: Home, Avesta, Zoroaster, Shop, Library and an Explore menu.
- Bright white-and-gold reading theme toggle, persisted locally without a hydration flash.
- Avesta section, chapter and verse routes with structured chapter guides, artwork, glossary links, reading controls, source trust, audio-ready UI and next-study paths.
- Mobed guide at `/mobed`, including guided questions and direct learning paths. It currently uses a safe local editorial responder and is ready for future RAG/LLM integration.
- Personal reading features stored locally: progress, bookmarks, notes, reader memory, reading queue, notifications, profile summary and personal dashboard.
- Library shelf, shop cart and shop wishlist stored locally; checkout remains explicitly demo-ready until a payment provider is connected.
- Digital library, media explorer, exhibitions, timeline, glossary, research methodology, trust pages, bilingual foundations and SEO routes.
- Admin-facing content, asset, publication, research-source and deployment-readiness surfaces with local fallbacks so production build stays stable before database/storage wiring.
- User-provided UI references stored in `public/images/references/2026-06-21-ui/` and documented in `docs/visual-reference-board.md`.

## Validation completed in this workspace

```bash
npx tsc --noEmit
npm run build
```

The optimized Next.js build completed successfully and generated 296 static pages.

## Required production setup

1. Add production environment variables from `.env.example` in Vercel. Never commit `.env` or real secrets.
2. If using PostgreSQL, configure `DATABASE_URL`, then run Prisma generate/migrations according to `README.md`.
3. Keep `public/images`, `public/audio`, `public/library`, `public/video` and `public/images/references` when merging the source archive.
4. Configure the canonical public domain `https://avesta-zoroaster.com` in Vercel and DNS.
5. Replace demo payment configuration before accepting real orders.
6. Replace local persistence with authenticated database persistence when account sync is enabled.

## Smoke-test routes after deployment

```txt
/
/avesta
/avesta/yasna
/avesta/yashts
/avesta/vendidad
/avesta/yasna/ha-1/verse-1
/mobed
/reading-room
/library
/media
/exhibitions
/shop
/shop/gathas-daily-study-book
/profile
/dashboard
/admin
/admin/deployment-readiness
/sitemap.xml
/robots.txt
```

## Suggested commit

```txt
feat: ship luminous reading, personal memory and storefront upgrades
```
