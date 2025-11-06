import { useState } from 'react';
import { HandHeart, Lightbulb, MessageCircle, Eye, Share2, MoreHorizontal, Bookmark, Flag, Bell, Link as LinkIcon, Code } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarFallback } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { toast } from 'sonner@2.0.3';

interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: string;
  likes: number;
}

interface PostCardProps {
  post: {
    id: string;
    author: string;
    timestamp: string;
    type: 'prayer' | 'testimony' | 'question' | 'skill';
    content: string;
    prayers: number;
    lights: number;
    comments: number;
    views: number;
    needsAdvice: boolean;
    commentsList: Comment[];
  };
}

const postTypeColors = {
  prayer: 'border-l-purple-500',
  testimony: 'border-l-amber-500',
  question: 'border-l-cyan-500',
  skill: 'border-l-green-500'
};

const postTypeBadges = {
  prayer: { label: 'Prayer Request', bg: 'bg-purple-500/10 text-purple-500' },
  testimony: { label: 'Testimony', bg: 'bg-amber-500/10 text-amber-500' },
  question: { label: 'Question', bg: 'bg-cyan-500/10 text-cyan-500' },
  skill: { label: 'Skill Share', bg: 'bg-green-500/10 text-green-500' }
};

export default function PostCard({ post }: PostCardProps) {
  const [hasPrayed, setHasPrayed] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);
  const [prayerCount, setPrayerCount] = useState(post.prayers);
  const [lightCount, setLightCount] = useState(post.lights);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(post.commentsList);
  const [newComment, setNewComment] = useState('');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [notificationsOn, setNotificationsOn] = useState(false);

  const handlePray = () => {
    if (!hasPrayed) {
      setPrayerCount(prayerCount + 1);
      setHasPrayed(true);
      toast.success('Prayer added 🙏', {
        description: 'Your prayer has been shared with the community'
      });
      // Add animation effect
      const element = document.getElementById(`pray-${post.id}`);
      element?.classList.add('animate-pulse-custom');
      setTimeout(() => element?.classList.remove('animate-pulse-custom'), 1000);
    }
  };

  const handleLight = () => {
    if (hasLiked) {
      setLightCount(lightCount - 1);
      setHasLiked(false);
    } else {
      setLightCount(lightCount + 1);
      setHasLiked(true);
    }
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        author: 'You',
        text: newComment,
        timestamp: 'Just now',
        likes: 0
      };
      setComments([...comments, comment]);
      setNewComment('');
      toast.success('Comment posted');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${post.author}'s post`,
        text: post.content,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard');
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast.success(isBookmarked ? 'Removed from bookmarks' : 'Saved to bookmarks');
  };

  const handleNotifications = () => {
    setNotificationsOn(!notificationsOn);
    toast.success(notificationsOn ? 'Notifications turned off' : 'Notifications turned on');
  };

  const handleReport = () => {
    toast.success('Report submitted', {
      description: 'Thank you for helping keep our community safe'
    });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://thecircle.app/post/${post.id}`);
    toast.success('Link copied to clipboard');
  };

  const badge = postTypeBadges[post.type];

  return (
    <Card className={`p-0 border-l-4 ${postTypeColors[post.type]} rounded-lg shadow-sm hover:shadow-lg transition-all bg-card overflow-hidden`}>
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground">
                {post.author.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-foreground">{post.author}</p>
              <p className="text-xs text-muted-foreground">{post.timestamp}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs ${badge.bg}`}>
              {badge.label}
            </span>
            
            {/* Options Dropdown Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 hover:bg-accent/50 transition-all hover:scale-110"
                >
                  <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 animate-slideUp">
                <DropdownMenuItem onClick={handleBookmark} className="cursor-pointer">
                  <Bookmark className={`w-4 h-4 mr-2 ${isBookmarked ? 'fill-current text-primary' : ''}`} />
                  {isBookmarked ? 'Remove from Bookmarks' : 'Save to Bookmarks'}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleNotifications} className="cursor-pointer">
                  <Bell className={`w-4 h-4 mr-2 ${notificationsOn ? 'fill-current text-primary' : ''}`} />
                  {notificationsOn ? 'Turn off Notifications' : 'Turn on Notifications'}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleShare} className="cursor-pointer">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share to Circles
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleCopyLink} className="cursor-pointer">
                  <LinkIcon className="w-4 h-4 mr-2" />
                  Copy Link
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Code className="w-4 h-4 mr-2" />
                  Embed Post
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleReport} variant="destructive" className="cursor-pointer">
                  <Flag className="w-4 h-4 mr-2" />
                  Report Content
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Content */}
        <p className="text-foreground mb-4 leading-relaxed">{post.content}</p>

        {/* Advice Badge */}
        {post.needsAdvice && (
          <div className="mb-3 inline-block">
            <span className="px-3 py-1 bg-orange-500/10 text-orange-500 rounded-full text-xs">
              💡 Needs advice
            </span>
          </div>
        )}

        {/* Views */}
        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
          <Eye className="w-3 h-3" />
          <span>{post.views.toLocaleString()} views</span>
        </div>

        {/* Engagement */}
        <div className="flex items-center gap-4 pt-3 border-t border-border">
          <button
            id={`pray-${post.id}`}
            onClick={handlePray}
            className={`flex items-center gap-2 transition-all btn-hover ${
              hasPrayed ? 'text-purple-500' : 'text-muted-foreground hover:text-purple-500'
            }`}
          >
            <HandHeart className={`w-5 h-5 ${hasPrayed ? 'fill-current' : ''}`} />
            <span className="text-sm">{prayerCount}</span>
          </button>

          <button
            onClick={handleLight}
            className={`flex items-center gap-2 transition-all btn-hover ${
              hasLiked ? 'text-amber-500' : 'text-muted-foreground hover:text-amber-500'
            }`}
          >
            <Lightbulb className={`w-5 h-5 ${hasLiked ? 'fill-current' : ''}`} />
            <span className="text-sm">{lightCount}</span>
          </button>

          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-all btn-hover"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm">{comments.length}</span>
          </button>

          <button 
            onClick={handleShare}
            className="flex items-center gap-2 text-muted-foreground hover:text-secondary transition-all btn-hover ml-auto"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="border-t border-border bg-muted/20 animate-slideUp">
          <div className="p-4 space-y-3 max-h-80 overflow-y-auto">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <Avatar className="w-8 h-8 flex-shrink-0">
                    <AvatarFallback className="bg-gradient-to-br from-secondary to-primary text-primary-foreground text-xs">
                      {comment.author.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 bg-card rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-foreground">{comment.author}</span>
                      <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                    </div>
                    <p className="text-sm text-foreground">{comment.text}</p>
                    <button className="text-xs text-muted-foreground hover:text-primary mt-1 transition-colors">
                      {comment.likes > 0 ? `${comment.likes} likes` : 'Like'}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">
                No comments yet. Be the first to comment!
              </p>
            )}
          </div>

          {/* Add Comment */}
          <div className="p-4 border-t border-border bg-card">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                className="flex-1"
              />
              <Button
                onClick={handleAddComment}
                disabled={!newComment.trim()}
                size="sm"
                className="bg-primary hover:bg-primary/90 btn-hover"
              >
                Post
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
