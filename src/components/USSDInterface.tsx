import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ArrowLeft, Smartphone, Home } from 'lucide-react';

type USSDScreen = 
  | 'welcome'
  | 'auth'
  | 'faithPaths'
  | 'learnEarn'
  | 'circles'
  | 'theWall'
  | 'marketplace'
  | 'events'
  | 'profile';

interface USSDOption {
  number: string;
  label: string;
  screen: USSDScreen | 'exit';
  icon?: string;
}

interface USSDInterfaceProps {
  onBack?: () => void;
}

export default function USSDInterface({ onBack }: USSDInterfaceProps = {}) {
  const [currentScreen, setCurrentScreen] = useState<USSDScreen>('welcome');
  const [history, setHistory] = useState<USSDScreen[]>([]);
  const [userInput, setUserInput] = useState('');

  const screens: Record<USSDScreen, { title: string; options: USSDOption[] }> = {
    welcome: {
      title: 'Karibu TheCircle 🌍',
      options: [
        { number: '1', label: 'Join / Log In', screen: 'auth', icon: '🔐' },
        { number: '2', label: 'Faith Paths', screen: 'faithPaths', icon: '📖' },
        { number: '3', label: 'Learn & Earn', screen: 'learnEarn', icon: '🎓' },
        { number: '4', label: 'Circles', screen: 'circles', icon: '🤝' },
        { number: '5', label: 'The Wall', screen: 'theWall', icon: '🙏' },
        { number: '6', label: 'Marketplace', screen: 'marketplace', icon: '🛍' },
        { number: '7', label: 'Events', screen: 'events', icon: '📅' },
        { number: '8', label: 'My Profile', screen: 'profile', icon: '👤' },
        { number: '0', label: 'Exit', screen: 'exit' }
      ]
    },
    auth: {
      title: 'Join TheCircle 🔐',
      options: [
        { number: '1', label: 'Register (Free)', screen: 'welcome', icon: '✍️' },
        { number: '2', label: 'Login with Phone', screen: 'welcome', icon: '📱' },
        { number: '3', label: 'Forgot Password', screen: 'welcome', icon: '🔑' },
        { number: '0', label: 'Back', screen: 'welcome' }
      ]
    },
    faithPaths: {
      title: 'Faith Paths 📖',
      options: [
        { number: '1', label: 'New Believer Journey', screen: 'faithPaths', icon: '🌱' },
        { number: '2', label: 'Prayer & Worship', screen: 'faithPaths', icon: '🙏' },
        { number: '3', label: 'Bible Study Plans', screen: 'faithPaths', icon: '📚' },
        { number: '4', label: 'Discipleship Training', screen: 'faithPaths', icon: '🎯' },
        { number: '5', label: 'Mental Health & Faith', screen: 'faithPaths', icon: '💙' },
        { number: '9', label: 'Daily Verse (SMS)', screen: 'faithPaths', icon: '✉️' },
        { number: '0', label: 'Main Menu', screen: 'welcome' }
      ]
    },
    learnEarn: {
      title: 'Learn & Earn 🎓',
      options: [
        { number: '1', label: 'Free Skills Courses', screen: 'learnEarn', icon: '💻' },
        { number: '2', label: 'Job Opportunities', screen: 'learnEarn', icon: '💼' },
        { number: '3', label: 'Mentorship Program', screen: 'learnEarn', icon: '👨‍🏫' },
        { number: '4', label: 'Certifications', screen: 'learnEarn', icon: '🏆' },
        { number: '5', label: 'Scholarship Info', screen: 'learnEarn', icon: '🎓' },
        { number: '0', label: 'Main Menu', screen: 'welcome' }
      ]
    },
    circles: {
      title: 'Circles (Groups) 🤝',
      options: [
        { number: '1', label: 'Join Prayer Circle', screen: 'circles', icon: '🙏' },
        { number: '2', label: 'Find Study Group', screen: 'circles', icon: '📖' },
        { number: '3', label: 'Youth Fellowship', screen: 'circles', icon: '🎉' },
        { number: '4', label: 'Career Support Group', screen: 'circles', icon: '💼' },
        { number: '5', label: 'My Active Circles', screen: 'circles', icon: '👥' },
        { number: '6', label: 'Create New Circle', screen: 'circles', icon: '➕' },
        { number: '0', label: 'Main Menu', screen: 'welcome' }
      ]
    },
    theWall: {
      title: 'The Wall 🙏',
      options: [
        { number: '1', label: 'Post Prayer Request', screen: 'theWall', icon: '🙏' },
        { number: '2', label: 'Share Testimony', screen: 'theWall', icon: '✨' },
        { number: '3', label: 'View Latest Posts', screen: 'theWall', icon: '📱' },
        { number: '4', label: 'My Posts', screen: 'theWall', icon: '📝' },
        { number: '5', label: 'Saved Posts', screen: 'theWall', icon: '🔖' },
        { number: '0', label: 'Main Menu', screen: 'welcome' }
      ]
    },
    marketplace: {
      title: 'Marketplace 🛍',
      options: [
        { number: '1', label: 'Creative Services', screen: 'marketplace', icon: '🎨' },
        { number: '2', label: 'Digital Products', screen: 'marketplace', icon: '💾' },
        { number: '3', label: 'Freelance Gigs', screen: 'marketplace', icon: '💻' },
        { number: '4', label: 'My Listings', screen: 'marketplace', icon: '📦' },
        { number: '5', label: 'Post New Service', screen: 'marketplace', icon: '➕' },
        { number: '0', label: 'Main Menu', screen: 'welcome' }
      ]
    },
    events: {
      title: 'Events & Resources 📅',
      options: [
        { number: '1', label: 'Upcoming Events', screen: 'events', icon: '📅' },
        { number: '2', label: 'Safe Spaces Near Me', screen: 'events', icon: '📍' },
        { number: '3', label: 'Church Services', screen: 'events', icon: '⛪' },
        { number: '4', label: 'Workshops & Training', screen: 'events', icon: '🎓' },
        { number: '5', label: 'Get Help Now (Crisis)', screen: 'events', icon: '🆘' },
        { number: '9', label: 'Event Reminders (SMS)', screen: 'events', icon: '🔔' },
        { number: '0', label: 'Main Menu', screen: 'welcome' }
      ]
    },
    profile: {
      title: 'My Profile 👤',
      options: [
        { number: '1', label: 'View My Info', screen: 'profile', icon: 'ℹ️' },
        { number: '2', label: 'Update Phone Number', screen: 'profile', icon: '📱' },
        { number: '3', label: 'My Achievements', screen: 'profile', icon: '🏆' },
        { number: '4', label: 'Settings', screen: 'profile', icon: '⚙️' },
        { number: '5', label: 'Privacy & Security', screen: 'profile', icon: '🔒' },
        { number: '6', label: 'Help & Support', screen: 'profile', icon: '❓' },
        { number: '0', label: 'Main Menu', screen: 'welcome' }
      ]
    }
  };

  const handleOptionSelect = (option: USSDOption) => {
    if (option.screen === 'exit') {
      // Simulate USSD exit
      alert('Thank you for using TheCircle USSD! 🙏\nDial *384*855# anytime to return.\n\n"Less Noise. More Light." ✨');
      setCurrentScreen('welcome');
      setHistory([]);
      return;
    }

    if (option.number === '0' && currentScreen !== 'welcome') {
      // Go back
      if (history.length > 0) {
        const previousScreen = history[history.length - 1];
        setCurrentScreen(previousScreen);
        setHistory(history.slice(0, -1));
      } else {
        setCurrentScreen('welcome');
      }
      return;
    }

    // Navigate to new screen
    setHistory([...history, currentScreen]);
    setCurrentScreen(option.screen as USSDScreen);
  };

  const handleInputSubmit = () => {
    const option = screens[currentScreen].options.find(opt => opt.number === userInput);
    if (option) {
      handleOptionSelect(option);
      setUserInput('');
    }
  };

  const currentScreenData = screens[currentScreen];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 flex items-center justify-center">
      <div className="max-w-md w-full">
        {/* Back to App Button */}
        {onBack && (
          <button
            onClick={onBack}
            className="mb-4 flex items-center gap-2 text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to App</span>
          </button>
        )}
        
        {/* Phone Frame */}
        <div className="relative">
          {/* Phone Header */}
          <div className="bg-slate-950 rounded-t-3xl p-4 border-b border-slate-700">
            <div className="flex items-center justify-between text-white text-xs">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                <span>Safaricom</span>
              </div>
              <div className="flex items-center gap-3">
                <span>📶</span>
                <span>🔋 89%</span>
              </div>
            </div>
          </div>

          {/* USSD Screen */}
          <Card className="bg-slate-950 border-x-0 border-t-0 rounded-none min-h-[500px] p-0">
            {/* Screen Header */}
            <div className="bg-gradient-to-r from-purple-600 to-cyan-600 p-4 text-white">
              <div className="flex items-center justify-between mb-2">
                <Smartphone className="w-5 h-5" />
                <span className="text-xs font-mono">*384*855#</span>
              </div>
              <h2 className="font-bold text-lg">{currentScreenData.title}</h2>
            </div>

            {/* Menu Options */}
            <div className="p-4 space-y-2 bg-slate-950 text-white font-mono text-sm">
              {currentScreenData.options.map((option) => (
                <button
                  key={option.number}
                  onClick={() => handleOptionSelect(option)}
                  className="w-full text-left p-3 rounded-lg hover:bg-slate-800 transition-colors border border-slate-800 hover:border-purple-500/50"
                >
                  <span className="text-cyan-400 font-bold mr-3">{option.number}.</span>
                  <span className="mr-2">{option.icon}</span>
                  <span>{option.label}</span>
                </button>
              ))}
            </div>

            {/* Input Section */}
            <div className="p-4 border-t border-slate-800 bg-slate-950">
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Enter option number..."
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleInputSubmit()}
                  className="flex-1 bg-slate-900 border-slate-700 text-white font-mono"
                  maxLength={1}
                />
                <Button
                  onClick={handleInputSubmit}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Send
                </Button>
              </div>
            </div>

            {/* Breadcrumb Navigation */}
            {history.length > 0 && (
              <div className="p-3 bg-slate-900/50 border-t border-slate-800 flex items-center gap-2 text-xs text-slate-400">
                <Home className="w-3 h-3" />
                {history.map((screen, index) => (
                  <span key={index}>
                    {' > '}
                    {screens[screen].title.split(' ')[0]}
                  </span>
                ))}
                {' > '}
                <span className="text-cyan-400">{currentScreenData.title.split(' ')[0]}</span>
              </div>
            )}
          </Card>

          {/* Phone Footer */}
          <div className="bg-slate-950 rounded-b-3xl p-4 border-t border-slate-700">
            <div className="flex justify-center gap-8">
              <button 
                onClick={() => {
                  if (history.length > 0) {
                    const previousScreen = history[history.length - 1];
                    setCurrentScreen(previousScreen);
                    setHistory(history.slice(0, -1));
                  }
                }}
                className="w-12 h-12 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-white"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => {
                  setCurrentScreen('welcome');
                  setHistory([]);
                }}
                className="w-12 h-12 rounded-full bg-purple-600 hover:bg-purple-700 flex items-center justify-center text-white"
              >
                <Home className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Info Card */}
        <Card className="mt-6 p-4 glass border-purple-500/20">
          <p className="text-sm text-center text-muted-foreground mb-2">
            <strong className="text-purple-400">USSD Access Code:</strong> *384*855#
          </p>
          <p className="text-xs text-center text-muted-foreground">
            📱 Works on any phone • No internet needed • Free access<br/>
            Available on Safaricom, Airtel & Telkom Kenya
          </p>
        </Card>
      </div>
    </div>
  );
}
