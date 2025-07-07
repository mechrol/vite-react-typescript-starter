import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { Artist, Song, Analytics } from '../types';
import { useAuthStore } from './useAuthStore';

interface ArtistState {
  artist: Artist | null;
  songs: Song[];
  analytics: Record<string, Analytics>;
  isLoading: boolean;
  error: string | null;
  
  fetchArtistProfile: () => Promise<void>;
  updateArtistProfile: (updates: Partial<Artist>) => Promise<void>;
  fetchArtistSongs: () => Promise<void>;
  uploadSong: (songData: FormData) => Promise<void>;
  updateSong: (songId: string, updates: Partial<Song>) => Promise<void>;
  deleteSong: (songId: string) => Promise<void>;
  fetchSongAnalytics: (songId: string) => Promise<void>;
  fetchAllAnalytics: () => Promise<void>;
  toggleSongPublic: (songId: string, isPublic: boolean) => Promise<void>;
}

export const useArtistStore = create<ArtistState>((set, get) => ({
  artist: null,
  songs: [],
  analytics: {},
  isLoading: false,
  error: null,
  
  fetchArtistProfile: async () => {
    try {
      const user = useAuthStore.getState().user;
      
      if (!user) throw new Error('No user logged in');
      if (user.role !== 'artist') throw new Error('User is not an artist');
      
      set({ isLoading: true, error: null });
      
      const { data, error } = await supabase
        .from('artists')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (error) throw error;
      
      set({
        artist: data as Artist,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred fetching artist profile',
        isLoading: false,
      });
    }
  },
  
  updateArtistProfile: async (updates) => {
    try {
      const { artist } = get();
      const user = useAuthStore.getState().user;
      
      if (!user) throw new Error('No user logged in');
      if (user.role !== 'artist') throw new Error('User is not an artist');
      if (!artist) throw new Error('Artist profile not found');
      
      set({ isLoading: true, error: null });
      
      const { error } = await supabase
        .from('artists')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', artist.id);
      
      if (error) throw error;
      
      set({
        artist: { ...artist, ...updates, updated_at: new Date().toISOString() },
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred updating artist profile',
        isLoading: false,
      });
    }
  },
  
  fetchArtistSongs: async () => {
    try {
      const { artist } = get();
      
      if (!artist) throw new Error('Artist profile not found');
      
      set({ isLoading: true, error: null });
      
      const { data, error } = await supabase
        .from('songs')
        .select('*')
        .eq('artist_id', artist.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      set({
        songs: data as Song[],
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred fetching artist songs',
        isLoading: false,
      });
    }
  },
  
  uploadSong: async (formData) => {
    try {
      const { artist } = get();
      
      if (!artist) throw new Error('Artist profile not found');
      
      set({ isLoading: true, error: null });
      
      // In a real implementation, this would handle the file upload to storage
      // and then create a record in the songs table
      
      // Mock implementation for demonstration
      const title = formData.get('title') as string;
      const genre = formData.get('genre') as string;
      const audioFile = formData.get('audioFile') as File;
      const coverImage = formData.get('coverImage') as File;
      
      if (!title || !audioFile) {
        throw new Error('Title and audio file are required');
      }
      
      // Mock file upload
      const audioUrl = URL.createObjectURL(audioFile);
      const coverUrl = coverImage ? URL.createObjectURL(coverImage) : '';
      
      // Create song record
      const newSong: Partial<Song> = {
        title,
        artist_id: artist.id,
        artist_name: artist.name,
        genre,
        audio_url: audioUrl,
        cover_url: coverUrl,
        duration: 180, // Mock duration
        format: 'mp3', // Mock format
        release_date: new Date().toISOString(),
        created_at: new Date().toISOString(),
        plays: 0,
        likes: 0,
        shares: 0,
        is_public: false,
      };
      
      const { data, error } = await supabase
        .from('songs')
        .insert([newSong])
        .select();
      
      if (error) throw error;
      
      // Update songs list
      set(state => ({
        songs: [data[0] as Song, ...state.songs],
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred uploading song',
        isLoading: false,
      });
    }
  },
  
  updateSong: async (songId, updates) => {
    try {
      set({ isLoading: true, error: null });
      
      const { error } = await supabase
        .from('songs')
        .update(updates)
        .eq('id', songId);
      
      if (error) throw error;
      
      // Update songs list
      set(state => ({
        songs: state.songs.map(song => 
          song.id === songId ? { ...song, ...updates } : song
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred updating song',
        isLoading: false,
      });
    }
  },
  
  deleteSong: async (songId) => {
    try {
      set({ isLoading: true, error: null });
      
      const { error } = await supabase
        .from('songs')
        .delete()
        .eq('id', songId);
      
      if (error) throw error;
      
      // Update songs list
      set(state => ({
        songs: state.songs.filter(song => song.id !== songId),
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred deleting song',
        isLoading: false,
      });
    }
  },
  
  fetchSongAnalytics: async (songId) => {
    try {
      set({ isLoading: true, error: null });
      
      // In a real implementation, this would fetch analytics from the database
      
      // Mock implementation for demonstration
      const mockAnalytics: Analytics = {
        song_id: songId,
        plays: Math.floor(Math.random() * 10000),
        likes: Math.floor(Math.random() * 1000),
        shares: Math.floor(Math.random() * 500),
        daily_plays: Array.from({ length: 30 }, (_, i) => ({
          date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          count: Math.floor(Math.random() * 100),
        })).reverse(),
        listener_demographics: {
          age_groups: {
            '18-24': 30,
            '25-34': 40,
            '35-44': 20,
            '45+': 10,
          },
          countries: {
            'United States': 40,
            'United Kingdom': 15,
            'Germany': 10,
            'France': 8,
            'Canada': 7,
            'Other': 20,
          },
        },
      };
      
      set(state => ({
        analytics: {
          ...state.analytics,
          [songId]: mockAnalytics,
        },
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred fetching song analytics',
        isLoading: false,
      });
    }
  },
  
  fetchAllAnalytics: async () => {
    try {
      const { songs } = get();
      
      set({ isLoading: true, error: null });
      
      // Fetch analytics for all songs
      for (const song of songs) {
        await get().fetchSongAnalytics(song.id);
      }
      
      set({ isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred fetching analytics',
        isLoading: false,
      });
    }
  },
  
  toggleSongPublic: async (songId, isPublic) => {
    try {
      set({ isLoading: true, error: null });
      
      const { error } = await supabase
        .from('songs')
        .update({ is_public: isPublic })
        .eq('id', songId);
      
      if (error) throw error;
      
      // Update songs list
      set(state => ({
        songs: state.songs.map(song => 
          song.id === songId ? { ...song, is_public: isPublic } : song
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred updating song visibility',
        isLoading: false,
      });
    }
  },
}));
