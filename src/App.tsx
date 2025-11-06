import { useState } from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import { Toaster } from './components/ui/sonner';
import WelcomeScreen from './components/WelcomeScreen';
import AnonymousRegistration from './components/AnonymousRegistration';
import OrganizationRegistration from './components/OrganizationRegistration';
import MentorRegistration from './components/MentorRegistration';
import InterestSelection from './components/InterestSelection';
import MainApp from './components/MainApp';
import USSDInterface from './components/USSDInterface';

export default function App() {
  const [currentStep, setCurrentStep] = useState<'welcome' | 'account-type' | 'register' | 'org-register' | 'mentor-register' | 'interests' | 'app' | 'ussd'>('welcome');
  const [accountType, setAccountType] = useState<'user' | 'organization' | 'mentor'>('user');
  const [userData, setUserData] = useState({
    displayName: '',
    purpose: [] as string[],
    phoneNumber: '',
    faithLevel: '',
    interests: [] as string[],
    skills: [] as string[],
    accountType: 'user' as 'user' | 'organization' | 'mentor'
  });

  const handleWelcomeComplete = () => {
    setCurrentStep('account-type');
  };

  const handleAccountTypeSelection = (type: 'user' | 'organization' | 'mentor') => {
    setAccountType(type);
    setUserData({ ...userData, accountType: type });
    if (type === 'organization') {
      setCurrentStep('org-register');
    } else if (type === 'mentor') {
      setCurrentStep('mentor-register');
    } else {
      setCurrentStep('register');
    }
  };

  const handleRegistrationComplete = (data: { displayName: string; purpose: string[]; phoneNumber?: string }) => {
    setUserData({ ...userData, ...data, phoneNumber: data.phoneNumber || '' });
    setCurrentStep('interests');
  };

  const handleOrgRegistrationComplete = (data: any) => {
    setUserData({ ...userData, displayName: data.officialName || 'Organization' });
    setCurrentStep('app');
  };

  const handleMentorRegistrationComplete = (data: any) => {
    setUserData({ ...userData, displayName: data.professionalTitle || 'Mentor' });
    setCurrentStep('app');
  };

  const handleInterestsComplete = (data: { faithLevel: string; interests: string[]; skills: string[] }) => {
    setUserData({ ...userData, ...data });
    setCurrentStep('app');
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        {currentStep === 'welcome' && <WelcomeScreen onComplete={handleWelcomeComplete} />}
        {currentStep === 'account-type' && (
          <AccountTypeSelection onSelect={handleAccountTypeSelection} onBack={() => setCurrentStep('welcome')} />
        )}
        {currentStep === 'register' && <AnonymousRegistration onComplete={handleRegistrationComplete} />}
        {currentStep === 'org-register' && (
          <OrganizationRegistration 
            onComplete={handleOrgRegistrationComplete} 
            onBack={() => setCurrentStep('account-type')} 
          />
        )}
        {currentStep === 'mentor-register' && (
          <MentorRegistration 
            onComplete={handleMentorRegistrationComplete} 
            onBack={() => setCurrentStep('account-type')} 
          />
        )}
        {currentStep === 'interests' && <InterestSelection onComplete={handleInterestsComplete} />}
        {currentStep === 'app' && <MainApp userData={userData} onOpenUSSD={() => setCurrentStep('ussd')} />}
        {currentStep === 'ussd' && <USSDInterface onBack={() => setCurrentStep('app')} />}
        <Toaster position="top-center" richColors />
      </div>
    </ThemeProvider>
  );
}

// Account Type Selection Component
function AccountTypeSelection({ onSelect, onBack }: { onSelect: (type: 'user' | 'organization' | 'mentor') => void; onBack: () => void }) {
  const accountTypes = [
    {
      type: 'user' as const,
      icon: '👤',
      title: 'Individual User',
      description: 'Join as a regular member to connect, grow, and learn',
      gradient: 'from-purple-600 to-cyan-600'
    },
    {
      type: 'organization' as const,
      icon: '🏢',
      title: 'Organization',
      description: 'Register your church, NGO, or Christian business',
      gradient: 'from-blue-600 to-indigo-600'
    },
    {
      type: 'mentor' as const,
      icon: '🌟',
      title: 'Mentor/Leader',
      description: 'Join as an industry expert or ministry leader',
      gradient: 'from-yellow-600 to-orange-600'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950 p-6">
      <button onClick={onBack} className="text-white/70 hover:text-white transition-colors mb-8 text-sm flex items-center gap-2">
        ← Back
      </button>
      
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl text-white mb-3">Choose Account Type</h1>
          <p className="text-white/70">Select how you'd like to join TheCircle</p>
        </div>

        <div className="space-y-4">
          {accountTypes.map((account) => (
            <button
              key={account.type}
              onClick={() => onSelect(account.type)}
              className="w-full p-6 rounded-2xl bg-white/5 border-2 border-white/10 hover:border-white/30 hover:bg-white/10 transition-all text-left group"
            >
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${account.gradient} flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform`}>
                  {account.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg text-white mb-1">{account.title}</h3>
                  <p className="text-sm text-white/70">{account.description}</p>
                </div>
                <div className="text-white/50 group-hover:text-white/90 transition-colors">→</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
