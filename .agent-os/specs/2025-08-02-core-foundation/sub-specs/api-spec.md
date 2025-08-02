# API Specification

This is the API specification for the spec detailed in @.agent-os/specs/2025-08-02-core-foundation/spec.md

> Created: 2025-08-02
> Version: 1.0.0

## API Overview

The API consists of Next.js API routes and Supabase Edge Functions for handling audio processing and transcription workflows.

## Next.js API Routes

### POST /api/sessions/create

**Purpose:** Create a new recording session
**Parameters:**

- `patientIdentifier` (string, required) - Anonymized patient ID
- `sessionType` (string, required) - Type of session (initial, followup, crisis, other)
- `recordingType` (string, required) - Recording method (browser, upload)
- `notes` (string, optional) - Initial session notes

**Response:**

```json
{
  "id": "uuid",
  "patientIdentifier": "string",
  "sessionType": "string",
  "recordingType": "string",
  "status": "recording",
  "createdAt": "timestamp"
}
```

**Errors:**

- 400: Invalid session type or recording type
- 401: Unauthorized
- 500: Server error

### POST /api/sessions/[id]/upload

**Purpose:** Upload audio chunk for streaming recording
**Parameters:**

- `sessionId` (string, required) - Session UUID
- `chunk` (Blob, required) - Audio data chunk
- `isLastChunk` (boolean, required) - Indicates final chunk

**Response:**

```json
{
  "success": true,
  "bytesReceived": 12345,
  "totalBytes": 123456
}
```

**Errors:**

- 404: Session not found
- 401: Unauthorized
- 413: File too large
- 500: Upload failed

### PATCH /api/sessions/[id]/complete

**Purpose:** Mark recording as complete and trigger transcription
**Parameters:**

- `sessionId` (string, required) - Session UUID
- `duration` (number, required) - Total duration in seconds

**Response:**

```json
{
  "id": "uuid",
  "status": "processing",
  "queuePosition": 1
}
```

**Errors:**

- 404: Session not found
- 401: Unauthorized
- 400: Session already completed

### GET /api/sessions

**Purpose:** List user's sessions with pagination
**Parameters:**

- `page` (number, optional) - Page number (default: 1)
- `limit` (number, optional) - Items per page (default: 20)
- `patientId` (string, optional) - Filter by patient
- `status` (string, optional) - Filter by status

**Response:**

```json
{
  "sessions": [
    {
      "id": "uuid",
      "patientIdentifier": "string",
      "sessionType": "string",
      "status": "completed",
      "duration": 3600,
      "createdAt": "timestamp",
      "transcription": {
        "id": "uuid",
        "wordCount": 5000,
        "language": "en"
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "pages": 5
  }
}
```

### POST /api/sessions/[id]/upload-file

**Purpose:** Upload complete audio file for a session
**Parameters:**

- `sessionId` (string, required) - Session UUID
- `file` (File, required) - Audio file (MP3, WAV, M4A, WebM)

**Response:**

```json
{
  "id": "uuid",
  "status": "processing",
  "fileSize": 12345678,
  "format": "mp3",
  "queuePosition": 1
}
```

**Errors:**

- 404: Session not found
- 401: Unauthorized
- 413: File too large (>500MB)
- 415: Unsupported file type
- 500: Upload failed

### GET /api/sessions/[id]

**Purpose:** Get session details with transcription
**Parameters:**

- `sessionId` (string, required) - Session UUID

**Response:**

```json
{
  "id": "uuid",
  "patientIdentifier": "string",
  "sessionType": "string",
  "recordingType": "browser",
  "status": "completed",
  "duration": 3600,
  "audioUrl": "string",
  "originalFilename": "session_recording.mp3",
  "createdAt": "timestamp",
  "transcription": {
    "id": "uuid",
    "content": "string",
    "language": "en",
    "wordCount": 5000,
    "confidenceScore": 0.95
  }
}
```

## Supabase Edge Functions

### process-audio

**Purpose:** Handle audio file processing and Whisper API integration
**Trigger:** Database trigger on audio_processing_queue insert

**Flow:**

1. Fetch audio file from storage
2. Convert to Whisper-compatible format if needed
3. Send to OpenAI Whisper API
4. Store transcription result
5. Update session status
6. Send real-time update

**Implementation:**

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

serve(async (req: Request) => {
  const { sessionId, userId } = await req.json();

  // Process audio file
  // Call Whisper API
  // Store results
  // Update status

  return new Response(JSON.stringify({ success: true }));
});
```

### webhook-transcription

**Purpose:** Receive transcription completion webhooks
**Method:** POST
**Authentication:** Webhook secret validation

**Payload:**

```json
{
  "sessionId": "uuid",
  "transcription": {
    "text": "string",
    "language": "en",
    "duration": 3600,
    "words": []
  }
}
```

## Authentication

All API routes require authentication via Supabase Auth JWT tokens:

- Bearer token in Authorization header
- Automatic token refresh handled by Supabase client
- RLS policies enforce data access control

## Rate Limiting

- Sessions creation: 10 per minute per user
- Audio upload: 100 requests per minute per session
- Session listing: 60 requests per minute per user

## Error Response Format

```json
{
  "error": {
    "message": "Human-readable error message",
    "code": "ERROR_CODE",
    "details": {}
  }
}
```
