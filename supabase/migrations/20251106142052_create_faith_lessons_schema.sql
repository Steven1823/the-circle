/*
  # Faith Lessons Schema

  ## Overview
  Creates database structure for faith lessons, courses, and progress tracking.

  ## New Tables

  ### 1. `faith_courses`
  Faith journey courses organized by level
  - `id` (uuid, primary key)
  - `title` (text) - Course title
  - `description` (text) - Course description
  - `level` (text) - Faith level: 'new_believer', 'growing', 'mature', 'leader'
  - `category` (text) - Category: 'bible_basics', 'prayer', 'discipleship', 'leadership'
  - `icon` (text) - Icon name
  - `duration_weeks` (integer) - Course duration in weeks
  - `lessons_count` (integer) - Number of lessons
  - `created_at` (timestamptz)

  ### 2. `faith_lessons`
  Individual lessons within courses
  - `id` (uuid, primary key)
  - `course_id` (uuid, references faith_courses)
  - `lesson_number` (integer) - Order in course
  - `title` (text) - Lesson title
  - `content` (text) - Lesson content/description
  - `scripture_references` (text[]) - Bible verses
  - `key_points` (text[]) - Main takeaways
  - `reflection_questions` (text[]) - Questions for reflection
  - `practical_application` (text) - How to apply
  - `video_url` (text) - Optional video link
  - `estimated_minutes` (integer) - Time to complete
  - `created_at` (timestamptz)

  ### 3. `user_lesson_progress`
  Track user progress through lessons
  - `id` (uuid, primary key)
  - `user_id` (uuid, references profiles)
  - `lesson_id` (uuid, references faith_lessons)
  - `completed` (boolean) - Lesson completion status
  - `notes` (text) - User notes
  - `completed_at` (timestamptz)
  - `created_at` (timestamptz)

  ## Security
  - RLS enabled on all tables
  - Courses and lessons are viewable by all authenticated users
  - Users can only manage their own progress
*/

-- Create faith_courses table
CREATE TABLE IF NOT EXISTS faith_courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  level text NOT NULL CHECK (level IN ('new_believer', 'growing', 'mature', 'leader')),
  category text NOT NULL CHECK (category IN ('bible_basics', 'prayer', 'discipleship', 'leadership', 'mental_health', 'relationships')),
  icon text DEFAULT '📖',
  duration_weeks integer DEFAULT 4,
  lessons_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE faith_courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Courses are viewable by everyone"
  ON faith_courses FOR SELECT
  TO authenticated
  USING (true);

-- Create faith_lessons table
CREATE TABLE IF NOT EXISTS faith_lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid NOT NULL REFERENCES faith_courses(id) ON DELETE CASCADE,
  lesson_number integer NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  scripture_references text[] DEFAULT '{}',
  key_points text[] DEFAULT '{}',
  reflection_questions text[] DEFAULT '{}',
  practical_application text DEFAULT '',
  video_url text,
  estimated_minutes integer DEFAULT 15,
  created_at timestamptz DEFAULT now(),
  UNIQUE(course_id, lesson_number)
);

ALTER TABLE faith_lessons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lessons are viewable by everyone"
  ON faith_lessons FOR SELECT
  TO authenticated
  USING (true);

-- Create user_lesson_progress table
CREATE TABLE IF NOT EXISTS user_lesson_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  lesson_id uuid NOT NULL REFERENCES faith_lessons(id) ON DELETE CASCADE,
  completed boolean DEFAULT false,
  notes text DEFAULT '',
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, lesson_id)
);

ALTER TABLE user_lesson_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own progress"
  ON user_lesson_progress FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress"
  ON user_lesson_progress FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON user_lesson_progress FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own progress"
  ON user_lesson_progress FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_faith_lessons_course_id ON faith_lessons(course_id);
CREATE INDEX IF NOT EXISTS idx_faith_lessons_lesson_number ON faith_lessons(lesson_number);
CREATE INDEX IF NOT EXISTS idx_user_lesson_progress_user_id ON user_lesson_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_lesson_progress_lesson_id ON user_lesson_progress(lesson_id);

-- Create function to update lessons count
CREATE OR REPLACE FUNCTION update_course_lessons_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE faith_courses SET lessons_count = lessons_count + 1 WHERE id = NEW.course_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE faith_courses SET lessons_count = lessons_count - 1 WHERE id = OLD.course_id;
  END IF;
  RETURN NULL;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_course_lessons_count_trigger ON faith_lessons;
CREATE TRIGGER update_course_lessons_count_trigger
  AFTER INSERT OR DELETE ON faith_lessons
  FOR EACH ROW
  EXECUTE FUNCTION update_course_lessons_count();
