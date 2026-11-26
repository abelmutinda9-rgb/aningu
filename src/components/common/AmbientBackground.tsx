import React, { useMemo } from 'react';
import { usePlayer } from '../../context/PlayerContext';

// Generates an ambient gradient aura based on track or playlist mood
export const AmbientBackground: React.FC = () => {
  const { currentTrack, viewMode } = usePlayer();

  const auraStyle = useMemo(() => {
    if (!currentTrack) {
      return {
        background: 'radial-gradient(circle at 50% -20%, rgba(30, 215, 96, 0.15) 0%, rgba(18, 18, 18, 0) 70%)',
      };
    }

    // Hash track id to produce a consistent pleasant tint (emerald, deep violet, indigo, amber)
    let hash = 0;
    for (let i = 0; i < currentTrack.id.length; i++) {
      hash = (hash << 5) - hash + currentTrack.id.charCodeAt(i);
      hash |= 0;
    }

    const palettes = [
      'radial-gradient(circle at 50% -10%, rgba(30, 215, 96, 0.22) 0%, rgba(18, 18, 18, 0) 75%)', // Spotify green
      'radial-gradient(circle at 50% -10%, rgba(124, 58, 237, 0.22) 0%, rgba(18, 18, 18, 0) 75%)', // Purple
      'radial-gradient(circle at 50% -10%, rgba(37, 99, 235, 0.22) 0%, rgba(18, 18, 18, 0) 75%)', // Blue
      'radial-gradient(circle at 50% -10%, rgba(217, 119, 6, 0.20) 0%, rgba(18, 18, 18, 0) 75%)', // Amber
      'radial-gradient(circle at 50% -10%, rgba(225, 29, 72, 0.20) 0%, rgba(18, 18, 18, 0) 75%)', // Rose
    ];

    const chosen = palettes[Math.abs(hash) % palettes.length];
    return { background: chosen };
  }, [currentTrack?.id]);

  return (
    <div
      aria-hidden="true"
      style={auraStyle}
      className="pointer-events-none fixed inset-0 z-0 transition-all duration-1000 ease-in-out opacity-80"
    />
  );
};
