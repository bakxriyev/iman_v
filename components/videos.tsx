"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Modal from "./ReegisterModal";

const videos = [
  { id: "wdhik5jhvs", title: "Uy so`raganlar ..." },
  { id: "b5a9koiqqk", title: "Meditsina davosini topa olmagan ..." },
  { id: "yr1jqusz9e", title: "1 yarim oy ichida 90 mln qarzdorlikdan qutuldim ..." },
  { id: "4j4dtj0iyk", title: "Uy oldim ..." },
  { id: "pji11v0ovi", title: "O`zimni o`ldirishga ham tayyor edim ..." },
];

const VideoCarouselSection: React.FC = () => {
  const [currentVideo, setCurrentVideo] = useState(0);
  
    const [isModalOpen, setIsModalOpen] = useState(false);

  const nextVideo = () => {
    setCurrentVideo((prev) => (prev + 1) % videos.length);
  };

  const prevVideo = () => {
    setCurrentVideo((prev) =>
      prev === 0 ? videos.length - 1 : prev - 1
    );
  };

  return (
    <section className="px-4 py-16">
      <div className="max-w-6xl mx-auto">
        {/* TITLE + NAV */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <h2 className="text-2xl md:text-4xl font-black bg-gradient-to-r from-pink-300 via-purple-300 to-pink-300 text-transparent bg-clip-text text-center md:text-left">
            O‘QUVCHILARIM VIDEO HISOBOTLARI
          </h2>

          <div className="flex gap-2">
            <button
              onClick={prevVideo}
              className="w-11 h-11 rounded-full bg-purple-600 hover:bg-purple-700 flex items-center justify-center transition"
            >
              <ChevronLeft className="text-white" />
            </button>
            <button
              onClick={nextVideo}
              className="w-11 h-11 rounded-full bg-purple-600 hover:bg-purple-700 flex items-center justify-center transition"
            >
              <ChevronRight className="text-white" />
            </button>
          </div>
        </div>

        {/* PLAYER */}
        <div className="relative mx-auto max-w-md">
          <div className="relative aspect-[9/16] overflow-hidden rounded-3xl bg-black shadow-2xl">
            <wistia-player
              key={videos[currentVideo].id}
              media-id={videos[currentVideo].id}
              aspect="0.5625"
              playsinline="true"
              preload="auto"
              controlsvisibleonload="true"
              fullscreenbutton="true"
              playbutton="true"
              volumecontrol="true"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
              }}
            />
          </div>

          {/* TITLE OVERLAY */}
          <div className="absolute top-4 left-4 right-4 z-20">
            <div className="bg-black/60 backdrop-blur-md rounded-xl px-4 py-3">
              <p className="text-white text-center font-semibold text-sm">
                {videos[currentVideo].title}
              </p>
            </div>
          </div>

          {/* COUNTER */}
          <div className="absolute top-4 right-4 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full z-20">
            {currentVideo + 1} / {videos.length}
          </div>

          {/* DOTS */}
          <div className="flex justify-center gap-2 mt-6">
            {videos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentVideo(index)}
                className={`w-3 h-3 rounded-full transition ${
                  index === currentVideo
                    ? "bg-purple-500 scale-125"
                    : "bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-2">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-b from-[#8b5cf6] via-[#7c3aed] to-[#6d28d9] hover:from-[#7c3aed] hover:via-[#6d28d9] hover:to-[#5b21b6] text-white font-black py-6 px-20 rounded-full text-xl md:text-2xl shadow-[0_10px_0_0_#4c1d95,0_15px_30px_rgba(139,92,246,0.5)] hover:shadow-[0_8px_0_0_#4c1d95,0_12px_30px_rgba(139,92,246,0.6)] active:shadow-[0_3px_0_0_#4c1d95] active:translate-y-2 transform transition-all duration-150 hover:scale-[1.02] active:scale-[0.98]"
            >
              Kursga qatnashish
            </button>
          </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

export default VideoCarouselSection;
