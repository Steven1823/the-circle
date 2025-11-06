import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  MessageCircle, 
  Repeat2, 
  Heart, 
  Eye, 
  Share2, 
  Bookmark,
  MoreHorizontal,
  Pin,
  Trash2,
  Flag,
  Volume2,
  VolumeX,
  CheckCircle2
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { toast } from 'sonner@2.0.3';

interface Post {
  id: string;
  author: string;
  type: string;
  content: string;
  timestamp: string;
  reactions: number;
  comments: number;
  views: number;
  reposts?: number;
  needsAdvice?: boolean;
  isVerified?: boolean;
  verificationBadge?: 'organization' | 'mentor' | 'user';
  privacy?: 'public' | 'circles' | 'anonymous';
}

interface EnhancedPostCardProps {
  post: Post;
  onDelete?: (id: string) => void;
}

export default function EnhancedPostCard({ post, onDelete }: EnhancedPostCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isReposted, setIsReposted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [localReactions, setLocalReactions] = useState(post.reactions);
  const [localReposts, setLocalReposts] = useState(post.reposts || 0);

  const getTypeEmoji = (type: string) => {
    const types: Record<string, string> = {
      prayer: '🙏',
      testimony: '🎉',
      question: '💭',
      skill: '💪',
      general: '✨'
    };
    return types[type] || '✨';
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      prayer: 'bg-purple-500/20 text-purple-500 border-purple-500/50',
      testimony: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/50',
      question: 'bg-blue-500/20 text-blue-500 border-blue-500/50',
      skill: 'bg-green-500/20 text-green-500 border-green-500/50',
      general: 'bg-cyan-500/20 text-cyan-500 border-cyan-500/50'
    };
    return colors[type] || 'bg-muted';
  };

  const getVerificationBadge = () => {
    if (!post.isVerified) return null;
    
    const badges = {
      organization: { icon: '🏢', color: 'text-blue-500', label: 'Verified Organization' },
      mentor: { icon: '🌟', color: 'text-yellow-500', label: 'Certified Mentor' },
      user: { icon: '✓', color: 'text-green-500', label: 'Verified User' }
    };
    
    const badge = badges[post.verificationBadge || 'user'];
    
    return (
      <div className="group relative">
        <CheckCircle2 className={`w-4 h-4 ${badge.color} fill-current`} />
        <div className="absolute hidden group-hover:block bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded shadow-lg whitespace-nowrap z-10">
          {badge.label}
        </div>
      </div>
    );
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLocalReactions(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleRepost = () => {
    setIsReposted(!isReposted);
    setLocalReposts(prev => isReposted ? prev - 1 : prev + 1);
    toast.success(isReposted ? 'Repost removed' : 'Reposted to your followers! 🔄');
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast.success(isBookmarked ? 'Removed from bookmarks' : 'Saved to bookmarks! 🔖');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`Check out this post on TheCircle: ${post.content.substring(0, 50)}...`);
    toast.success('Link copied to clipboard! 🔗');
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
    toast.info(isMuted ? 'Unmuted this conversation' : 'Muted this conversation');
  };

  return (
    <Card className="p-4 glass hover:border-primary/30 transition-all animate-fadeIn">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center shrink-0">
            <span className="text-lg">{getTypeEmoji(post.type)}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm text-foreground truncate">
                {post.privacy === 'anonymous' ? 'Anonymous Circle Member' : post.author}
              </span>
              {getVerificationBadge()}
              <span className="text-xs text-muted-foreground">·</span>
              <span className="text-xs text-muted-foreground">{post.timestamp}</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <Badge className={`text-xs px-2 py-0 ${getTypeColor(post.type)}`}>
                {post.type}
              </Badge>
              {post.needsAdvice && (
                <Badge className="text-xs px-2 py-0 bg-orange-500/20 text-orange-500 border-orange-500/50">
                  Needs Advice
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* 3-Dots Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-accent">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={handleBookmark}>
              <Bookmark className={`w-4 h-4 mr-2 ${isBookmarked ? 'fill-current' : ''}`} />
              {isBookmarked ? 'Remove Bookmark' : 'Bookmark Post'}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleMute}>
              {isMuted ? <Volume2 className="w-4 h-4 mr-2" /> : <VolumeX className="w-4 h-4 mr-2" />}
              {isMuted ? 'Unmute' : 'Mute Conversation'}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Pin className="w-4 h-4 mr-2" />
              Pin to Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleShare}>
              <Share2 className="w-4 h-4 mr-2" />
              Share Post
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-500">
              <Flag className="w-4 h-4 mr-2" />
              Report Post
            </DropdownMenuItem>
            {onDelete && (
              <DropdownMenuItem 
                onClick={() => onDelete(post.id)}
                className="text-red-500"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Post
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Content */}
      <p className="text-foreground mb-4 whitespace-pre-wrap leading-relaxed">{post.content}</p>

      {/* Engagement Bar with Metrics */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center gap-1">
          {/* Comments */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 px-2 hover:bg-blue-500/10 hover:text-blue-500 group"
          >
            <MessageCircle className="w-4 h-4 group-hover:fill-current transition-all" />
            {post.comments > 0 && (
              <span className="ml-1.5 text-xs">{post.comments}</span>
            )}
          </Button>

          {/* Repost */}
          <Button 
            variant="ghost" 
            size="sm" 
            className={`h-8 px-2 group ${
              isReposted 
                ? 'text-green-500 hover:bg-green-500/10' 
                : 'hover:bg-green-500/10 hover:text-green-500'
            }`}
            onClick={handleRepost}
          >
            <Repeat2 className={`w-4 h-4 transition-all ${isReposted ? 'fill-current' : ''}`} />
            {localReposts > 0 && (
              <span className="ml-1.5 text-xs">{localReposts}</span>
            )}
          </Button>

          {/* Like */}
          <Button 
            variant="ghost" 
            size="sm" 
            className={`h-8 px-2 group ${
              isLiked 
                ? 'text-red-500 hover:bg-red-500/10' 
                : 'hover:bg-red-500/10 hover:text-red-500'
            }`}
            onClick={handleLike}
          >
            <Heart className={`w-4 h-4 transition-all ${isLiked ? 'fill-current' : 'group-hover:fill-current'}`} />
            {localReactions > 0 && (
              <span className="ml-1.5 text-xs">{localReactions}</span>
            )}
          </Button>

          {/* Views */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 px-2 hover:bg-accent group"
          >
            <Eye className="w-4 h-4" />
            <span className="ml-1.5 text-xs text-muted-foreground">{post.views}</span>
          </Button>
        </div>

        {/* Share */}
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 px-2 hover:bg-primary/10 hover:text-primary"
          onClick={handleShare}
        >
          <Share2 className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
}
