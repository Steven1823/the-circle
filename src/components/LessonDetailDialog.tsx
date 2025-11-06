import { X, CheckCircle2, Book, Clock } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ScrollArea } from './ui/scroll-area';

interface Lesson {
  id: string;
  lesson_number: number;
  title: string;
  content: string;
  scripture_references: string[];
  key_points: string[];
  reflection_questions: string[];
  practical_application: string;
  estimated_minutes: number;
}

interface LessonDetailDialogProps {
  lesson: Lesson | null;
  isOpen: boolean;
  onClose: () => void;
  onComplete?: () => void;
}

export default function LessonDetailDialog({ lesson, isOpen, onClose, onComplete }: LessonDetailDialogProps) {
  if (!lesson) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Book className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl">Lesson {lesson.lesson_number}</h2>
                <p className="text-sm text-muted-foreground font-normal">{lesson.title}</p>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-120px)]">
          <div className="space-y-6 pr-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{lesson.estimated_minutes} minutes</span>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-2">Overview</h3>
              <p className="text-muted-foreground leading-relaxed">{lesson.content}</p>
            </div>

            {lesson.scripture_references.length > 0 && (
              <Card className="p-4 bg-primary/5 border-primary/20">
                <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Book className="w-4 h-4" />
                  Scripture References
                </h3>
                <div className="space-y-2">
                  {lesson.scripture_references.map((ref, index) => (
                    <div key={index} className="text-sm text-muted-foreground pl-4 border-l-2 border-primary/40">
                      {ref}
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {lesson.key_points.length > 0 && (
              <div>
                <h3 className="font-semibold text-foreground mb-3">Key Takeaways</h3>
                <div className="space-y-2">
                  {lesson.key_points.map((point, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <p className="text-muted-foreground">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {lesson.reflection_questions.length > 0 && (
              <Card className="p-4 bg-muted/50">
                <h3 className="font-semibold text-foreground mb-3">Reflection Questions</h3>
                <div className="space-y-3">
                  {lesson.reflection_questions.map((question, index) => (
                    <div key={index} className="text-muted-foreground">
                      <span className="font-medium text-foreground">{index + 1}.</span> {question}
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {lesson.practical_application && (
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-4 rounded-lg border border-primary/20">
                <h3 className="font-semibold text-foreground mb-2">This Week's Challenge</h3>
                <p className="text-muted-foreground">{lesson.practical_application}</p>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="flex gap-3 pt-4 border-t">
          <Button
            onClick={onClose}
            variant="outline"
            className="flex-1"
          >
            Close
          </Button>
          <Button
            onClick={() => {
              onComplete?.();
              onClose();
            }}
            className="flex-1 bg-primary hover:bg-primary/90"
          >
            Mark Complete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
