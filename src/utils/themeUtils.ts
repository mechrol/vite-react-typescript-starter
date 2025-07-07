import { AccentColor } from '../types';

export const applyThemeClasses = (): void => {
  // Check for system preference
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Get user preference from store or localStorage
  const storedTheme = localStorage.getItem('theme') || 'system';
  
  // Apply dark mode if user prefers dark or system preference is dark
  if (storedTheme === 'dark' || (storedTheme === 'system' && prefersDark)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

export const getAccentColorClass = (accentColor: AccentColor): string => {
  switch (accentColor) {
    case 'blue':
      return 'bg-blue-500';
    case 'purple':
      return 'bg-purple-500';
    case 'pink':
      return 'bg-pink-500';
    case 'orange':
      return 'bg-orange-500';
    case 'green':
      return 'bg-green-500';
    default:
      return 'bg-blue-500';
  }
};

export const getAccentTextColorClass = (accentColor: AccentColor): string => {
  switch (accentColor) {
    case 'blue':
      return 'text-blue-500';
    case 'purple':
      return 'text-purple-500';
    case 'pink':
      return 'text-pink-500';
    case 'orange':
      return 'text-orange-500';
    case 'green':
      return 'text-green-500';
    default:
      return 'text-blue-500';
  }
};
