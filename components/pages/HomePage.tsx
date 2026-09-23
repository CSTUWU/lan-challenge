'use client';

import { useState, useCallback } from 'react';
import { GhostHelmetCanvas } from '@/components/3d/GhostHelmetCanvas';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { Header } from '@/components/ui/Header';
import { HeroSection } from '@/components/ui/HeroSection';
import { MapGallerySection } from '@/components/ui/MapGallerySection';
import { ProtocolsSection } from '@/components/ui/ProtocolsSection';
import { RegistrationModal } from '@/components/ui/RegistrationModal';
import { useTacticalAudio } from '@/hooks/useTacticalAudio';

export default function HomePage() {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingStatus, setLoadingStatus] = useState('STREAMING DATA...');
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);
  const [stancePercentage, setStancePercentage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isAudioEnabled, toggleAudio, playGunCockSound } = useTacticalAudio();

  const handleLoadingProgress = useCallback((percent: number, statusText: string) => {
    setLoadingProgress(percent);
    setLoadingStatus(statusText);
    if (percent >= 100) {
      setTimeout(() => setIsLoadingComplete(true), 600);
    }
  }, []);

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
    playGunCockSound();
  }, [playGunCockSound]);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050709] text-white">
      <LoadingScreen
        progress={loadingProgress}
        statusText={loadingStatus}
        isComplete={isLoadingComplete}
      />

      <GhostHelmetCanvas
        onProgress={handleLoadingProgress}
        onStanceUpdate={setStancePercentage}
        onPlayAimSound={playGunCockSound}
      />

      <div className="screen-overlay fixed inset-0 z-10 pointer-events-none" />

      <Header
        isAudioEnabled={isAudioEnabled}
        onToggleAudio={toggleAudio}
        onOpenModal={handleOpenModal}
      />

      <main className="relative z-20 w-full min-h-screen">
        <HeroSection stancePercentage={stancePercentage} />
        <MapGallerySection />
        <ProtocolsSection onOpenModal={handleOpenModal} />
      </main>

      <RegistrationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSuccess={playGunCockSound}
      />
    </div>
  );
}
