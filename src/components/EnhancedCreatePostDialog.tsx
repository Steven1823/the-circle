import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Image, 
  Video, 
  Smile, 
  BarChart3, 
  Calendar, 
  MapPin, 
  Globe, 
  Users, 
  Lock,
  X,
  Sparkles
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface EnhancedCreatePostDialogProps {
  open: boolean;
  onClose: () => void;
  onCreatePost: (post: { 
    type: string; 
    content: string; 
    needsAdvice: boolean;
    privacy: string;
    media?: string[];
    scheduledFor?: Date;
  }) => void;
}

const postTypes = [
  { id: 'prayer', label: 'Prayer Request', emoji: '🙏', color: 'bg-purple-500/20 text-purple-500 border-purple-500/50' },
  { id: 'testimony', label: 'Testimony', emoji: '🎉', color: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/50' },
  { id: 'question', label: 'Question', emoji: '💭', color: 'bg-blue-500/20 text-blue-500 border-blue-500/50' },
  { id: 'skill', label: 'Skill Share', emoji: '💪', color: 'bg-green-500/20 text-green-500 border-green-500/50' },
  { id: 'general', label: 'General', emoji: '✨', color: 'bg-cyan-500/20 text-cyan-500 border-cyan-500/50' }
];

export default function EnhancedCreatePostDialog({ open, onClose, onCreatePost }: EnhancedCreatePostDialogProps) {
  const [selectedType, setSelectedType] = useState('general');
  const [content, setContent] = useState('');
  const [needsAdvice, setNeedsAdvice] = useState(false);
  const [privacy, setPrivacy] = useState('public');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const characterLimit = 280;
  const charactersRemaining = characterLimit - content.length;
  const progressPercentage = (content.length / characterLimit) * 100;

  const getProgressColor = () => {
    if (progressPercentage < 70) return 'text-green-500';
    if (progressPercentage < 90) return 'text-yellow-500';
    return 'text-red-500';
  };

  const handleSubmit = () => {
    if (content.trim() && content.length <= characterLimit) {
      onCreatePost({
        type: selectedType,
        content: content.trim(),
        needsAdvice,
        privacy
      });
      setContent('');
      setSelectedType('general');
      setNeedsAdvice(false);
      setPrivacy('public');
      setShowAdvanced(false);
      onClose();
      toast.success('Post shared with The Circle! 🎉');
    }
  };

  const handleMediaUpload = (type: string) => {
    toast.info(`${type} upload coming soon! 📸`);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xl mx-auto p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle>Share with The Circle</DialogTitle>
          <DialogDescription>
            Share your thoughts, prayers, and experiences with the community
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 pb-6 space-y-4">
          {/* Post Type Selection - Horizontal Scrollable */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
            {postTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`px-3 py-2 rounded-full border text-sm whitespace-nowrap transition-all shrink-0 ${
                  selectedType === type.id
                    ? type.color
                    : 'border-border hover:border-primary/50 text-muted-foreground'
                }`}
              >
                <span className="mr-1">{type.emoji}</span>
                {type.label}
              </button>
            ))}
          </div>

          {/* Content Area with Avatar */}
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center shrink-0">
              <span className="text-lg">✨</span>
            </div>
            <div className="flex-1">
              <Textarea
                placeholder="What's on your heart?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={4}
                className="resize-none border-0 focus-visible:ring-0 p-0 text-base placeholder:text-muted-foreground"
              />
            </div>
          </div>

          {/* Character Counter */}
          {content.length > 0 && (
            <div className="flex items-center justify-end gap-3">
              <div className="relative w-8 h-8">
                <svg className="w-8 h-8 transform -rotate-90">
                  <circle
                    cx="16"
                    cy="16"
                    r="14"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    className="text-muted"
                  />
                  <circle
                    cx="16"
                    cy="16"
                    r="14"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 14}`}
                    strokeDashoffset={`${2 * Math.PI * 14 * (1 - progressPercentage / 100)}`}
                    className={getProgressColor()}
                  />
                </svg>
                {progressPercentage > 90 && (
                  <span className={`absolute inset-0 flex items-center justify-center text-[10px] ${getProgressColor()}`}>
                    {charactersRemaining}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Privacy Selector */}
          <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
            <Globe className="w-4 h-4 text-muted-foreground" />
            <Select value={privacy} onValueChange={setPrivacy}>
              <SelectTrigger className="h-8 border-0 bg-transparent focus:ring-0 w-auto">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    <span>Public - Everyone can see</span>
                  </div>
                </SelectItem>
                <SelectItem value="circles">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>Circles Only - My circles</span>
                  </div>
                </SelectItem>
                <SelectItem value="anonymous">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    <span>Anonymous - Hide my identity</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Media & Options Toolbar */}
          <div className="border-t border-border pt-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 w-9 p-0 hover:bg-primary/10 hover:text-primary"
                  onClick={() => handleMediaUpload('Image')}
                >
                  <Image className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 w-9 p-0 hover:bg-primary/10 hover:text-primary"
                  onClick={() => handleMediaUpload('Video')}
                >
                  <Video className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 w-9 p-0 hover:bg-primary/10 hover:text-primary"
                  onClick={() => handleMediaUpload('Poll')}
                >
                  <BarChart3 className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 w-9 p-0 hover:bg-primary/10 hover:text-primary"
                  onClick={() => handleMediaUpload('Emoji')}
                >
                  <Smile className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 w-9 p-0 hover:bg-primary/10 hover:text-primary"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                >
                  <Sparkles className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Advanced Options */}
            {showAdvanced && (
              <div className="space-y-2 animate-fadeIn">
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">Schedule Post</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => toast.info('Scheduling coming soon! 📅')}>
                    Set Time
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">Add Location</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => toast.info('Location tagging coming soon! 📍')}>
                    Add
                  </Button>
                </div>
              </div>
            )}

            {/* Need Advice Toggle */}
            {(selectedType === 'prayer' || selectedType === 'question') && (
              <div className="flex items-center justify-between p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
                <div>
                  <Label htmlFor="advice" className="text-foreground text-sm">Need advice or prayer support?</Label>
                  <p className="text-xs text-muted-foreground">Community can offer guidance</p>
                </div>
                <Switch
                  id="advice"
                  checked={needsAdvice}
                  onCheckedChange={setNeedsAdvice}
                />
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!content.trim() || content.length > characterLimit}
              className="flex-1 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
            >
              Post
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
