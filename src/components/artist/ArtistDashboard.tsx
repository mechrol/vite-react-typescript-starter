import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/Tabs';
import { useArtistStore } from '../../store/useArtistStore';
import { ArtistProfile } from './ArtistProfile';
import { SongUpload } from './SongUpload';
import { SongManagement } from './SongManagement';
import { ArtistAnalytics } from './ArtistAnalytics';
import { useAuthStore } from '../../store/useAuthStore';
import { Navigate } from 'react-router-dom';

export const ArtistDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const { isArtist } = useAuthStore();
  const { fetchArtistProfile, fetchArtistSongs, isLoading, error } = useArtistStore();
  
  useEffect(() => {
    if (isArtist()) {
      fetchArtistProfile();
      fetchArtistSongs();
    }
  }, []);
  
  // Redirect if not an artist
  if (!isArtist()) {
    return <Navigate to="/" replace />;
  }
  
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Artist Dashboard
      </h1>
      
      {error && (
        <div className="p-3 mb-6 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-md">
          {error}
        </div>
      )}
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="upload">Upload Music</TabsTrigger>
          <TabsTrigger value="manage">Manage Songs</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <ArtistProfile />
        </TabsContent>
        
        <TabsContent value="upload">
          <SongUpload />
        </TabsContent>
        
        <TabsContent value="manage">
          <SongManagement />
        </TabsContent>
        
        <TabsContent value="analytics">
          <ArtistAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  );
};
