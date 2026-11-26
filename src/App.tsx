import React, { useState, useEffect } from 'react';
import { PlayerProvider, usePlayer } from './context/PlayerContext';
import { DesktopLayout } from './components/layout/DesktopLayout';
import { MobileLayout } from './components/layout/MobileLayout';
import { TvLayout } from './components/layout/TvLayout';
import { SplashScreen } from './components/common/SplashScreen';

const MainAppContent: React.FC = () => {
  const { deviceView, setDeviceView } = usePlayer();
  const [showSplash, setShowSplash] = useState(true);

  // Auto-detect mobile device on initial load
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && deviceView === 'desktop') {
        setDeviceView('mobile');
      }
    };

    if (window.innerWidth < 768) {
      setDeviceView('mobile');
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative w-full h-full bg-[#121212]">
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}

      {deviceView === 'desktop' && <DesktopLayout />}
      {deviceView === 'mobile' && <MobileLayout />}
      {deviceView === 'tv' && <TvLayout />}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <PlayerProvider>
      <MainAppContent />
    </PlayerProvider>
  );
};

export default App;
