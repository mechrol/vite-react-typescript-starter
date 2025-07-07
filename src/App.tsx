import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { LoginForm } from './components/auth/LoginForm';
import { SignupForm } from './components/auth/SignupForm';
import { useAuthStore } from './store/useAuthStore';

// Import pages
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import LibraryPage from './pages/LibraryPage';
import PlaylistPage from './pages/PlaylistPage';
import LikedSongsPage from './pages/LikedSongsPage';
import SettingsPage from './pages/SettingsPage';
import ArtistPage from './pages/ArtistPage';
import AlbumPage from './pages/AlbumPage';
import ArtistDashboardPage from './pages/ArtistDashboardPage';
import DiscoverPage from './pages/DiscoverPage';
import ArtistsPage from './pages/ArtistsPage';

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuthStore();
  
  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

// Artist route component
const ArtistRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading, isArtist } = useAuthStore();
  
  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (!isArtist()) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  const { getCurrentUser } = useAuthStore();
  
  useEffect(() => {
    getCurrentUser();
  }, []);
  
  return (
    <Routes>
      {/* Auth routes */}
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignupForm />} />
      
      {/* Main app routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="discover" element={<DiscoverPage />} />
        <Route path="artists" element={<ArtistsPage />} />
        <Route path="library" element={<LibraryPage />} />
        <Route path="playlist/:id" element={<PlaylistPage />} />
        <Route path="liked" element={<LikedSongsPage />} />
        <Route path="artist/:id" element={<ArtistPage />} />
        <Route path="album/:id" element={<AlbumPage />} />
        
        {/* Protected routes */}
        <Route 
          path="settings" 
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          } 
        />
        
        {/* Artist routes */}
        <Route 
          path="artist-dashboard/*" 
          element={
            <ArtistRoute>
              <ArtistDashboardPage />
            </ArtistRoute>
          } 
        />
      </Route>
      
      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
