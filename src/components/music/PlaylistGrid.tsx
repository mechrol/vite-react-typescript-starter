import React from 'react';
import { MusicPlaylistCard } from './MusicPlaylistCard';
import { Playlist } from '../../types';
import { useNavigate } from 'react-router-dom';

interface PlaylistGridProps {
  playlists: Playlist[];
  emptyMessage?: string;
}

export const PlaylistGrid: React.FC<PlaylistGridProps> = ({ 
  playlists, 
  emptyMessage = 'No playlists found' 
}) => {
  const navigate = useNavigate();
  
  if (playlists.length === 0) {
    return (
      <div className="flex items-center justify-center h-40">
        <p className="text-gray-500 dark:text-gray-400">{emptyMessage}</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {playlists.map(playlist => (
        <MusicPlaylistCard 
          key={playlist.id} 
          playlist={playlist} 
          onClick={() => navigate(`/playlist/${playlist.id}`)}
        />
      ))}
    </div>
  );
};
