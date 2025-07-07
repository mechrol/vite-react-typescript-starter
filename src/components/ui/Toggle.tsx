import React from 'react';
import { useThemeStore } from '../../store/useThemeStore';
import { getAccentColorClass } from '../../utils/themeUtils';

interface ToggleProps {
  isChecked: boolean;
  onChange: () => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}

export const Toggle: React.FC<ToggleProps> = ({
  isChecked,
  onChange,
  label,
  disabled = false,
  className = '',
}) => {
  const { accentColor } = useThemeStore();
  const accentBgColor = getAccentColorClass(accentColor);
  
  return (
    <div className={`flex items-center ${className}`}>
      <button
        type="button"
        className={`
          relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer 
          transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
          ${isChecked ? accentBgColor : 'bg-gray-200 dark:bg-gray-700'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        onClick={onChange}
        disabled={disabled}
        aria-pressed={isChecked}
      >
        <span className="sr-only">{label || 'Toggle'}</span>
        <span
          className={`
            pointer-events-none inline-block h-5 w-5 rounded-full bg-white dark:bg-gray-200 shadow transform ring-0 
            transition ease-in-out duration-200
            ${isChecked ? 'translate-x-5' : 'translate-x-0'}
          `}
        />
      </button>
      
      {label && (
        <span className="ml-3 text-sm text-gray-900 dark:text-gray-100">
          {label}
        </span>
      )}
    </div>
  );
};
