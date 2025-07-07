import { create } from 'zustand';
import { Song, RepeatMode } from '../types';
import { mockSongs } from '../lib/mockData';

interface PlayerState {
  currentSong: Song | null;
  queue: Song[];
  history: Song[];
  isPlaying: boolean;
  repeat: RepeatMode;
  shuffle: boolean;
  volume: number;
  muted: boolean;
  currentTime: number;
  duration: number;
  
  setCurrentSong: (song: Song) => void;
  togglePlay: () => void;
  playNext: () => void;
  playPrevious: () => void;
  toggleRepeat: () => void;
  toggleShuffle: () => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  addToQueue: (song: Song) => void;
  clearQueue: () => void;
  removeFromQueue: (songId: string) => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentSong: null,
  queue: [],
  history: [],
  isPlaying: false,
  repeat: 'off',
  shuffle: false,
  volume: 0.7,
  muted: false,
  currentTime: 0,
  duration: 0,
  
  setCurrentSong: (song) => {
    const { currentSong, history } = get();
    
    // Add current song to history if it exists
    if (currentSong) {
      set({
        history: [currentSong, ...history.slice(0, 19)], // Keep last 20 songs
      });
    }
    
    set({
      currentSong: song,
      isPlaying: true,
      currentTime: 0,
    });
  },
  
  togglePlay: () => {
    const { isPlaying, currentSong } = get();
    
    // If no song is selected, pick the first one from mock data
    if (!currentSong && mockSongs.length > 0) {
      set({
        currentSong: mockSongs[0],
        isPlaying: true,
      });
      return;
    }
    
    set({ isPlaying: !isPlaying });
  },
  
  playNext: () => {
    const { currentSong, queue, shuffle, repeat } = get();
    
    if (!currentSong) return;
    
    // If queue is empty, use mock songs
    const songsToUse = queue.length > 0 ? queue : mockSongs;
    
    if (songsToUse.length === 0) return;
    
    let nextIndex = 0;
    
    if (shuffle) {
      // Play random song
      nextIndex = Math.floor(Math.random() * songsToUse.length);
    } else {
      // Find current song index
      const currentIndex = songsToUse.findIndex(song => song.id === currentSong.id);
      
      // Get next song index
      nextIndex = currentIndex + 1;
      
      // If at the end of the list and repeat is on, go back to the beginning
      if (nextIndex >= songsToUse.length) {
        if (repeat === 'all') {
          nextIndex = 0;
        } else if (repeat === 'off') {
          // Stop playing if repeat is off and we're at the end
          set({ isPlaying: false });
          return;
        }
      }
    }
    
    // Set next song
    const nextSong = songsToUse[nextIndex];
    
    if (nextSong) {
      get().setCurrentSong(nextSong);
      
      // Remove from queue if it's from the queue
      if (queue.length > 0) {
        set({
          queue: queue.filter((_, index) => index !== 0),
        });
      }
    }
  },
  
  playPrevious: () => {
    const { currentSong, history, currentTime } = get();
    
    // If current song has played for more than 3 seconds, restart it
    if (currentTime > 3) {
      set({ currentTime: 0 });
      return;
    }
    
    // If there's history, play the most recent song
    if (history.length > 0) {
      const previousSong = history[0];
      set({
        currentSong: previousSong,
        history: history.slice(1),
        isPlaying: true,
        currentTime: 0,
      });
      return;
    }
    
    // If no history, find the previous song in mock data
    if (currentSong) {
      const currentIndex = mockSongs.findIndex(song => song.id === currentSong.id);
      
      if (currentIndex > 0) {
        const previousSong = mockSongs[currentIndex - 1];
        get().setCurrentSong(previousSong);
      } else if (currentIndex === 0) {
        // If at the beginning, go to the end if there are songs
        if (mockSongs.length > 0) {
          const lastSong = mockSongs[mockSongs.length - 1];
          get().setCurrentSong(lastSong);
        }
      }
    } else if (mockSongs.length > 0) {
      // If no current song, play the first one
      get().setCurrentSong(mockSongs[0]);
    }
  },
  
  toggleRepeat: () => {
    const { repeat } = get();
    
    // Cycle through repeat modes: off -> all -> one -> off
    const nextRepeat: RepeatMode = 
      repeat === 'off' ? 'all' : 
      repeat === 'all' ? 'one' : 'off';
    
    set({ repeat: nextRepeat });
  },
  
  toggleShuffle: () => {
    set(state => ({ shuffle: !state.shuffle }));
  },
  
  setVolume: (volume) => {
    set({ volume, muted: volume === 0 });
  },
  
  toggleMute: () => {
    const { muted } = get();
    set({ muted: !muted });
  },
  
  setCurrentTime: (time) => {
    set({ currentTime: time });
  },
  
  setDuration: (duration) => {
    set({ duration });
  },
  
  addToQueue: (song) => {
    set(state => ({
      queue: [...state.queue, song],
    }));
  },
  
  clearQueue: () => {
    set({ queue: [] });
  },
  
  removeFromQueue: (songId) => {
    set(state => ({
      queue: state.queue.filter(song => song.id !== songId),
    }));
  },
}));
