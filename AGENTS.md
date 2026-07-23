# AGENTS.md

## Commands

- Dev: `npm run dev`
- Build: `npm run build`
- API dev: `cd api && npm install && npm run dev`
- Database dev: `cd database && npm install && npm run dev`

## Environment

- `TEAHAUS_DATABASE_URL` — MySQL connection string for Drizzle ORM

## Stack

- **Frontend**: Taro 4 + Vue 3 (Composition API, `<script setup>`) + Pinia + TypeScript
- **Backend**: Hono + Drizzle ORM + MySQL
- **Database schema**: Prisma (`database/db/schema.prisma`)
- **Platform**: WeChat mini-program (`taro build --type weapp`)

## Conventions

- Components: `src/components/<Name>/index.vue`
- Pages: `src/pages/<name>/index.vue`
- Mock data: `src/datasets/<name>.ts`
- Stores (Pinia): `src/stores/<name>.ts`
- Composable: `src/composables/use<Name>.ts`
- Constants: `src/constants/<name>.ts`
- Route paths: `src/constants/routes.ts` (`ROUTES` object + `buildRoute` helper)
- CSS: custom properties (`--color-*`), scoped in each page/component
- Lint/typecheck: `tsc` (via `tsconfig.json`)
- Do NOT commit `.env`, `.env.local`, or secrets
- Never run `rm -rf` or other destructive shell commands
- Never execute `npm run` or `npm install` — always ask the user first

## API Routes

- `GET /spaces` — list tea spaces
- `GET /spaces/:id` — space detail
- `GET /tags` — list tags
- `GET /user` — current user
- `GET /user/orders` — user orders
- `GET /user/transactions?type=wallet|points` — wallet/points history
