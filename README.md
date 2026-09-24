# 🎮 Call of Duty 4: LAN Challenge 3D

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-r128-black?style=for-the-badge&logo=three.js)](https://threejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

An immersive, dynamic 3D web application designed for collegiate esports tournaments. Built with **Next.js 16 (App Router & Turbopack)**, **Three.js**, **TypeScript**, and **Tailwind CSS**, featuring dynamic 3D GLTF scroll choreography, real-time tournament telemetry, Admin Live Match Arena controller, and Kiosk Standee broadcast mode.

Organized for **Uva Wellassa University**.

---

## 🔥 Features

- 🎯 **Responsive 3D Ghost Model**: Three.js WebGL rendering with custom tactical lighting, cyan backlight outlines, and neon green contour rim lights. Automatically adapts scale, zoom, and viewport positions for Mobile (portrait top-right corner glide), Tablet, and Desktop screens.
- ⚡ **IntersectionObserver GPU Optimization**: WebGL animation loop automatically pauses when scrolled off-screen or when the browser tab is hidden, saving GPU/CPU resources on mobile and low-end devices.
- 🏆 **Interactive Leaderboard & Podium**: Live team rankings, match points, round differentials, top 3 podium highlights, and Group A/Group B filters.
- 🖥️ **Kiosk Arena Fullscreen Mode**: Dedicated 1-click fullscreen mode designed for physical touch kiosks and tournament arena standees.
- 🎮 **Live Match Arena Overlay Controller**: Admin control panel featuring:
  - **Group A & Group B Team Dropdowns**: Select registered teams from Group A or Group B.
  - **Auto Roster Sync**: Automatically populates player 5-member rosters from registration data.
  - **Map Selection**: Choose official tournament maps (`mp_crash`, `mp_crossfire`, `mp_backlot`, `mp_strike`, `mp_citystreets`).
  - **Declare Winner & Auto Leaderboard Sync**: Automatically computes win/loss stats, round differentials, and updates leaderboard points and rankings in real-time.
- 🔊 **Procedural Web Audio API SFX**: Tactical sound generator featuring realistic gun-cocking sound effects and ambient drone oscillator.
- ⏳ **Live Countdown Timer**: Responsive tournament countdown timer calculating days, hours, minutes, and seconds.
- 📝 **Squad Enlistment System**: Custom-styled neon faculty/group dropdown selectors, 5-member roster registration, and reusable status alert modals.
- 💚 **COD Tactical Neon Theme**: Styled with Call of Duty Tactical Neon Green (`#00ff66`) HUD borders, scanline overlays, and glow effects.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router & Turbopack)
- **3D Engine**: [Three.js](https://threejs.org/) & `GLTFLoader`
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & Custom HUD utilities
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js 18+** and **npm** installed on your system.

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/pramodchandima/Lan-Challenge.git
   cd Lan-Challenge
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run Development Server**:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx                # Root layout with fonts & metadata
│   ├── page.tsx                  # Main home page entry point
│   ├── admin/                    # Admin portal route (/admin)
│   ├── leaderboard/              # Leaderboard route (/leaderboard)
│   ├── rules/                    # Rules directive route (/rules)
│   ├── login/                    # Referee login route (/login)
│   └── globals.css               # Tactical grid, HUD borders & neon green glow
├── components/
│   ├── 3d/
│   │   └── GhostHelmetCanvas.tsx # 3D WebGL Canvas with responsive scroll math
│   ├── pages/                    # Container page components
│   │   ├── AdminPage.tsx
│   │   ├── HomePage.tsx
│   │   ├── LeaderboardPage.tsx
│   │   ├── LoginPage.tsx
│   │   └── RulesPage.tsx
│   └── ui/
│       ├── admin/                # Modular Admin UI components
│       │   ├── MatchConfigPanel.tsx
│       │   ├── TeamRosterCard.tsx
│       │   └── WinnerDeclarationPanel.tsx
│       ├── modals/               # Reusable Modal components
│       │   └── StatusAlertModal.tsx
│       ├── AdminAuthGate.tsx
│       ├── AdminLeaderboardManager.tsx
│       ├── AdminLiveController.tsx
│       ├── AdminSquadRegistrations.tsx
│       ├── ContactSection.tsx
│       ├── CountdownTimer.tsx
│       ├── CustomSelect.tsx
│       ├── Header.tsx
│       ├── HeroSection.tsx
│       ├── LeaderboardPodium.tsx
│       ├── LeaderboardTable.tsx
│       ├── LiveMatchModal.tsx
│       ├── LoadingScreen.tsx
│       ├── MapGallerySection.tsx
│       ├── ProtocolsSection.tsx
│       └── RegistrationModal.tsx
├── hooks/
│   ├── useTacticalAudio.ts       # Procedural Web Audio API sound generator hook
│   └── useCountdown.ts           # Countdown calculation hook
├── service/
│   └── tournamentService.ts      # In-memory tournament data service
├── types/
│   └── tournament.ts             # TypeScript definitions
├── public/
│   └── models/
│       └── classic_ghost.glb     # 3D Classic Ghost GLTF model
├── package.json
└── tsconfig.json
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
