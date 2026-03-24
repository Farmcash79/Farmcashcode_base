# Farmcash MVP

Farmcash is a fintech MVP designed to help farmers and agricultural groups manage money digitally through wallet funding, payments, and transaction tracking. This version focuses on a working payment flow using Interswitch and a simple wallet system.

## Getting Started

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

## Project Structure

```bash
app - Pages and API routes (Next.js App Router)
lib - Core logic (DB, auth, payments)
components - Reusable UI components
prisma - Database schema and seed
```

## Core Features

```bash
User authentication (login/register)
Wallet balance tracking
Fund wallet using Interswitch
Payment verification and confirmation
Transaction history
Basic protection for authenticated routes
```

## Payment Flow

```bash
User initiates payment
System creates a pending transaction
User is redirected to Interswitch checkout
After payment, user is redirected back
Backend verifies payment with Interswitch
Wallet is updated if successful
```

## Contributing

1. Create a new branch:

```bash
git checkout -b feature/your-feature-name
```

2. Make your changes

3. Ensure everything still works:

- Login
- Payment flow
- Wallet updates

4. Commit your changes:

```bash
git commit -m "feat: add your feature"
```

5. Push and open a pull request

## Contribution Guidelines

- Keep changes small and focused
- Do not break the payment flow
- Always test end-to-end before pushing
- Follow existing folder structure
- Prefer clarity over complexity
