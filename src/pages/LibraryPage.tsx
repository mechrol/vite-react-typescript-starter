import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';
import { SongList } from '../components/music/SongList';
import { PlaylistGrid } from '../components/music/PlaylistGrid';
import { useLibraryStore } from '../store/useLibraryStore';

const LibraryPage: React.FC = () => {
  const { songs, playlists } = useLibraryStore();
  const [activeTab, setActiveTab] = useState('all');
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Your Library
      </h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="playlists">Playlists</TabsTrigger>
          <TabsTrigger value="songs">Songs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-8 mt-6">
          <section>
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              Playlists
            </h2>
            <PlaylistGrid 
              playlists={playlists} 
              emptyMessage="No playlists found"
            />
          </section>
          
          <section>
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              Songs
            </h2>
            <SongList 
              songs={songs} 
              emptyMessage="No songs found"
            />
          </section>
        </TabsContent>
        
        <TabsContent value="playlists" className="mt-6">
          <PlaylistGrid 
            playlists={playlists} 
            emptyMessage="No playlists found"
          />
        </TabsContent>
        
        <TabsContent value="songs" className="mt-6">
          <SongList 
            songs={songs} 
            emptyMessage="No songs found"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LibraryPage;
