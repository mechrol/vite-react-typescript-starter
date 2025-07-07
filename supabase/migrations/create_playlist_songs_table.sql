/*
  # Create playlist_songs junction table

  1. New Tables
    - `playlist_songs`
      - `id` (uuid, primary key)
      - `playlist_id` (uuid, references playlists.id)
      - `song_id` (uuid, references songs.id)
      - `position` (integer, not null)
      - `added_at` (timestamptz, default now())
  2. Security
    - Enable RLS on `playlist_songs` table
    - Add policy for users to manage songs in their own playlists
    - Add policy for public access to songs in public playlists
*/

CREATE TABLE IF NOT EXISTS playlist_songs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  playlist_id uuid NOT NULL REFERENCES playlists(id) ON DELETE CASCADE,
  song_id uuid NOT NULL REFERENCES songs(id) ON DELETE CASCADE,
  position integer NOT NULL,
  added_at timestamptz DEFAULT now(),
  UNIQUE(playlist_id, song_id)
);

ALTER TABLE playlist_songs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage songs in their own playlists"
  ON playlist_songs
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM playlists
      WHERE playlists.id = playlist_songs.playlist_id
      AND playlists.user_id = auth.uid()
    )
  );

CREATE POLICY "Anyone can view songs in public playlists"
  ON playlist_songs
  FOR SELECT
  TO anon
  USING (
    EXISTS (
      SELECT 1 FROM playlists
      WHERE playlists.id = playlist_songs.playlist_id
      AND playlists.is_public = true
    )
  );

CREATE POLICY "Authenticated users can view songs in public playlists"
  ON playlist_songs
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM playlists
      WHERE playlists.id = playlist_songs.playlist_id
      AND (playlists.is_public = true OR playlists.user_id = auth.uid())
    )
  );
