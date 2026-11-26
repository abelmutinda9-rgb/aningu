import React, { useState, useEffect } from 'react';

interface SplashScreenProps {
  onFinish?: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 1800);

    const removeTimer = setTimeout(() => {
      setIsVisible(false);
      onFinish?.();
    }, 2200);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [onFinish]);

  if (!isVisible) return null;

  return (
    <div
      onClick={() => {
        setIsFading(true);
        setTimeout(() => {
          setIsVisible(false);
          onFinish?.();
        }, 300);
      }}
      className={`fixed inset-0 z-50 bg-[#121212] flex flex-col items-center justify-between py-12 px-6 cursor-pointer select-none transition-opacity duration-500 ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex-1 flex flex-col items-center justify-center">
        {/* Animated Soundmark */}
        <div className="w-24 h-24 rounded-full bg-[#1ED760] grid place-items-center shadow-[0_0_50px_rgba(30,215,96,0.35)] animate-bounce duration-1000">
          <svg viewBox="0 0 64 64" fill="#121212" className="w-14 h-14">
            <rect x="9" y="40" width="6" height="14" rx="3" />
            <rect x="18" y="30" width="6" height="24" rx="3" />
            <rect x="27" y="18" width="6" height="36" rx="3" />
            <rect x="36" y="10" width="6" height="44" rx="3" transform="translate(-4.5 0)" />
            <rect x="40" y="18" width="6" height="36" rx="3" />
            <rect x="49" y="30" width="6" height="24" rx="3" />
            <rect x="16" y="38" width="32" height="5" rx="2.5" />
          </svg>
        </div>

        <h1 className="mt-6 text-white text-4xl sm:text-5xl font-extrabold tracking-tight">
          aningu<span className="text-[#1ED760]">.</span>
        </h1>
        <p className="mt-2 text-[#a7a7a7] text-sm font-medium tracking-wide">
          Sound in motion
        </p>
      </div>

      {/* Loading bar & footer */}
      <div className="w-full max-w-xs flex flex-col items-center gap-3">
        <div className="w-48 h-[3px] rounded-full bg-[#242424] overflow-hidden">
          <div className="w-20 h-full rounded-full bg-[#1ED760] animate-pulse-line" />
        </div>
        <span className="text-[#a7a7a7] text-xs font-semibold">
          High-Fidelity Audio • Keyless
        </span>
      </div>
    </div>
  );
};
