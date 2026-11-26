import { useEffect } from 'react';
import { usePlayer } from '../context/PlayerContext';

export const useTvRemote = () => {
  const {
    togglePlayPause,
    nextTrack,
    prevTrack,
    deviceView,
    setViewMode,
    viewMode,
  } = usePlayer();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Keycode 10009 is Samsung Smart TV Return / Back key
      // Keycode 461 is LG webOS Back key
      if (e.key === 'Escape' || e.key === 'Backspace' || e.keyCode === 10009 || e.keyCode === 461) {
        if (viewMode !== 'home') {
          e.preventDefault();
          setViewMode('home');
          return;
        }
      }

      // Media keys from TV remote control
      if (e.key === 'MediaPlayPause' || e.keyCode === 179) {
        e.preventDefault();
        togglePlayPause();
        return;
      }
      if (e.key === 'MediaTrackNext' || e.keyCode === 176) {
        e.preventDefault();
        nextTrack();
        return;
      }
      if (e.key === 'MediaTrackPrevious' || e.keyCode === 177) {
        e.preventDefault();
        prevTrack();
        return;
      }

      // If active element is an input, don't intercept arrow keys
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return;
      }

      // Spatial navigation for TV mode or arrow key navigation
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        const focusable = Array.from(
          document.querySelectorAll<HTMLElement>(
            'button:not([disabled]), [tabindex="0"], a[href], input:not([disabled])'
          )
        ).filter(el => el.offsetParent !== null); // must be visible

        if (focusable.length === 0) return;

        const currentIndex = focusable.indexOf(document.activeElement as HTMLElement);

        if (currentIndex === -1) {
          focusable[0]?.focus();
          e.preventDefault();
          return;
        }

        let nextIdx = currentIndex;
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
          nextIdx = (currentIndex + 1) % focusable.length;
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
          nextIdx = (currentIndex - 1 + focusable.length) % focusable.length;
        }

        if (nextIdx !== currentIndex) {
          e.preventDefault();
          focusable[nextIdx]?.focus();
          focusable[nextIdx]?.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePlayPause, nextTrack, prevTrack, viewMode, setViewMode, deviceView]);
};
