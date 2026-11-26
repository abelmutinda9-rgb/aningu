import React, { useState } from 'react';
import {
  Home,
  Mic2,
  Smartphone,
  Monitor,
  Heart,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Download,
  Maximize,
  Minimize,
  ListMusic,
  QrCode,
} from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';
import { useTvRemote } from '../../hooks/useTvRemote';
import { HomeView } from '../views/HomeView';
import { AmbientBackground } from '../common/AmbientBackground';
import { QueueModal } from '../player/QueueModal';
import { DownloadApkModal } from '../common/DownloadApkModal';

export const TvLayout: React.FC = () => {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    togglePlayPause,
    nextTrack,
    prevTrack,
    lyrics,
    likedTrackIds,
    toggleLike,
    setDeviceView,
    isFullscreen,
    toggleFullscreen,
    setIsDownloadModalOpen,
    setIsQueueOpen,
    queue,
  } = usePlayer();

  const [activeTab, setActiveTab] = useState<'now-playing' | 'browse' | 'pair'>('now-playing');
  const isLiked = currentTrack ? likedTrackIds.has(currentTrack.id) : false;

  useTvRemote();

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${mins}:${s.toString().padStart(2, '0')}`;
  };

  // Find active lyrics line
  let activeLyric = 'Music in motion';
  if (lyrics?.lines && lyrics.lines.length > 0) {
    for (const l of lyrics.lines) {
      if (currentTime >= l.time) {
        activeLyric = l.text;
      } else {
        break;
      }
    }
  }

  return (
    <div className="flex h-screen w-screen bg-[#121212] text-white font-['Figtree'] overflow-hidden select-none relative">
      <AmbientBackground />

      {/* Left 10-Foot Navigation Rail */}
      <nav className="w-24 lg:w-28 bg-[#0a0a0a]/90 backdrop-blur-md border-r border-[#1f1f1f] flex flex-col items-center justify-between py-6 shrink-0 z-20">
        <div className="flex flex-col items-center gap-6">
          <div className="w-12 h-12 rounded-full bg-[#1ED760] grid place-items-center text-black font-black text-xl shadow-lg">
            A
          </div>

          <div className="flex flex-col items-center gap-5">
            <button
              onClick={() => setActiveTab('now-playing')}
              className={`p-3.5 rounded-2xl transition-all ${
                activeTab === 'now-playing'
                  ? 'bg-[#1ED760] text-black shadow-lg scale-110'
                  : 'text-[#a7a7a7] hover:text-white hover:bg-[#1a1a1a]'
              }`}
              title="Now Playing"
            >
              <Mic2 size={24} />
            </button>

            <button
              onClick={() => setActiveTab('browse')}
              className={`p-3.5 rounded-2xl transition-all ${
                activeTab === 'browse'
                  ? 'bg-[#1ED760] text-black shadow-lg scale-110'
                  : 'text-[#a7a7a7] hover:text-white hover:bg-[#1a1a1a]'
              }`}
              title="Browse Music"
            >
              <Home size={24} />
            </button>

            <button
              onClick={() => setIsQueueOpen(true)}
              className="p-3.5 rounded-2xl text-[#a7a7a7] hover:text-white hover:bg-[#1a1a1a] transition-all relative"
              title="Queue"
            >
              <ListMusic size={24} />
              {queue.length > 0 && (
                <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-[#1ED760]" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('pair')}
              className={`p-3.5 rounded-2xl transition-all ${
                activeTab === 'pair'
                  ? 'bg-[#1ED760] text-black shadow-lg scale-110'
                  : 'text-[#a7a7a7] hover:text-white hover:bg-[#1a1a1a]'
              }`}
              title="Connect Phone"
            >
              <Smartphone size={24} />
            </button>
          </div>
        </div>

        {/* TV Utility buttons: Fullscreen, APK Download, Switch mode */}
        <div className="flex flex-col items-center gap-3">
          {/* Fullscreen Button for TV browsers */}
          <button
            onClick={toggleFullscreen}
            className={`p-2.5 rounded-full ${
              isFullscreen ? 'bg-[#1ED760] text-black' : 'bg-[#181818] text-[#a7a7a7] hover:text-white'
            }`}
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter TV Fullscreen'}
          >
            {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
          </button>

          {/* Download APK for Android TV */}
          <button
            onClick={() => setIsDownloadModalOpen(true)}
            className="p-2.5 rounded-full bg-[#181818] text-[#1ED760] hover:bg-[#222]"
            title="Download Android TV APK"
          >
            <Download size={18} />
          </button>

          {/* Switch to Desktop */}
          <button
            onClick={() => setDeviceView('desktop')}
            className="p-2.5 rounded-full bg-[#181818] text-[#a7a7a7] hover:text-white"
            title="Switch to Desktop Workstation"
          >
            <Monitor size={18} />
          </button>
        </div>
      </nav>

      {/* Main 10-Foot Content Canvas */}
      <main className="flex-1 relative flex flex-col overflow-hidden z-10">
        {/* Tab 1: 10-Foot Big Screen Now Playing + Giant Lyrics */}
        {activeTab === 'now-playing' && currentTrack && (
          <div className="relative z-10 flex-1 flex flex-col justify-between p-8 lg:p-14">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-[#1ED760] animate-pulse" />
                <span className="text-sm font-bold uppercase tracking-wider text-[#1ED760]">
                  Aningu TV 10-Foot Mode • Opus -14 LUFS
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={toggleFullscreen}
                  className="flex items-center gap-2 bg-[#181818] border border-[#242424] px-4 py-2 rounded-full text-xs text-[#a7a7a7] hover:text-white hover:border-[#1ED760]"
                >
                  {isFullscreen ? <Minimize size={14} /> : <Maximize size={14} />}
                  <span>{isFullscreen ? 'Exit TV Fullscreen' : 'TV Fullscreen (Hide Browser)'}</span>
                </button>

                <div className="flex items-center gap-2 bg-[#181818] border border-[#242424] px-4 py-2 rounded-full text-xs text-[#a7a7a7]">
                  <Smartphone size={14} className="text-[#1ED760]" />
                  <span>Phone Paired (PIN: 749-012)</span>
                </div>
              </div>
            </div>

            {/* Split: Left Album Art + Track Info; Right: Giant Synchronized Lyrics */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center flex-1 my-4">
              {/* Left Column: Artwork and Meta */}
              <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">
                <div className="w-60 h-60 lg:w-72 lg:h-72 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/5 mb-5">
                  <img
                    src={currentTrack.coverUrl}
                    alt={currentTrack.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h1 className="text-3xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                  {currentTrack.title}
                </h1>
                <p className="text-xl text-[#a7a7a7] mt-1.5 font-medium">
                  {currentTrack.artist}
                </p>

                {/* TV Playback Control bar */}
                <div className="flex items-center gap-5 mt-6">
                  <button
                    onClick={prevTrack}
                    className="w-12 h-12 rounded-full bg-[#242424] hover:bg-[#2a2a2a] grid place-items-center text-white"
                  >
                    <SkipBack size={22} fill="currentColor" />
                  </button>
                  <button
                    onClick={togglePlayPause}
                    className="w-16 h-16 rounded-full bg-[#1ED760] hover:bg-[#1fdf64] grid place-items-center text-black shadow-xl hover:scale-105 transition-all"
                  >
                    {isPlaying ? (
                      <Pause size={28} fill="currentColor" />
                    ) : (
                      <Play size={28} fill="currentColor" className="ml-1" />
                    )}
                  </button>
                  <button
                    onClick={nextTrack}
                    className="w-12 h-12 rounded-full bg-[#242424] hover:bg-[#2a2a2a] grid place-items-center text-white"
                  >
                    <SkipForward size={22} fill="currentColor" />
                  </button>
                  <button
                    onClick={() => toggleLike(currentTrack.id)}
                    className={`w-12 h-12 rounded-full bg-[#242424] grid place-items-center ${
                      isLiked ? 'text-[#1ED760]' : 'text-[#a7a7a7]'
                    }`}
                  >
                    <Heart size={22} fill={isLiked ? '#1ED760' : 'none'} />
                  </button>
                </div>
              </div>

              {/* Right Column: Giant Live Lyrics */}
              <div className="lg:col-span-7 flex flex-col justify-center h-full max-h-[440px] overflow-hidden">
                <div className="text-xs uppercase font-extrabold tracking-widest text-[#1ED760] mb-3">
                  Live Synced Lyrics
                </div>
                <div className="p-8 rounded-3xl bg-[#181818]/70 backdrop-blur-xl border border-white/5 space-y-4">
                  <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-snug drop-shadow-lg">
                    "{activeLyric}"
                  </p>
                  <div className="flex items-center gap-3 text-xs text-[#a7a7a7]">
                    <span className="w-2 h-2 rounded-full bg-[#1ED760]" />
                    <span>LRCLIB verified keyless lyrics engine</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Scrubber */}
            <div className="space-y-2">
              <div className="w-full h-2 bg-[#242424] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#1ED760] transition-all"
                  style={{
                    width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`,
                  }}
                />
              </div>
              <div className="flex items-center justify-between text-xs text-[#a7a7a7] tabular-nums font-semibold">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Browse Catalog */}
        {activeTab === 'browse' && (
          <div className="relative z-10 flex-1 overflow-y-auto custom-scrollbar p-8">
            <HomeView />
          </div>
        )}

        {/* Tab 3: Connect Phone / Mobile Pairing */}
        {activeTab === 'pair' && (
          <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-10 text-center">
            <div className="w-20 h-20 rounded-full bg-[#1ED760]/20 text-[#1ED760] grid place-items-center mb-6">
              <QrCode size={40} />
            </div>

            <h2 className="text-4xl font-black text-white tracking-tight">
              Control Aningu with your phone
            </h2>
            <p className="text-[#a7a7a7] text-base max-w-md mt-2 mb-8">
              Open the Aningu mobile app on your iPhone or Android and select <span className="text-white font-bold">Living Room TV</span> under Devices.
            </p>

            <div className="p-6 rounded-2xl bg-[#181818] border border-[#242424] inline-block">
              <div className="text-xs font-bold uppercase tracking-widest text-[#a7a7a7] mb-2">
                TV Pairing PIN Code
              </div>
              <div className="text-5xl font-mono font-black text-[#1ED760] tracking-widest">
                749 - 012
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Queue and Download modals */}
      <QueueModal />
      <DownloadApkModal />
    </div>
  );
};
