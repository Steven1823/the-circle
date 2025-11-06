import { useState } from 'react';
import { Plus } from 'lucide-react';
import EnhancedPostCard from './EnhancedPostCard';
import EnhancedCreatePostDialog from './EnhancedCreatePostDialog';
import DailyVerse from './DailyVerse';
import AppHeader from './AppHeader';

interface HomeScreenProps {
  userData: {
    displayName: string;
  };
  onOpenSearch: () => void;
  onOpenProfile: () => void;
  onOpenMap: () => void;
}

const mockPosts = [
  {
    id: '1',
    author: 'Grace M.',
    timestamp: '2 hours ago',
    type: 'prayer',
    content: 'Believing God for a job opportunity this week. Been searching for months and trusting His timing. Please pray with me 🙏',
    reactions: 36,
    comments: 5,
    views: 156,
    reposts: 2,
    needsAdvice: true,
    isVerified: false
  },
  {
    id: '2',
    author: 'Pastor David',
    timestamp: '5 hours ago',
    type: 'testimony',
    content: 'Just want to testify! God came through with my tuition fees at the last minute. He is FAITHFUL! 🎉',
    reactions: 112,
    comments: 15,
    views: 489,
    reposts: 8,
    needsAdvice: false,
    isVerified: true,
    verificationBadge: 'mentor' as const
  },
  {
    id: '3',
    author: 'Hope K.',
    timestamp: '1 day ago',
    type: 'question',
    content: 'How do you balance your faith with running a business? Sometimes I feel like I\'m compromising...',
    reactions: 23,
    comments: 23,
    views: 234,
    reposts: 1,
    needsAdvice: true,
    isVerified: false
  },
  {
    id: '4',
    author: 'Citam Valley Road',
    timestamp: '2 days ago',
    type: 'general',
    content: 'Join us this Sunday for a special youth service! Topic: "Purpose in the Digital Age". Free counseling services available after the service 🙏',
    reactions: 46,
    comments: 18,
    views: 612,
    reposts: 12,
    needsAdvice: false,
    isVerified: true,
    verificationBadge: 'organization' as const
  }
];

export default function HomeScreen({ userData, onOpenSearch, onOpenProfile, onOpenMap }: HomeScreenProps) {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [posts, setPosts] = useState(mockPosts);

  const handleCreatePost = (newPost: any) => {
    setPosts([{
      id: Date.now().toString(),
      author: userData.displayName,
      timestamp: 'Just now',
      ...newPost,
      reactions: 0,
      comments: 0,
      views: 1,
      reposts: 0,
      isVerified: false
    }, ...posts]);
  };

  const handleDeletePost = (postId: string) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <AppHeader
        title="The Wall"
        subtitle="Safe Space to Share"
        userName={userData.displayName}
        onOpenSearch={onOpenSearch}
        onOpenProfile={onOpenProfile}
      />

      {/* Feed */}
      <div className="max-w-md mx-auto px-4 py-6 space-y-4">
        {/* Daily Verse - First Item */}
        <div className="animate-fadeIn">
          <DailyVerse />
        </div>

        {/* Quick Access to Resource Map */}
        <div 
          onClick={onOpenMap}
          className="glass border border-primary/20 rounded-2xl p-4 cursor-pointer hover:border-primary/50 transition-all animate-fadeIn btn-hover"
          style={{ animationDelay: '0.1s' }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
                <span className="text-2xl">🗺️</span>
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Resource Map</h3>
                <p className="text-sm text-muted-foreground">Events, safe spaces & more</p>
              </div>
            </div>
            <svg className="w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        {/* Posts */}
        {posts.map((post, index) => (
          <div key={post.id} className="animate-fadeIn" style={{ animationDelay: `${index * 0.1}s` }}>
            <EnhancedPostCard 
              post={post} 
              onDelete={post.author === userData.displayName ? handleDeletePost : undefined}
            />
          </div>
        ))}
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => setShowCreatePost(true)}
        className="fixed bottom-24 right-6 w-14 h-14 bg-gradient-to-br from-purple-600 to-cyan-600 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all z-40 btn-hover"
        aria-label="Create new post"
      >
        <Plus className="w-6 h-6 text-white" />
      </button>

      {/* Create Post Dialog */}
      <EnhancedCreatePostDialog
        open={showCreatePost}
        onClose={() => setShowCreatePost(false)}
        onCreatePost={handleCreatePost}
      />
    </div>
  );
}
