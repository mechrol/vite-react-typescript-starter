export interface User {
  id: string;
  email: string;
  username: string;
  avatar_url?: string;
  role: 'user' | 'artist';
  created_at: string;
}

export interface Artist {
  id: string;
  user_id: string;
  name: string;
  bio?: string;
  website?: string;
  social_links?: {
    instagram?: string;
    twitter?: string;
    facebook?: string;
    youtube?: string;
  };
  cover_image?: string;
  profile_image?: string;
  created_at: string;
  updated_at: string;
}

export interface Song {
  id: string;
  title: string;
  artist_id: string;
  artist_name: string;
  album?: string;
  genre?: string;
  duration: number;
  cover_url: string;
  audio_url: string;
  release_date?: string;
  created_at: string;
  plays: number;
  likes: number;
  shares: number;
  format: 'mp3' | 'wav' | 'flac';
  is_public: boolean;
}

export interface Playlist {
  id: string;
  name: string;
  description?: string;
  cover_url?: string;
  user_id: string;
  created_at: string;
  songs?: Song[];
  is_public: boolean;
}

export interface Analytics {
  song_id: string;
  plays: number;
  likes: number;
  shares: number;
  daily_plays: { date: string; count: number }[];
  listener_demographics?: {
    age_groups?: Record<string, number>;
    countries?: Record<string, number>;
  };
}

export type RepeatMode = 'off' | 'all' | 'one';

export type ThemeMode = 'light' | 'dark' | 'system';

export type AccentColor = 'blue' | 'purple' | 'pink' | 'orange' | 'green';

export interface UserPreferences {
  theme: ThemeMode;
  accentColor: AccentColor;
  crossfadeEnabled: boolean;
  crossfadeDuration: number;
  equalizerEnabled: boolean;
  equalizerSettings: Record<string, number>;
}
