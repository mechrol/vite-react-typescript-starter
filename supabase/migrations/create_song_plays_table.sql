/*
  # Create song_plays table for analytics

  1. New Tables
    - `song_plays`
      - `id` (uuid, primary key)
      - `song_id` (uuid, references songs.id)
      - `user_id` (uuid, references profiles.id, nullable)
      - `played_at` (timestamptz, default now())
      - `play_duration` (integer, nullable)
      - `source` (text, nullable)
      - `ip_address` (text, nullable)
      - `user_agent` (text, nullable)
      - `country` (text, nullable)
  2. Security
    - Enable RLS on `song_plays` table
    - Add policy for artists to view plays of their songs
    - Add policy for users to create play records
*/

CREATE TABLE IF NOT EXISTS song_plays (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  song_id uuid NOT NULL REFERENCES songs(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  played_at timestamptz DEFAULT now(),
  play_duration integer,
  source text,
  ip_address text,
  user_agent text,
  country text
);

ALTER TABLE song_plays ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Artists can view plays of their songs"
  ON song_plays
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM songs
      JOIN artists ON songs.artist_id = artists.id
      WHERE songs.id = song_plays.song_id
      AND artists.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create play records"
  ON song_plays
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Anonymous users can create play records"
  ON song_plays
  FOR INSERT
  TO anon
  WITH CHECK (true);
