import React, { useState } from 'react';
import { Edit, Trash2, Eye, EyeOff, MoreHorizontal } from 'lucide-react';
import { Button } from '../ui/Button';
import { useArtistStore } from '../../store/useArtistStore';
import { formatTime } from '../../utils/formatTime';
import { Song } from '../../types';

export const SongManagement: React.FC = () => {
  const { songs, deleteSong, toggleSongPublic, isLoading } = useArtistStore();
  const [editingSong, setEditingSong] = useState<Song | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  
  const handleTogglePublic = async (songId: string, isPublic: boolean) => {
    await toggleSongPublic(songId, !isPublic);
  };
  
  const handleDeleteClick = (songId: string) => {
    setShowDeleteConfirm(songId);
  };
  
  const handleConfirmDelete = async (songId: string) => {
    await deleteSong(songId);
    setShowDeleteConfirm(null);
  };
  
  const handleCancelDelete = () => {
    setShowDeleteConfirm(null);
  };
  
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
      <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
        Manage Your Songs
      </h2>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b border-gray-200 dark:border-gray-700">
            <tr>
              <th className="pb-3 font-medium text-gray-500 dark:text-gray-400">Title</th>
              <th className="pb-3 font-medium text-gray-500 dark:text-gray-400">Genre</th>
              <th className="pb-3 font-medium text-gray-500 dark:text-gray-400">Duration</th>
              <th className="pb-3 font-medium text-gray-500 dark:text-gray-400">Plays</th>
              <th className="pb-3 font-medium text-gray-500 dark:text-gray-400">Status</th>
              <th className="pb-3 font-medium text-gray-500 dark:text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {songs.map(song => (
              <tr key={song.id} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                <td className="py-4 pr-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 mr-3 flex-shrink-0">
                      <img
                        src={song.cover_url || 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=50&auto=format&fit=crop'}
                        alt={song.title}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {song.title}
                      </div>
                      {song.album && (
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {song.album}
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="py-4 pr-4 text-gray-700 dark:text-gray-300">
                  {song.genre || '-'}
                </td>
                <td className="py-4 pr-4 text-gray-700 dark:text-gray-300">
                  {formatTime(song.duration)}
                </td>
                <td className="py-4 pr-4 text-gray-700 dark:text-gray-300">
                  {song.plays.toLocaleString()}
                </td>
                <td className="py-4 pr-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      song.is_public
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {song.is_public ? 'Public' : 'Private'}
                  </span>
                </td>
                <td className="py-4 text-right">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleTogglePublic(song.id, song.is_public)}
                      className="p-1.5 rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      title={song.is_public ? 'Make private' : 'Make public'}
                    >
                      {song.is_public ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                    
                    <button
                      onClick={() => setEditingSong(song)}
                      className="p-1.5 rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      title="Edit song"
                    >
                      <Edit size={16} />
                    </button>
                    
                    {showDeleteConfirm === song.id ? (
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => handleConfirmDelete(song.id)}
                          isLoading={isLoading}
                        >
                          Delete
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={handleCancelDelete}
                        >
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleDeleteClick(song.id)}
                        className="p-1.5 rounded-full text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                        title="Delete song"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Edit Song Modal would go here */}
    </div>
  );
};
