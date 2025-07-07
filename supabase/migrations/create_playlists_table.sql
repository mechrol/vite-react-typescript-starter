/*
  # Create playlists table

  1. New Tables
    - `playlists`
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `description` (text)
      - `cover_url` (text)
      - `user_id` (uuid, references profiles.id)
      - `created_at` (timestamptz, default now())
      - `is_public` (boolean, default false)
  2. Security
    - Enable RLS on `playlists` table
    - Add policy for users to manage their own playlists
    - Add policy for public access to public playlists
*/

CREATE TABLE IF NOT EXISTS playlists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  cover_url text,
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  is_public boolean DEFAULT false
);

ALTER TABLE playlists ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own playlists"
  ON playlists
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Public playlists are viewable by everyone"
  ON playlists
  FOR SELECT
  TO anon
  USING (is_public = true);

CREATE POLICY "Authenticated users can view public playlists"
  ON playlists
  FOR SELECT
  TO authenticated
  USING (is_public = true OR auth.uid() = user_id);
