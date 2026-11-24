import React from 'react';
import { Preloader } from '@/components/ui/Preloader';
import { HeroSection } from '@/components/sections/HeroSection';
import { MaterialMarquee } from '@/components/sections/MaterialMarquee';
import { LandingSections } from '@/components/sections/LandingSections';

export default function HomePage() {
  return (
    <>
      <Preloader />
      <HeroSection />
      <MaterialMarquee />
      <LandingSections />
    </>
  );
}
