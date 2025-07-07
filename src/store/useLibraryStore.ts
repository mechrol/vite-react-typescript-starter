import { create } from 'zustand';
import { Song, Playlist } from '../types';
import { supabase } from '../lib/supabase';
import { mockSongs, mockPlaylists } from '../lib/mockData';

interface LibraryState {
  songs: Song[];
  playlists: Playlist[];
  likedSongs: Song[];
  recentlyPlayed: Song[];
  isLoading: boolean;
  error: string | null;
  
  fetchSongs: () => Promise<void>;
  fetchPlaylists: () => Promise<void>;
  fetchLikedSongs: () => Promise<void>;
  addSongToLiked: (song: Song) => Promise<void>;
  removeSongFromLiked: (songId: string) => Promise<void>;
  createPlaylist: (name: string, description?: string) => Promise<void>;
  deletePlaylist: (playlistId: string) => Promise<void>;
  addSongToPlaylist: (playlistId: string, songId: string) => Promise<void>;
  removeSongFromPlaylist: (playlistId: string, songId: string) => Promise<void>;
  addToRecentlyPlayed: (song: Song) => void;
}

export const useLibraryStore = create<LibraryState>((set, get) => ({
  songs: [],
  playlists: [],
  likedSongs: [],
  recentlyPlayed: [],
  isLoading: false,
  error: null,
  
  fetchSongs: async () => {
    try {
      set({ isLoading: true, error: null });
      
      // In a real app, fetch from Supabase
      // const { data, error } = await supabase.from('songs').select('*');
      // if (error) throw error;
      
      // For now, use mock data
      set({
        songs: mockSongs,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred fetching songs',
        isLoading: false,
      });
    }
  },
  
  fetchPlaylists: async () => {
    try {
      set({ isLoading: true, error: null });
      
      // In a real app, fetch from Supabase
      // const { data, error } = await supabase.from('playlists').select('*');
      // if (error) throw error;
      
      // For now, use mock data
      set({
        playlists: mockPlaylists,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred fetching playlists',
        isLoading: false,
      });
    }
  },
  
  fetchLikedSongs: async () => {
    try {
      set({ isLoading: true, error: null });
      
      // In a real app, fetch from Supabase
      // const { data, error } = await supabase.from('liked_songs').select('*');
      // if (error) throw error;
      
      // For now, use first 3 mock songs as liked
      set({
        likedSongs: mockSongs.slice(0, 3),
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred fetching liked songs',
        isLoading: false,
      });
    }
  },
  
  addSongToLiked: async (song) => {
    try {
      set({ isLoading: true, error: null });
      
      // In a real app, add to Supabase
      // const { error } = await supabase.from('liked_songs').insert([{ song_id: song.id, user_id: userId }]);
      // if (error) throw error;
      
      // For now, just add to state
      set(state => ({
        likedSongs: [...state.likedSongs, song],
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred adding song to liked',
        isLoading: false,
      });
    }
  },
  
  removeSongFromLiked: async (songId) => {
    try {
      set({ isLoading: true, error: null });
      
      // In a real app, remove from Supabase
      // const { error } = await supabase.from('liked_songs').delete().match({ song_id: songId, user_id: userId });
      // if (error) throw error;
      
      // For now, just remove from state
      set(state => ({
        likedSongs: state.likedSongs.filter(song => song.id !== songId),
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred removing song from liked',
        isLoading: false,
      });
    }
  },
  
  createPlaylist: async (name, description) => {
    try {
      set({ isLoading: true, error: null });
      
      // In a real app, create in Supabase
      // const { data, error } = await supabase.from('playlists').insert([{ name, description, user_id: userId }]).select();
      // if (error) throw error;
      
      // For now, just create in state
      const newPlaylist: Playlist = {
        id: Date.now().toString(),
        name,
        description,
        user_id: '1', // Mock user ID
        created_at: new Date().toISOString(),
        songs: [],
      };
      
      set(state => ({
        playlists: [...state.playlists, newPlaylist],
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred creating playlist',
        isLoading: false,
      });
    }
  },
  
  deletePlaylist: async (playlistId) => {
    try {
      set({ isLoading: true, error: null });
      
      // In a real app, delete from Supabase
      // const { error } = await supabase.from('playlists').delete().match({ id: playlistId });
      // if (error) throw error;
      
      // For now, just remove from state
      set(state => ({
        playlists: state.playlists.filter(playlist => playlist.id !== playlistId),
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred deleting playlist',
        isLoading: false,
      });
    }
  },
  
  addSongToPlaylist: async (playlistId, songId) => {
    try {
      set({ isLoading: true, error: null });
      
      // In a real app, add to Supabase
      // const { error } = await supabase.from('playlist_songs').insert([{ playlist_id: playlistId, song_id: songId }]);
      // if (error) throw error;
      
      // For now, just add to state
      const song = get().songs.find(s => s.id === songId);
      
      if (!song) {
        throw new Error('Song not found');
      }
      
      set(state => ({
        playlists: state.playlists.map(playlist => {
          if (playlist.id === playlistId) {
            return {
              ...playlist,
              songs: [...(playlist.songs || []), song],
            };
          }
          return playlist;
        }),
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred adding song to playlist',
        isLoading: false,
      });
    }
  },
  
  removeSongFromPlaylist: async (playlistId, songId) => {
    try {
      set({ isLoading: true, error: null });
      
      // In a real app, remove from Supabase
      // const { error } = await supabase.from('playlist_songs').delete().match({ playlist_id: playlistId, song_id: songId });
      // if (error) throw error;
      
      // For now, just remove from state
      set(state => ({
        playlists: state.playlists.map(playlist => {
          if (playlist.id === playlistId) {
            return {
              ...playlist,
              songs: (playlist.songs || []).filter(song => song.id !== songId),
            };
          }
          return playlist;
        }),
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred removing song from playlist',
        isLoading: false,
      });
    }
  },
  
  addToRecentlyPlayed: (song) => {
    set(state => {
      // Remove the song if it's already in the list to avoid duplicates
      const filteredRecent = state.recentlyPlayed.filter(s => s.id !== song.id);
      
      // Add the song to the beginning and keep only the last 20
      return {
        recentlyPlayed: [song, ...filteredRecent].slice(0, 20),
      };
    });
  },
}));
