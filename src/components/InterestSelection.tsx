import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface InterestSelectionProps {
  onComplete: (data: { faithLevel: string; interests: string[]; skills: string[] }) => void;
}

const faithLevels = [
  { id: 'new', label: 'New to Jesus', emoji: '🌱' },
  { id: 'growing', label: 'Growing', emoji: '🌿' },
  { id: 'seasoned', label: 'Seasoned', emoji: '🌳' }
];

const interestOptions = [
  'Business', 'Creative Arts', 'Tech', 'Leadership', 
  'Mental Health', 'Music', 'Writing', 'Photography',
  'Ministry', 'Sports'
];

const skillOptions = [
  'Design', 'Marketing', 'Writing', 'Coding',
  'Public Speaking', 'Video Editing', 'Social Media',
  'Photography', 'Business Strategy', 'Content Creation'
];

export default function InterestSelection({ onComplete }: InterestSelectionProps) {
  const [faithLevel, setFaithLevel] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);

  const toggleInterest = (interest: string) => {
    setInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const toggleSkill = (skill: string) => {
    setSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const canContinue = faithLevel && interests.length > 0;

  return (
    <div className="min-h-screen bg-background px-6 py-8 pb-24 animate-fadeIn">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-foreground mb-2">Personalize Your Journey</h2>
          <p className="text-muted-foreground">Help us tailor your experience</p>
        </div>

        {/* Faith Level */}
        <div className="mb-8">
          <Label className="text-foreground mb-3 block">
            Where are you in your faith journey?
          </Label>
          <div className="grid grid-cols-1 gap-3">
            {faithLevels.map((level) => (
              <div
                key={level.id}
                onClick={() => setFaithLevel(level.id)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all btn-hover ${
                  faithLevel === level.id
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50 bg-card'
                }`}
              >
                <span className="mr-2">{level.emoji}</span>
                <span className="text-foreground">{level.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Interests */}
        <div className="mb-8">
          <Label className="text-foreground mb-3 block">
            What interests you? (Select all that apply)
          </Label>
          <div className="flex flex-wrap gap-2">
            {interestOptions.map((interest) => (
              <Badge
                key={interest}
                onClick={() => toggleInterest(interest)}
                className={`cursor-pointer px-4 py-2 rounded-full transition-all btn-hover ${
                  interests.includes(interest)
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card text-foreground border border-border hover:border-primary'
                }`}
              >
                {interest}
              </Badge>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="mb-8">
          <Label className="text-foreground mb-3 block">
            Skills you want to learn (Optional)
          </Label>
          <div className="flex flex-wrap gap-2">
            {skillOptions.map((skill) => (
              <Badge
                key={skill}
                onClick={() => toggleSkill(skill)}
                className={`cursor-pointer px-4 py-2 rounded-full transition-all btn-hover ${
                  skills.includes(skill)
                    ? 'bg-green-500 text-white'
                    : 'bg-card text-foreground border border-border hover:border-green-500'
                }`}
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Continue Button */}
        <div className="fixed bottom-0 left-0 right-0 p-6 glass border-t border-border">
          <div className="max-w-md mx-auto">
            <Button
              onClick={() => onComplete({ faithLevel, interests, skills })}
              disabled={!canContinue}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 rounded-lg btn-hover"
            >
              Start My Journey
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={className}>{children}</label>;
}
