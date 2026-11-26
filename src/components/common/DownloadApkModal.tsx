import React, { useState } from 'react';
import {
  X,
  Download,
  Smartphone,
  Tv,
  Laptop,
  CheckCircle2,
  HardDrive,
  ExternalLink,
  ShieldCheck,
  Globe,
  Radio,
} from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';

export const DownloadApkModal: React.FC = () => {
  const { isDownloadModalOpen, setIsDownloadModalOpen } = usePlayer();
  const [activeTab, setActiveTab] = useState<'phone' | 'tv' | 'laptop'>('phone');

  if (!isDownloadModalOpen) return null;

  // Direct APK download link from GitHub Releases
  const apkDownloadUrl =
    'https://github.com/abelmutinda9-rgb/aningu/releases/latest/download/aningu-universal.apk';

  const handleInstallPwa = async () => {
    // If browser deferred install prompt is available
    const promptEvent = (window as any).deferredPrompt;
    if (promptEvent) {
      promptEvent.prompt();
    } else {
      alert(
        'To install Aningu on your laptop:\n1. Look at the top right of your browser address bar (Chrome, Edge, or Brave).\n2. Click the "Install App" or "+" icon.\n3. Aningu will open in its own dedicated, native desktop window!'
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 select-none font-['Figtree'] animate-in fade-in duration-200">
      <div className="bg-[#181818] border border-white/10 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-[#282828] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1ED760]/20 text-[#1ED760] grid place-items-center">
              <Download size={22} />
            </div>
            <div>
              <h2 className="text-lg font-black text-white tracking-tight">
                Get Aningu Everywhere
              </h2>
              <p className="text-xs text-[#a7a7a7]">
                Choose your device: Android Phones, Smart TVs, or Laptops
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsDownloadModalOpen(false)}
            className="p-2 rounded-full hover:bg-[#282828] text-[#a7a7a7] hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Device Switcher Tabs */}
        <div className="flex border-b border-[#282828] bg-[#141414]">
          <button
            onClick={() => setActiveTab('phone')}
            className={`flex-1 py-3 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 border-b-2 transition-all ${
              activeTab === 'phone'
                ? 'border-[#1ED760] text-[#1ED760] bg-[#1a1a1a]'
                : 'border-transparent text-[#a7a7a7] hover:text-white'
            }`}
          >
            <Smartphone size={16} />
            <span>Android Phone / Tablet</span>
          </button>

          <button
            onClick={() => setActiveTab('tv')}
            className={`flex-1 py-3 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 border-b-2 transition-all ${
              activeTab === 'tv'
                ? 'border-[#1ED760] text-[#1ED760] bg-[#1a1a1a]'
                : 'border-transparent text-[#a7a7a7] hover:text-white'
            }`}
          >
            <Tv size={16} />
            <span>Android TV & Fire TV</span>
          </button>

          <button
            onClick={() => setActiveTab('laptop')}
            className={`flex-1 py-3 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 border-b-2 transition-all ${
              activeTab === 'laptop'
                ? 'border-[#1ED760] text-[#1ED760] bg-[#1a1a1a]'
                : 'border-transparent text-[#a7a7a7] hover:text-white'
            }`}
          >
            <Laptop size={16} />
            <span>Laptops (Win / Mac / Linux)</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* TAB 1: Android Phone & Tablet */}
          {activeTab === 'phone' && (
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-[#202020] border border-white/5">
                <div className="space-y-1 text-center sm:text-left">
                  <div className="font-bold text-white text-base">
                    Aningu Universal APK (Phone)
                  </div>
                  <div className="text-xs text-[#a7a7a7]">
                    Includes background playback, lock screen controls, offline music, and synchronized lyrics.
                  </div>
                </div>

                <a
                  href={apkDownloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full bg-[#1ED760] hover:bg-[#1fdf64] text-black font-extrabold text-sm flex items-center gap-2 shadow-lg hover:scale-105 active:scale-95 transition-all shrink-0"
                >
                  <Download size={18} />
                  <span>Download .APK (Direct)</span>
                </a>
              </div>

              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#a7a7a7]">
                  Quick Installation (3 Steps)
                </h3>
                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-[#242424]">
                    <div className="w-5 h-5 rounded-full bg-[#1ED760]/20 text-[#1ED760] font-bold grid place-items-center shrink-0">
                      1
                    </div>
                    <div>
                      <p className="font-semibold text-white">Tap "Download .APK"</p>
                      <p className="text-[#a7a7a7]">Save the package file to your phone.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-[#242424]">
                    <div className="w-5 h-5 rounded-full bg-[#1ED760]/20 text-[#1ED760] font-bold grid place-items-center shrink-0">
                      2
                    </div>
                    <div>
                      <p className="font-semibold text-white">Allow "Install Unknown Apps"</p>
                      <p className="text-[#a7a7a7]">
                        If prompted by Chrome or Files, tap Settings and allow installation.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-[#242424]">
                    <div className="w-5 h-5 rounded-full bg-[#1ED760]/20 text-[#1ED760] font-bold grid place-items-center shrink-0">
                      3
                    </div>
                    <div>
                      <p className="font-semibold text-white">Open Aningu & Enjoy</p>
                      <p className="text-[#a7a7a7]">
                        Full Spotify-grade audio engine with offline downloads and LRCLIB lyrics!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Smart TVs */}
          {activeTab === 'tv' && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-[#202020] border border-white/5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-white text-base flex items-center gap-2">
                    <Tv size={18} className="text-[#1ED760]" />
                    Android TV, Google TV & Fire TV
                  </div>
                  <span className="text-[10px] font-bold text-[#1ED760] bg-[#1ED760]/10 px-2 py-0.5 rounded">
                    Leanback D-pad Ready
                  </span>
                </div>
                <p className="text-xs text-[#a7a7a7] leading-relaxed">
                  The Aningu APK includes native Leanback launcher support so it appears on your TV home screen grid and supports standard remote controls.
                </p>

                <div className="flex flex-wrap gap-3 pt-1">
                  <a
                    href={apkDownloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-full bg-[#1ED760] hover:bg-[#1fdf64] text-black font-extrabold text-xs flex items-center gap-2"
                  >
                    <Download size={15} />
                    <span>Download TV APK</span>
                  </a>
                </div>
              </div>

              {/* USB Flash Drive & Downloader methods */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-4 rounded-xl bg-[#242424] space-y-2">
                  <div className="font-bold text-white flex items-center gap-2">
                    <HardDrive size={16} className="text-[#1ED760]" />
                    Method A: USB Flash Drive
                  </div>
                  <p className="text-[#a7a7a7] text-[11px] leading-relaxed">
                    1. Download the APK on your laptop.<br />
                    2. Copy <code className="text-[#1ED760]">aningu-universal.apk</code> to a USB stick.<br />
                    3. Plug into your Android TV or TV box.<br />
                    4. Open TV File Commander and click Install!
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#242424] space-y-2">
                  <div className="font-bold text-white flex items-center gap-2">
                    <Globe size={16} className="text-[#1ED760]" />
                    Method B: Samsung & LG TV Browser
                  </div>
                  <p className="text-[#a7a7a7] text-[11px] leading-relaxed">
                    1. Open the TV web browser.<br />
                    2. Go to <code className="text-[#1ED760]">aningu.vercel.app</code>.<br />
                    3. Click the <strong>Fullscreen button</strong> on the top right to hide browser bars and enjoy full 10-foot remote experience!
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Laptops & Desktops */}
          {activeTab === 'laptop' && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-[#202020] border border-white/5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-white text-base flex items-center gap-2">
                    <Laptop size={18} className="text-[#1ED760]" />
                    Windows, Mac, Linux & Chromebooks
                  </div>
                  <span className="text-[10px] font-bold text-[#1ED760] bg-[#1ED760]/10 px-2 py-0.5 rounded">
                    Universal Laptop App
                  </span>
                </div>
                <p className="text-xs text-[#a7a7a7] leading-relaxed">
                  Aningu works on every laptop! You can use it directly in any modern browser, or install it as a standalone desktop app with its own dock icon, keyboard shortcuts, and offline mode.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <button
                    onClick={handleInstallPwa}
                    className="px-5 py-2.5 rounded-full bg-[#1ED760] hover:bg-[#1fdf64] text-black font-extrabold text-xs flex items-center gap-2 shadow-md hover:scale-105 active:scale-95 transition-all"
                  >
                    <Download size={15} />
                    <span>Install Aningu on Laptop</span>
                  </button>
                  <span className="text-[11px] text-[#a7a7a7]">
                    Runs in dedicated window with 0 install lag
                  </span>
                </div>
              </div>

              {/* Instructions for browser desktop app */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#a7a7a7]">
                  How to Install on Chrome, Edge & Brave
                </h4>
                <div className="p-3.5 rounded-lg bg-[#242424] text-xs text-[#a7a7a7] space-y-1.5 leading-relaxed">
                  <p>
                    <strong className="text-white">1.</strong> In your laptop's address bar (at the far right), look for the <strong className="text-[#1ED760]">Install</strong> icon or a small <strong className="text-white">(+)</strong> button.
                  </p>
                  <p>
                    <strong className="text-white">2.</strong> Click <strong className="text-white">"Install Aningu"</strong>.
                  </p>
                  <p>
                    <strong className="text-white">3.</strong> Aningu will appear on your Desktop, Windows Start Menu, or Mac Applications folder!
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#141414] border-t border-[#282828] flex items-center justify-between text-xs text-[#a7a7a7]">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-[#1ED760]" />
            <span>Open Source • Keyless • Virus-Free</span>
          </div>
          <button
            onClick={() => setIsDownloadModalOpen(false)}
            className="px-4 py-1.5 rounded-full bg-[#242424] hover:bg-[#2e2e2e] text-white font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
