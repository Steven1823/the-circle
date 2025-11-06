import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Switch } from './ui/switch';

interface CreatePostDialogProps {
  open: boolean;
  onClose: () => void;
  onCreatePost: (post: { type: string; content: string; needsAdvice: boolean }) => void;
}

const postTypes = [
  { id: 'prayer', label: 'Prayer Request', emoji: '🙏', color: 'bg-[#F093FB]' },
  { id: 'testimony', label: 'Testimony', emoji: '🎉', color: 'bg-[#FFD89B]' },
  { id: 'question', label: 'Question', emoji: '💭', color: 'bg-[#667EEA]' },
  { id: 'skill', label: 'Skill Share', emoji: '💪', color: 'bg-[#48BB78]' }
];

export default function CreatePostDialog({ open, onClose, onCreatePost }: CreatePostDialogProps) {
  const [selectedType, setSelectedType] = useState('prayer');
  const [content, setContent] = useState('');
  const [needsAdvice, setNeedsAdvice] = useState(false);

  const handleSubmit = () => {
    if (content.trim()) {
      onCreatePost({
        type: selectedType,
        content: content.trim(),
        needsAdvice
      });
      setContent('');
      setSelectedType('prayer');
      setNeedsAdvice(false);
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle>Share with The Circle</DialogTitle>
          <DialogDescription>
            Share your prayers, testimonies, questions, or skills with the community
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Post Type Selection */}
          <div>
            <Label className="mb-2 block">What would you like to share?</Label>
            <div className="grid grid-cols-2 gap-2">
              {postTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`p-3 rounded-lg border-2 transition-all text-left btn-hover ${
                    selectedType === type.id
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-border/50'
                  }`}
                >
                  <span className="mr-2">{type.emoji}</span>
                  <span className="text-sm text-foreground">{type.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div>
            <Label htmlFor="content" className="mb-2 block">Your message</Label>
            <Textarea
              id="content"
              placeholder="Share what's on your heart..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              className="resize-none"
            />
          </div>

          {/* Need Advice Toggle */}
          <div className="flex items-center justify-between p-3 bg-orange-500/10 rounded-lg">
            <div>
              <Label htmlFor="advice" className="text-foreground">Need advice?</Label>
              <p className="text-xs text-muted-foreground">Others can offer guidance</p>
            </div>
            <Switch
              id="advice"
              checked={needsAdvice}
              onCheckedChange={setNeedsAdvice}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 btn-hover"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!content.trim()}
              className="flex-1 bg-primary hover:bg-primary/90 btn-hover"
            >
              Share
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
