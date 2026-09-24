import { createClient } from '@supabase/supabase-js';

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          display_name: string;
          country: string;
          language_code: string;
          avatar_initials: string;
          avatar_color: string;
          status: 'online' | 'offline';
          created_at: string;
        };
        Insert: {
          id?: string;
          display_name: string;
          country?: string;
          language_code?: string;
          avatar_initials: string;
          avatar_color?: string;
          status?: 'online' | 'offline';
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>;
      };
      conversations: {
        Row: { id: string; participant_key: string; created_at: string; updated_at: string };
        Insert: { id?: string; participant_key: string; created_at?: string; updated_at?: string };
        Update: Partial<Database['public']['Tables']['conversations']['Insert']>;
      };
      conversation_participants: {
        Row: { conversation_id: string; profile_id: string; joined_at: string };
        Insert: { conversation_id: string; profile_id: string; joined_at?: string };
        Update: Partial<Database['public']['Tables']['conversation_participants']['Insert']>;
      };
      messages: {
        Row: {
          id: string;
          conversation_id: string;
          sender_profile_id: string;
          body: string;
          delivery_status: 'sent' | 'received' | 'read';
          created_at: string;
          read_at: string | null;
        };
        Insert: {
          id?: string;
          conversation_id: string;
          sender_profile_id: string;
          body: string;
          delivery_status?: 'sent' | 'received' | 'read';
          created_at?: string;
          read_at?: string | null;
        };
        Update: Partial<Database['public']['Tables']['messages']['Insert']>;
      };
      translations: {
        Row: {
          id: string;
          message_id: string;
          source_language: string;
          target_language: string;
          translated_text: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          message_id: string;
          source_language?: string;
          target_language: string;
          translated_text: string;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['translations']['Insert']>;
      };
    };
  };
};

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: true, autoRefreshToken: true },
});
