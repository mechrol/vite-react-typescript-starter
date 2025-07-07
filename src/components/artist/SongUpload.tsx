import React, { useState } from 'react';
import { Music, Image, Upload, AlertCircle } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useArtistStore } from '../../store/useArtistStore';

export const SongUpload: React.FC = () => {
  const { uploadSong, isLoading, error } = useArtistStore();
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [album, setAlbum] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string>('');
  const [audioFileName, setAudioFileName] = useState<string>('');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  
  const handleAudioFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validate file type
      const validTypes = ['audio/mpeg', 'audio/wav', 'audio/flac'];
      if (!validTypes.includes(file.type)) {
        setValidationErrors(prev => ({
          ...prev,
          audioFile: 'Invalid file type. Please upload MP3, WAV, or FLAC files only.',
        }));
        return;
      }
      
      // Validate file size (max 50MB)
      if (file.size > 50 * 1024 * 1024) {
        setValidationErrors(prev => ({
          ...prev,
          audioFile: 'File is too large. Maximum size is 50MB.',
        }));
        return;
      }
      
      setAudioFile(file);
      setAudioFileName(file.name);
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.audioFile;
        return newErrors;
      });
    }
  };
  
  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!validTypes.includes(file.type)) {
        setValidationErrors(prev => ({
          ...prev,
          coverImage: 'Invalid file type. Please upload JPG or PNG files only.',
        }));
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setValidationErrors(prev => ({
          ...prev,
          coverImage: 'File is too large. Maximum size is 5MB.',
        }));
        return;
      }
      
      setCoverImage(file);
      setCoverPreview(URL.createObjectURL(file));
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.coverImage;
        return newErrors;
      });
    }
  };
  
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (!title.trim()) {
      errors.title = 'Title is required';
    }
    
    if (!audioFile) {
      errors.audioFile = 'Audio file is required';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    const formData = new FormData();
    formData.append('title', title);
    if (genre) formData.append('genre', genre);
    if (album) formData.append('album', album);
    if (releaseDate) formData.append('releaseDate', releaseDate);
    if (audioFile) formData.append('audioFile', audioFile);
    if (coverImage) formData.append('coverImage', coverImage);
    
    await uploadSong(formData);
    
    // Reset form if upload was successful
    if (!useArtistStore.getState().error) {
      setTitle('');
      setGenre('');
      setAlbum('');
      setReleaseDate('');
      setAudioFile(null);
      setAudioFileName('');
      setCoverImage(null);
      setCoverPreview('');
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
        Upload New Song
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <Input
              label="Song Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter song title"
              required
              error={validationErrors.title}
            />
          </div>
          
          <Input
            label="Genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            placeholder="e.g. Pop, Rock, Hip Hop"
          />
          
          <Input
            label="Album (optional)"
            value={album}
            onChange={(e) => setAlbum(e.target.value)}
            placeholder="Album name"
          />
          
          <Input
            label="Release Date (optional)"
            type="date"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Audio File (MP3, WAV, FLAC)
            </label>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center">
                <input
                  type="file"
                  accept=".mp3,.wav,.flac,audio/mpeg,audio/wav,audio/flac"
                  onChange={handleAudioFileChange}
                  className="hidden"
                  id="audio-file"
                />
                <label
                  htmlFor="audio-file"
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center"
                >
                  <Music size={18} className="mr-2" />
                  Choose Audio File
                </label>
              </div>
              
              {audioFileName && (
                <div className="text-sm text-gray-600 dark:text-gray-400 truncate">
                  {audioFileName}
                </div>
              )}
              
              {validationErrors.audioFile && (
                <div className="text-sm text-red-600 dark:text-red-400 flex items-center">
                  <AlertCircle size={14} className="mr-1" />
                  {validationErrors.audioFile}
                </div>
              )}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Cover Image (optional)
            </label>
            <div className="flex items-center space-x-4">
              <div className="w-24 h-24 rounded-md overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                {coverPreview ? (
                  <img
                    src={coverPreview}
                    alt="Cover"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Image size={24} className="text-gray-400" />
                )}
              </div>
              <div>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/jpg"
                  onChange={handleCoverImageChange}
                  className="hidden"
                  id="cover-image"
                />
                <label
                  htmlFor="cover-image"
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Choose Image
                </label>
              </div>
            </div>
            
            {validationErrors.coverImage && (
              <div className="text-sm text-red-600 dark:text-red-400 mt-1 flex items-center">
                <AlertCircle size={14} className="mr-1" />
                {validationErrors.coverImage}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button
            type="submit"
            variant="primary"
            isLoading={isLoading}
            leftIcon={<Upload size={18} />}
          >
            Upload Song
          </Button>
        </div>
      </form>
    </div>
  );
};
