import React from 'react';
import { SongCard } from './SongCard';
import { Song } from '../../types';
import { useLibraryStore } from '../../store/useLibraryStore';

interface SongListProps {
  songs: Song[];
  emptyMessage?: string;
}

export const SongList: React.FC<SongListProps> = ({ 
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
    <div className="space-y-1">
      {songs.map(song => (
        <SongCard 
          key={song.id} 
          song={song} 
          isLiked={likedSongs.some(s => s.id === song.id)}
        />
      ))}
    </div>
  );
};
