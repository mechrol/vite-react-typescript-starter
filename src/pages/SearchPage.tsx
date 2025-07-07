import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { SongList } from '../components/music/SongList';
import { PlaylistGrid } from '../components/music/PlaylistGrid';
import { useLibraryStore } from '../store/useLibraryStore';

const SearchPage: React.FC = () => {
  const location = useLocation();
  const { songs, playlists } = useLibraryStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSongs, setFilteredSongs] = useState(songs);
  const [filteredPlaylists, setFilteredPlaylists] = useState(playlists);
  
  // Get search query from URL if present
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q');
    if (query) {
      setSearchQuery(query);
    }
  }, [location.search]);
  
  // Filter songs and playlists based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredSongs(songs);
      setFilteredPlaylists(playlists);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    
    const matchedSongs = songs.filter(song => 
      song.title.toLowerCase().includes(query) || 
      song.artist.toLowerCase().includes(query) || 
      song.album.toLowerCase().includes(query)
    );
    
    const matchedPlaylists = playlists.filter(playlist => 
      playlist.name.toLowerCase().includes(query) || 
      (playlist.description && playlist.description.toLowerCase().includes(query))
    );
    
    setFilteredSongs(matchedSongs);
    setFilteredPlaylists(matchedPlaylists);
  }, [searchQuery, songs, playlists]);
  
  return (
    <div className="space-y-6">
      <div className="max-w-2xl mx-auto">
        <Input
          placeholder="Search for songs, artists, or playlists..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          leftIcon={<Search size={18} className="text-gray-500 dark:text-gray-400" />}
          className="text-lg"
        />
      </div>
      
      {searchQuery.trim() !== '' && (
        <>
          <section>
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              Songs
            </h2>
            <SongList 
              songs={filteredSongs} 
              emptyMessage="No songs found matching your search"
            />
          </section>
          
          <section>
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              Playlists
            </h2>
            <PlaylistGrid 
              playlists={filteredPlaylists} 
              emptyMessage="No playlists found matching your search"
            />
          </section>
        </>
      )}
      
      {searchQuery.trim() === '' && (
        <div className="flex flex-col items-center justify-center h-64">
          <Search size={48} className="text-gray-300 dark:text-gray-600 mb-4" />
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            Search for your favorite music
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
