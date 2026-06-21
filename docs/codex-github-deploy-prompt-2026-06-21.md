# Prompt for the Connected GitHub / Vercel Codex Chat

Copy the following message into the Codex chat that has access to the AVESTA-ZOROASTER GitHub repository and Vercel project.

```txt
Deploy the attached/current AVESTA-ZOROASTER source release to the existing repository and Vercel project.

Use `avesta-zoroaster-source.zip` as the source of truth. Merge it carefully into the current repository. Do not revert or delete unrelated user changes. Do not commit node_modules, .next, .env files or real secrets.

Read these documents first:
- README.md
- DELIVERY.md
- docs/release-handoff-2026-06-21.md
- docs/team-delivery-master.md
- docs/technical-handoff.md
- docs/product-design-handoff.md
- docs/visual-reference-board.md

Important release additions to preserve:
- Mobed guide and its homepage entry point
- compact header, mobile navigation, reading notifications and bright white/gold theme toggle
- Avesta reading controls, bookmarks, notes, audio jump, glossary links and reading queue
- profile/dashboard reader memory using safe local fallback storage
- library shelf and storefront cart/wishlist
- all image and reference assets under public/images
- admin routes, SEO routes, sitemap.xml and robots.txt

Before commit, run:
npm install
npm run db:generate
npx tsc --noEmit
npm run build

If DATABASE_URL is not configured, keep the project in its existing build-safe local fallback mode. Do not invent production secrets.

Then:
1. Commit the completed merge with this message:
   feat: ship luminous reading, personal memory and storefront upgrades
2. Push the intended production branch.
3. Trigger or verify a Vercel production deployment.
4. Set/check the canonical production domain: https://avesta-zoroaster.com
5. Smoke-test these routes after deployment:
   /, /avesta, /avesta/yasna, /avesta/yashts, /avesta/vendidad,
   /avesta/yasna/ha-1/verse-1, /mobed, /reading-room, /library,
   /media, /exhibitions, /shop, /profile, /dashboard, /admin,
   /admin/deployment-readiness, /sitemap.xml, /robots.txt

Report back with: branch name, commit hash, build result, Vercel preview URL, Vercel production URL, and any missing environment variable or external integration that blocks production.
```
