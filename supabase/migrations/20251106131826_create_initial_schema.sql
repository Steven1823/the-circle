/*
  # Initial Database Schema for TheCircle Web App

  ## Overview
  Creates the core database structure for TheCircle, a Christian social platform that connects users, organizations, and mentors.

  ## New Tables

  ### 1. `profiles`
  User profile information linked to auth.users
  - `id` (uuid, primary key, references auth.users)
  - `display_name` (text) - User's chosen display name
  - `account_type` (text) - Type: 'user', 'organization', or 'mentor'
  - `phone_number` (text) - Optional contact number
  - `faith_level` (text) - User's faith journey stage
  - `bio` (text) - User biography
  - `avatar_url` (text) - Profile picture URL
  - `created_at` (timestamptz) - Account creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 2. `user_interests`
  Tracks user interests and purposes
  - `id` (uuid, primary key)
  - `user_id` (uuid, references profiles)
  - `interest_type` (text) - Type: 'purpose', 'interest', or 'skill'
  - `interest_value` (text) - The actual interest/skill/purpose
  - `created_at` (timestamptz)

  ### 3. `posts`
  User-generated content posts
  - `id` (uuid, primary key)
  - `user_id` (uuid, references profiles)
  - `content` (text) - Post text content
  - `image_url` (text) - Optional image attachment
  - `post_type` (text) - Type: 'prayer', 'testimony', 'question', 'general'
  - `likes_count` (integer) - Number of likes
  - `comments_count` (integer) - Number of comments
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 4. `comments`
  Comments on posts
  - `id` (uuid, primary key)
  - `post_id` (uuid, references posts)
  - `user_id` (uuid, references profiles)
  - `content` (text) - Comment text
  - `created_at` (timestamptz)

  ### 5. `post_likes`
  Track which users liked which posts
  - `id` (uuid, primary key)
  - `post_id` (uuid, references posts)
  - `user_id` (uuid, references profiles)
  - `created_at` (timestamptz)
  - Unique constraint on (post_id, user_id)

  ### 6. `circles`
  Interest-based communities
  - `id` (uuid, primary key)
  - `name` (text) - Circle name
  - `description` (text) - Circle description
  - `category` (text) - Circle category
  - `member_count` (integer) - Number of members
  - `created_at` (timestamptz)

  ### 7. `circle_members`
  Track circle memberships
  - `id` (uuid, primary key)
  - `circle_id` (uuid, references circles)
  - `user_id` (uuid, references profiles)
  - `joined_at` (timestamptz)
  - Unique constraint on (circle_id, user_id)

  ### 8. `messages`
  Direct messages between users
  - `id` (uuid, primary key)
  - `sender_id` (uuid, references profiles)
  - `recipient_id` (uuid, references profiles)
  - `content` (text) - Message content
  - `read` (boolean) - Message read status
  - `created_at` (timestamptz)

  ## Security
  - RLS enabled on all tables
  - Users can read their own data
  - Users can read public posts and profiles
  - Users can only modify their own content
  - Messages are private between sender and recipient
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  display_name text NOT NULL,
  account_type text NOT NULL DEFAULT 'user' CHECK (account_type IN ('user', 'organization', 'mentor')),
  phone_number text,
  faith_level text,
  bio text DEFAULT '',
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create user_interests table
CREATE TABLE IF NOT EXISTS user_interests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  interest_type text NOT NULL CHECK (interest_type IN ('purpose', 'interest', 'skill')),
  interest_value text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE user_interests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all interests"
  ON user_interests FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage own interests"
  ON user_interests FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  content text NOT NULL,
  image_url text,
  post_type text NOT NULL DEFAULT 'general' CHECK (post_type IN ('prayer', 'testimony', 'question', 'general')),
  likes_count integer DEFAULT 0,
  comments_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Posts are viewable by everyone"
  ON posts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create posts"
  ON posts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own posts"
  ON posts FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own posts"
  ON posts FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create comments table
CREATE TABLE IF NOT EXISTS comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Comments are viewable by everyone"
  ON comments FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create comments"
  ON comments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own comments"
  ON comments FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create post_likes table
CREATE TABLE IF NOT EXISTS post_likes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(post_id, user_id)
);

ALTER TABLE post_likes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Likes are viewable by everyone"
  ON post_likes FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can like posts"
  ON post_likes FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unlike posts"
  ON post_likes FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create circles table
CREATE TABLE IF NOT EXISTS circles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text DEFAULT '',
  category text NOT NULL,
  member_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE circles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Circles are viewable by everyone"
  ON circles FOR SELECT
  TO authenticated
  USING (true);

-- Create circle_members table
CREATE TABLE IF NOT EXISTS circle_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  circle_id uuid NOT NULL REFERENCES circles(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  joined_at timestamptz DEFAULT now(),
  UNIQUE(circle_id, user_id)
);

ALTER TABLE circle_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Circle members are viewable by everyone"
  ON circle_members FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can join circles"
  ON circle_members FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can leave circles"
  ON circle_members FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  recipient_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  content text NOT NULL,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their messages"
  ON messages FOR SELECT
  TO authenticated
  USING (auth.uid() = sender_id OR auth.uid() = recipient_id);

CREATE POLICY "Users can send messages"
  ON messages FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Users can update received messages"
  ON messages FOR UPDATE
  TO authenticated
  USING (auth.uid() = recipient_id)
  WITH CHECK (auth.uid() = recipient_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_posts_user_id ON posts(user_id);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_comments_post_id ON comments(post_id);
CREATE INDEX IF NOT EXISTS idx_post_likes_post_id ON post_likes(post_id);
CREATE INDEX IF NOT EXISTS idx_post_likes_user_id ON post_likes(user_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender_id ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_recipient_id ON messages(recipient_id);
CREATE INDEX IF NOT EXISTS idx_circle_members_circle_id ON circle_members(circle_id);
CREATE INDEX IF NOT EXISTS idx_circle_members_user_id ON circle_members(user_id);
CREATE INDEX IF NOT EXISTS idx_user_interests_user_id ON user_interests(user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_posts_updated_at ON posts;
CREATE TRIGGER update_posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create function to update post counts
CREATE OR REPLACE FUNCTION update_post_likes_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE posts SET likes_count = likes_count + 1 WHERE id = NEW.post_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE posts SET likes_count = likes_count - 1 WHERE id = OLD.post_id;
  END IF;
  RETURN NULL;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_post_likes_count_trigger ON post_likes;
CREATE TRIGGER update_post_likes_count_trigger
  AFTER INSERT OR DELETE ON post_likes
  FOR EACH ROW
  EXECUTE FUNCTION update_post_likes_count();

CREATE OR REPLACE FUNCTION update_post_comments_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE posts SET comments_count = comments_count + 1 WHERE id = NEW.post_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE posts SET comments_count = comments_count - 1 WHERE id = OLD.post_id;
  END IF;
  RETURN NULL;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_post_comments_count_trigger ON comments;
CREATE TRIGGER update_post_comments_count_trigger
  AFTER INSERT OR DELETE ON comments
  FOR EACH ROW
  EXECUTE FUNCTION update_post_comments_count();

CREATE OR REPLACE FUNCTION update_circle_member_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE circles SET member_count = member_count + 1 WHERE id = NEW.circle_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE circles SET member_count = member_count - 1 WHERE id = OLD.circle_id;
  END IF;
  RETURN NULL;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_circle_member_count_trigger ON circle_members;
CREATE TRIGGER update_circle_member_count_trigger
  AFTER INSERT OR DELETE ON circle_members
  FOR EACH ROW
  EXECUTE FUNCTION update_circle_member_count();
