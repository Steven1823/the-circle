import { Lock, Unlock, Clock } from 'lucide-react';
import { Card } from './ui/card';
import { Progress } from './ui/progress';

interface FaithPathsScreenProps {
  faithLevel: string;
}

const faithPaths = [
  {
    id: '1',
    title: 'New to Jesus',
    description: 'Discover the basics of faith and begin your journey',
    progress: 0,
    duration: '5 min/day',
    lessons: 7,
    isUnlocked: true,
    color: 'from-[#667EEA] to-[#764BA2]',
    emoji: '🌱'
  },
  {
    id: '2',
    title: 'Faith & Business',
    description: 'Marketplace discipleship for young entrepreneurs',
    progress: 30,
    duration: '10 min/day',
    lessons: 12,
    isUnlocked: true,
    color: 'from-[#48BB78] to-[#38A169]',
    emoji: '💼'
  },
  {
    id: '3',
    title: 'Healing Journey',
    description: 'Mental health, peace, and spiritual wholeness',
    progress: 0,
    duration: '8 min/day',
    lessons: 10,
    isUnlocked: true,
    color: 'from-[#F093FB] to-[#F5576C]',
    emoji: '💚'
  },
  {
    id: '4',
    title: 'Digital Missionary',
    description: 'Share your faith authentically online',
    progress: 0,
    duration: '7 min/day',
    lessons: 8,
    isUnlocked: false,
    color: 'from-[#667EEA] to-[#F093FB]',
    emoji: '📱'
  },
  {
    id: '5',
    title: 'Purpose Finder',
    description: 'Discover your calling and walk in it',
    progress: 0,
    duration: '10 min/day',
    lessons: 15,
    isUnlocked: false,
    color: 'from-[#FFD89B] to-[#F6AD55]',
    emoji: '🎯'
  }
];

export default function FaithPathsScreen({ faithLevel }: FaithPathsScreenProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="glass border-b border-border px-6 py-4 sticky top-0 z-40">
        <div className="max-w-md mx-auto">
          <h1 className="text-foreground">Faith Paths</h1>
          <p className="text-muted-foreground text-sm">Your personalized learning journey</p>
        </div>
      </div>

      {/* Paths Grid */}
      <div className="max-w-md mx-auto px-4 py-6 space-y-4">
        {faithPaths.map((path, index) => (
          <Card
            key={path.id}
            className={`p-6 rounded-lg shadow-sm hover:shadow-lg overflow-hidden relative transition-all animate-fadeIn ${
              !path.isUnlocked ? 'opacity-75' : ''
            }`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${path.color} opacity-5`} />

            <div className="relative">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{path.emoji}</span>
                  <div>
                    <h3 className="text-foreground mb-1">{path.title}</h3>
                    <p className="text-sm text-muted-foreground">{path.description}</p>
                  </div>
                </div>
                {path.isUnlocked ? (
                  <Unlock className="w-5 h-5 text-green-500" />
                ) : (
                  <Lock className="w-5 h-5 text-muted-foreground" />
                )}
              </div>

              {/* Progress Bar */}
              {path.progress > 0 && (
                <div className="mb-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-muted-foreground">Progress</span>
                    <span className="text-xs text-primary">{path.progress}%</span>
                  </div>
                  <Progress value={path.progress} className="h-2" />
                </div>
              )}

              {/* Meta Info */}
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{path.duration}</span>
                </div>
                <div>
                  <span>{path.lessons} lessons</span>
                </div>
              </div>

              {/* CTA Button */}
              <button
                disabled={!path.isUnlocked}
                className={`w-full mt-4 py-3 rounded-lg transition-all btn-hover ${
                  path.isUnlocked
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                    : 'bg-muted text-muted-foreground cursor-not-allowed'
                }`}
              >
                {path.progress > 0 ? 'Continue' : path.isUnlocked ? 'Start Path' : 'Locked'}
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
