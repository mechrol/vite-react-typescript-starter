import React, { useRef, useEffect, useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle, Volume2, VolumeX, Heart } from 'lucide-react';
import { Slider } from '../ui/Slider';
import { usePlayerStore } from '../../store/usePlayerStore';
import { useLibraryStore } from '../../store/useLibraryStore';
import { formatTime } from '../../utils/formatTime';

export const Player: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const {
    currentSong,
    isPlaying,
    repeat,
    shuffle,
    volume,
    muted,
    currentTime,
    duration,
    togglePlay,
    playNext,
    playPrevious,
    toggleRepeat,
    toggleShuffle,
    setVolume,
    toggleMute,
    setCurrentTime,
    setDuration,
  } = usePlayerStore();
  
  const { likedSongs, addSongToLiked, removeSongFromLiked, addToRecentlyPlayed } = useLibraryStore();
  
  const [isLiked, setIsLiked] = useState(false);
  
  // Check if current song is liked
  useEffect(() => {
    if (currentSong) {
      setIsLiked(likedSongs.some(song => song.id === currentSong.id));
    }
  }, [currentSong, likedSongs]);
  
  // Handle play/pause
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.error('Error playing audio:', error);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSong]);
  
  // Handle volume change
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = muted ? 0 : volume;
    }
  }, [volume, muted]);
  
  // Handle time update
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };
  
  // Handle duration change
  const handleDurationChange = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };
  
  // Handle seeking
  const handleSeek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };
  
  // Handle song end
  const handleEnded = () => {
    if (repeat === 'one') {
      // Repeat the current song
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(error => {
          console.error('Error playing audio:', error);
        });
      }
    } else {
      // Play next song
      playNext();
    }
  };
  
  // Add to recently played when song changes
  useEffect(() => {
    if (currentSong) {
      addToRecentlyPlayed(currentSong);
    }
  }, [currentSong]);
  
  const toggleLike = () => {
    if (!currentSong) return;
    
    if (isLiked) {
      removeSongFromLiked(currentSong.id);
    } else {
      addSongToLiked(currentSong);
    }
  };
  
  if (!currentSong) {
    return (
      <div className="h-20 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">No song selected</p>
      </div>
    );
  }
  
  return (
    <div className="h-20 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4">
      <div className="h-full flex items-center">
        {/* Song info */}
        <div className="flex items-center w-1/3">
          <div className="w-12 h-12 mr-3">
            <img
              src={currentSong.cover_url}
              alt={currentSong.title}
              className="w-full h-full object-cover rounded-md"
            />
          </div>
          
          <div className="mr-4">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate max-w-[150px]">
              {currentSong.title}
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[150px]">
              {currentSong.artist}
            </p>
          </div>
          
          <button
            onClick={toggleLike}
            className={`p-2 rounded-full ${
              isLiked ? 'text-red-500' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
          </button>
        </div>
        
        {/* Controls */}
        <div className="flex-1 flex flex-col items-center">
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleShuffle}
              className={`p-2 rounded-full ${
                shuffle
                  ? 'text-blue-500'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <Shuffle size={18} />
            </button>
            
            <button
              onClick={playPrevious}
              className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <SkipBack size={24} />
            </button>
            
            <button
              onClick={togglePlay}
              className="p-3 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
            
            <button
              onClick={playNext}
              className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <SkipForward size={24} />
            </button>
            
            <button
              onClick={toggleRepeat}
              className={`p-2 rounded-full ${
                repeat !== 'off'
                  ? 'text-blue-500'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <Repeat size={18} />
              {repeat === 'one' && <span className="absolute text-[10px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">1</span>}
            </button>
          </div>
          
          <div className="w-full flex items-center space-x-2 mt-2">
            <span className="text-xs text-gray-500 dark:text-gray-400 w-10 text-right">
              {formatTime(currentTime)}
            </span>
            
            <Slider
              min={0}
              max={duration || 1}
              value={currentTime}
              onChange={handleSeek}
              className="flex-1"
            />
            
            <span className="text-xs text-gray-500 dark:text-gray-400 w-10">
              {formatTime(duration)}
            </span>
          </div>
        </div>
        
        {/* Volume */}
        <div className="w-1/3 flex justify-end items-center space-x-2">
          <button
            onClick={toggleMute}
            className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
          
          <Slider
            min={0}
            max={1}
            step={0.01}
            value={muted ? 0 : volume}
            onChange={setVolume}
            className="w-24"
          />
        </div>
      </div>
      
      {/* Audio element */}
      <audio
        ref={audioRef}
        src={currentSong.audio_url}
        onTimeUpdate={handleTimeUpdate}
        onDurationChange={handleDurationChange}
        onEnded={handleEnded}
      />
    </div>
  );
};
