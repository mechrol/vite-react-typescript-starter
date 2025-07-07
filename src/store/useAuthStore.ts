import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  signUp: (email: string, password: string, username: string, role?: 'user' | 'artist') => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  getCurrentUser: () => Promise<void>;
  updateUserProfile: (updates: Partial<User>) => Promise<void>;
  isArtist: () => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoading: false,
  error: null,
  
  signUp: async (email, password, username, role = 'user') => {
    try {
      set({ isLoading: true, error: null });
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) throw error;
      
      if (data.user) {
        // Create user profile
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: data.user.id,
              username,
              email,
              role,
            },
          ]);
        
        if (profileError) throw profileError;
        
        // If role is artist, create artist profile
        if (role === 'artist') {
          const { error: artistError } = await supabase
            .from('artists')
            .insert([
              {
                user_id: data.user.id,
                name: username,
              },
            ]);
          
          if (artistError) throw artistError;
        }
        
        // Get the created profile
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();
        
        set({
          user: profileData as User,
          isLoading: false,
        });
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred during sign up',
        isLoading: false,
      });
    }
  },
  
  signIn: async (email, password) => {
    try {
      set({ isLoading: true, error: null });
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      if (data.user) {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();
        
        set({
          user: profileData as User,
          isLoading: false,
        });
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred during sign in',
        isLoading: false,
      });
    }
  },
  
  signOut: async () => {
    try {
      set({ isLoading: true, error: null });
      
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      set({
        user: null,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred during sign out',
        isLoading: false,
      });
    }
  },
  
  getCurrentUser: async () => {
    try {
      set({ isLoading: true, error: null });
      
      const { data } = await supabase.auth.getUser();
      
      if (data.user) {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();
        
        set({
          user: profileData as User,
          isLoading: false,
        });
      } else {
        set({
          user: null,
          isLoading: false,
        });
      }
    } catch (error) {
      set({
        user: null,
        error: error instanceof Error ? error.message : 'An error occurred getting current user',
        isLoading: false,
      });
    }
  },
  
  updateUserProfile: async (updates) => {
    try {
      const { user } = get();
      
      if (!user) throw new Error('No user logged in');
      
      set({ isLoading: true, error: null });
      
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);
      
      if (error) throw error;
      
      set({
        user: { ...user, ...updates },
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred updating profile',
        isLoading: false,
      });
    }
  },
  
  isArtist: () => {
    const { user } = get();
    return user?.role === 'artist';
  },
}));
