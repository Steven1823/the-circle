import { useState } from 'react';
import BottomNav from './BottomNav';
import HomeScreen from './HomeScreen';
import FaithPathsScreen from './FaithPathsScreen';
import LearnEarnScreen from './LearnEarnScreen';
import CirclesScreen from './CirclesScreen';
import ProfileScreen from './ProfileScreen';
import ResourceMapScreen from './ResourceMapScreen';
import CommunitiesScreen from './CommunitiesScreen';
import MessagingSystem from './MessagingSystem';
import ChatBot from './ChatBot';
import SearchDialog from './SearchDialog';

interface MainAppProps {
  userData: {
    displayName: string;
    purpose: string[];
    faithLevel: string;
    interests: string[];
    skills: string[];
  };
  onOpenUSSD: () => void;
}

export default function MainApp({ userData, onOpenUSSD }: MainAppProps) {
  const [currentScreen, setCurrentScreen] = useState<'home' | 'faith' | 'learn' | 'circles' | 'profile' | 'map' | 'communities' | 'messages'>('home');
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="min-h-screen bg-background pb-20">
      {currentScreen === 'home' && (
        <HomeScreen 
          userData={userData} 
          onOpenSearch={() => setShowSearch(true)} 
          onOpenProfile={() => setCurrentScreen('profile')}
          onOpenMap={() => setCurrentScreen('map')}
        />
      )}
      {currentScreen === 'faith' && <FaithPathsScreen faithLevel={userData.faithLevel} />}
      {currentScreen === 'learn' && <LearnEarnScreen interests={userData.interests} skills={userData.skills} />}
      {currentScreen === 'circles' && <CirclesScreen interests={userData.interests} />}
      {currentScreen === 'communities' && <CommunitiesScreen />}
      {currentScreen === 'messages' && <MessagingSystem />}
      {currentScreen === 'profile' && <ProfileScreen userData={userData} onOpenUSSD={onOpenUSSD} />}
      {currentScreen === 'map' && <ResourceMapScreen onBack={() => setCurrentScreen('home')} />}
      
      <BottomNav currentScreen={currentScreen} onNavigate={setCurrentScreen} onOpenMessages={() => setCurrentScreen('messages')} />
      <ChatBot />
      <SearchDialog open={showSearch} onClose={() => setShowSearch(false)} />
    </div>
  );
}
