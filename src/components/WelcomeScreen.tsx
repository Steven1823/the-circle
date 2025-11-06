import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { ChevronRight } from 'lucide-react';

interface WelcomeScreenProps {
  onComplete: () => void;
}

const pages = [
  {
    id: 1,
    title: 'THE CIRCLE',
    subtitle: 'Less Noise. More Light',
    description: 'Your digital sanctuary for faith, growth, and purpose',
    icon: (
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="60" r="50" stroke="url(#gradient1)" strokeWidth="3" opacity="0.3"/>
        <circle cx="60" cy="60" r="35" stroke="url(#gradient1)" strokeWidth="3" opacity="0.6"/>
        <circle cx="60" cy="60" r="20" stroke="url(#gradient1)" strokeWidth="3"/>
        <circle cx="60" cy="60" r="8" fill="url(#gradient1)"/>
        <defs>
          <linearGradient id="gradient1" x1="0" y1="0" x2="120" y2="120">
            <stop offset="0%" stopColor="#7C3AED"/>
            <stop offset="100%" stopColor="#06B6D4"/>
          </linearGradient>
        </defs>
      </svg>
    )
  },
  {
    id: 2,
    title: 'Your Safe Space',
    subtitle: 'For Faith & Purpose',
    description: 'Share prayers, testimonies, and grow with a community that understands',
    icon: (
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M60 100C60 100 90 80 90 55C90 40 80 30 70 30C65 30 60 35 60 35C60 35 55 30 50 30C40 30 30 40 30 55C30 80 60 100 60 100Z" 
          stroke="url(#gradient2)" strokeWidth="3" fill="none"/>
        <circle cx="60" cy="50" r="15" stroke="url(#gradient2)" strokeWidth="2" opacity="0.5"/>
        <defs>
          <linearGradient id="gradient2" x1="0" y1="0" x2="120" y2="120">
            <stop offset="0%" stopColor="#7C3AED"/>
            <stop offset="100%" stopColor="#06B6D4"/>
          </linearGradient>
        </defs>
      </svg>
    )
  },
  {
    id: 3,
    title: 'Anonymous & Safe',
    subtitle: 'Join Without Judgment',
    description: 'Share freely in a protected space designed for Kenyan youth seeking spiritual growth',
    icon: (
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="45" r="20" stroke="url(#gradient3)" strokeWidth="3"/>
        <path d="M30 100C30 75 42 65 60 65C78 65 90 75 90 100" stroke="url(#gradient3)" strokeWidth="3" strokeLinecap="round"/>
        <rect x="45" y="35" width="30" height="3" fill="url(#gradient3)" rx="1.5"/>
        <defs>
          <linearGradient id="gradient3" x1="0" y1="0" x2="120" y2="120">
            <stop offset="0%" stopColor="#7C3AED"/>
            <stop offset="100%" stopColor="#06B6D4"/>
          </linearGradient>
        </defs>
      </svg>
    )
  },
  {
    id: 4,
    title: 'Ready to Begin?',
    subtitle: 'Less Noise. More Light.',
    description: 'Join thousands of young Kenyans on their spiritual journey',
    icon: (
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M60 20L75 50H90L70 65L77 95L60 80L43 95L50 65L30 50H45L60 20Z" 
          stroke="url(#gradient4)" strokeWidth="3" fill="none"/>
        <circle cx="60" cy="60" r="45" stroke="url(#gradient4)" strokeWidth="2" opacity="0.3"/>
        <defs>
          <linearGradient id="gradient4" x1="0" y1="0" x2="120" y2="120">
            <stop offset="0%" stopColor="#7C3AED"/>
            <stop offset="100%" stopColor="#06B6D4"/>
          </linearGradient>
        </defs>
      </svg>
    )
  }
];

export default function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsAnimating(false), 100);
    return () => clearTimeout(timer);
  }, [currentPage]);

  const handleNext = () => {
    if (currentPage < pages.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setIsAnimating(false);
      }, 300);
    } else {
      onComplete();
    }
  };

  const currentPageData = pages[currentPage];

  return (
    <div className="min-h-screen flex flex-col items-center justify-between px-6 py-12 relative overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* Glassmorphism Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="circles" x="0" y="0" width="150" height="150" patternUnits="userSpaceOnUse">
              <circle cx="75" cy="75" r="50" fill="none" stroke="white" strokeWidth="1"/>
              <circle cx="75" cy="75" r="30" fill="none" stroke="white" strokeWidth="1"/>
              <circle cx="75" cy="75" r="10" fill="none" stroke="white" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circles)"/>
        </svg>
      </div>

      {/* Progress Indicators */}
      <div className="relative z-10 flex gap-2">
        {pages.map((page, index) => (
          <div
            key={page.id}
            className={`h-1 rounded-full transition-all duration-500 ${
              index === currentPage 
                ? 'w-12 bg-gradient-to-r from-purple-500 to-cyan-500' 
                : index < currentPage
                ? 'w-8 bg-purple-500/50'
                : 'w-8 bg-white/20'
            }`}
          />
        ))}
      </div>

      {/* Main Content */}
      <div 
        className={`relative z-10 text-center flex-1 flex flex-col items-center justify-center transition-all duration-800 ${
          isAnimating ? 'opacity-0 transform translate-y-10' : 'opacity-100 transform translate-y-0'
        }`}
      >
        {/* Icon */}
        <div className="mb-12 animate-float">
          <div className="relative">
            {currentPageData.icon}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse-slow" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-white mb-3 tracking-tight text-4xl">
          {currentPageData.title}
        </h1>
        
        {/* Subtitle */}
        <p className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-6 text-xl">
          {currentPageData.subtitle}
        </p>
        
        {/* Description */}
        <p className="text-white/80 max-w-md mx-auto leading-relaxed text-lg px-4">
          {currentPageData.description}
        </p>
      </div>

      {/* Bottom Actions */}
      <div className="relative z-10 w-full max-w-sm space-y-4">
        <Button 
          onClick={handleNext}
          className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white py-6 rounded-xl shadow-2xl shadow-purple-500/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-purple-500/40"
        >
          <span className="mr-2">
            {currentPage === pages.length - 1 ? 'Join The Circle' : 'Continue'}
          </span>
          <ChevronRight className="w-5 h-5" />
        </Button>

        {currentPage < pages.length - 1 && (
          <button
            onClick={onComplete}
            className="w-full text-white/60 hover:text-white/90 py-3 text-sm transition-colors"
          >
            Skip
          </button>
        )}

        {currentPage === pages.length - 1 && (
          <p className="text-white/60 text-center text-sm px-4">
            A safe community for Kenyan youth (16-35 years)
          </p>
        )}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-10px) translateX(-10px);
          }
          75% {
            transform: translateY(-25px) translateX(5px);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .duration-800 {
          transition-duration: 800ms;
        }
      `}</style>
    </div>
  );
}
