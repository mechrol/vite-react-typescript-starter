import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Play, Clock, MoreHorizontal } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { SongList } from '../components/music/SongList';
import { useLibraryStore } from '../store/useLibraryStore';
import { usePlayerStore } from '../store/usePlayerStore';
import { Playlist } from '../types';
import { formatTime } from '../utils/formatTime';

const PlaylistPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { playlists } = useLibraryStore();
  const { setCurrentSong } = usePlayerStore();
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  
  useEffect(() => {
    if (id) {
      const foundPlaylist = playlists.find(p => p.id === id);
      if (foundPlaylist) {
        setPlaylist(foundPlaylist);
      }
    }
  }, [id, playlists]);
  
  const handlePlayAll = () => {
    if (playlist?.songs && playlist.songs.length > 0) {
      setCurrentSong(playlist.songs[0]);
    }
  };
  
  if (!playlist) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500 dark:text-gray-400">Playlist not found</p>
      </div>
    );
  }
  
  // Calculate total duration
  const totalDuration = playlist.songs?.reduce((total, song) => total + song.duration, 0) || 0;
  
  return (
    <div>
      <div className="flex flex-col md:flex-row items-center md:items-end gap-6 mb-8">
        <div className="w-48 h-48 rounded-md overflow-hidden shadow-lg">
          {playlist.cover_url ? (
            <img
              src={playlist.cover_url}
              alt={playlist.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
              <span className="text-gray-500 dark:text-gray-400">No Cover</span>
            </div>
          )}
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Playlist</p>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{playlist.name}</h1>
          
          {playlist.description && (
            <p className="text-gray-600 dark:text-gray-300 mt-2">{playlist.description}</p>
          )}
          
          <div className="flex flex-wrap items-center gap-1 mt-3 justify-center md:justify-start">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {playlist.songs?.length || 0} songs
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
          disabled={!playlist.songs || playlist.songs.length === 0}
        >
          Play All
        </Button>
        
        <button className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
          <MoreHorizontal size={20} />
        </button>
      </div>
      
      {playlist.songs && playlist.songs.length > 0 ? (
        <SongList songs={playlist.songs} />
      ) : (
        <div className="flex items-center justify-center h-40 bg-gray-50 dark:bg-gray-800/50 rounded-md">
          <p className="text-gray-500 dark:text-gray-400">This playlist is empty</p>
        </div>
      )}
    </div>
  );
};

export default PlaylistPage;
