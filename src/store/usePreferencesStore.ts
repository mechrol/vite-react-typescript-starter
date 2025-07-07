import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PreferencesState {
  crossfadeEnabled: boolean;
  crossfadeDuration: number;
  equalizerEnabled: boolean;
  equalizerSettings: Record<string, number>;
  
  toggleCrossfade: () => void;
  setCrossfadeDuration: (duration: number) => void;
  toggleEqualizer: () => void;
  setEqualizerBand: (band: string, value: number) => void;
  resetEqualizerSettings: () => void;
}

const DEFAULT_EQUALIZER_SETTINGS = {
  '60Hz': 0,
  '150Hz': 0,
  '400Hz': 0,
  '1kHz': 0,
  '2.4kHz': 0,
  '6kHz': 0,
  '15kHz': 0,
};

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      crossfadeEnabled: false,
      crossfadeDuration: 3, // seconds
      equalizerEnabled: false,
      equalizerSettings: DEFAULT_EQUALIZER_SETTINGS,
      
      toggleCrossfade: () => {
        set(state => ({
          crossfadeEnabled: !state.crossfadeEnabled,
        }));
      },
      
      setCrossfadeDuration: (duration) => {
        set({ crossfadeDuration: duration });
      },
      
      toggleEqualizer: () => {
        set(state => ({
          equalizerEnabled: !state.equalizerEnabled,
        }));
      },
      
      setEqualizerBand: (band, value) => {
        set(state => ({
          equalizerSettings: {
            ...state.equalizerSettings,
            [band]: value,
          },
        }));
      },
      
      resetEqualizerSettings: () => {
        set({ equalizerSettings: DEFAULT_EQUALIZER_SETTINGS });
      },
    }),
    {
      name: 'harmony-preferences',
    }
  )
);
