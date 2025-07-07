import React, { useEffect } from 'react';
import { useLibraryStore } from '../store/useLibraryStore';
import { PlaylistGrid } from '../components/music/PlaylistGrid';
import { SongGrid } from '../components/music/SongGrid';

const HomePage: React.FC = () => {
  const { songs, playlists, recentlyPlayed, fetchSongs, fetchPlaylists } = useLibraryStore();
  
  useEffect(() => {
    fetchSongs();
    fetchPlaylists();
  }, []);
  
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Recently Played
        </h2>
        <SongGrid 
          songs={recentlyPlayed.length > 0 ? recentlyPlayed : songs.slice(0, 6)} 
          emptyMessage="No recently played songs"
        />
      </section>
      
      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Your Playlists
        </h2>
        <PlaylistGrid 
          playlists={playlists} 
          emptyMessage="No playlists found"
        />
      </section>
      
      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Popular Songs
        </h2>
        <SongGrid 
          songs={songs.slice(0, 12)} 
          emptyMessage="No songs found"
        />
      </section>
    </div>
  );
};

export default HomePage;
