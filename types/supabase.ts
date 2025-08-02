export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          organization: string | null
          license_number: string | null
          role: 'psychiatrist' | 'psychologist' | 'admin' | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          organization?: string | null
          license_number?: string | null
          role?: 'psychiatrist' | 'psychologist' | 'admin' | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          organization?: string | null
          license_number?: string | null
          role?: 'psychiatrist' | 'psychologist' | 'admin' | null
          created_at?: string
          updated_at?: string
        }
      }
      sessions: {
        Row: {
          id: string
          user_id: string
          patient_identifier: string
          session_type: 'initial' | 'followup' | 'crisis' | 'other' | null
          recording_type: 'browser' | 'upload'
          status: 'recording' | 'uploading' | 'processing' | 'completed' | 'failed'
          duration_seconds: number | null
          audio_url: string | null
          storage_path: string | null
          file_size_bytes: number | null
          original_filename: string | null
          file_format: string | null
          language_detected: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          patient_identifier: string
          session_type?: 'initial' | 'followup' | 'crisis' | 'other' | null
          recording_type?: 'browser' | 'upload'
          status?: 'recording' | 'uploading' | 'processing' | 'completed' | 'failed'
          duration_seconds?: number | null
          audio_url?: string | null
          storage_path?: string | null
          file_size_bytes?: number | null
          original_filename?: string | null
          file_format?: string | null
          language_detected?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          patient_identifier?: string
          session_type?: 'initial' | 'followup' | 'crisis' | 'other' | null
          recording_type?: 'browser' | 'upload'
          status?: 'recording' | 'uploading' | 'processing' | 'completed' | 'failed'
          duration_seconds?: number | null
          audio_url?: string | null
          storage_path?: string | null
          file_size_bytes?: number | null
          original_filename?: string | null
          file_format?: string | null
          language_detected?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      transcriptions: {
        Row: {
          id: string
          session_id: string
          user_id: string
          content: string
          language: string
          confidence_score: number | null
          word_count: number | null
          processing_time_seconds: number | null
          whisper_model: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          session_id: string
          user_id: string
          content: string
          language: string
          confidence_score?: number | null
          word_count?: number | null
          processing_time_seconds?: number | null
          whisper_model?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          session_id?: string
          user_id?: string
          content?: string
          language?: string
          confidence_score?: number | null
          word_count?: number | null
          processing_time_seconds?: number | null
          whisper_model?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      audio_processing_queue: {
        Row: {
          id: string
          session_id: string
          user_id: string
          status: 'pending' | 'processing' | 'completed' | 'failed'
          priority: number
          retry_count: number
          error_message: string | null
          created_at: string
          processed_at: string | null
          completed_at: string | null
        }
        Insert: {
          id?: string
          session_id: string
          user_id: string
          status?: 'pending' | 'processing' | 'completed' | 'failed'
          priority?: number
          retry_count?: number
          error_message?: string | null
          created_at?: string
          processed_at?: string | null
          completed_at?: string | null
        }
        Update: {
          id?: string
          session_id?: string
          user_id?: string
          status?: 'pending' | 'processing' | 'completed' | 'failed'
          priority?: number
          retry_count?: number
          error_message?: string | null
          created_at?: string
          processed_at?: string | null
          completed_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}