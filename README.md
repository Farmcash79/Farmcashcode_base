## Farmcash MVP

Farmcash is a fintech MVP designed to help farmers and agricultural groups manage money digitally through wallet funding, payments, and transaction tracking. This version focuses on a working payment flow using Interswitch and a simple wallet system.

### Getting Started

Prerequisites:

- Node.js (v18+ recommended)
- npm
- prisma and prisma client for ORM
- PostgreSQL database
- Interswitch sandbox credentials

### Installation

```bash
npm install
```

### Environment Setup

Create a .env file in the root and configure the following:

```bash
DATABASE_URL="postgres_url"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
INTERSWITCH_CLIENT_ID=""
INTERSWITCH_CLIENT_SECRET=""
INTERSWITCH_MERCHANT_CODE=""
INTERSWITCH_PAY_ITEM_ID=""
INTERSWITCH_COLLECTION_BASE_URL=""
INTERSWITCH_PASSPORT_BASE_URL=""
INTERSWITCH_CHECKOUT_URL=""
```

### Database Setup

```bash
npx prisma validate
npx prisma format
npx prisma generate
npx prisma migrate dev
```

### Run the App

```bash
npm run dev
```

### App will be available at:

```bash
http://localhost:3000
```
