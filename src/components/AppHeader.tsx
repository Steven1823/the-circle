import { Search, User } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback } from './ui/avatar';

interface AppHeaderProps {
  title: string;
  subtitle?: string;
  userName: string;
  onOpenSearch: () => void;
  onOpenProfile: () => void;
}

export default function AppHeader({ title, subtitle, userName, onOpenSearch, onOpenProfile }: AppHeaderProps) {
  return (
    <div className="bg-card/95 backdrop-blur-md border-b border-border px-4 py-3 sticky top-0 z-40 shadow-sm">
      <div className="max-w-md mx-auto flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="relative group cursor-pointer">
            {/* Logo Icon with pulse effect */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-cyan-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.5" opacity="0.5"/>
                <circle cx="12" cy="12" r="5" stroke="white" strokeWidth="1.5"/>
                <circle cx="12" cy="12" r="2" fill="white"/>
              </svg>
            </div>
            {/* Subtle glow on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
          </div>
          
          {/* Title Section */}
          <div className="flex-1 min-w-0">
            <h2 className="text-foreground leading-tight tracking-tight truncate">{title}</h2>
            {subtitle && (
              <p className="text-xs text-muted-foreground truncate">{subtitle}</p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Search Button */}
          <Button
            onClick={onOpenSearch}
            variant="ghost"
            size="icon"
            className="hover:bg-accent/50 transition-all hover:scale-105"
          >
            <Search className="w-5 h-5" />
          </Button>

          {/* User Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-accent/50 transition-all hover:scale-105"
              >
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-gradient-to-br from-purple-600 to-cyan-600 text-white text-sm">
                    {userName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 animate-slideUp">
              <div className="px-3 py-2">
                <p className="text-sm text-foreground">{userName}</p>
                <p className="text-xs text-muted-foreground">View your profile</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onOpenProfile} className="cursor-pointer">
                <User className="w-4 h-4 mr-2" />
                Profile
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
