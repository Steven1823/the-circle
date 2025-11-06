import { useState, useEffect } from 'react';
import { Lock, Unlock, Clock, BookOpen, ChevronRight } from 'lucide-react';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { supabase } from '../lib/supabase';
import { toast } from 'sonner';
import LessonDetailDialog from './LessonDetailDialog';

interface FaithPathsScreenProps {
  faithLevel: string;
}

interface Course {
  id: string;
  title: string;
  description: string;
  level: string;
  category: string;
  icon: string;
  duration_weeks: number;
  lessons_count: number;
}

interface Lesson {
  id: string;
  course_id: string;
  lesson_number: number;
  title: string;
  content: string;
  scripture_references: string[];
  key_points: string[];
  reflection_questions: string[];
  practical_application: string;
  estimated_minutes: number;
}

const levelMap: Record<string, string> = {
  'New to Faith': 'new_believer',
  'Growing Christian': 'growing',
  'Mature Believer': 'mature',
  'Ministry Leader': 'leader'
};

const colorByCategory: Record<string, string> = {
  'bible_basics': 'from-[#667EEA] to-[#764BA2]',
  'prayer': 'from-[#48BB78] to-[#38A169]',
  'discipleship': 'from-[#F093FB] to-[#F5576C]',
  'leadership': 'from-[#FFD89B] to-[#F6AD55]',
  'mental_health': 'from-[#667EEA] to-[#F093FB]',
  'relationships': 'from-[#F093FB] to-[#F5576C]'
};

export default function FaithPathsScreen({ faithLevel }: FaithPathsScreenProps) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [courseLessons, setCourseLessons] = useState<Lesson[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [showLessonDialog, setShowLessonDialog] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, [faithLevel]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const userLevel = levelMap[faithLevel] || 'new_believer';

      const { data, error } = await supabase
        .from('faith_courses')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;

      setCourses(data || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
      toast.error('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  const fetchCourseLessons = async (courseId: string) => {
    try {
      const { data, error } = await supabase
        .from('faith_lessons')
        .select('*')
        .eq('course_id', courseId)
        .order('lesson_number', { ascending: true });

      if (error) throw error;

      setCourseLessons(data || []);
    } catch (error) {
      console.error('Error fetching lessons:', error);
      toast.error('Failed to load lessons');
    }
  };

  const handleCourseClick = async (course: Course) => {
    setSelectedCourse(course);
    await fetchCourseLessons(course.id);
  };

  const handleLessonClick = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setShowLessonDialog(true);
  };

  const handleBackToCourses = () => {
    setSelectedCourse(null);
    setCourseLessons([]);
  };

  const handleLessonComplete = async () => {
    toast.success('Lesson marked as complete!');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading faith paths...</p>
        </div>
      </div>
    );
  }

  if (selectedCourse) {
    return (
      <div className="min-h-screen bg-background">
        <div className="glass border-b border-border px-6 py-4 sticky top-0 z-40">
          <div className="max-w-md mx-auto">
            <button
              onClick={handleBackToCourses}
              className="text-primary hover:text-primary/80 mb-2 text-sm flex items-center gap-1"
            >
              ← Back to Courses
            </button>
            <div className="flex items-center gap-3">
              <span className="text-3xl">{selectedCourse.icon}</span>
              <div>
                <h1 className="text-foreground">{selectedCourse.title}</h1>
                <p className="text-muted-foreground text-sm">{selectedCourse.lessons_count} lessons</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto px-4 py-6 space-y-3">
          {courseLessons.map((lesson, index) => (
            <Card
              key={lesson.id}
              onClick={() => handleLessonClick(lesson)}
              className="p-4 hover:shadow-lg transition-all cursor-pointer animate-fadeIn"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-muted-foreground mb-0.5">Lesson {lesson.lesson_number}</p>
                    <h3 className="text-foreground font-medium truncate">{lesson.title}</h3>
                    <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{lesson.estimated_minutes} min</span>
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              </div>
            </Card>
          ))}
        </div>

        <LessonDetailDialog
          lesson={selectedLesson}
          isOpen={showLessonDialog}
          onClose={() => setShowLessonDialog(false)}
          onComplete={handleLessonComplete}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="glass border-b border-border px-6 py-4 sticky top-0 z-40">
        <div className="max-w-md mx-auto">
          <h1 className="text-foreground">Faith Paths</h1>
          <p className="text-muted-foreground text-sm">Your personalized learning journey</p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-4">
        {courses.map((course, index) => {
          const isUnlocked = true;
          const color = colorByCategory[course.category] || 'from-[#667EEA] to-[#764BA2]';

          return (
            <Card
              key={course.id}
              onClick={() => isUnlocked && handleCourseClick(course)}
              className={`p-6 rounded-lg shadow-sm hover:shadow-lg overflow-hidden relative transition-all animate-fadeIn ${
                !isUnlocked ? 'opacity-75' : 'cursor-pointer'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-5`} />

              <div className="relative">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{course.icon}</span>
                    <div>
                      <h3 className="text-foreground mb-1">{course.title}</h3>
                      <p className="text-sm text-muted-foreground">{course.description}</p>
                    </div>
                  </div>
                  {isUnlocked ? (
                    <Unlock className="w-5 h-5 text-green-500" />
                  ) : (
                    <Lock className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration_weeks} weeks</span>
                  </div>
                  <div>
                    <span>{course.lessons_count} lessons</span>
                  </div>
                </div>

                <Button
                  disabled={!isUnlocked}
                  className={`w-full mt-4 ${
                    isUnlocked
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'bg-muted text-muted-foreground cursor-not-allowed'
                  }`}
                >
                  {isUnlocked ? 'View Lessons' : 'Locked'}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
