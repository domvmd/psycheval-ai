# Tests Specification

This is the tests coverage details for the spec detailed in @.agent-os/specs/2025-08-02-core-foundation/spec.md

> Created: 2025-08-02
> Version: 1.0.0

## Test Coverage Overview

Comprehensive test coverage for authentication, audio recording, session management, and transcription functionality.

## Unit Tests

### Authentication Components

**AuthProvider**
- Should provide authentication context to children
- Should handle login state transitions
- Should persist auth state across page reloads
- Should handle token refresh automatically
- Should clear state on logout

**useAuth Hook**
- Should return current user when authenticated
- Should return null when not authenticated
- Should provide login and logout functions
- Should handle authentication errors gracefully

### Audio Recording Components

**AudioRecorder**
- Should request microphone permissions on first use
- Should show proper UI states (idle, recording, paused, processing)
- Should handle permission denial gracefully
- Should calculate and display recording duration
- Should handle maximum recording length limits

**useAudioRecorder Hook**
- Should initialize MediaRecorder with correct options
- Should handle browser compatibility checks
- Should manage recording state transitions
- Should handle stream cleanup on unmount
- Should emit audio chunks for streaming upload

### File Upload Components

**FileUploader**
- Should accept only valid audio formats (MP3, WAV, M4A, WebM)
- Should reject files larger than 500MB
- Should show upload progress
- Should handle drag-and-drop events
- Should display file metadata before upload

**useFileUpload Hook**
- Should validate file type before upload
- Should chunk large files for upload
- Should retry failed uploads
- Should calculate upload progress
- Should handle network interruptions gracefully

### Session Management

**SessionService**
- Should create new sessions with required metadata
- Should validate session types
- Should handle concurrent session creation
- Should enforce user ownership of sessions

**TranscriptionService**
- Should format audio for Whisper API
- Should handle multi-language detection
- Should retry failed transcriptions
- Should update session status on completion

## Integration Tests

### Authentication Flow

**Email/Password Authentication**
- User can sign up with email and password
- Email verification is required before access
- User can log in with verified credentials
- Invalid credentials show appropriate errors
- Password reset flow works end-to-end

**Google OAuth Authentication**
- User can authenticate with Google account
- New users are created on first OAuth login
- Existing users can link Google account
- OAuth errors are handled gracefully

### Recording Workflow

**Complete Recording Session**
- User can start a new recording session
- Audio is captured and streamed to server
- Session status updates in real-time
- Recording can be paused and resumed
- Completed recordings trigger transcription

**File Upload Workflow**
- User can select upload instead of recording
- File type validation prevents invalid uploads
- Large files show accurate progress
- Upload can be cancelled mid-transfer
- Completed uploads trigger transcription

**Session Management**
- Users see only their own sessions
- Sessions can be filtered by status and patient
- Pagination works correctly for large datasets
- Session details load with transcription

### API Endpoints

**Session Creation API**
- Creates session with valid data
- Rejects invalid session types
- Requires authentication
- Returns created session data

**Audio Upload API**
- Accepts audio chunks sequentially
- Validates chunk size limits
- Handles network interruptions
- Completes upload successfully

**File Upload API**
- Validates file format before accepting
- Enforces file size limit (500MB)
- Returns appropriate error for invalid files
- Handles multipart upload correctly

## Feature Tests

### End-to-End User Journey

**First-Time User Flow**
- User lands on marketing page
- User clicks sign up
- User completes registration form
- User verifies email
- User logs in successfully
- User sees empty dashboard
- User can start first recording

**Recording and Transcription Flow**
- User clicks "New Recording"
- User enters session metadata
- User grants microphone permission
- User starts recording
- Visual feedback shows active recording
- User stops recording after speaking
- Session appears in dashboard as "processing"
- Transcription appears when complete
- User can view and play back session

### Security Tests

**Authentication Security**
- Unauthenticated requests are rejected
- JWT tokens are validated properly
- Expired tokens trigger refresh
- Invalid tokens are rejected

**Data Access Security**
- Users cannot access other users' sessions
- Users cannot modify other users' data
- Storage URLs are properly secured
- API rate limits are enforced

## Mocking Requirements

### External Services

**OpenAI Whisper API:** Mock responses for transcription testing
- Success response with transcription
- Language detection response
- Rate limit error response
- Network timeout scenario

**Supabase Services:** Use test environment or mocks
- Authentication flows
- Database operations
- Storage operations
- Realtime subscriptions

### Browser APIs

**MediaRecorder API:** Mock for unit tests
- Permission grants/denials
- Stream availability
- Recording events
- Data availability events

**Navigator.mediaDevices:** Mock for permission testing
- getUserMedia success
- getUserMedia failure scenarios
- Device enumeration

## Performance Tests

### Load Testing

**Concurrent Users**
- System handles 100 concurrent recordings
- Dashboard loads quickly with 1000 sessions
- API responds within SLA under load

### Audio Processing

**File Size Handling**
- Large files (2+ hours) upload successfully
- Chunked upload maintains performance
- Transcription queue processes efficiently

## Accessibility Tests

**Screen Reader Compatibility**
- All interactive elements have proper labels
- Recording status is announced
- Navigation is keyboard accessible
- Error messages are announced

**Keyboard Navigation**
- All features accessible via keyboard
- Focus indicators are visible
- Tab order is logical
- Shortcuts don't conflict with screen readers