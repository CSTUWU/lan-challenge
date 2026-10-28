'use client';

import { useState, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';

const GhostHelmetCanvas = dynamic(
  () => import('@/components/3d/GhostHelmetCanvas').then((mod) => mod.GhostHelmetCanvas),
  { ssr: false }
);
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { Header } from '@/components/ui/Header';
import { HeroSection } from '@/components/ui/HeroSection';

const MapGallerySection = dynamic(
  () => import('@/components/ui/MapGallerySection').then((mod) => mod.MapGallerySection)
);

const EventDetailsSection = dynamic(
  () => import('@/components/ui/EventDetailsSection').then((mod) => mod.EventDetailsSection)
);

const ProtocolsSection = dynamic(
  () => import('@/components/ui/ProtocolsSection').then((mod) => mod.ProtocolsSection)
);

const ContactSection = dynamic(
  () => import('@/components/ui/ContactSection').then((mod) => mod.ContactSection)
);

const RegistrationModal = dynamic(
  () => import('@/components/ui/RegistrationModal').then((mod) => mod.RegistrationModal),
  { ssr: false }
);

export default function HomePage() {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingStatus, setLoadingStatus] = useState('INITIALIZING TACTICAL ARENA');
  const [isSceneReady, setIsSceneReady] = useState(false);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);
  const [stancePercentage, setStancePercentage] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setMinTimeElapsed(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const isLoadingComplete = isSceneReady && minTimeElapsed;

  const handleLoadingProgress = useCallback((percent: number, statusText: string) => {
    setLoadingProgress(percent);
    setLoadingStatus(statusText);
    if (percent >= 100) {
      setIsSceneReady(true);
    }
  }, []);

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

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
        onScrollProgressUpdate={setScrollProgress}
      />

      <div className="screen-overlay fixed inset-0 z-10 pointer-events-none" />

      <Header
        onOpenModal={handleOpenModal}
      />

      <main className="relative w-full min-h-screen">
        <HeroSection stancePercentage={stancePercentage} isReady={isLoadingComplete} scrollProgress={scrollProgress} />
        <EventDetailsSection scrollProgress={scrollProgress} />
        <MapGallerySection />
        <ProtocolsSection onOpenModal={handleOpenModal} />
        <ContactSection />
      </main>

      <RegistrationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
