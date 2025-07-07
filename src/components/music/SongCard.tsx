import React from 'react';
import { Play, Heart, MoreHorizontal } from 'lucide-react';
import { Song } from '../../types';
import { usePlayerStore } from '../../store/usePlayerStore';
import { useLibraryStore } from '../../store/useLibraryStore';
import { formatTime } from '../../utils/formatTime';

interface SongCardProps {
  song: Song;
  isLiked?: boolean;
}

export const SongCard: React.FC<SongCardProps> = ({ song, isLiked = false }) => {
  const { setCurrentSong, currentSong, isPlaying } = usePlayerStore();
  const { addSongToLiked, removeSongFromLiked } = useLibraryStore();
  
  const isCurrentSong = currentSong?.id === song.id;
  
  const handlePlay = () => {
    if (isCurrentSong) {
      usePlayerStore.getState().togglePlay();
    } else {
      setCurrentSong(song);
    }
  };
  
  const toggleLike = () => {
    if (isLiked) {
      removeSongFromLiked(song.id);
    } else {
      addSongToLiked(song);
    }
  };
  
  return (
    <div className="group flex items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
      <div className="relative flex-shrink-0 w-12 h-12 mr-3">
        <img
          src={song.cover_url}
          alt={song.title}
          className="w-full h-full object-cover rounded-md"
        />
        <button
          onClick={handlePlay}
          className={`
            absolute inset-0 flex items-center justify-center 
            bg-black bg-opacity-50 rounded-md
            ${isCurrentSong && isPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
            transition-opacity duration-200
          `}
        >
          <Play size={20} className="text-white" fill={isCurrentSong && isPlaying ? 'white' : 'transparent'} />
        </button>
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className={`text-sm font-medium truncate ${isCurrentSong ? 'text-blue-500 dark:text-blue-400' : 'text-gray-900 dark:text-white'}`}>
          {song.title}
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
          {song.artist}
        </p>
      </div>
      
      <div className="flex items-center">
        <span className="text-xs text-gray-500 dark:text-gray-400 mr-3">
          {formatTime(song.duration)}
        </span>
        
        <button
          onClick={toggleLike}
          className="p-1.5 rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none"
        >
          <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
        </button>
        
        <button className="p-1.5 rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none">
          <MoreHorizontal size={16} />
        </button>
      </div>
    </div>
  );
};
