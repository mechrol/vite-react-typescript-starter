import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Artist } from '../../types';

interface ArtistCardProps {
  artist: Artist;
}

export const ArtistCard: React.FC<ArtistCardProps> = ({ artist }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/artist/${artist.id}`);
  };
  
  return (
    <div 
      className="group relative rounded-md overflow-hidden cursor-pointer"
      onClick={handleClick}
    >
      <div className="aspect-square bg-gray-200 dark:bg-gray-800 overflow-hidden">
        {artist.profile_image ? (
          <img
            src={artist.profile_image}
            alt={artist.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-300 dark:bg-gray-700">
            <span className="text-gray-500 dark:text-gray-400">No Image</span>
          </div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          <div className="p-4 w-full">
            <h3 className="text-white font-medium truncate">
              {artist.name}
            </h3>
            {artist.bio && (
              <p className="text-white/80 text-sm line-clamp-2 mt-1">
                {artist.bio}
              </p>
            )}
          </div>
        </div>
      </div>
      
      <div className="p-3">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
          {artist.name}
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">
          Artist
        </p>
      </div>
    </div>
  );
};
