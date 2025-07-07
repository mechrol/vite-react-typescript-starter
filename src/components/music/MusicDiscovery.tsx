import React, { useState, useEffect } from 'react';
import { useLibraryStore } from '../../store/useLibraryStore';
import { SongGrid } from './SongGrid';
import { PlaylistGrid } from './PlaylistGrid';
import { Song } from '../../types';

interface MusicDiscoveryProps {
  title?: string;
}

export const MusicDiscovery: React.FC<MusicDiscoveryProps> = ({ title = "Discover Music" }) => {
  const { songs, fetchSongs } = useLibraryStore();
  const [newReleases, setNewReleases] = useState<Song[]>([]);
  const [trending, setTrending] = useState<Song[]>([]);
  const [recommended, setRecommended] = useState<Song[]>([]);
  
  useEffect(() => {
    fetchSongs();
  }, []);
  
  useEffect(() => {
    if (songs.length > 0) {
      // Sort by release date for new releases
      const sortedByDate = [...songs].sort((a, b) => {
        const dateA = a.release_date ? new Date(a.release_date).getTime() : 0;
        const dateB = b.release_date ? new Date(b.release_date).getTime() : 0;
        return dateB - dateA;
      });
      
      // Sort by plays for trending
      const sortedByPlays = [...songs].sort((a, b) => b.plays - a.plays);
      
      // Random selection for recommended
      const shuffled = [...songs].sort(() => 0.5 - Math.random());
      
      setNewReleases(sortedByDate.slice(0, 6));
      setTrending(sortedByPlays.slice(0, 6));
      setRecommended(shuffled.slice(0, 6));
    }
  }, [songs]);
  
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        {title}
      </h1>
      
      <section>
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
          New Releases
        </h2>
        <SongGrid 
          songs={newReleases} 
          emptyMessage="No new releases found"
        />
      </section>
      
      <section>
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
          Trending Now
        </h2>
        <SongGrid 
          songs={trending} 
          emptyMessage="No trending songs found"
        />
      </section>
      
      <section>
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
          Recommended for You
        </h2>
        <SongGrid 
          songs={recommended} 
          emptyMessage="No recommendations found"
        />
      </section>
    </div>
  );
};
