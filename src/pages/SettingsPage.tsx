import React from 'react';
import { useThemeStore } from '../store/useThemeStore';
import { usePreferencesStore } from '../store/usePreferencesStore';
import { Toggle } from '../components/ui/Toggle';
import { Slider } from '../components/ui/Slider';
import { Button } from '../components/ui/Button';

const SettingsPage: React.FC = () => {
  const { mode, accentColor, setMode, setAccentColor } = useThemeStore();
  const {
    crossfadeEnabled,
    crossfadeDuration,
    equalizerEnabled,
    equalizerSettings,
    toggleCrossfade,
    setCrossfadeDuration,
    toggleEqualizer,
    setEqualizerBand,
    resetEqualizerSettings,
  } = usePreferencesStore();
  
  const accentColors = [
    { name: 'Blue', value: 'blue' },
    { name: 'Purple', value: 'purple' },
    { name: 'Pink', value: 'pink' },
    { name: 'Orange', value: 'orange' },
    { name: 'Green', value: 'green' },
  ];
  
  const themeOptions = [
    { name: 'Light', value: 'light' },
    { name: 'Dark', value: 'dark' },
    { name: 'System', value: 'system' },
  ];
  
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Settings</h1>
      
      <div className="space-y-8">
        {/* Appearance */}
        <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Appearance</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Theme</h3>
              <div className="flex flex-wrap gap-3">
                {themeOptions.map((theme) => (
                  <button
                    key={theme.value}
                    onClick={() => setMode(theme.value as any)}
                    className={`
                      px-4 py-2 rounded-md text-sm font-medium
                      ${mode === theme.value 
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 ring-1 ring-blue-400 dark:ring-blue-700' 
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}
                    `}
                  >
                    {theme.name}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Accent Color</h3>
              <div className="flex flex-wrap gap-3">
                {accentColors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setAccentColor(color.value as any)}
                    className={`
                      w-8 h-8 rounded-full 
                      ${accentColor === color.value ? 'ring-2 ring-offset-2 ring-gray-400 dark:ring-gray-600' : ''}
                    `}
                    style={{ 
                      backgroundColor: 
                        color.value === 'blue' ? '#0ea5e9' : 
                        color.value === 'purple' ? '#a855f7' : 
                        color.value === 'pink' ? '#ec4899' : 
                        color.value === 'orange' ? '#f97316' : 
                        '#22c55e' // green
                    }}
                    aria-label={`${color.name} accent color`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Playback */}
        <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Playback</h2>
          
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Crossfade</h3>
                <Toggle isChecked={crossfadeEnabled} onChange={toggleCrossfade} />
              </div>
              
              <div className={crossfadeEnabled ? 'opacity-100' : 'opacity-50 pointer-events-none'}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400">Duration: {crossfadeDuration}s</span>
                </div>
                <Slider
                  min={1}
                  max={12}
                  value={crossfadeDuration}
                  onChange={setCrossfadeDuration}
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Equalizer */}
        <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Equalizer</h2>
            <Toggle isChecked={equalizerEnabled} onChange={toggleEqualizer} />
          </div>
          
          <div className={equalizerEnabled ? 'opacity-100' : 'opacity-50 pointer-events-none'}>
            <div className="grid grid-cols-7 gap-4 mb-6">
              {Object.entries(equalizerSettings).map(([band, value]) => (
                <div key={band} className="flex flex-col items-center">
                  <div className="h-32 flex items-center">
                    <Slider
                      min={-12}
                      max={12}
                      step={0.5}
                      value={value}
                      onChange={(newValue) => setEqualizerBand(band, newValue)}
                      className="h-24 transform rotate-270"
                    />
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-400 mt-2">{band}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-500 mt-1">{value > 0 ? `+${value}` : value} dB</span>
                </div>
              ))}
            </div>
            
            <div className="flex justify-end">
              <Button
                variant="secondary"
                size="sm"
                onClick={resetEqualizerSettings}
              >
                Reset
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SettingsPage;
