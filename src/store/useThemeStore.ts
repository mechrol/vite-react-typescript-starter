import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ThemeMode, AccentColor } from '../types';
import { applyThemeClasses } from '../utils/themeUtils';

interface ThemeState {
  mode: ThemeMode;
  accentColor: AccentColor;
  toggleMode: () => void;
  setMode: (mode: ThemeMode) => void;
  setAccentColor: (color: AccentColor) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      mode: 'system',
      accentColor: 'blue',
      
      toggleMode: () => {
        set(state => {
          const newMode: ThemeMode = 
            state.mode === 'light' ? 'dark' : 
            state.mode === 'dark' ? 'system' : 'light';
          
          // Apply theme classes immediately
          setTimeout(() => applyThemeClasses(), 0);
          
          return { mode: newMode };
        });
      },
      
      setMode: (mode) => {
        set({ mode });
        
        // Apply theme classes immediately
        setTimeout(() => applyThemeClasses(), 0);
      },
      
      setAccentColor: (accentColor) => {
        set({ accentColor });
      },
    }),
    {
      name: 'harmony-theme',
    }
  )
);
