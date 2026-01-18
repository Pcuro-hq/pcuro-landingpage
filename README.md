# Pcuro Landing Page

A landing page and waitlist system built with a dedicated backend REST API (Node.js/Express) and frontend (Next.js), following the Pcuro stack conventions.

## Project Structure

```
pcuro-landingpage/
├── backend/                    # Express REST API (Port 4000)
│   ├── src/
│   │   ├── config/            # Environment & CORS configuration
│   │   ├── controllers/       # Request handlers
│   │   ├── middlewares/       # Error handling, rate limiting, logging
│   │   ├── repositories/      # Data access layer (stubbed)
│   │   ├── routes/            # API route definitions
│   │   ├── services/          # Business logic
│   │   ├── types/             # TypeScript interfaces
│   │   ├── utils/             # Response helpers
│   │   └── validators/        # Zod schemas
│   ├── app.ts                 # Express app configuration
│   └── server.ts              # Server bootstrap
│
├── frontend/                   # Next.js App (Port 3000)
│   ├── app/
│   │   ├── components/        # React components
│   │   ├── layout.tsx         # Root layout with metadata
│   │   ├── page.tsx           # Landing page
│   │   └── globals.css        # Tailwind styles
│   └── lib/
│       ├── api/               # API client
│       └── types/             # TypeScript interfaces
│
└── README.md                   # This file
```

## Prerequisites

- Node.js 18+ 
- npm or yarn

## Quick Start

### 1. Clone and Setup Backend

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create environment file
cp env.example .env

# Start development server (Port 4000)
npm run dev
```

### 2. Setup Frontend (in a new terminal)

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Create environment file
cp env.local.example .env.local

# Start development server (Port 3000)
npm run dev
```

### 3. Open the App

Visit [http://localhost:3000](http://localhost:3000) to see the landing page.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/health` | Health check with status, version, timestamp |
| POST | `/api/v1/waitlist` | Submit waitlist signup |
| GET | `/api/v1/waitlist/stats` | Get waitlist statistics |

### Waitlist Signup Request

```bash
curl -X POST http://localhost:4000/api/v1/waitlist \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "companyName": "Acme Inc",
    "email": "john@acme.com"
  }'
```

### Response

```json
{
  "success": true,
  "data": {
    "id": "wl_1234567890_abc123",
    "message": "Successfully added to the waitlist! We'll be in touch soon."
  }
}
```

## Environment Variables

### Backend (`backend/.env`)

```env
PORT=4000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
DATABASE_URL=            # For future DB integration
EMAIL_PROVIDER_KEY=      # For future email service
```

### Frontend (`frontend/.env.local`)

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
```

## Features

- **Rate Limiting**: Waitlist endpoint limited to 5 requests per 15 minutes per IP
- **Input Validation**: Zod schemas with sanitization (trim, lowercase email)
- **Error Handling**: Standardized error responses with field-level errors
- **CORS**: Environment-aware configuration
- **Type Safety**: Full TypeScript on both backend and frontend

## Development Scripts

### Backend

```bash
npm run dev      # Start with hot reload
npm run build    # Compile TypeScript
npm run start    # Run compiled code
```

### Frontend

```bash
npm run dev      # Start Next.js dev server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Architecture

```
Request Flow:
Frontend Form → API Client → Express Server → Rate Limiter → 
Zod Validator → Controller → Service → Repository → Response
```

The backend follows a layered architecture:
- **Routes**: Define endpoints and apply middleware
- **Controllers**: Handle HTTP request/response
- **Services**: Business logic and orchestration
- **Repositories**: Data access (currently in-memory, ready for DB)
- **Validators**: Input validation and sanitization
- **Middlewares**: Cross-cutting concerns (auth, logging, errors)

## Future Enhancements

- [ ] Database integration (PostgreSQL with Prisma/Drizzle)
- [ ] Email confirmation on signup
- [ ] Admin dashboard for waitlist management
- [ ] Analytics and tracking
- [ ] A/B testing capabilities

## License

ISC
