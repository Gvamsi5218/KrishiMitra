import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database Types
export interface FarmerProfile {
  id: string;
  user_id: string;
  full_name: string;
  phone: string;
  village: string;
  district: string;
  state: string;
  farm_size: number;
  farm_type: string;
  primary_crops: string[];
  experience_years: number;
  education_level: string;
  preferred_language: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface CommunityPost {
  id: string;
  farmer_id: string;
  title: string;
  content: string;
  category: string;
  images?: string[];
  likes_count: number;
  comments_count: number;
  is_question: boolean;
  is_solved: boolean;
  tags: string[];
  created_at: string;
  farmer: FarmerProfile;
}

export interface Comment {
  id: string;
  post_id: string;
  farmer_id: string;
  content: string;
  is_answer: boolean;
  likes_count: number;
  created_at: string;
  farmer: FarmerProfile;
}

export interface Questionnaire {
  id: string;
  farmer_id: string;
  crop_type: string;
  problem_category: string;
  symptoms: string[];
  severity: number;
  affected_area: number;
  weather_conditions: string;
  soil_type: string;
  images?: string[];
  location: { lat: number; lng: number };
  status: 'pending' | 'in_progress' | 'resolved';
  ai_diagnosis?: string;
  expert_advice?: string;
  created_at: string;
}

export interface ExpertConsultation {
  id: string;
  farmer_id: string;
  expert_id: string;
  topic: string;
  description: string;
  scheduled_at: string;
  duration: number;
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
  meeting_link?: string;
  consultation_fee: number;
  created_at: string;
}