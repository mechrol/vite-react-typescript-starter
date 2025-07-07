import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Artist } from '../types';
import { ArtistGrid } from '../components/music/ArtistGrid';
import { Search } from 'lucide-react';
import { Input } from '../components/ui/Input';

const ArtistsPage: React.FC = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredArtists, setFilteredArtists] = useState<Artist[]>([]);
  
  useEffect(() => {
    fetchArtists();
  }, []);
  
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredArtists(artists);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const filtered = artists.filter(artist => 
      artist.name.toLowerCase().includes(query) || 
      (artist.bio && artist.bio.toLowerCase().includes(query))
    );
    
    setFilteredArtists(filtered);
  }, [searchQuery, artists]);
  
  const fetchArtists = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // In a real app, fetch from Supabase
      // const { data, error } = await supabase.from('artists').select('*');
      // if (error) throw error;
      
      // For now, use mock data
      const mockArtists: Artist[] = [
        {
          id: '1',
          user_id: '1',
          name: 'The Weeknd',
          bio: 'Canadian singer, songwriter, and record producer',
          profile_image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=300&auto=format&fit=crop',
          created_at: '2023-01-01T00:00:00Z',
          updated_at: '2023-01-01T00:00:00Z',
        },
        {
          id: '2',
          user_id: '2',
          name: 'Dua Lipa',
          bio: 'English singer and songwriter',
          profile_image: 'https://images.unsplash.com/photo-1619983081563-430f63602796?q=80&w=300&auto=format&fit=crop',
          created_at: '2023-01-02T00:00:00Z',
          updated_at: '2023-01-02T00:00:00Z',
        },
        {
          id: '3',
          user_id: '3',
          name: 'Billie Eilish',
          bio: 'American singer and songwriter',
          profile_image: 'https://images.unsplash.com/photo-1618609377864-68609b857e90?q=80&w=300&auto=format&fit=crop',
          created_at: '2023-01-03T00:00:00Z',
          updated_at: '2023-01-03T00:00:00Z',
        },
        {
          id: '4',
          user_id: '4',
          name: 'Kendrick Lamar',
          bio: 'American rapper, songwriter, and record producer',
          profile_image: 'https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?q=80&w=300&auto=format&fit=crop',
          created_at: '2023-01-04T00:00:00Z',
          updated_at: '2023-01-04T00:00:00Z',
        },
        {
          id: '5',
          user_id: '5',
          name: 'Taylor Swift',
          bio: 'American singer-songwriter',
          profile_image: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=300&auto=format&fit=crop',
          created_at: '2023-01-05T00:00:00Z',
          updated_at: '2023-01-05T00:00:00Z',
        },
        {
          id: '6',
          user_id: '6',
          name: 'Drake',
          bio: 'Canadian rapper, singer, and actor',
          profile_image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=300&auto=format&fit=crop',
          created_at: '2023-01-06T00:00:00Z',
          updated_at: '2023-01-06T00:00:00Z',
        },
      ];
      
      setArtists(mockArtists);
      setFilteredArtists(mockArtists);
      setIsLoading(false);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred fetching artists');
      setIsLoading(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Artists
      </h1>
      
      <div className="max-w-md">
        <Input
          placeholder="Search artists..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          leftIcon={<Search size={18} className="text-gray-500 dark:text-gray-400" />}
        />
      </div>
      
      {error && (
        <div className="p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-md">
          {error}
        </div>
      )}
      
      {isLoading ? (
        <div className="flex items-center justify-center h-40">
          <p className="text-gray-500 dark:text-gray-400">Loading artists...</p>
        </div>
      ) : (
        <ArtistGrid 
          artists={filteredArtists} 
          emptyMessage={searchQuery ? "No artists found matching your search" : "No artists found"}
        />
      )}
    </div>
  );
};

export default ArtistsPage;
