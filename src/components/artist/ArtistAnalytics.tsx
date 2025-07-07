import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useArtistStore } from '../../store/useArtistStore';

export const ArtistAnalytics: React.FC = () => {
  const { songs, analytics, fetchAllAnalytics, isLoading } = useArtistStore();
  const [selectedSong, setSelectedSong] = useState<string | 'all'>('all');
  
  useEffect(() => {
    fetchAllAnalytics();
  }, [songs]);
  
  // Calculate total plays, likes, and shares
  const totalPlays = songs.reduce((sum, song) => sum + song.plays, 0);
  const totalLikes = songs.reduce((sum, song) => sum + song.likes, 0);
  const totalShares = songs.reduce((sum, song) => sum + song.shares, 0);
  
  // Get analytics for selected song or aggregate for all songs
  const getAnalyticsData = () => {
    if (selectedSong === 'all') {
      // Aggregate daily plays for all songs
      const allDailyPlays: Record<string, number> = {};
      
      Object.values(analytics).forEach(songAnalytics => {
        songAnalytics.daily_plays.forEach(({ date, count }) => {
          allDailyPlays[date] = (allDailyPlays[date] || 0) + count;
        });
      });
      
      return Object.entries(allDailyPlays)
        .map(([date, count]) => ({ date, count }))
        .sort((a, b) => a.date.localeCompare(b.date));
    } else {
      return analytics[selectedSong]?.daily_plays || [];
    }
  };
  
  // Get demographic data for selected song or aggregate
  const getDemographicData = () => {
    if (selectedSong === 'all') {
      // Aggregate demographics for all songs
      const allAgeGroups: Record<string, number> = {};
      const allCountries: Record<string, number> = {};
      
      Object.values(analytics).forEach(songAnalytics => {
        if (songAnalytics.listener_demographics) {
          // Aggregate age groups
          Object.entries(songAnalytics.listener_demographics.age_groups || {}).forEach(([age, count]) => {
            allAgeGroups[age] = (allAgeGroups[age] || 0) + count;
          });
          
          // Aggregate countries
          Object.entries(songAnalytics.listener_demographics.countries || {}).forEach(([country, count]) => {
            allCountries[country] = (allCountries[country] || 0) + count;
          });
        }
      });
      
      return {
        ageGroups: Object.entries(allAgeGroups).map(([name, value]) => ({ name, value })),
        countries: Object.entries(allCountries).map(([name, value]) => ({ name, value })),
      };
    } else {
      const songAnalytics = analytics[selectedSong];
      
      if (!songAnalytics || !songAnalytics.listener_demographics) {
        return { ageGroups: [], countries: [] };
      }
      
      return {
        ageGroups: Object.entries(songAnalytics.listener_demographics.age_groups || {}).map(([name, value]) => ({ name, value })),
        countries: Object.entries(songAnalytics.listener_demographics.countries || {}).map(([name, value]) => ({ name, value })),
      };
    }
  };
  
  const analyticsData = getAnalyticsData();
  const { ageGroups, countries } = getDemographicData();
  
  // Colors for pie charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];
  
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 flex justify-center">
        <p className="text-gray-500 dark:text-gray-400">Loading analytics...</p>
      </div>
    );
  }
  
  if (songs.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 text-center">
        <p className="text-gray-500 dark:text-gray-400">
          You haven't uploaded any songs yet. Go to the Upload tab to add your first song.
        </p>
      </div>
    );
  }
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 md:mb-0">
          Analytics Dashboard
        </h2>
        
        <div>
          <select
            value={selectedSong}
            onChange={(e) => setSelectedSong(e.target.value)}
            className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Songs</option>
            {songs.map(song => (
              <option key={song.id} value={song.id}>
                {song.title}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-50 dark:bg-gray-750 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Total Plays</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalPlays.toLocaleString()}</p>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-750 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Total Likes</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalLikes.toLocaleString()}</p>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-750 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Total Shares</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalShares.toLocaleString()}</p>
        </div>
      </div>
      
      {/* Daily Plays Chart */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Daily Plays
        </h3>
        
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={analyticsData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: 'none',
                  borderRadius: '0.375rem',
                  color: '#F9FAFB',
                }}
              />
              <Bar dataKey="count" fill="#3B82F6" name="Plays" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Demographics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Age Groups */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Listener Age Groups
          </h3>
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ageGroups}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                >
                  {ageGroups.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Countries */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Top Listener Countries
          </h3>
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={countries}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                >
                  {countries.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
