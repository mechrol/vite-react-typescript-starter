import React from 'react';
import { useParams } from 'react-router-dom';
import { Play, MoreHorizontal } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { SongList } from '../components/music/SongList';
import { useLibraryStore } from '../store/useLibraryStore';
import { usePlayerStore } from '../store/usePlayerStore';

const ArtistPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { songs } = useLibraryStore();
  const { setCurrentSong } = usePlayerStore();
  
  // Filter songs by artist
  // In a real app, you would fetch artist data from the API
  const artistSongs = songs.filter(song => song.artist === 'The Weeknd');
  
  const handlePlayAll = () => {
    if (artistSongs.length > 0) {
      setCurrentSong(artistSongs[0]);
    }
  };
  
  return (
    <div>
      <div className="relative h-64 mb-8">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/30 to-gray-900/80"></div>
        <div className="absolute bottom-0 left-0 p-6 flex items-end">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=300&auto=format&fit=crop"
              alt="The Weeknd"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="ml-6">
            <p className="text-sm font-medium text-white/80">Artist</p>
            <h1 className="text-3xl font-bold text-white mt-1">The Weeknd</h1>
            <p className="text-white/80 mt-1">
              {artistSongs.length} songs
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-4 mb-6">
        <Button
          onClick={handlePlayAll}
          leftIcon={<Play size={16} />}
          disabled={artistSongs.length === 0}
        >
          Play All
        </Button>
        
        <button className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
          <MoreHorizontal size={20} />
        </button>
      </div>
      
      <div>
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
          Popular Songs
        </h2>
        
        {artistSongs.length > 0 ? (
          <SongList songs={artistSongs} />
        ) : (
          <div className="flex items-center justify-center h-40 bg-gray-50 dark:bg-gray-800/50 rounded-md">
            <p className="text-gray-500 dark:text-gray-400">No songs found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtistPage;
