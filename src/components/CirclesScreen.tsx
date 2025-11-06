import { Card } from './ui/card';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Users, Calendar, Clock } from 'lucide-react';
import { Badge } from './ui/badge';

interface CirclesScreenProps {
  interests: string[];
}

const activeCircles = [
  {
    id: '1',
    mentor: 'Sarah K.',
    mentorInitials: 'SK',
    topic: 'Faith & Business',
    week: 3,
    totalWeeks: 8,
    nextMeeting: 'Tomorrow, 7 PM',
    members: 3,
    color: 'from-[#667EEA] to-[#764BA2]'
  }
];

const availableCircles = [
  {
    id: '2',
    mentor: 'John M.',
    mentorInitials: 'JM',
    mentorBio: 'Tech entrepreneur & youth mentor',
    topic: 'Tech for Good',
    focus: 'Using technology to make kingdom impact',
    frequency: 'Weekly - Saturdays 4 PM',
    spotsLeft: 2,
    color: 'from-[#48BB78] to-[#38A169]'
  },
  {
    id: '3',
    mentor: 'Grace W.',
    mentorInitials: 'GW',
    mentorBio: 'Creative director & worship leader',
    topic: 'Creative Arts Ministry',
    focus: 'Expressing faith through creativity',
    frequency: 'Bi-weekly - Fridays 6 PM',
    spotsLeft: 3,
    color: 'from-[#F093FB] to-[#F5576C]'
  },
  {
    id: '4',
    mentor: 'David O.',
    mentorInitials: 'DO',
    mentorBio: 'Business coach & marketplace minister',
    topic: 'Leadership Development',
    focus: 'Leading with purpose and integrity',
    frequency: 'Weekly - Sundays 3 PM',
    spotsLeft: 1,
    color: 'from-[#FFD89B] to-[#F6AD55]'
  }
];

export default function CirclesScreen({ interests }: CirclesScreenProps) {
  return (
    <div className="min-h-screen bg-[#F7FAFC]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-40">
        <div className="max-w-md mx-auto">
          <h1 className="text-[#2D3748]">Circles</h1>
          <p className="text-[#718096] text-sm">Small group mentorship & community</p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Active Circles */}
        {activeCircles.length > 0 && (
          <div>
            <h2 className="text-[#2D3748] mb-4">Your Circles</h2>
            {activeCircles.map((circle) => (
              <Card key={circle.id} className="p-5 rounded-lg shadow-sm">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${circle.color} flex items-center justify-center text-white`}>
                    {circle.mentorInitials}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[#2D3748] mb-1">{circle.topic}</h3>
                    <p className="text-sm text-[#718096]">Mentor: {circle.mentor}</p>
                  </div>
                </div>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-[#718096]">Progress</span>
                    <span className="text-sm text-[#667EEA]">Week {circle.week} of {circle.totalWeeks}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-[#667EEA] h-2 rounded-full"
                      style={{ width: `${(circle.week / circle.totalWeeks) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Next Meeting */}
                <div className="flex items-center gap-2 p-3 bg-[#667EEA]/10 rounded-lg mb-4">
                  <Calendar className="w-4 h-4 text-[#667EEA]" />
                  <span className="text-sm text-[#667EEA]">Next meeting: {circle.nextMeeting}</span>
                </div>

                {/* Members */}
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-4 h-4 text-[#718096]" />
                  <span className="text-sm text-[#718096]">{circle.members} members</span>
                </div>

                <Button className="w-full bg-[#667EEA] hover:bg-[#667EEA]/90">
                  View Circle
                </Button>
              </Card>
            ))}
          </div>
        )}

        {/* Find Circles */}
        <div>
          <h2 className="text-[#2D3748] mb-4">Find Circles</h2>
          <div className="space-y-4">
            {availableCircles.map((circle) => (
              <Card key={circle.id} className="p-5 rounded-lg shadow-sm">
                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${circle.color} flex items-center justify-center text-white`}>
                    {circle.mentorInitials}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[#2D3748] mb-1">{circle.topic}</h3>
                    <p className="text-sm text-[#718096] mb-1">{circle.mentor}</p>
                    <p className="text-xs text-[#718096]">{circle.mentorBio}</p>
                  </div>
                </div>

                {/* Focus */}
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-[#2D3748]">{circle.focus}</p>
                </div>

                {/* Details */}
                <div className="flex items-center gap-2 mb-4 text-sm text-[#718096]">
                  <Clock className="w-4 h-4" />
                  <span>{circle.frequency}</span>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <Badge className={`${
                    circle.spotsLeft <= 1 ? 'bg-orange-100 text-orange-600' : 'bg-[#48BB78]/10 text-[#48BB78]'
                  }`}>
                    {circle.spotsLeft} spot{circle.spotsLeft !== 1 ? 's' : ''} left
                  </Badge>
                  <Button className="bg-[#667EEA] hover:bg-[#667EEA]/90">
                    Join Circle
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
