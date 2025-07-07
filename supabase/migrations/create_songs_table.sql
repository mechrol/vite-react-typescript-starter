/*
  # Create songs table

  1. New Tables
    - `songs`
      - `id` (uuid, primary key)
      - `title` (text, not null)
      - `artist_id` (uuid, references artists.id)
      - `artist_name` (text, not null)
      - `album` (text)
      - `genre` (text)
      - `duration` (integer, not null)
      - `cover_url` (text)
      - `audio_url` (text, not null)
      - `release_date` (date)
      - `created_at` (timestamptz, default now())
      - `plays` (integer, default 0)
      - `likes` (integer, default 0)
      - `shares` (integer, default 0)
      - `format` (text, not null)
      - `is_public` (boolean, default false)
  2. Security
    - Enable RLS on `songs` table
    - Add policy for artists to manage their own songs
    - Add policy for public access to public songs
*/

CREATE TABLE IF NOT EXISTS songs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  artist_id uuid NOT NULL REFERENCES artists(id) ON DELETE CASCADE,
  artist_name text NOT NULL,
  album text,
  genre text,
  duration integer NOT NULL,
  cover_url text,
  audio_url text NOT NULL,
  release_date date,
  created_at timestamptz DEFAULT now(),
  plays integer DEFAULT 0,
  likes integer DEFAULT 0,
  shares integer DEFAULT 0,
  format text NOT NULL,
  is_public boolean DEFAULT false
);

ALTER TABLE songs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Artists can manage their own songs"
  ON songs
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM artists
      WHERE artists.id = songs.artist_id
      AND artists.user_id = auth.uid()
    )
  );

CREATE POLICY "Public songs are viewable by everyone"
  ON songs
  FOR SELECT
  TO anon
  USING (is_public = true);

CREATE POLICY "Authenticated users can view public songs"
  ON songs
  FOR SELECT
  TO authenticated
  USING (is_public = true OR 
    EXISTS (
      SELECT 1 FROM artists
      WHERE artists.id = songs.artist_id
      AND artists.user_id = auth.uid()
    )
  );
