import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Maximize, MoreVertical } from 'lucide-react';

interface HeroVideoPlayerProps {
  onPlayToggle?: (isPlaying: boolean) => void;
  onFullscreenToggle?: (isFullscreen: boolean) => void;
}

const HeroVideoPlayer: React.FC<HeroVideoPlayerProps> = ({
  onPlayToggle,
  onFullscreenToggle
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoQuality, setVideoQuality] = useState('1080p');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout>();
  const menuRef = useRef<HTMLDivElement>(null);
  const isHoveringRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setVideoDuration(video.duration);
      setIsLoading(false);
    };
    
    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };
    
    const handlePlay = () => {
      setIsPlaying(true);
      onPlayToggle?.(true);
    };
    
    const handlePause = () => {
      setIsPlaying(false);
      onPlayToggle?.(false);
    };
    
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    
    video.preload = "auto";
    video.load();
    
    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, [onPlayToggle]);

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleFullscreen = () => {
    const container = videoContainerRef.current;
    if (container) {
      try {
        if (!document.fullscreenElement) {
          if (container.requestFullscreen) {
            container.requestFullscreen();
          } else if ((container as any).webkitRequestFullscreen) {
            (container as any).webkitRequestFullscreen();
          } else if ((container as any).mozRequestFullScreen) {
            (container as any).mozRequestFullScreen();
          } else if ((container as any).msRequestFullscreen) {
            (container as any).msRequestFullscreen();
          }
          setIsFullscreen(true);
          onFullscreenToggle?.(true);
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if ((document as any).webkitExitFullscreen) {
            (document as any).webkitExitFullscreen();
          } else if ((document as any).mozCancelFullScreen) {
            (document as any).mozCancelFullScreen();
          } else if ((document as any).msExitFullscreen) {
            (document as any).msExitFullscreen();
          }
          setIsFullscreen(false);
          onFullscreenToggle?.(false);
        }
      } catch (err) {
        console.log('Fullscreen error:', err);
      }
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.muted = false;
        videoRef.current.play().then(() => {
          setIsPlaying(true);
          onPlayToggle?.(true);
        }).catch(err => {
          console.log('Play error:', err);
        });
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
        onPlayToggle?.(false);
      }
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current && videoDuration) {
      const progressBar = e.currentTarget;
      const rect = progressBar.getBoundingClientRect();
      const clickPosition = e.clientX - rect.left;
      const progressBarWidth = progressBar.clientWidth;
      const clickPercentage = Math.min(Math.max(clickPosition / progressBarWidth, 0), 1);
      const newTime = clickPercentage * videoDuration;
      
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleMouseEnter = () => {
    isHoveringRef.current = true;
    setShowControls(true);
    
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
  };

  const handleMouseMove = () => {
    if (!showControls) {
      setShowControls(true);
    }
    
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    
    if (!showMenu) {
      controlsTimeoutRef.current = setTimeout(() => {
        if (isHoveringRef.current) {
          setShowControls(false);
        }
      }, 3000);
    }
  };

  const handleMouseLeave = () => {
    isHoveringRef.current = false;
    
    if (!showMenu) {
      setTimeout(() => {
        if (!isHoveringRef.current) {
          setShowControls(false);
        }
      }, 100);
    }
    
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
  };

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
    setShowControls(true);
    
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
  };

  const handleQualityChange = (quality: string) => {
    setVideoQuality(quality);
    setShowMenu(false);
  };

  const handleVideoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    togglePlay();
  };

  const handleDoubleClick = () => {
    handleFullscreen();
  };

  return (
    <div className="max-w-2xl mx-auto mb-6">
      <div 
        ref={videoContainerRef}
        className={`relative rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(139,92,246,0.4)] ${
          isFullscreen ? 'fixed inset-0 z-50 !rounded-none !border-0 !m-0 !max-w-none w-screen h-screen bg-black' : ''
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        onDoubleClick={handleDoubleClick}
      >
        <div className={`${isFullscreen ? 'w-full h-full flex items-center justify-center' : 'aspect-[16/9]'} relative bg-black`}>
          {/* Video yuklanayotganda loader */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-black z-10">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-white/80">Video yuklanmoqda...</p>
                <p className="text-white/60 text-sm mt-2">Iltimos, biroz kuting</p>
              </div>
            </div>
          )}
          
          <video
            ref={videoRef}
            className={`${isFullscreen ? 'w-full h-full object-contain' : 'w-full h-full object-cover'} ${isLoading ? 'opacity-0' : 'opacity-100'}`}
            loop
            playsInline
            preload="auto"
            onClick={handleVideoClick}
            poster="/poster.png"
            muted={false}
          >
            <source src="/compressed.mp4" type="video/mp4" />
            Sizning brauzeringiz video formatini qo'llab-quvvatlamaydi.
          </video>
          
          {/* Play Button Overlay */}
          {(!isPlaying || showControls) && (
            <div className="absolute inset-0 flex items-center justify-center">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlay();
                }}
                className={`bg-purple-600/90 hover:bg-purple-700 text-white p-5 rounded-full transition-all duration-200 shadow-lg hover:scale-110 active:scale-95 z-10 ${
                  !isPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                }`}
              >
                {isPlaying ? (
                  <Pause className="w-10 h-10" />
                ) : (
                  <Play className="w-10 h-10" />
                )}
              </button>
            </div>
          )}
          
          {/* Progress Bar */}
          <div 
            className={`absolute ${isFullscreen ? 'bottom-20' : 'bottom-0'} left-0 right-0 h-2 cursor-pointer hover bg-transparent hover:h-3 transition-all z-30`}
            onClick={handleProgressClick}
            onMouseEnter={() => setShowControls(true)}
          >
            <div className="relative h-full">
              <div className="absolute inset-0 bg-white/20"></div>
              <div 
                className="absolute top-0 left-0 h-full bg-purple-500 transition-all duration-300"
                style={{ width: videoDuration ? `${(currentTime / videoDuration) * 100}%` : '0%' }}
              ></div>
              <div 
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg transform -translate-x-1/2 transition-all duration-300"
                style={{ left: videoDuration ? `${(currentTime / videoDuration) * 100}%` : '0%' }}
              ></div>
            </div>
          </div>
          
          {/* Time Display */}
          <div className={`absolute ${isFullscreen ? 'bottom-24' : 'bottom-3'} left-4 text-sm font-medium text-white/90 transition-opacity duration-300 z-20`}>
            {formatTime(currentTime)} / {formatTime(videoDuration)}
          </div>
          
          {/* Bottom Controls Bar */}
          <div className={`absolute ${isFullscreen ? 'bottom-8' : 'bottom-8'} right-4 z-20 transition-opacity duration-300 ${
            showControls ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="flex items-center gap-2">
              {/* Three Dots Menu */}
              <div className="relative" ref={menuRef}>
                <button 
                  onClick={handleMenuClick}
                  className="bg-black/70 hover:bg-black/90 text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm hover:scale-110 active:scale-95"
                  aria-label="Sozlamalar"
                >
                  <MoreVertical className="w-5 h-5" />
                </button>
                
                {/* Menu Dropdown */}
                {showMenu && (
                  <div className="absolute bottom-full right-0 mb-2 bg-black/95 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-white/10 min-w-56 z-50">
                    <div className="px-4 py-3">
                      <p className="text-white/60 text-xs font-bold mb-2 uppercase">Sifat</p>
                      {['1080p', '720p', '480p'].map((quality) => (
                        <button
                          key={quality}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleQualityChange(quality);
                          }}
                          className={`w-full text-left px-3 py-2 rounded transition-colors text-sm hover:scale-[1.02] active:scale-[0.98] ${
                            videoQuality === quality 
                              ? 'bg-purple-600 text-white font-semibold' 
                              : 'text-white/70 hover:bg-white/15 hover:text-white'
                          }`}
                        >
                          {quality}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Fullscreen Button */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleFullscreen();
                }}
                className="bg-black/70 hover:bg-black/90 text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm hover:scale-110 active:scale-95"
                aria-label="To'liq ekran"
              >
                <Maximize className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Fullscreen Exit Hint */}
          {isFullscreen && showControls && (
            <div className="absolute top-4 left-4 text-sm text-white/70 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full z-20">
              Esc tugmasi yoki 2 marta bosish orqali chiqing
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroVideoPlayer;