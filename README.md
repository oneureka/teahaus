# TeaHaus

A WeChat mini-program for discovering and booking tea spaces.

## Built With

| Layer | Technology |
| --- | --- |
| **Framework** | Taro 4, Vue 3 (Composition API + `<script setup>`) |
| **Backend** | Hono (Node.js web framework) |
| **Database** | MySQL, Drizzle ORM (Prisma) |

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server (WeChat mini-program preview)
npm run dev

# Production build
npm run build
```

### Backend API

```bash
cd api
npm install
cp .env.example .env
npm run dev
```

### Database

```bash
cd database
npm install
npm run dev           # Prisma Studio
```

## Environment Variables

| Variable | Description |
| --- | --- |
| `TEAHAUS_DATABASE_URL` | MySQL connection string used by Drizzle ORM |

## API Routes

| Method | Path | Description |
| --- | --- | --- |
| GET | `/spaces` | List tea spaces (with tags & images) |
| GET | `/spaces/:id` | Tea space detail (with tags, rooms & images) |
| GET | `/tags` | List all tags |
| GET | `/user` | Current user info |
| GET | `/user/orders` | User orders |
| GET | `/user/transactions?type=wallet\|points` | Wallet / points transactions |

## License

Microsoft Public License (MS-PL)
