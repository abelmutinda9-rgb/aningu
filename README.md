# aningu. — Sound in Motion

<p align="center">
  <img src="./public/favicon.svg" width="96" height="96" alt="Aningu Acoustic A Icon" />
</p>

Aningu is a high-fidelity, keyless music streaming application crafted for **Phones (iOS & Android)**, **Desktop Workstations (macOS & Windows)**, and **10-Foot Living Room Smart TVs**.

Built with the authentic **Classic Dark** design system (`#121212` background, `#181818` surfaces, `#1ED760` accents, Figtree typography, compact information density, and restrained flat UI—free of AI gradients or decorative styling).

---

## ⚡ Core Features

- **Multi-Device Responsive Architecture**:
  - **Desktop 3-Column Workstation**: Sidebar library, fluid central discovery canvas, collapsible Now Playing inspector, and fixed high-precision playback deck.
  - **Mobile Native Feed**: Compact header greeting, 6-pack quick access grid, sticky mini-player with progress line, and bottom navigation.
  - **TV 10-Foot Big Screen**: 16:9 widescreen layout, full-screen live synchronized lyrics, large album art display, and Phone Remote Pairing (`PIN: 749-012`).
- **2026 Aningu Wrapped**:
  - Multi-slide interactive story deck with auto-advance and swipe/tap controls.
  - Minutes listened breakdown (48,220 minutes / Top 0.5% globally).
  - #1 Top Artist spotlight (Frank Ocean, 142 plays of *Nights*).
  - Top 5 Tracks countdown and Audio Personality card ("The Luminary").
- **Live Synchronized Lyrics**:
  - Fullscreen lyrics modal with auto-scrolling line centering.
  - Interactive line scrubbing: click/tap any lyric line to jump playback directly to that timestamp.
  - Keyless lyrics engine powered by **LRCLIB**.
- **ITU-R BS.1770 Broadcast Audio DSP Engine**:
  - Web Audio graph with `-14 LUFS` loudness normalization (Spotify broadcast standard).
  - Optional toggleable **Analog Warmth EQ profile** (220Hz low-shelf warmth boost with high-frequency contouring).
  - 320 kbps Opus transparent streaming architecture.
- **100% Keyless Music & Metadata**:
  - Zero API keys, secrets, or paid accounts required.
  - Public Audius streaming network integration, LRCLIB lyrics, and seeded high-fidelity catalogs.
  - Full local playlist management with browser `localStorage` persistence.

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (tested on Node v20 & v22)
- npm or pnpm

### Installation

```bash
git clone https://github.com/abelmutinda9-rgb/aningu.git
cd aningu
npm install
```

### Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

### Production Build

```bash
npm run build
npm run preview
```

---

## 🎧 Audio DSP Specifications

| Parameter | Value | Mode |
| :--- | :--- | :--- |
| Target Loudness | `-14.0 LUFS` | Integrated (ITU-R BS.1770-4) |
| True Peak Ceiling | `-1.5 dBTP` | Inter-sample peak protection |
| Warmth Shelf | `+2.2 dB @ 220 Hz` | Toggleable via DSP Menu |
| De-harshing Contour | `-0.8 dB @ 8 kHz` | Toggleable via DSP Menu |
| Default Codec | `Opus (320 kbps)` | High-Fidelity Transparent |

---

## 📄 License

MIT © Aningu
