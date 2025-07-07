import React from 'react';
import { Play, MoreHorizontal } from 'lucide-react';
import { Playlist } from '../../types';
import { usePlayerStore } from '../../store/usePlayerStore';

interface MusicPlaylistCardProps {
  playlist: Playlist;
  onClick?: () => void;
}

export const MusicPlaylistCard: React.FC<MusicPlaylistCardProps> = ({ playlist, onClick }) => {
  const { setCurrentSong } = usePlayerStore();
  
  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (playlist.songs && playlist.songs.length > 0) {
      setCurrentSong(playlist.songs[0]);
    }
  };
  
  return (
    <div 
      className="group relative rounded-md overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      <div className="aspect-square bg-gray-200 dark:bg-gray-800 overflow-hidden">
        {playlist.cover_url ? (
          <img
            src={playlist.cover_url}
            alt={playlist.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-300 dark:bg-gray-700">
            <span className="text-gray-500 dark:text-gray-400">No Cover</span>
          </div>
        )}
        
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
          <button
            onClick={handlePlay}
            className="p-3 rounded-full bg-white text-gray-900 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-lg"
          >
            <Play size={20} fill="currentColor" />
          </button>
        </div>
      </div>
      
      <div className="p-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
            {playlist.name}
          </h3>
          
          <button 
            onClick={(e) => e.stopPropagation()}
            className="p-1 rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            <MoreHorizontal size={16} />
          </button>
        </div>
        
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">
          {playlist.songs ? `${playlist.songs.length} songs` : 'Empty playlist'}
        </p>
      </div>
    </div>
  );
};
