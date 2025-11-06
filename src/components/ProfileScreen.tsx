import { useState, useRef } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Settings, Bell, Shield, LogOut, Award, Calendar, Moon, Sun, Camera, Upload } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { Switch } from './ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { toast } from 'sonner@2.0.3';

interface ProfileScreenProps {
  userData: {
    displayName: string;
    faithLevel: string;
    interests: string[];
    skills: string[];
  };
  onOpenUSSD: () => void;
}

const badges = [
  { id: '1', name: 'Light Bringer', emoji: '💡', description: 'Shared 10 encouraging posts' },
  { id: '2', name: 'Skill Sharer', emoji: '🎓', description: 'Completed 3 courses' },
  { id: '3', name: 'Faith Walker', emoji: '🙏', description: 'Finished a Faith Path' }
];

const stats = [
  { label: 'Posts', value: 12 },
  { label: 'Circles', value: 1 },
  { label: 'Skills Learned', value: 3 }
];

export default function ProfileScreen({ userData, onOpenUSSD }: ProfileScreenProps) {
  const { theme, toggleTheme } = useTheme();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [bannerImage, setBannerImage] = useState<string | null>(null);
  const [isUploadingProfile, setIsUploadingProfile] = useState(false);
  const [isUploadingBanner, setIsUploadingBanner] = useState(false);
  
  const profileInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);
  
  const joinedDate = new Date();
  const monthYear = joinedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const handleProfileImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image too large', {
          description: 'Please select an image smaller than 5MB'
        });
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        toast.error('Invalid file type', {
          description: 'Please select an image file'
        });
        return;
      }

      setIsUploadingProfile(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
        setIsUploadingProfile(false);
        toast.success('Profile picture updated!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBannerImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image too large', {
          description: 'Please select an image smaller than 5MB'
        });
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        toast.error('Invalid file type', {
          description: 'Please select an image file'
        });
        return;
      }

      setIsUploadingBanner(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerImage(reader.result as string);
        setIsUploadingBanner(false);
        toast.success('Banner updated!');
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="glass border-b border-border px-6 py-4 sticky top-0 z-40">
        <div className="max-w-md mx-auto">
          <h1 className="text-foreground">Profile</h1>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Profile Card with Banner */}
        <Card className="p-0 rounded-lg shadow-sm hover:shadow-lg transition-all overflow-hidden">
          {/* Banner Section */}
          <div className="relative">
            <div 
              className={`h-32 ${bannerImage ? '' : 'bg-gradient-to-br from-purple-600 via-primary to-cyan-600'} relative overflow-hidden`}
              style={bannerImage ? { backgroundImage: `url(${bannerImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
            >
              {/* Banner Upload Overlay */}
              <button
                onClick={() => bannerInputRef.current?.click()}
                className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-lg backdrop-blur-sm transition-all"
                disabled={isUploadingBanner}
              >
                <Upload className="w-4 h-4" />
              </button>
              <input
                ref={bannerInputRef}
                type="file"
                accept="image/*"
                onChange={handleBannerImageUpload}
                className="hidden"
              />
              {isUploadingBanner && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent" />
                </div>
              )}
            </div>
          </div>

          <div className="p-6 text-center -mt-12 relative">
            {/* Avatar with Upload */}
            <div className="relative inline-block mb-4">
              <Avatar className="w-24 h-24 border-4 border-card shadow-xl">
                {profileImage ? (
                  <AvatarImage src={profileImage} alt={userData.displayName} />
                ) : (
                  <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground text-3xl">
                    {userData.displayName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                )}
              </Avatar>
              
              {/* Upload Button Overlay */}
              <button
                onClick={() => profileInputRef.current?.click()}
                className="absolute bottom-0 right-0 bg-primary hover:bg-primary/90 text-primary-foreground p-2 rounded-full shadow-lg transition-all hover:scale-110"
                disabled={isUploadingProfile}
              >
                <Camera className="w-4 h-4" />
              </button>
              <input
                ref={profileInputRef}
                type="file"
                accept="image/*"
                onChange={handleProfileImageUpload}
                className="hidden"
              />
              {isUploadingProfile && (
                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent" />
                </div>
              )}
            </div>
            
            <h2 className="text-foreground mb-1">{userData.displayName}</h2>
            
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-4">
              <Calendar className="w-4 h-4" />
              <span>Joined {monthYear}</span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl text-primary mb-1">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Edit Profile Button */}
            <Button
              variant="outline"
              className="mt-4 w-full hover:bg-accent/50 transition-all"
            >
              Edit Profile
            </Button>
          </div>
        </Card>

        {/* Badges */}
        <div>
          <h3 className="text-foreground mb-4 flex items-center gap-2">
            <Award className="w-5 h-5" />
            Your Badges
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {badges.map((badge) => (
              <Card key={badge.id} className="p-4 rounded-lg shadow-sm hover:shadow-lg transition-all text-center cursor-pointer hover:scale-105">
                <div className="text-3xl mb-2">{badge.emoji}</div>
                <p className="text-xs text-foreground">{badge.name}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Interests */}
        <Card className="p-5 rounded-lg shadow-sm hover:shadow-lg transition-all">
          <h3 className="text-foreground mb-3">Your Interests</h3>
          <div className="flex flex-wrap gap-2">
            {userData.interests.map((interest) => (
              <Badge key={interest} className="bg-primary/10 text-primary px-3 py-1">
                {interest}
              </Badge>
            ))}
          </div>
        </Card>

        {/* Settings */}
        <Card className="p-5 rounded-lg shadow-sm hover:shadow-lg transition-all">
          <h3 className="text-foreground mb-4">Settings</h3>
          <div className="space-y-3">
            {/* Theme Toggle */}
            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-3">
                {theme === 'dark' ? (
                  <Moon className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <Sun className="w-5 h-5 text-muted-foreground" />
                )}
                <span className="text-foreground">Dark Mode</span>
              </div>
              <Switch checked={theme === 'dark'} onCheckedChange={toggleTheme} />
            </div>
            
            <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors text-left">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="text-foreground">Notifications</span>
            </button>
            <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors text-left">
              <Shield className="w-5 h-5 text-muted-foreground" />
              <span className="text-foreground">Privacy & Safety</span>
            </button>
            <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors text-left">
              <Settings className="w-5 h-5 text-muted-foreground" />
              <span className="text-foreground">Account Settings</span>
            </button>
          </div>
        </Card>

        {/* USSD Access Info */}
        <Card className="p-4 glass border-cyan-500/20">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center shrink-0">
              <span className="text-xl">📱</span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-1">USSD Access</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Access TheCircle from any phone without internet
              </p>
              <Button
                onClick={onOpenUSSD}
                variant="outline"
                size="sm"
                className="w-full border-cyan-500/50 hover:bg-cyan-500/10"
              >
                View USSD Demo (*384*855#)
              </Button>
            </div>
          </div>
        </Card>

        {/* Logout */}
        <Button
          variant="outline"
          className="w-full text-destructive border-destructive/20 hover:bg-destructive/10 btn-hover"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>

        {/* App Info */}
        <div className="text-center text-sm text-muted-foreground py-4">
          <p>TheCircle v1.0</p>
          <p className="text-xs mt-1">"Less Noise. More Light"</p>
        </div>
      </div>
    </div>
  );
}
