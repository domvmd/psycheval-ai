# Database Schema

This is the database schema implementation for the spec detailed in @.agent-os/specs/2025-08-02-core-foundation/spec.md

> Created: 2025-08-02
> Version: 1.0.0

## Schema Overview

The database schema supports user authentication, session recording management, and transcription storage with proper relationships and security policies.

## Tables

### profiles

Extends Supabase auth.users with additional profile information.

```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  organization TEXT,
  license_number TEXT,
  role TEXT CHECK (role IN ('psychiatrist', 'psychologist', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);
```

### sessions

Stores recording sessions with metadata.

```sql
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  patient_identifier TEXT NOT NULL, -- Anonymized patient ID
  session_type TEXT CHECK (session_type IN ('initial', 'followup', 'crisis', 'other')),
  recording_type TEXT CHECK (recording_type IN ('browser', 'upload')) DEFAULT 'browser',
  status TEXT CHECK (status IN ('recording', 'uploading', 'processing', 'completed', 'failed')) DEFAULT 'recording',
  duration_seconds INTEGER,
  audio_url TEXT,
  storage_path TEXT,
  file_size_bytes BIGINT,
  original_filename TEXT, -- For uploaded files
  file_format TEXT, -- Audio format (mp3, wav, m4a, webm)
  language_detected TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_sessions_user_id ON sessions(user_id);
CREATE INDEX idx_sessions_created_at ON sessions(created_at DESC);
CREATE INDEX idx_sessions_patient ON sessions(patient_identifier);

-- Enable RLS
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own sessions" ON sessions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own sessions" ON sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own sessions" ON sessions
  FOR UPDATE USING (auth.uid() = user_id);
```

### transcriptions

Stores transcription results from Whisper API.

```sql
CREATE TABLE transcriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES sessions(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  language TEXT NOT NULL,
  confidence_score DECIMAL(3,2),
  word_count INTEGER,
  processing_time_seconds INTEGER,
  whisper_model TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_transcriptions_session_id ON transcriptions(session_id);
CREATE INDEX idx_transcriptions_user_id ON transcriptions(user_id);

-- Enable RLS
ALTER TABLE transcriptions ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own transcriptions" ON transcriptions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can create transcriptions" ON transcriptions
  FOR INSERT WITH CHECK (true); -- Will use service role key

CREATE POLICY "Users can update own transcriptions" ON transcriptions
  FOR UPDATE USING (auth.uid() = user_id);
```

### audio_processing_queue

Queue for audio files awaiting transcription.

```sql
CREATE TABLE audio_processing_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES sessions(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  status TEXT CHECK (status IN ('pending', 'processing', 'completed', 'failed')) DEFAULT 'pending',
  priority INTEGER DEFAULT 0,
  retry_count INTEGER DEFAULT 0,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  processed_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ
);

-- Indexes
CREATE INDEX idx_queue_status ON audio_processing_queue(status);
CREATE INDEX idx_queue_priority ON audio_processing_queue(priority DESC, created_at ASC);

-- Enable RLS
ALTER TABLE audio_processing_queue ENABLE ROW LEVEL SECURITY;

-- Policies (restricted to service role)
CREATE POLICY "Service role only" ON audio_processing_queue
  FOR ALL USING (auth.role() = 'service_role');
```

## Storage Buckets

```sql
-- Audio files bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'audio-recordings',
  'audio-recordings',
  false,
  524288000, -- 500MB limit
  ARRAY['audio/webm', 'audio/ogg', 'audio/mpeg', 'audio/mp4', 'audio/wav', 'audio/x-wav', 'audio/x-m4a']
);

-- Bucket policies
CREATE POLICY "Users can upload own audio" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'audio-recordings' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can view own audio" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'audio-recordings' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );
```

## Database Functions

```sql
-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply to all tables
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sessions_updated_at BEFORE UPDATE ON sessions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_transcriptions_updated_at BEFORE UPDATE ON transcriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

## Migration Notes

1. Run migrations in order
2. Ensure Supabase auth is configured before creating profiles table
3. Set up storage buckets after database tables
4. Test RLS policies thoroughly before production
