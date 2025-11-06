import { Home, BookOpen, Users, MessageCircle, User } from 'lucide-react';
import { Badge } from './ui/badge';

interface BottomNavProps {
  currentScreen: 'home' | 'faith' | 'learn' | 'circles' | 'profile' | 'map' | 'communities' | 'messages';
  onNavigate: (screen: 'home' | 'faith' | 'learn' | 'circles' | 'profile' | 'map' | 'communities' | 'messages') => void;
  onOpenMessages?: () => void;
}

export default function BottomNav({ currentScreen, onNavigate, onOpenMessages }: BottomNavProps) {
  const navItems = [
    { id: 'home' as const, icon: Home, label: 'Home' },
    { id: 'faith' as const, icon: BookOpen, label: 'Faith' },
    { id: 'communities' as const, icon: Users, label: 'Communities' },
    { id: 'messages' as const, icon: MessageCircle, label: 'Messages', badge: 3 },
    { id: 'profile' as const, icon: User, label: 'Profile' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 glass border-t border-border px-4 py-3 safe-area-inset-bottom z-50">
      <div className="max-w-md mx-auto flex justify-between items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="flex flex-col items-center gap-1 min-w-0 flex-1 transition-all btn-hover relative"
            >
              <div className="relative">
                <Icon
                  className={`w-6 h-6 transition-all ${
                    isActive ? 'text-primary scale-110' : 'text-muted-foreground'
                  }`}
                />
                {item.badge && item.badge > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-4 min-w-[16px] px-1 text-[10px] bg-red-500 text-white border-0 flex items-center justify-center">
                    {item.badge}
                  </Badge>
                )}
              </div>
              <span
                className={`text-xs transition-all ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
