# Technical Stack

> Last Updated: 2025-08-02
> Version: 1.0.0

## Frontend

- **Application Framework:** Next.js 14+ with App Router
- **Database System:** Supabase (PostgreSQL with real-time capabilities)
- **JavaScript Framework:** React 18+
- **Import Strategy:** node (npm/pnpm package management)
- **CSS Framework:** Tailwind CSS 3.4+
- **UI Component Library:** shadcn/ui
- **Fonts Provider:** Next.js Font Optimization (Google Fonts)
- **Icon Library:** Lucide React

## Backend & APIs

- **Primary Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth (Email + Google OAuth)
- **File Storage:** Supabase Storage with local temp file handling
- **Audio Transcription:** OpenAI Whisper API
- **AI Processing:** Anthropic Claude Sonnet 4 API
- **Edge Functions:** Supabase Edge Functions (Deno)
- **Real-time Updates:** Supabase Realtime

## Audio & Media

- **Audio Recording:** Web Audio API with MediaRecorder
- **Audio Format:** WebM/Opus for recording, converted to formats supported by Whisper
- **Temporary Storage:** Browser local temp files before upload
- **Permanent Storage:** Supabase Storage buckets

## Infrastructure

- **Application Hosting:** Vercel
- **Database Hosting:** Supabase Cloud
- **Asset Hosting:** Vercel Edge Network
- **Deployment Solution:** Vercel CI/CD with GitHub integration

## Development Tools

- **Code Repository URL:** [To be provided]
- **Package Manager:** pnpm (preferred) or npm
- **Type System:** TypeScript 5.0+
- **Code Formatting:** Prettier
- **Linting:** ESLint with Next.js config
- **Testing Framework:** Vitest + React Testing Library
- **E2E Testing:** Playwright

## Security & Compliance

- **HIPAA Compliance:** Supabase HIPAA-compliant infrastructure
- **Encryption:** TLS in transit, AES-256 at rest
- **Access Control:** Row Level Security (RLS) in Supabase
- **Audit Logging:** Custom implementation with Supabase

## Third-Party Services

- **AI/ML Services:**
  - OpenAI (Whisper API for transcription)
  - Anthropic (Claude Sonnet 4 for evaluation generation)
- **Monitoring:** Vercel Analytics + Sentry
- **Email Service:** Resend (for transactional emails)
