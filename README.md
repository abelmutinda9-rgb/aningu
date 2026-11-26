# ANINGU 🎵
> Premium Spotify-Grade Music Experience for Web, Android Phones & Smart TVs.

![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-6-purple?style=flat-square&logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind-v4-38B2AC?style=flat-square&logo=tailwind-css)
![Capacitor](https://img.shields.io/badge/Capacitor-Android-119EFF?style=flat-square&logo=capacitor)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## ⚡ What's in Aningu

1. **Spotify-Grade Playback & DSP Engine**
   - **Up Next Play Queue**: View upcoming tracks, reorder or remove songs, clear queue, and tap **Play Next** on any track in playlists, albums, and search.
   - **Smooth Crossfade**: Configurable 0 to 12-second volume-fading crossfade engine between tracks.
   - **-14 LUFS Normalization**: ITU-R BS.1770 broadcast standard loudness matching.
   - **Analog Warmth DSP**: 220Hz low-shelf acoustic contouring filter.
   - **LRCLIB Synchronized Lyrics**: Real-time karaoke-style lyrics synced to millisecond timestamps.
   - **Web Media Session API**: Native lock screen & notification controls (Play/Pause/Skip/Scrub) on Android, Windows, Mac, and iOS browsers.

2. **Living Ambient Glow**
   - Dynamic track-tinted ambient background lighting that shifts colors smoothly with every song's artwork palette.

3. **Multi-Device & Smart TV Mode**
   - **Desktop Workstation**: 3-column layout with sidebar navigation, search, and now-playing inspector.
   - **Mobile Layout**: Spotify mobile layout with sticky mini-player and bottom navigation tabs.
   - **TV 10-Foot Mode & Fullscreen**: 
     - Remote control D-pad spatial navigation.
     - Support for Samsung Tizen remote Back button (`10009`), LG webOS Back button (`461`), and standard hardware Media keys.
     - **TV Fullscreen Mode**: Click the Fullscreen button on any TV browser (Samsung Internet, LG Web Browser, VIDAA) to hide browser toolbars and run true edge-to-edge.

4. **Universal Android APK (Phone & TV)**
   - Pre-configured with Capacitor and Android TV Leanback launcher (`android.software.leanback` optional).
   - A single universal APK runs seamlessly on Android phones, tablets, Android TV, Google TV, and Amazon Fire TV.
   - Automated GitHub Actions CI/CD (`.github/workflows/build-apk.yml`) automatically builds the `.apk` on every push.

---

## 🚀 Deploying to Vercel (`aningu.vercel.app`)

Aningu is pre-configured with `vercel.json` for zero-configuration Vite SPA deployment on Vercel:

1. Push your repository to GitHub.
2. Go to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import the `aningu` repository.
4. Framework Preset will auto-detect as **Vite**.
5. Click **Deploy**. Your app will be live at `https://aningu.vercel.app`!

---

## 📦 Building the Android APK

### Option A: Automatic via GitHub Actions
Every push to `main` triggers `.github/workflows/build-apk.yml`. 
1. Open the **Actions** tab in your GitHub repository.
2. Click on the latest **Build Android & TV APK** workflow run.
3. Download the `aningu-universal-apk` artifact.

### Option B: Local Build with Capacitor & Android Studio
```bash
# 1. Install dependencies
npm install

# 2. Build the web dist
npm run build

# 3. Add Android platform (if not already added)
npx cap add android

# 4. Sync web assets into Android project
npm run android:sync

# 5. Open in Android Studio to run on device or build signed APK
npm run android:open
```

---

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start Vite dev server
npm run dev

# Build for production
npm run build
```
