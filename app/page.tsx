"use client"

import React, { useState } from 'react';
import Header from '../components/header';
import MainHeading from '../components/main-heading';
import HeroVideoPlayer from '../components/HeroVideo';
import RegistrationForm from '../components/RegistrationForm';
import CountdownTimer from '../components/sanoq';
import InstructorSection from '../components/instructor';
import BeforeAfterSection from '../components/before-after';
import TestimonialsSection from '../components/rasmlar';
import VideoCarouselSection from '../components/videos';

const ImanAhmedovaLanding: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = (data: { name: string; phone: string }) => {
    console.log('Form submitted:', data);
    setFormSubmitted(true);
    // Bu yerda API chaqiruvi yoki boshqa logikani qo'shishingiz mumkin
  };

  const handlePlayToggle = (isPlaying: boolean) => {
    console.log('Video is playing:', isPlaying);
  };

  const handleFullscreenToggle = (isFullscreen: boolean) => {
    console.log('Fullscreen:', isFullscreen);
  };

  return (
    <div className="min-h-screen text-white font-sans relative" style={{background: 'linear-gradient(180deg, #0a0a1f 0%, #0f0f28 20%, #14142e 40%, #0f0f28 60%, #0a0a1f 80%, #050510 100%)'}}>
      {/* Hero Section */}
      <section className="relative px-4 py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          <Header />
          <MainHeading />
          <HeroVideoPlayer 
            onPlayToggle={handlePlayToggle}
            onFullscreenToggle={handleFullscreenToggle}
          />
          <RegistrationForm onSubmit={handleFormSubmit} />
          
          {/* Hero Countdown Timer */}
          <div className="text-center">
            <p className="text-sm md:text-base mb-2">24 soatdan so'ng qabul yopiladi:</p>
            <CountdownTimer 
              initialHours={13}
              initialMinutes={18}
              initialSeconds={3}
              size="medium"
            />
          </div>
        </div>
      </section>

     
      <InstructorSection />
       <BeforeAfterSection  />
      <VideoCarouselSection  />
      <TestimonialsSection  />

      <RegistrationForm  />

      {/* Fixed Countdown Timer at Bottom */}
      <CountdownTimer 
        initialHours={24}
        initialMinutes={0}
        initialSeconds={0}
        size="small"
        fixed={true}
      />

      {/* Spacer for fixed countdown */}
      <div className="h-12"></div>
    </div>
  );
};

export default ImanAhmedovaLanding;