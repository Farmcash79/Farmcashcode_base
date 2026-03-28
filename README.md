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

Team Contributions
Our team consists of four members who collaborated to design, build, and deploy the FarmCash platform. Each member contributed to different parts of the project to ensure efficient development and delivery.

David Onyedika Nwene – Frontend Developer & Deployment
David worked on the frontend development of the application, implementing the user interface and connecting it with backend services. He ensured the platform is responsive and user-friendly for farmers and buyers.
He was also responsible for deploying the application so it could be accessible online.

Key Responsibilities
Built the frontend interface of the application
Integrated frontend components with backend APIs
Ensured responsive design and usability
Handled application deployment

Tope Taiwo– Backend / Infrastructure Engineer
Tobe focused on building the backend infrastructure that powers the application. He developed the server logic, APIs, and system architecture needed for handling payments, marketplace interactions, and data management.

Key Responsibilities
Designed and implemented backend architecture
Built API endpoints for the platform
Managed data handling and server-side logic
Ensured system scalability and reliability

olawunmi Olabisi – UI/UX Designer
Mimi was responsible for the UI/UX design of the platform, ensuring that the product is intuitive and accessible for farmers and buyers. She designed the layouts, interfaces, and overall user experience of the application.

Key Responsibilities
Designed user interface and user experience
Created wireframes and design layouts
Ensured accessibility and usability for rural users
Provided design assets used in frontend development

Macdee Maete Akpan – Project Manager
Meta coordinated the entire development process and ensured that the project stayed organized and aligned with its goals. She created the Product Requirements Document (PRD) and managed team workflow using project management tools.

Key Responsibilities
Created the Product Requirements Document (PRD)
Managed team workflow and coordination
Used tools like Trello to track progress
Ensured all features and documentation were properly included

Collaboration Process
The team worked collaboratively throughout the project:
Design → Development → Deployment workflow
UI/UX designs were created first, then implemented in the frontend
Backend APIs were developed to support payments and marketplace features
The project manager coordinated tasks and documentation
The application was deployed for testing and demonstration


Tech Stack
Our platform was built using modern web technologies to ensure scalability, performance, and ease of deployment.
Frontend
Next.js – Used for building the user interface and application structure
React – Used for creating reusable UI components and managing the frontend logic

Backend
Next.js – Used for backend API routes and server-side functionality
Prisma – Used as an ORM for managing and interacting with the database

Database
Neon – Used as the primary database for storing application data

UI/UX Design
Figma – Used to design the user interface, wireframes, and user experience for the platform

Project Management
Trello – Used to organize tasks, track progress, and manage the project workflow

Deployment
Vercel – Used to deploy and host the application
 
