import React from 'react';
import { ArtistCard } from './ArtistCard';
import { Artist } from '../../types';

interface ArtistGridProps {
  artists: Artist[];
  emptyMessage?: string;
}

export const ArtistGrid: React.FC<ArtistGridProps> = ({ 
  artists, 
  emptyMessage = 'No artists found' 
}) => {
  if (artists.length === 0) {
    return (
      <div className="flex items-center justify-center h-40">
        <p className="text-gray-500 dark:text-gray-400">{emptyMessage}</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {artists.map(artist => (
        <ArtistCard 
          key={artist.id} 
          artist={artist} 
        />
      ))}
    </div>
  );
};
