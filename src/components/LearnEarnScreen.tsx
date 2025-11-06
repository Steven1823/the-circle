import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Clock, Star, ShoppingBag } from 'lucide-react';

interface LearnEarnScreenProps {
  interests: string[];
  skills: string[];
}

const skillCourses = [
  {
    id: '1',
    title: 'Social Media Marketing',
    mentor: 'Sarah K.',
    duration: '4 weeks',
    level: 'Beginner',
    category: 'Marketing',
    image: '📱',
    enrolled: 45
  },
  {
    id: '2',
    title: 'Graphic Design Basics',
    mentor: 'John M.',
    duration: '6 weeks',
    level: 'Beginner',
    category: 'Design',
    image: '🎨',
    enrolled: 67
  },
  {
    id: '3',
    title: 'Public Speaking Mastery',
    mentor: 'Grace W.',
    duration: '3 weeks',
    level: 'Intermediate',
    category: 'Soft Skills',
    image: '🎤',
    enrolled: 34
  },
  {
    id: '4',
    title: 'Content Creation 101',
    mentor: 'David O.',
    duration: '5 weeks',
    level: 'Beginner',
    category: 'Creative',
    image: '📹',
    enrolled: 89
  }
];

const marketplaceItems = [
  {
    id: '1',
    creator: 'Faith Designs',
    product: 'Custom Church Flyers',
    image: '🎨',
    price: 500,
    rating: 4.8
  },
  {
    id: '2',
    creator: 'Gospel Graphics',
    product: 'Social Media Templates',
    image: '📱',
    price: 1200,
    rating: 4.9
  },
  {
    id: '3',
    creator: 'Kingdom Creatives',
    product: 'Logo Design Service',
    image: '✨',
    price: 3000,
    rating: 5.0
  },
  {
    id: '4',
    creator: 'Divine Photography',
    product: 'Event Coverage',
    image: '📸',
    price: 5000,
    rating: 4.7
  }
];

export default function LearnEarnScreen({ interests, skills }: LearnEarnScreenProps) {
  const [activeTab, setActiveTab] = useState('skills');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="glass border-b border-border px-6 py-4 sticky top-0 z-40">
        <div className="max-w-md mx-auto">
          <h1 className="text-foreground">Learn & Earn</h1>
          <p className="text-muted-foreground text-sm">Grow your skills, support creators</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-md mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
          </TabsList>

          {/* Skills Tab */}
          <TabsContent value="skills" className="space-y-4">
            {/* Category Filters */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              <Badge className="bg-primary text-primary-foreground px-4 py-2 whitespace-nowrap">All</Badge>
              <Badge className="bg-card text-foreground border border-border px-4 py-2 whitespace-nowrap hover:border-primary cursor-pointer">Digital Skills</Badge>
              <Badge className="bg-card text-foreground border border-border px-4 py-2 whitespace-nowrap hover:border-primary cursor-pointer">Soft Skills</Badge>
              <Badge className="bg-card text-foreground border border-border px-4 py-2 whitespace-nowrap hover:border-primary cursor-pointer">Creative</Badge>
            </div>

            {/* Course Cards */}
            {skillCourses.map((course) => (
              <Card key={course.id} className="p-4 rounded-lg shadow-sm hover:shadow-lg transition-all">
                <div className="flex gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-3xl">
                    {course.image}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-foreground mb-1">{course.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">by {course.mentor}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{course.duration}</span>
                      </div>
                      <Badge className="bg-green-500/10 text-green-500 text-xs px-2 py-0">
                        {course.level}
                      </Badge>
                      <span>{course.enrolled} enrolled</span>
                    </div>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-primary hover:bg-primary/90 btn-hover">
                  Start Learning
                </Button>
              </Card>
            ))}
          </TabsContent>

          {/* Marketplace Tab */}
          <TabsContent value="marketplace" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {marketplaceItems.map((item) => (
                <Card key={item.id} className="p-3 rounded-lg shadow-sm hover:shadow-lg transition-all">
                  <div className="w-full aspect-square bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center text-4xl mb-3">
                    {item.image}
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{item.creator}</p>
                  <h4 className="text-foreground mb-2 text-sm">{item.product}</h4>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-primary">KES {item.price.toLocaleString()}</span>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{item.rating}</span>
                    </div>
                  </div>
                  <Button className="w-full bg-green-500 hover:bg-green-600 text-sm py-2 btn-hover">
                    <ShoppingBag className="w-4 h-4 mr-1" />
                    Support
                  </Button>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
