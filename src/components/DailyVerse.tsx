import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Share2, Bookmark } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

const verses = [
  {
    text: "For I know the plans I have for you, declares the LORD, plans to prosper you and not to harm you, plans to give you hope and a future.",
    reference: "Jeremiah 29:11",
    theme: "Hope"
  },
  {
    text: "Trust in the LORD with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
    reference: "Proverbs 3:5-6",
    theme: "Trust"
  },
  {
    text: "I can do all this through him who gives me strength.",
    reference: "Philippians 4:13",
    theme: "Strength"
  },
  {
    text: "The LORD is my shepherd, I lack nothing. He makes me lie down in green pastures, he leads me beside quiet waters, he refreshes my soul.",
    reference: "Psalm 23:1-3",
    theme: "Peace"
  },
  {
    text: "Be strong and courageous. Do not be afraid; do not be discouraged, for the LORD your God will be with you wherever you go.",
    reference: "Joshua 1:9",
    theme: "Courage"
  }
];

export default function DailyVerse() {
  const [currentVerse] = useState(verses[Math.floor(Math.random() * verses.length)]);
  const [isSaved, setIsSaved] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Daily Verse from TheCircle',
        text: `"${currentVerse.text}" - ${currentVerse.reference}`,
      });
    } else {
      navigator.clipboard.writeText(`"${currentVerse.text}" - ${currentVerse.reference}`);
      toast.success('Verse copied to clipboard!');
    }
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    toast.success(isSaved ? 'Verse removed from saved' : 'Verse saved!');
  };

  return (
    <Card className="p-6 glass border-primary/20 bg-gradient-to-br from-primary/10 to-secondary/10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">📖</span>
          <span className="text-sm text-muted-foreground">Verse of the Day</span>
        </div>
        <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs">
          {currentVerse.theme}
        </span>
      </div>

      <p className="text-foreground mb-4 italic leading-relaxed">
        "{currentVerse.text}"
      </p>

      <p className="text-sm text-primary mb-6">
        — {currentVerse.reference}
      </p>

      <div className="flex gap-2">
        <Button
          onClick={handleShare}
          variant="outline"
          size="sm"
          className="flex-1 gap-2 btn-hover"
        >
          <Share2 className="w-4 h-4" />
          Share
        </Button>
        <Button
          onClick={handleSave}
          variant="outline"
          size="sm"
          className={`flex-1 gap-2 btn-hover ${isSaved ? 'bg-primary text-primary-foreground' : ''}`}
        >
          <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          {isSaved ? 'Saved' : 'Save'}
        </Button>
      </div>
    </Card>
  );
}
