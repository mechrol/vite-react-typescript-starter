import React, { useEffect } from 'react';
import { Heart, Play } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { SongList } from '../components/music/SongList';
import { useLibraryStore } from '../store/useLibraryStore';
import { usePlayerStore } from '../store/usePlayerStore';
import { formatTime } from '../utils/formatTime';

const LikedSongsPage: React.FC = () => {
  const { likedSongs, fetchLikedSongs } = useLibraryStore();
  const { setCurrentSong } = usePlayerStore();
  
  useEffect(() => {
    fetchLikedSongs();
  }, []);
  
  const handlePlayAll = () => {
    if (likedSongs.length > 0) {
      setCurrentSong(likedSongs[0]);
    }
  };
  
  // Calculate total duration
  const totalDuration = likedSongs.reduce((total, song) => total + song.duration, 0);
  
  return (
    <div>
      <div className="flex flex-col md:flex-row items-center md:items-end gap-6 mb-8">
        <div className="w-48 h-48 rounded-md overflow-hidden shadow-lg bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center">
          <Heart size={64} className="text-white" fill="white" />
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Playlist</p>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">Liked Songs</h1>
          
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            All your favorite songs in one place
          </p>
          
          <div className="flex flex-wrap items-center gap-1 mt-3 justify-center md:justify-start">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {likedSongs.length} songs
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">•</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {formatTime(totalDuration)}
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-4 mb-6">
        <Button
          onClick={handlePlayAll}
          leftIcon={<Play size={16} />}
          disabled={likedSongs.length === 0}
        >
          Play All
        </Button>
      </div>
      
      {likedSongs.length > 0 ? (
        <SongList songs={likedSongs} />
      ) : (
        <div className="flex items-center justify-center h-40 bg-gray-50 dark:bg-gray-800/50 rounded-md">
          <p className="text-gray-500 dark:text-gray-400">
            You haven't liked any songs yet
          </p>
        </div>
      )}
    </div>
  );
};

export default LikedSongsPage;
