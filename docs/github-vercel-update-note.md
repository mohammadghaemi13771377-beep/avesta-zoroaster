# GitHub/Vercel Update Note

این نسخه برای commit و deploy جدید پروژه AVESTA-ZOROASTER آماده است.

## Suggested Commit

```txt
feat: polish navigation, search and Avesta reading paths
```

## Summary

- Added `/admin/global-growth-audit`, a new admin board for global launch and growth readiness.
- Added `/api/admin/global-growth-audit`, a no-cache JSON endpoint for QA, GitHub/Vercel automation and internal monitoring.
- Added `lib/global-growth-audit.ts` to score SEO, multilingual readiness, structured data, research trust, content architecture, asset operations, performance readiness and CMS/admin readiness.
- Added `components/admin/global-growth-audit-board.tsx` with score cards, launch mode, next action, checks and linked routes.
- Added `/admin/localization`, a dedicated admin board for Persian/English translation readiness, human editorial review, terminology QA and multilingual growth priorities.
- Added `/api/admin/localization`, a no-cache JSON endpoint for localization status.
- Added `lib/localization-hub.ts` and connected the multilingual section of Global Growth Audit to it.
- Added `/admin/source-intake`, a unified research intake board for each Avesta section's source requirements, verified citations, assets, blockers and next action.
- Added `/api/admin/source-intake`, an admin-protected JSON endpoint for future CMS, QA and workflow automation.
- Added `lib/source-intake-hub.ts` and connected research trust scoring in Global Growth Audit to source intake readiness.
- Added the new route to the admin sidebar and `routeMap`.
- Simplified the global navigation and homepage into a route-first reading gateway.
- Added desktop Explore navigation and a dedicated mobile navigation drawer.
- Added Avesta study-intent filtering, chapter atlas search/theme filters and direct reading CTAs.
- Added library language filtering, article tag/sort filtering and section-aware global search, including product search.
- Kept the existing SEO, hreflang, schema, sitemap, robots, research methodology, contact, llms.txt, Avesta visual guides, admin delivery and asset operations work intact.

## Files To Review

- `lib/global-growth-audit.ts`
- `components/admin/global-growth-audit-board.tsx`
- `lib/localization-hub.ts`
- `components/admin/localization-hub-board.tsx`
- `app/admin/localization/page.tsx`
- `app/api/admin/localization/route.ts`
- `lib/source-intake-hub.ts`
- `components/admin/source-intake-hub-board.tsx`
- `app/admin/source-intake/page.tsx`
- `app/api/admin/source-intake/route.ts`
- `app/admin/global-growth-audit/page.tsx`
- `app/api/admin/global-growth-audit/route.ts`
- `components/admin/admin-shell.tsx`
- `lib/content.ts`
- `README.md`
- `DELIVERY.md`
- `docs/file-manifest.md`
- `docs/codex-github-final-prompt.md`
- `docs/release-handoff-2026-06-20.md`

## Verification Required Before Push

```bash
npm install
npm run db:generate
npm run build
```

Recommended extra checks:

```bash
npx tsc --noEmit
```

Smoke-test these routes after deployment:

- `/`
- `/avesta`
- `/articles`
- `/dictionary`
- `/library`
- `/media`
- `/exhibitions`
- `/shop`
- `/research-methodology`
- `/contact`
- `/admin`
- `/admin/deployment-readiness`
- `/admin/page-quality`
- `/admin/global-growth-audit`
- `/admin/localization`
- `/admin/source-intake`
- `/api/admin/global-growth-audit`
- `/api/admin/localization`
- `/api/admin/source-intake`
- `/sitemap.xml`
- `/robots.txt`
- `/llms.txt`

## Vercel Notes

- Keep production secrets out of git.
- Set env vars from `.env.example` in Vercel Project Settings.
- Production storage, PostgreSQL, auth and Meilisearch are still production setup tasks.
- This version remains build-safe with local/sample fallbacks so the site should not break when production database/storage is not connected yet.
