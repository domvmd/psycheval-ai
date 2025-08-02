# Technical Specification

This is the technical specification for the spec detailed in @.agent-os/specs/2025-08-02-core-foundation/spec.md

> Created: 2025-08-02
> Version: 1.0.0

## Technical Requirements

- **Next.js 14+ App Router** with TypeScript for type safety and modern React features
- **Server Components by default** with Client Components only for interactive features
- **Supabase authentication** with email/password and Google OAuth providers
- **Web Audio API** for browser-based recording with MediaRecorder
- **Responsive design** using Tailwind CSS with mobile-first approach
- **Real-time updates** for transcription status using Supabase Realtime
- **Error boundaries** for graceful error handling
- **Loading states** for all async operations

## UI/UX Specifications

### Design System

- Use shadcn/ui components for consistent UI
- Implement dark mode support from the start
- Follow Material Design principles for recording interface
- Clear visual feedback for all user actions

### Key Pages

1. **Landing Page** - Marketing page with sign up/login CTAs
2. **Auth Pages** - Login, signup, password reset with form validation
3. **Dashboard** - Session list with filtering and search
4. **Recording Page** - Audio recording interface with waveform visualization
5. **Session Details** - Playback, transcription view, and metadata

### Recording Interface

- Toggle between "Record" and "Upload" modes
- For Recording:
  - Large, prominent record button with clear state indication
  - Real-time audio level meter
  - Duration counter during recording
  - Pause/resume functionality
  - Automatic save on stop
- For Upload:
  - Drag-and-drop file area
  - File format validation (MP3, WAV, M4A, WebM)
  - File size limit display (500MB)
  - Upload progress indicator
  - Format conversion if needed

## Integration Requirements

### Supabase Setup

- Row Level Security (RLS) on all tables
- Storage buckets for audio files with access policies
- Edge Functions for transcription webhook handling
- Realtime subscriptions for transcription updates

### OpenAI Whisper Integration

- API endpoint for audio upload
- Support for WebM/Opus and MP3 formats
- Language detection for multi-language support
- Webhook for transcription completion
- Error handling for API failures

### Authentication Flow

- JWT token management
- Refresh token rotation
- Session persistence across browser restarts
- Secure password requirements
- OAuth redirect handling

## Performance Criteria

- **Page Load**: < 3 seconds on 3G connection
- **Recording Start**: < 500ms from button click
- **Audio Upload**: Progressive upload during recording
- **Transcription Time**: < 5 minutes for 60-minute audio
- **Dashboard Load**: < 2 seconds for 100 sessions

## Approach Options

**Option A:** Client-side recording with post-upload

- Pros: Simple implementation, works offline during recording
- Cons: Large file uploads, potential data loss

**Option B:** Streaming upload during recording (Selected)

- Pros: No data loss risk, progressive processing, smaller memory footprint
- Cons: More complex implementation, requires stable connection

**Rationale:** Streaming upload prevents data loss and enables faster transcription start times, critical for healthcare professionals who cannot afford to lose patient session data.

## External Dependencies

- **@supabase/supabase-js** - Supabase client for auth and database
- **@supabase/auth-helpers-nextjs** - Next.js specific auth utilities
- **lucide-react** - Icon library for consistent UI
- **react-hook-form** - Form handling with validation
- **zod** - Schema validation for forms and API
- **@radix-ui/react-toast** - Toast notifications
- **wavesurfer.js** - Audio waveform visualization
- **react-dropzone** - Drag-and-drop file upload functionality
- **file-type** - File type detection for upload validation

**Justification:** These libraries are well-maintained, have strong TypeScript support, and align with our tech stack choices. They reduce development time while maintaining code quality. The additional libraries support robust file upload functionality.
