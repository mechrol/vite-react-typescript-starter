import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, Library, Heart, Plus, Music, Compass, Users, BarChart } from 'lucide-react';
import { useLibraryStore } from '../../store/useLibraryStore';
import { useAuthStore } from '../../store/useAuthStore';
import { Button } from '../ui/Button';

export const Sidebar: React.FC = () => {
  const { playlists, createPlaylist } = useLibraryStore();
  const { user, isArtist } = useAuthStore();
  
  const handleCreatePlaylist = () => {
    const name = prompt('Enter playlist name:');
    if (name) {
      createPlaylist(name);
    }
  };
  
  return (
    <aside className="hidden md:flex md:flex-col w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <div className="p-4">
        <div className="flex items-center mb-6">
          <Music className="h-8 w-8 text-blue-500" />
          <h1 className="ml-2 text-xl font-bold">Harmony</h1>
        </div>
        
        <nav className="space-y-1">
          <NavLink
            to="/"
            className={({ isActive }) => `
              flex items-center px-3 py-2 text-sm font-medium rounded-md
              ${isActive 
                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' 
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}
            `}
          >
            <Home className="mr-3 h-5 w-5" />
            Home
          </NavLink>
          
          <NavLink
            to="/search"
            className={({ isActive }) => `
              flex items-center px-3 py-2 text-sm font-medium rounded-md
              ${isActive 
                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' 
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}
            `}
          >
            <Search className="mr-3 h-5 w-5" />
            Search
          </NavLink>
          
          <NavLink
            to="/discover"
            className={({ isActive }) => `
              flex items-center px-3 py-2 text-sm font-medium rounded-md
              ${isActive 
                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' 
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}
            `}
          >
            <Compass className="mr-3 h-5 w-5" />
            Discover
          </NavLink>
          
          <NavLink
            to="/artists"
            className={({ isActive }) => `
              flex items-center px-3 py-2 text-sm font-medium rounded-md
              ${isActive 
                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' 
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}
            `}
          >
            <Users className="mr-3 h-5 w-5" />
            Artists
          </NavLink>
          
          <NavLink
            to="/library"
            className={({ isActive }) => `
              flex items-center px-3 py-2 text-sm font-medium rounded-md
              ${isActive 
                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' 
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}
            `}
          >
            <Library className="mr-3 h-5 w-5" />
            Your Library
          </NavLink>
          
          <NavLink
            to="/liked"
            className={({ isActive }) => `
              flex items-center px-3 py-2 text-sm font-medium rounded-md
              ${isActive 
                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' 
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}
            `}
          >
            <Heart className="mr-3 h-5 w-5" />
            Liked Songs
          </NavLink>
          
          {isArtist() && (
            <NavLink
              to="/artist-dashboard"
              className={({ isActive }) => `
                flex items-center px-3 py-2 text-sm font-medium rounded-md
                ${isActive 
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}
              `}
            >
              <BarChart className="mr-3 h-5 w-5" />
              Artist Dashboard
            </NavLink>
          )}
        </nav>
      </div>
      
      <div className="px-4 mt-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400">Your Playlists</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCreatePlaylist}
            leftIcon={<Plus size={16} />}
          >
            New
          </Button>
        </div>
        
        <div className="space-y-1 max-h-64 overflow-y-auto">
          {playlists.map(playlist => (
            <NavLink
              key={playlist.id}
              to={`/playlist/${playlist.id}`}
              className={({ isActive }) => `
                flex items-center px-3 py-2 text-sm font-medium rounded-md truncate
                ${isActive 
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}
              `}
            >
              {playlist.name}
            </NavLink>
          ))}
          
          {playlists.length === 0 && (
            <p className="text-sm text-gray-500 dark:text-gray-400 px-3 py-2">
              No playlists yet
            </p>
          )}
        </div>
      </div>
      
      <div className="mt-auto p-4">
        <NavLink
          to="/settings"
          className={({ isActive }) => `
            flex items-center px-3 py-2 text-sm font-medium rounded-md
            ${isActive 
              ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' 
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}
          `}
        >
          Settings
        </NavLink>
      </div>
    </aside>
  );
};
