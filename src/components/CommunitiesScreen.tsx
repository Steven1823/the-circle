import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Search, 
  Users, 
  TrendingUp, 
  Calendar, 
  BookOpen, 
  Briefcase, 
  Heart, 
  Palette, 
  Code, 
  Sparkles,
  Lock,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Community {
  id: string;
  name: string;
  category: string;
  description: string;
  members: number;
  activityLevel: 'high' | 'medium' | 'low';
  isPrivate: boolean;
  recentPost: string;
  moderators: string[];
  isJoined: boolean;
  coverIcon: string;
}

const communities: Community[] = [
  {
    id: '1',
    name: 'Faith & Business Leaders',
    category: 'Career & Business',
    description: 'For Christian entrepreneurs and business professionals seeking to integrate faith and work',
    members: 1247,
    activityLevel: 'high',
    isPrivate: false,
    recentPost: 'Discussion: Ethical decision-making in business',
    moderators: ['Sarah K.', 'John M.'],
    isJoined: true,
    coverIcon: '💼'
  },
  {
    id: '2',
    name: 'Mental Health Warriors',
    category: 'Mental Health & Wellness',
    description: 'Safe space for discussing mental health, anxiety, depression with faith-based support',
    members: 2834,
    activityLevel: 'high',
    isPrivate: true,
    recentPost: 'Topic: Managing anxiety through prayer and therapy',
    moderators: ['Dr. Grace M.'],
    isJoined: false,
    coverIcon: '🧠'
  },
  {
    id: '3',
    name: 'Young Creatives Network',
    category: 'Creative Arts',
    description: 'Musicians, designers, writers, and artists using their talents for God\'s glory',
    members: 956,
    activityLevel: 'medium',
    isPrivate: false,
    recentPost: 'Showcase: New worship song releases',
    moderators: ['David T.'],
    isJoined: true,
    coverIcon: '🎨'
  },
  {
    id: '4',
    name: 'Tech for Good Kenya',
    category: 'Technology & Innovation',
    description: 'Developers and tech professionals building solutions that serve communities',
    members: 1523,
    activityLevel: 'high',
    isPrivate: false,
    recentPost: 'Project: Building a prayer app together',
    moderators: ['Peter K.', 'Mary W.'],
    isJoined: false,
    coverIcon: '💻'
  },
  {
    id: '5',
    name: 'Bible Study Circle',
    category: 'Faith & Spirituality',
    description: 'Weekly Bible studies, scripture discussions, and theology conversations',
    members: 3421,
    activityLevel: 'high',
    isPrivate: false,
    recentPost: 'This week: Understanding the Book of Romans',
    moderators: ['Pastor James'],
    isJoined: true,
    coverIcon: '📖'
  },
  {
    id: '6',
    name: 'Christian Singles',
    category: 'Relationships & Family',
    description: 'Faith-based community for singles navigating relationships and dating',
    members: 1876,
    activityLevel: 'medium',
    isPrivate: true,
    recentPost: 'Discussion: Maintaining boundaries in dating',
    moderators: ['Ruth S.'],
    isJoined: false,
    coverIcon: '❤️'
  }
];

const categories = [
  { id: 'all', label: 'All Communities', icon: Sparkles },
  { id: 'Faith & Spirituality', label: 'Faith & Spirituality', icon: BookOpen },
  { id: 'Career & Business', label: 'Career & Business', icon: Briefcase },
  { id: 'Mental Health & Wellness', label: 'Mental Health', icon: Heart },
  { id: 'Creative Arts', label: 'Creative Arts', icon: Palette },
  { id: 'Technology & Innovation', label: 'Technology', icon: Code },
  { id: 'Relationships & Family', label: 'Relationships', icon: Users }
];

export default function CommunitiesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [localCommunities, setLocalCommunities] = useState(communities);

  const filteredCommunities = localCommunities.filter(community => {
    const matchesSearch = community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         community.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || community.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getActivityColor = (level: string) => {
    switch (level) {
      case 'high':
        return 'text-green-500';
      case 'medium':
        return 'text-yellow-500';
      case 'low':
        return 'text-gray-500';
      default:
        return 'text-muted-foreground';
    }
  };

  const handleJoinCommunity = (communityId: string) => {
    setLocalCommunities(localCommunities.map(c =>
      c.id === communityId ? { ...c, isJoined: !c.isJoined, members: c.isJoined ? c.members - 1 : c.members + 1 } : c
    ));
    const community = localCommunities.find(c => c.id === communityId);
    if (community) {
      toast.success(community.isJoined ? 'Left community' : `Joined ${community.name}! 🎉`);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="p-4 border-b border-border bg-card/50 backdrop-blur-sm">
        <h1 className="text-xl text-foreground mb-1 flex items-center gap-2">
          <Users className="w-5 h-5" />
          Communities
        </h1>
        <p className="text-sm text-muted-foreground">
          Discover and join communities of interest
        </p>
      </div>

      {/* Search Bar */}
      <div className="p-4 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search communities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-11 rounded-xl"
          />
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="discover" className="flex-1 flex flex-col">
        <TabsList className="w-full justify-start rounded-none border-b border-border bg-transparent p-0 h-auto">
          <TabsTrigger 
            value="discover" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            Discover
          </TabsTrigger>
          <TabsTrigger 
            value="my-communities"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            My Communities
          </TabsTrigger>
        </TabsList>

        {/* Discover Tab */}
        <TabsContent value="discover" className="flex-1 overflow-hidden flex flex-col m-0">
          {/* Category Filters */}
          <div className="p-4 overflow-x-auto">
            <div className="flex gap-2 pb-2">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className="rounded-full shrink-0"
                  >
                    <Icon className="w-3 h-3 mr-1.5" />
                    {category.label}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Communities List */}
          <div className="flex-1 overflow-y-auto p-4 pt-0 space-y-3">
            {filteredCommunities.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-12 h-12 mx-auto text-muted-foreground mb-3 opacity-50" />
                <p className="text-muted-foreground">No communities found</p>
                <p className="text-sm text-muted-foreground mt-1">Try adjusting your search or filters</p>
              </div>
            ) : (
              filteredCommunities.map((community) => (
                <Card key={community.id} className="p-4 glass hover:border-primary/50 transition-all">
                  <div className="flex items-start gap-4">
                    {/* Community Icon */}
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center shrink-0 text-2xl">
                      {community.coverIcon}
                    </div>

                    {/* Community Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-foreground truncate">{community.name}</h3>
                            {community.isPrivate && <Lock className="w-3 h-3 text-muted-foreground shrink-0" />}
                            {community.isJoined && <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />}
                          </div>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                            <span className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {community.members.toLocaleString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <TrendingUp className={`w-3 h-3 ${getActivityColor(community.activityLevel)}`} />
                              {community.activityLevel} activity
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {community.description}
                      </p>

                      <div className="flex items-center justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-muted-foreground truncate">
                            {community.recentPost}
                          </p>
                        </div>
                        <Button
                          size="sm"
                          variant={community.isJoined ? 'outline' : 'default'}
                          onClick={() => handleJoinCommunity(community.id)}
                          className="shrink-0"
                        >
                          {community.isJoined ? 'Joined' : 'Join'}
                          {!community.isJoined && <ArrowRight className="w-3 h-3 ml-1" />}
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        {/* My Communities Tab */}
        <TabsContent value="my-communities" className="flex-1 overflow-y-auto p-4 m-0 space-y-3">
          {localCommunities.filter(c => c.isJoined).length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-12 h-12 mx-auto text-muted-foreground mb-3 opacity-50" />
              <p className="text-muted-foreground">You haven't joined any communities yet</p>
              <Button className="mt-4" onClick={() => document.querySelector<HTMLButtonElement>('[value="discover"]')?.click()}>
                Discover Communities
              </Button>
            </div>
          ) : (
            localCommunities
              .filter(c => c.isJoined)
              .map((community) => (
                <Card key={community.id} className="p-4 glass">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-xl">
                      {community.coverIcon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-foreground">{community.name}</h3>
                      <p className="text-xs text-muted-foreground">{community.members.toLocaleString()} members</p>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => toast.info('Community feed coming soon!')}>
                      Open
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">{community.recentPost}</p>
                </Card>
              ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
