import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Input } from './ui/input';
import { Search, User, Book, Users, Calendar } from 'lucide-react';
import { Badge } from './ui/badge';

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

const mockResults = {
  posts: [
    { id: '1', author: 'Grace', content: 'Believing God for a job opportunity...', type: 'prayer' },
    { id: '2', author: 'David', content: 'Just want to testify! God came through...', type: 'testimony' }
  ],
  users: [
    { id: '1', name: 'Grace', bio: 'Faith & Business enthusiast' },
    { id: '2', name: 'David', bio: 'Tech for Good advocate' }
  ],
  verses: [
    { reference: 'Jeremiah 29:11', preview: 'For I know the plans I have for you...' },
    { reference: 'Philippians 4:13', preview: 'I can do all things through Christ...' }
  ],
  circles: [
    { id: '1', name: 'Faith & Business', mentor: 'Sarah K.' },
    { id: '2', name: 'Tech for Good', mentor: 'John M.' }
  ]
};

export default function SearchDialog({ open, onClose }: SearchDialogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'posts' | 'users' | 'verses' | 'circles'>('all');

  const filters = [
    { id: 'all', label: 'All', icon: Search },
    { id: 'posts', label: 'Posts', icon: Book },
    { id: 'users', label: 'Users', icon: User },
    { id: 'verses', label: 'Verses', icon: Book },
    { id: 'circles', label: 'Circles', icon: Users }
  ] as const;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>Search TheCircle</DialogTitle>
          <DialogDescription>
            Search for posts, people, verses, and circles across the community
          </DialogDescription>
        </DialogHeader>

        {/* Search Input */}
        <div className="px-6 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search posts, people, verses, circles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
              autoFocus
            />
          </div>
        </div>

        {/* Filters */}
        <div className="px-6 pb-4 flex gap-2 overflow-x-auto">
          {filters.map((filter) => {
            const Icon = filter.icon;
            return (
              <Badge
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`cursor-pointer px-4 py-2 whitespace-nowrap ${
                  activeFilter === filter.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                <Icon className="w-3 h-3 mr-1" />
                {filter.label}
              </Badge>
            );
          })}
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-6">
          {searchQuery ? (
            <>
              {(activeFilter === 'all' || activeFilter === 'posts') && (
                <div>
                  <h4 className="text-sm text-muted-foreground mb-3">Posts</h4>
                  <div className="space-y-2">
                    {mockResults.posts.map((post) => (
                      <div
                        key={post.id}
                        className="p-4 rounded-lg bg-card hover:bg-accent/50 cursor-pointer transition-colors border border-border"
                      >
                        <p className="text-sm text-foreground mb-1">{post.author}</p>
                        <p className="text-sm text-muted-foreground">{post.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {(activeFilter === 'all' || activeFilter === 'users') && (
                <div>
                  <h4 className="text-sm text-muted-foreground mb-3">Users</h4>
                  <div className="space-y-2">
                    {mockResults.users.map((user) => (
                      <div
                        key={user.id}
                        className="p-4 rounded-lg bg-card hover:bg-accent/50 cursor-pointer transition-colors border border-border flex items-center gap-3"
                      >
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm text-foreground">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.bio}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {(activeFilter === 'all' || activeFilter === 'verses') && (
                <div>
                  <h4 className="text-sm text-muted-foreground mb-3">Bible Verses</h4>
                  <div className="space-y-2">
                    {mockResults.verses.map((verse) => (
                      <div
                        key={verse.reference}
                        className="p-4 rounded-lg bg-card hover:bg-accent/50 cursor-pointer transition-colors border border-border"
                      >
                        <p className="text-sm text-primary mb-1">{verse.reference}</p>
                        <p className="text-sm text-muted-foreground italic">"{verse.preview}"</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {(activeFilter === 'all' || activeFilter === 'circles') && (
                <div>
                  <h4 className="text-sm text-muted-foreground mb-3">Circles</h4>
                  <div className="space-y-2">
                    {mockResults.circles.map((circle) => (
                      <div
                        key={circle.id}
                        className="p-4 rounded-lg bg-card hover:bg-accent/50 cursor-pointer transition-colors border border-border"
                      >
                        <p className="text-sm text-foreground mb-1">{circle.name}</p>
                        <p className="text-xs text-muted-foreground">Mentor: {circle.mentor}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground">Start typing to search</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
