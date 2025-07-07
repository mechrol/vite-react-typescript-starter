import React, { useState } from 'react';
import { Mail, Lock, User, Music } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useAuthStore } from '../../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { Toggle } from '../ui/Toggle';

export const SignupForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isArtist, setIsArtist] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  
  const { signUp, isLoading, error } = useAuthStore();
  const navigate = useNavigate();
  
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (!username.trim()) {
      errors.username = 'Username is required';
    } else if (username.length < 3) {
      errors.username = 'Username must be at least 3 characters';
    }
    
    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    await signUp(email, password, username, isArtist ? 'artist' : 'user');
    
    // If no error, redirect to home
    if (!useAuthStore.getState().error) {
      navigate('/');
    }
  };
  
  return (
    <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create an account</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Sign up to start listening</p>
      </div>
      
      {error && (
        <div className="p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-md text-sm">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Choose a username"
          required
          leftIcon={<User size={18} className="text-gray-500 dark:text-gray-400" />}
          error={validationErrors.username}
        />
        
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          leftIcon={<Mail size={18} className="text-gray-500 dark:text-gray-400" />}
          error={validationErrors.email}
        />
        
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Create a password"
          required
          leftIcon={<Lock size={18} className="text-gray-500 dark:text-gray-400" />}
          error={validationErrors.password}
          helperText="Password must be at least 6 characters"
        />
        
        <Input
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your password"
          required
          leftIcon={<Lock size={18} className="text-gray-500 dark:text-gray-400" />}
          error={validationErrors.confirmPassword}
        />
        
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Sign up as an artist
          </label>
          <Toggle
            isChecked={isArtist}
            onChange={() => setIsArtist(!isArtist)}
          />
        </div>
        
        {isArtist && (
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-md text-sm flex items-start">
            <Music size={18} className="mr-2 mt-0.5 flex-shrink-0" />
            <p>
              Artist accounts can upload and manage music, view analytics, and customize their profile.
              You'll be able to set up your artist profile after registration.
            </p>
          </div>
        )}
        
        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isLoading}
          className="w-full"
        >
          Sign up
        </Button>
      </form>
      
      <div className="text-center mt-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/login')}
            className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};
