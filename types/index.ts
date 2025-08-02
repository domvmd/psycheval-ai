// Common type definitions for PsychEval AI

export interface User {
  id: string;
  email: string;
  fullName?: string;
  organization?: string;
  licenseNumber?: string;
  role: 'psychiatrist' | 'psychologist' | 'admin';
  createdAt: string;
  updatedAt: string;
}

export interface Session {
  id: string;
  userId: string;
  patientIdentifier: string;
  sessionType: 'initial' | 'followup' | 'crisis' | 'other';
  recordingType: 'browser' | 'upload';
  status: 'recording' | 'uploading' | 'processing' | 'completed' | 'failed';
  durationSeconds?: number;
  audioUrl?: string;
  originalFilename?: string;
  fileFormat?: string;
  languageDetected?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Transcription {
  id: string;
  sessionId: string;
  userId: string;
  content: string;
  language: string;
  confidenceScore?: number;
  wordCount?: number;
  processingTimeSeconds?: number;
  whisperModel?: string;
  createdAt: string;
  updatedAt: string;
}