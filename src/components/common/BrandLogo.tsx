import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showWordmark?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showWordmark = true,
  className = '',
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-14 h-14',
  };

  const textSizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-4xl',
  };

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Acoustic "A" Soundmark */}
      <div className={`${iconSizes[size]} rounded-full bg-[#1ED760] grid place-items-center shadow-[0_0_20px_rgba(30,215,96,0.25)] shrink-0 transition-transform hover:scale-105`}>
        <svg
          viewBox="0 0 64 64"
          fill="#121212"
          className="w-[62%] h-[62%]"
        >
          {/* Acoustic frequency bars forming letter A */}
          <rect x="9" y="40" width="6" height="14" rx="3" />
          <rect x="18" y="30" width="6" height="24" rx="3" />
          <rect x="27" y="18" width="6" height="36" rx="3" />
          <rect x="36" y="10" width="6" height="44" rx="3" transform="translate(-4.5 0)" />
          <rect x="40" y="18" width="6" height="36" rx="3" />
          <rect x="49" y="30" width="6" height="24" rx="3" />
          <rect x="16" y="38" width="32" height="5" rx="2.5" />
        </svg>
      </div>

      {showWordmark && (
        <span className={`font-extrabold tracking-tight text-white ${textSizes[size]}`}>
          aningu<span className="text-[#1ED760]">.</span>
        </span>
      )}
    </div>
  );
};
