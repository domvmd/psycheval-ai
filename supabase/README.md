# Supabase Database Setup

## Running Migrations

To set up the database schema in your Supabase project:

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy the contents of `migrations/20250102_initial_schema.sql`
4. Paste and run the SQL in the editor

## Database Schema

The database includes the following tables:

- **profiles**: User profile information extending auth.users
- **sessions**: Recording sessions with metadata
- **transcriptions**: Transcription results from Whisper API
- **audio_processing_queue**: Queue for processing audio files

## Row Level Security (RLS)

All tables have RLS enabled with policies that ensure users can only access their own data.

## Storage

The `audio-recordings` bucket is created for storing audio files with:
- 500MB file size limit
- Support for common audio formats (webm, ogg, mp3, m4a, wav)
- User-based folder structure for organization