# 🎮 Call of Duty 4: Campus LAN Challenge 3D

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-r128-black?style=for-the-badge&logo=three.js)](https://threejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

An immersive, dynamic 3D web application designed for collegiate esports tournaments. Built with **Next.js App Router**, **Three.js**, **TypeScript**, and **Tailwind CSS**, featuring dynamic 3D GLTF scroll choreography, Web Audio API tactical sound synthesis, and real-time tournament telemetry.

---

## 🔥 Features

- 🎯 **Interactive 3D Classic Ghost Model**: Smooth GLTF 3D mesh rendering with custom tactical lighting, cyan backlight outlines, and neon green contour rim lights.
- 🌀 **Scroll Choreography**: 
  - Zero-tilt upright lock facing forward.
  - 360° Y-axis spin on scroll down.
  - Inward depth curve gliding into the page background.
- ⚡ **Procedural Web Audio API SFX**: Tactical sound generator featuring realistic gun-cocking sound effects and ambient drone oscillator.
- ⏳ **Live Countdown Timer**: Real-time tournament timer calculating days, hours, minutes, and seconds.
- 🏆 **Tournament Protocols**: Interactive cards detailing Prize Bounty (LKR 150,000), MR12 Search & Destroy ruleset, and official map rotation (`mp_crash`, `mp_crossfire`, `mp_backlot`).
- 📝 **Squad Enlistment Modal**: Accessible squad registration modal dialog.
- 💚 **COD Neon Green Theme**: Styled with Call of Duty Tactical Neon Green (`#00ff66`) HUD borders, scanline overlays, and glow effects.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **3D Graphics Engine**: [Three.js](https://threejs.org/) & `GLTFLoader`
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
   git clone https://github.com/YOUR_USERNAME/cod4-campus-lan-challenge.git
   cd cod4-campus-lan-challenge
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Development Server**:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 📤 How to Push to GitHub

Execute the following commands in your terminal to initialize git and push your repository to GitHub:

```bash
# 1. Initialize Git repository
git init

# 2. Stage all clean project files
git add .

# 3. Create initial commit
git commit -m "feat: initial release of COD4 Campus LAN Challenge 3D Next.js app"

# 4. Rename main branch
git branch -M main

# 5. Link your GitHub remote repository (replace with your repository URL)
git remote add origin https://github.com/YOUR_USERNAME/cod4-campus-lan-challenge.git

# 6. Push to GitHub
git push -u origin main
```

---

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx                # Root layout with Google Fonts & metadata
│   ├── page.tsx                  # Main home page assembling all components
│   └── globals.css               # Global tactical grid, HUD borders & neon green glow
├── components/
│   ├── 3d/
│   │   └── GhostHelmetCanvas.tsx # 3D WebGL Canvas & scroll choreography
│   └── ui/
│       ├── Header.tsx            # Top tactical navigation header & audio controls
│       ├── HeroSection.tsx       # Main Hero section with telemetry HUD
│       ├── CountdownTimer.tsx    # Live countdown timer component
│       ├── ProtocolsSection.tsx  # Operation Briefing container
│       ├── PrizePoolCard.tsx     # Prize Bounty card component
│       ├── GameplayFormatCard.tsx# S&D format rules card component
│       ├── MapRotationCard.tsx   # Official map rotation pool component
│       ├── RegistrationBanner.tsx# Squad enlistment CTA banner
│       ├── RegistrationModal.tsx # Squad registration dialog form
│       └── LoadingScreen.tsx     # 3D streaming progress loader
├── hooks/
│   ├── useTacticalAudio.ts       # Procedural Web Audio API sound generator hook
│   └── useCountdown.ts           # Countdown calculation hook
├── public/
│   └── models/
│       └── classic_ghost.glb     # 3D Classic Ghost GLTF model
├── package.json
└── tsconfig.json
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
