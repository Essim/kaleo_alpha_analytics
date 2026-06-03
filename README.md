# Kaleotopia Alpha Analytics Visualizer

Standalone analytics website deployable on Cloudflare Workers static assets.

## Local Data Refresh

```bash
npm run build:data
```

The generated website bundle is anonymized:

- Public tester ids are local ids such as `KT-001`.
- Raw emails and original user ids are not exported to `public/assets/analytics-data.json`.
- The local conversion table is generated at `private/anonymization_map.csv`.
- `private/` is outside the deployed assets directory and is ignored by git.

If a verbatim or event detail contains an email, the public JSON masks it as `e***@***.**m`.

## Local Preview

Wrangler 4 requires Node.js 22 or newer.

```bash
npm install
npm run dev
```

Wrangler will serve the static site at `http://localhost:8787`.
Access is protected by HTTP Basic Auth. In local dev, the password is read from `.dev.vars`.

## Deploy

Set the password as a Cloudflare Worker secret before deploying:

```bash
npx wrangler secret put ACCESS_PASSWORD
```

Use the agreed password value when prompted.

```bash
npm run deploy
```

Cloudflare Workers uses `wrangler.jsonc` with `assets.directory = "./public"` and SPA fallback enabled.
The Worker script runs before assets and refuses unauthenticated requests.
