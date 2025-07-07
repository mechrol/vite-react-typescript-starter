import React from 'react';
import { SongCard } from './SongCard';
import { Song } from '../../types';
import { useLibraryStore } from '../../store/useLibraryStore';

interface SongGridProps {
  songs: Song[];
  emptyMessage?: string;
}

export const SongGrid: React.FC<SongGridProps> = ({ 
  songs, 
  emptyMessage = 'No songs found' 
}) => {
  const { likedSongs } = useLibraryStore();
  
  if (songs.length === 0) {
    return (
      <div className="flex items-center justify-center h-40">
        <p className="text-gray-500 dark:text-gray-400">{emptyMessage}</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {songs.map(song => (
        <div key={song.id} className="flex flex-col items-center">
          <div className="relative w-full aspect-square mb-2 rounded-md overflow-hidden">
            <img
              src={song.cover_url}
              alt={song.title}
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="text-sm font-medium text-gray-900 dark:text-white text-center truncate w-full">
            {song.title}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center truncate w-full">
            {song.artist}
          </p>
        </div>
      ))}
    </div>
  );
};
