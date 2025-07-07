import { Song, Playlist } from '../types';

export const mockSongs: Song[] = [
  {
    id: '1',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    genre: 'Pop',
    duration: 200,
    cover_url: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=300&auto=format&fit=crop',
    audio_url: 'https://example.com/audio/blinding-lights.mp3',
    release_date: '2020-03-20',
    created_at: '2023-01-01T00:00:00Z'
  },
  {
    id: '2',
    title: 'Levitating',
    artist: 'Dua Lipa',
    album: 'Future Nostalgia',
    genre: 'Pop',
    duration: 203,
    cover_url: 'https://images.unsplash.com/photo-1619983081563-430f63602796?q=80&w=300&auto=format&fit=crop',
    audio_url: 'https://example.com/audio/levitating.mp3',
    release_date: '2020-10-01',
    created_at: '2023-01-02T00:00:00Z'
  },
  {
    id: '3',
    title: 'Save Your Tears',
    artist: 'The Weeknd',
    album: 'After Hours',
    genre: 'Pop',
    duration: 215,
    cover_url: 'https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?q=80&w=300&auto=format&fit=crop',
    audio_url: 'https://example.com/audio/save-your-tears.mp3',
    release_date: '2020-03-20',
    created_at: '2023-01-03T00:00:00Z'
  },
  {
    id: '4',
    title: 'Stay',
    artist: 'The Kid LAROI, Justin Bieber',
    album: 'F*CK LOVE 3: OVER YOU',
    genre: 'Pop',
    duration: 138,
    cover_url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=300&auto=format&fit=crop',
    audio_url: 'https://example.com/audio/stay.mp3',
    release_date: '2021-07-09',
    created_at: '2023-01-04T00:00:00Z'
  },
  {
    id: '5',
    title: 'Good 4 U',
    artist: 'Olivia Rodrigo',
    album: 'SOUR',
    genre: 'Pop Rock',
    duration: 178,
    cover_url: 'https://images.unsplash.com/photo-1618609377864-68609b857e90?q=80&w=300&auto=format&fit=crop',
    audio_url: 'https://example.com/audio/good-4-u.mp3',
    release_date: '2021-05-14',
    created_at: '2023-01-05T00:00:00Z'
  },
  {
    id: '6',
    title: 'Montero (Call Me By Your Name)',
    artist: 'Lil Nas X',
    album: 'Montero',
    genre: 'Hip Hop',
    duration: 137,
    cover_url: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=300&auto=format&fit=crop',
    audio_url: 'https://example.com/audio/montero.mp3',
    release_date: '2021-03-26',
    created_at: '2023-01-06T00:00:00Z'
  }
];

export const mockPlaylists: Playlist[] = [
  {
    id: '1',
    name: 'Workout Mix',
    description: 'High energy songs to keep you motivated',
    cover_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=300&auto=format&fit=crop',
    user_id: '1',
    created_at: '2023-01-01T00:00:00Z',
    songs: [mockSongs[0], mockSongs[3], mockSongs[4]]
  },
  {
    id: '2',
    name: 'Chill Vibes',
    description: 'Relaxing tunes for your downtime',
    cover_url: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=300&auto=format&fit=crop',
    user_id: '1',
    created_at: '2023-01-02T00:00:00Z',
    songs: [mockSongs[1], mockSongs[2]]
  },
  {
    id: '3',
    name: 'Party Playlist',
    description: 'Get the party started with these hits',
    cover_url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=300&auto=format&fit=crop',
    user_id: '1',
    created_at: '2023-01-03T00:00:00Z',
    songs: [mockSongs[0], mockSongs[1], mockSongs[3], mockSongs[5]]
  }
];
