import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX } from 'lucide-react';

const VideoCarouselSection: React.FC = () => {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [videoStates, setVideoStates] = useState([
    { isPlaying: false, currentTime: 0, duration: 0, isLoading: false, volume: 1, isMuted: false },
    { isPlaying: false, currentTime: 0, duration: 0, isLoading: false, volume: 1, isMuted: false },
    { isPlaying: false, currentTime: 0, duration: 0, isLoading: false, volume: 1, isMuted: false },
    { isPlaying: false, currentTime: 0, duration: 0, isLoading: false, volume: 1, isMuted: false },
    { isPlaying: false, currentTime: 0, duration: 0, isLoading: false, volume: 1, isMuted: false }
  ]);
  const [showVideoControls, setShowVideoControls] = useState(false);
  
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([null, null, null, null, null]);

  const videos = [
    { id: 1, title: "Uy so`raganlar ...", src: "./v1.mp4", poster: "/logo.png" },
    { id: 2, title: "Meditsina davosini topa olmagan ...", src: "./v2.mp4", poster: "/logo.png" },
    { id: 3, title: "1 yarim oy ichida 90  mln qarzdorlikdan qutuldim ...", src: "./v3.mp4", poster: "/logo.png" },
    { id: 4, title: "Uy oldim ...", src: "./v4.mp4", poster: "/logo.png" },
    { id: 5, title: "O`zimni o`ldirishga ham tayyor edim ...", src: "./v5.mp4", poster: "/logo.png" }
  ];

  // Video o'zgarganda barcha videolarni to'xtatish
  useEffect(() => {
    console.log(`Current video changed to: ${currentVideo}`);
    
    // Barcha videolarni to'xtatish
    videoRefs.current.forEach((video, idx) => {
      if (video && idx !== currentVideo) {
        video.pause();
        video.currentTime = 0;
      }
    });
    
    // Hozirgi videoni preload qilish
    const currentVideoEl = videoRefs.current[currentVideo];
    if (currentVideoEl) {
      currentVideoEl.load(); // Videoni qayta yuklash
    }
  }, [currentVideo]);

  // Birinchi videoni yuklash
  useEffect(() => {
    const firstVideo = videoRefs.current[0];
    if (firstVideo) {
      console.log('Birinchi videoni yuklamoqda...');
      firstVideo.load();
      
      // Video yuklanganidan keyin loading'ni o'chirish
      const handleCanPlay = () => {
        console.log('Birinchi video tayyor');
        setVideoStates(prev => prev.map((state, i) => 
          i === 0 ? { ...state, isLoading: false } : state
        ));
      };
      
      firstVideo.addEventListener('canplay', handleCanPlay, { once: true });
      firstVideo.addEventListener('loadedmetadata', handleCanPlay, { once: true });
      
      return () => {
        firstVideo.removeEventListener('canplay', handleCanPlay);
        firstVideo.removeEventListener('loadedmetadata', handleCanPlay);
      };
    }
  }, []);

  const nextVideo = () => {
    const next = (currentVideo + 1) % videos.length;
    console.log(`Keyingi videoga o'tish: ${currentVideo} -> ${next}`);
    setCurrentVideo(next);
  };

  const prevVideo = () => {
    const prev = currentVideo === 0 ? videos.length - 1 : currentVideo - 1;
    console.log(`Oldingi videoga o'tish: ${currentVideo} -> ${prev}`);
    setCurrentVideo(prev);
  };

  const changeToVideo = (index: number) => {
    console.log(`${index}-videoga o'tish`);
    setCurrentVideo(index);
  };

  const toggleVideoPlay = () => {
    const video = videoRefs.current[currentVideo];
    if (!video) return;

    if (video.paused) {
      // Ovoz bilan o'ynatish
      video.muted = false;
      video.volume = 1;
      
      video.play().then(() => {
        console.log(`Video ${currentVideo} ovoz bilan o'ynayapti`);
        setVideoStates(prev => prev.map((state, i) => 
          i === currentVideo ? { ...state, isPlaying: true, isMuted: false } : state
        ));
      }).catch(console.error);
    } else {
      video.pause();
      setVideoStates(prev => prev.map((state, i) => 
        i === currentVideo ? { ...state, isPlaying: false } : state
      ));
    }
  };

  const toggleVideoMute = () => {
    const video = videoRefs.current[currentVideo];
    if (!video) return;

    const newMutedState = !videoStates[currentVideo].isMuted;
    video.muted = newMutedState;
    video.volume = newMutedState ? 0 : 1;
    
    console.log(`Ovoz ${newMutedState ? 'o\'chirildi' : 'yoqildi'}`);
    
    setVideoStates(prev => prev.map((state, i) => 
      i === currentVideo ? { ...state, isMuted: newMutedState, volume: newMutedState ? 0 : 1 } : state
    ));
  };

  const handleVideoProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRefs.current[currentVideo];
    const state = videoStates[currentVideo];
    
    if (video && state.duration) {
      const progressBar = e.currentTarget;
      const rect = progressBar.getBoundingClientRect();
      const clickPosition = e.clientX - rect.left;
      const progressBarWidth = progressBar.clientWidth;
      const clickPercentage = Math.min(Math.max(clickPosition / progressBarWidth, 0), 1);
      const newTime = clickPercentage * state.duration;
      
      video.currentTime = newTime;
    }
  };

  const formatVideoTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section className="px-4 py-12 md:py-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black bg-gradient-to-r from-pink-300 via-purple-300 to-pink-300 text-transparent bg-clip-text mb-4 md:mb-0 text-center md:text-left">
            O'QUVCHILARIM VIDEO HISOBOTLARI
          </h2>
          
          <div className="flex items-center justify-center gap-4">
            <div className="flex gap-2">
              <button 
                onClick={prevVideo}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-b from-[#8b5cf6] to-[#6d28d9] hover:from-[#7c3aed] hover:to-[#5b21b6] shadow-[0_5px_0_0_#4c1d95] active:shadow-[0_2px_0_0_#4c1d95] active:translate-y-1 flex items-center justify-center transition-all duration-150 hover:scale-110 active:scale-95"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
              </button>
              <button 
                onClick={nextVideo}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-b from-[#8b5cf6] to-[#6d28d9] hover:from-[#7c3aed] hover:to-[#5b21b6] shadow-[0_5px_0_0_#4c1d95] active:shadow-[0_2px_0_0_#4c1d95] active:translate-y-1 flex items-center justify-center transition-all duration-150 hover:scale-110 active:scale-95"
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#2a1a3a] via-[#3a2550] to-[#2a1a3a] border-2 border-purple-500/20 shadow-[0_0_30px_rgba(139,92,246,0.15)] mb-12">
          <div className="relative p-4 md:p-6">
            <div className="relative mx-auto max-w-md">
              <div 
                className="relative aspect-[9/16] overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-br from-purple-900/20 to-purple-700/10"
                onMouseEnter={() => setShowVideoControls(true)}
                onMouseLeave={() => setShowVideoControls(false)}
                onMouseMove={() => setShowVideoControls(true)}
              >
                {videoStates[currentVideo].isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900/90 to-purple-900/90 backdrop-blur-sm z-10">
                    <div className="text-center">
                      <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-white/80">Video yuklanmoqda...</p>
                      <p className="text-white/60 text-sm mt-2">Biroz kuting</p>
                    </div>
                  </div>
                )}

                {/* Barcha videolarni render qilish - faqat hozirgi ko'rinadi */}
                {videos.map((video, index) => (
                  <video
                    key={video.id}
                    ref={(el) => { videoRefs.current[index] = el; }}
                    className={`w-full h-full object-cover ${index === currentVideo ? 'block' : 'hidden'}`}
                    preload="auto"
                    playsInline
                    loop
                    poster={video.poster}
                    onLoadedMetadata={(e) => {
                      const videoDuration = e.currentTarget?.duration;
                      if (videoDuration !== undefined && videoDuration !== null && !isNaN(videoDuration)) {
                        console.log(`Video ${index} metadata yuklandi, duration: ${videoDuration}`);
                        setVideoStates(prev => prev.map((state, i) => 
                          i === index ? { ...state, duration: videoDuration, isLoading: false } : state
                        ));
                      }
                    }}
                    onTimeUpdate={(e) => {
                      const currentTime = e.currentTarget?.currentTime;
                      if (currentTime !== undefined && currentTime !== null) {
                        setVideoStates(prev => prev.map((state, i) => 
                          i === index ? { ...state, currentTime } : state
                        ));
                      }
                    }}
                    onPlay={() => {
                      setVideoStates(prev => prev.map((state, i) => 
                        i === index ? { ...state, isLoading: false, isPlaying: true } : state
                      ));
                    }}
                    onPause={() => {
                      setVideoStates(prev => prev.map((state, i) => 
                        i === index ? { ...state, isPlaying: false } : state
                      ));
                    }}
                    onCanPlay={() => {
                      setVideoStates(prev => prev.map((state, i) => 
                        i === index ? { ...state, isLoading: false } : state
                      ));
                    }}
                  >
                    <source src={video.src} type="video/mp4" />
                  </video>
                ))}

                {/* Play tugmasi - Video to'xtaganda ko'rinadi */}
                {!videoStates[currentVideo].isPlaying && !videoStates[currentVideo].isLoading && (
                  <div 
                    className="absolute inset-0 bg-gradient-to-br from-purple-900/60 to-purple-700/40 backdrop-blur-sm flex items-center justify-center transition-all duration-500 cursor-pointer z-20"
                    onClick={toggleVideoPlay}
                  >
                    <div className="text-center p-8">
                      <div className="mb-4">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600/90 to-pink-600/90 flex items-center justify-center mx-auto shadow-2xl hover:scale-110 transition-transform">
                          <Play className="w-10 h-10 text-white ml-1" />
                        </div>
                      </div>
                      <p className="text-white/70 text-sm mt-1">Play tugmasini bosing</p>
                    </div>
                  </div>
                )}

                {/* Pause tugmasi - Video o'ynayotganda ko'rinadi */}
                {videoStates[currentVideo].isPlaying && showVideoControls && (
                  <button
                    onClick={toggleVideoPlay}
                    className="absolute inset-0 flex items-center justify-center z-20 group"
                  >
                    <div className="transform transition-all duration-300 opacity-0 group-hover:opacity-100">
                      <div className="bg-gradient-to-br from-purple-600/90 to-pink-600/90 p-6 rounded-full shadow-2xl hover:scale-110 transition-transform duration-200">
                        <Pause className="w-12 h-12 text-white" />
                      </div>
                    </div>
                  </button>
                )}

                <div 
                  className="absolute bottom-0 left-0 right-0 h-2 cursor-pointer z-30"
                  onClick={handleVideoProgressClick}
                >
                  <div className="relative h-full bg-white/10">
                    <div 
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
                      style={{ width: videoStates[currentVideo].duration ? 
                        `${(videoStates[currentVideo].currentTime / videoStates[currentVideo].duration) * 100}%` : '0%' 
                      }}
                    ></div>
                  </div>
                </div>

                <div className={`absolute bottom-4 left-4 right-4 flex items-center justify-between z-30 transition-opacity duration-300 ${
                  showVideoControls ? 'opacity-100' : 'opacity-0'
                }`}>
                  <div className="text-white text-sm font-medium bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                    {formatVideoTime(videoStates[currentVideo].currentTime)} / {formatVideoTime(videoStates[currentVideo].duration)}
                  </div>

                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleVideoMute();
                    }}
                    className="bg-black/50 backdrop-blur-sm p-2 rounded-full hover:scale-110 transition-transform"
                  >
                    {videoStates[currentVideo].isMuted ? (
                      <VolumeX className="w-5 h-5 text-white" />
                    ) : (
                      <Volume2 className="w-5 h-5 text-white" />
                    )}
                  </button>
                </div>

                <div className="absolute top-4 left-4 right-4 z-20">
                  <div className="bg-gradient-to-r from-purple-900/80 to-pink-900/80 backdrop-blur-md px-4 py-3 rounded-xl shadow-lg">
                    <h3 className="text-white font-bold text-center text-sm md:text-base">
                      {videos[currentVideo].title}
                    </h3>
                  </div>
                </div>

                <div className="absolute top-4 right-4 bg-gradient-to-br from-purple-600 to-purple-800 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold shadow-lg z-20">
                  {currentVideo + 1} / {videos.length}
                </div>
              </div>

              <div className="absolute -bottom-8 left-0 right-0 flex justify-center gap-2 z-10">
                {videos.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => changeToVideo(index)}
                    className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                      index === currentVideo 
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 scale-125' 
                        : 'bg-white/50 hover:bg-white/80'
                    }`}
                    aria-label={`${index + 1}-video'ga o'tish`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 bg-gradient-to-b from-purple-900/20 to-transparent">
            <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide" style={{scrollbarWidth: 'none'}}>
              {videos.map((video, index) => (
                <button
                  key={video.id}
                  onClick={() => changeToVideo(index)}
                  className={`flex-shrink-0 w-24 h-36 md:w-32 md:h-48 rounded-lg overflow-hidden border-2 transition-all duration-300 relative group ${
                    index === currentVideo 
                      ? 'border-purple-500 scale-105 shadow-lg shadow-purple-500/50' 
                      : 'border-transparent hover:border-purple-300/50 hover:scale-105'
                  }`}
                >
                  <div className="aspect-[9/16] w-full h-full bg-gradient-to-br from-purple-900/30 to-pink-900/30">
                    <div className="relative w-full h-full">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 to-pink-900/40 backdrop-blur-sm flex items-center justify-center">
                        <div className="text-center p-2">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600/80 to-pink-600/80 flex items-center justify-center mx-auto mb-2">
                            {index === currentVideo && videoStates[index].isPlaying ? (
                              <Pause className="w-5 h-5 text-white" />
                            ) : (
                              <Play className="w-5 h-5 text-white ml-0.5" />
                            )}
                          </div>
                          <p className="text-white text-[9px] font-semibold"> {video.title}</p>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {index === currentVideo && videoStates[index].isPlaying && (
                    <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-green-500/90 flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    </div>
                  )}
                  
                 
                </button>
              ))}
            </div>
          </div>
        </div>
       

        <div className="text-center">
          <button className="bg-gradient-to-b from-[#8b5cf6] via-[#7c3aed] to-[#6d28d9] hover:from-[#7c3aed] hover:via-[#6d28d9] hover:to-[#5b21b6] text-white font-black py-6 px-20 rounded-full text-xl md:text-2xl shadow-[0_10px_0_0_#4c1d95,0_15px_30px_rgba(139,92,246,0.5)] hover:shadow-[0_8px_0_0_#4c1d95,0_12px_30px_rgba(139,92,246,0.6)] active:shadow-[0_3px_0_0_#4c1d95] active:translate-y-2 transform transition-all duration-150 hover:scale-[1.02] active:scale-[0.98]">
            Kursga qatnashish
          </button>
        </div>
      </div>
    </section>
  );
};

export default VideoCarouselSection;