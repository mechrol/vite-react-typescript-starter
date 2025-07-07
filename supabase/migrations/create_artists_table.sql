/*
  # Create artists table

  1. New Tables
    - `artists`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles.id)
      - `name` (text, not null)
      - `bio` (text)
      - `website` (text)
      - `social_links` (jsonb)
      - `profile_image` (text)
      - `cover_image` (text)
      - `created_at` (timestamptz, default now())
      - `updated_at` (timestamptz, default now())
  2. Security
    - Enable RLS on `artists` table
    - Add policy for authenticated users to read their own artist profile
    - Add policy for authenticated users to update their own artist profile
    - Add policy for public access to artist profiles
*/

CREATE TABLE IF NOT EXISTS artists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name text NOT NULL,
  bio text,
  website text,
  social_links jsonb,
  profile_image text,
  cover_image text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE artists ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Artists can read own profile"
  ON artists
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Artists can update own profile"
  ON artists
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Artist profiles are viewable by everyone"
  ON artists
  FOR SELECT
  TO anon
  USING (true);
