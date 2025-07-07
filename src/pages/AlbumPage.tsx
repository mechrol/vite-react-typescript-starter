import React from 'react';
import { useParams } from 'react-router-dom';
import { Play, MoreHorizontal, Calendar } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { SongList } from '../components/music/SongList';
import { useLibraryStore } from '../store/useLibraryStore';
import { usePlayerStore } from '../store/usePlayerStore';
import { formatTime } from '../utils/formatTime';

const AlbumPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { songs } = useLibraryStore();
  const { setCurrentSong } = usePlayerStore();
  
  // Filter songs by album
  // In a real app, you would fetch album data from the API
  const albumSongs = songs.filter(song => song.album === 'After Hours');
  
  const handlePlayAll = () => {
    if (albumSongs.length > 0) {
      setCurrentSong(albumSongs[0]);
    }
  };
  
  // Calculate total duration
  const totalDuration = albumSongs.reduce((total, song) => total + song.duration, 0);
  
  return (
    <div>
      <div className="flex flex-col md:flex-row items-center md:items-end gap-6 mb-8">
        <div className="w-48 h-48 rounded-md overflow-hidden shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=300&auto=format&fit=crop"
            alt="After Hours"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Album</p>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">After Hours</h1>
          <p className="text-gray-700 dark:text-gray-300 mt-1">The Weeknd</p>
          
          <div className="flex flex-wrap items-center gap-1 mt-3 justify-center md:justify-start">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {albumSongs.length} songs
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">•</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {formatTime(totalDuration)}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">•</span>
            <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
              <Calendar size={14} className="mr-1" /> 2020
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-4 mb-6">
        <Button
          onClick={handlePlayAll}
          leftIcon={<Play size={16} />}
          disabled={albumSongs.length === 0}
        >
          Play All
        </Button>
        
        <button className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
          <MoreHorizontal size={20} />
        </button>
      </div>
      
      {albumSongs.length > 0 ? (
        <SongList songs={albumSongs} />
      ) : (
        <div className="flex items-center justify-center h-40 bg-gray-50 dark:bg-gray-800/50 rounded-md">
          <p className="text-gray-500 dark:text-gray-400">No songs found</p>
        </div>
      )}
    </div>
  );
};

export default AlbumPage;
