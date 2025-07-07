/*
  # Create liked_songs table

  1. New Tables
    - `liked_songs`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles.id)
      - `song_id` (uuid, references songs.id)
      - `created_at` (timestamptz, default now())
  2. Security
    - Enable RLS on `liked_songs` table
    - Add policy for users to manage their liked songs
*/

CREATE TABLE IF NOT EXISTS liked_songs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  song_id uuid NOT NULL REFERENCES songs(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, song_id)
);

ALTER TABLE liked_songs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their liked songs"
  ON liked_songs
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);
