# Spec Requirements Document

> Spec: Core Foundation
> Created: 2025-08-02
> Status: Planning

## Overview

Build the essential infrastructure and basic recording functionality for PsychEval AI. This phase establishes the foundation for a SAAS platform that enables psychiatrists and clinical psychologists to record patient sessions and receive automated transcriptions.

## User Stories

### Recording Clinical Sessions

As a psychiatrist, I want to record my patient sessions directly in my browser OR upload pre-recorded audio files, so that I can capture the full clinical encounter using my preferred recording method.

The clinician opens PsychEval AI, logs in, and clicks "New Session". They can choose between two options: "Record Now" or "Upload Audio File". 

For browser recording: They enter basic session metadata (patient ID, session type) and click "Start Recording". The system requests microphone permission and begins recording audio. A visual indicator shows recording status and duration. When the session ends, they click "Stop Recording" and the audio is automatically saved and queued for transcription.

For file upload: They select their pre-recorded audio file (supporting common formats like MP3, WAV, M4A, WebM), enter session metadata, and upload the file. The system validates the file format and size, then queues it for transcription. Within minutes, they can view the transcription of their session.

### Managing Session Recordings

As a clinical psychologist, I want to view and manage all my recorded sessions, so that I can track patient progress and access historical recordings.

After logging in, the clinician sees a dashboard listing all their sessions. Each session shows the date, patient ID (anonymized), duration, and transcription status. They can click on any session to view its details, play back the audio, and read the transcription. Sessions can be searched by date, patient ID, or content within transcriptions.

### Secure Authentication

As a healthcare provider, I want secure authentication with my existing credentials, so that I can ensure patient data remains protected and compliant with HIPAA regulations.

New users can sign up with their professional email or use Google OAuth with their work account. The system verifies their email domain against a list of approved healthcare organizations. Multi-factor authentication is available for enhanced security. Password reset functionality ensures account recovery without compromising security.

## Spec Scope

1. **Next.js Application Setup** - Configure Next.js 14+ with TypeScript, Tailwind CSS, and shadcn/ui components
2. **Supabase Integration** - Set up Supabase project with authentication, database, and storage configured
3. **User Authentication** - Implement email/password and Google OAuth authentication with secure session management
4. **Audio Recording Interface** - Build browser-based audio recording using Web Audio API with visual feedback
5. **Audio File Upload** - Implement file upload functionality supporting MP3, WAV, M4A, and WebM formats
6. **Session Management** - Create, list, and view recorded sessions with metadata and transcription status
7. **Audio Transcription** - Integrate OpenAI Whisper API for multi-language transcription processing
8. **Basic UI/UX** - Design and implement core pages: login, dashboard, recording/upload interface, session details

## Out of Scope

- AI-powered evaluation generation (Phase 2)
- Patient management system (Phase 3)
- Advanced filtering and search capabilities
- Mobile-specific optimizations
- Billing and subscription management
- Team collaboration features

## Expected Deliverable

1. Functional web application where users can sign up, log in, record audio sessions, and view transcriptions
2. Secure audio file storage with proper access controls and HIPAA-compliant infrastructure
3. Basic session management interface showing all recordings with transcription status and playback capability

## Spec Documentation

- Tasks: @.agent-os/specs/2025-08-02-core-foundation/tasks.md
- Technical Specification: @.agent-os/specs/2025-08-02-core-foundation/sub-specs/technical-spec.md
- Database Schema: @.agent-os/specs/2025-08-02-core-foundation/sub-specs/database-schema.md
- API Specification: @.agent-os/specs/2025-08-02-core-foundation/sub-specs/api-spec.md
- Tests Specification: @.agent-os/specs/2025-08-02-core-foundation/sub-specs/tests.md