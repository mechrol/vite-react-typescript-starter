import React, { useState, useEffect } from 'react';
import { User, Link, Globe, Instagram, Twitter, Facebook, Youtube } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useArtistStore } from '../../store/useArtistStore';
import { Artist } from '../../types';

export const ArtistProfile: React.FC = () => {
  const { artist, updateArtistProfile, isLoading } = useArtistStore();
  const [formData, setFormData] = useState<Partial<Artist>>({
    name: '',
    bio: '',
    website: '',
    social_links: {
      instagram: '',
      twitter: '',
      facebook: '',
      youtube: '',
    },
  });
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string>('');
  const [coverImagePreview, setCoverImagePreview] = useState<string>('');
  
  useEffect(() => {
    if (artist) {
      setFormData({
        name: artist.name || '',
        bio: artist.bio || '',
        website: artist.website || '',
        social_links: {
          instagram: artist.social_links?.instagram || '',
          twitter: artist.social_links?.twitter || '',
          facebook: artist.social_links?.facebook || '',
          youtube: artist.social_links?.youtube || '',
        },
      });
      
      if (artist.profile_image) {
        setProfileImagePreview(artist.profile_image);
      }
      
      if (artist.cover_image) {
        setCoverImagePreview(artist.cover_image);
      }
    }
  }, [artist]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  
  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(file);
      setProfileImagePreview(URL.createObjectURL(file));
    }
  };
  
  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCoverImage(file);
      setCoverImagePreview(URL.createObjectURL(file));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real implementation, this would handle file uploads to storage
    // and then update the artist profile with the new image URLs
    
    // For now, just use the preview URLs
    const updates: Partial<Artist> = {
      ...formData,
    };
    
    if (profileImagePreview) {
      updates.profile_image = profileImagePreview;
    }
    
    if (coverImagePreview) {
      updates.cover_image = coverImagePreview;
    }
    
    await updateArtistProfile(updates);
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
        Artist Profile
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Profile Image
            </label>
            <div className="flex items-center space-x-4">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                {profileImagePreview ? (
                  <img
                    src={profileImagePreview}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={32} className="text-gray-400" />
                )}
              </div>
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfileImageChange}
                  className="hidden"
                  id="profile-image"
                />
                <label
                  htmlFor="profile-image"
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Choose Image
                </label>
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Cover Image
            </label>
            <div className="flex items-center space-x-4">
              <div className="w-40 h-24 rounded-md overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                {coverImagePreview ? (
                  <img
                    src={coverImagePreview}
                    alt="Cover"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-400 text-sm">No cover image</span>
                )}
              </div>
              <div>
                <input
                  type="file"
                  accept="image/*"
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
          </div>
        </div>
        
        <Input
          label="Artist Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Your artist name"
          required
        />
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Bio
          </label>
          <textarea
            name="bio"
            value={formData.bio || ''}
            onChange={handleInputChange}
            placeholder="Tell your fans about yourself"
            rows={4}
            className="w-full rounded-md shadow-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-4 py-2"
          />
        </div>
        
        <Input
          label="Website"
          name="website"
          value={formData.website || ''}
          onChange={handleInputChange}
          placeholder="https://yourwebsite.com"
          leftIcon={<Globe size={18} className="text-gray-500 dark:text-gray-400" />}
        />
        
        <div className="space-y-4">
          <h3 className="text-md font-medium text-gray-800 dark:text-gray-200">
            Social Media Links
          </h3>
          
          <Input
            label="Instagram"
            name="social_links.instagram"
            value={formData.social_links?.instagram || ''}
            onChange={handleInputChange}
            placeholder="Instagram username"
            leftIcon={<Instagram size={18} className="text-gray-500 dark:text-gray-400" />}
          />
          
          <Input
            label="Twitter"
            name="social_links.twitter"
            value={formData.social_links?.twitter || ''}
            onChange={handleInputChange}
            placeholder="Twitter username"
            leftIcon={<Twitter size={18} className="text-gray-500 dark:text-gray-400" />}
          />
          
          <Input
            label="Facebook"
            name="social_links.facebook"
            value={formData.social_links?.facebook || ''}
            onChange={handleInputChange}
            placeholder="Facebook page name"
            leftIcon={<Facebook size={18} className="text-gray-500 dark:text-gray-400" />}
          />
          
          <Input
            label="YouTube"
            name="social_links.youtube"
            value={formData.social_links?.youtube || ''}
            onChange={handleInputChange}
            placeholder="YouTube channel name"
            leftIcon={<Youtube size={18} className="text-gray-500 dark:text-gray-400" />}
          />
        </div>
        
        <div className="flex justify-end">
          <Button
            type="submit"
            variant="primary"
            isLoading={isLoading}
          >
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};
