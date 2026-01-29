import React, { useEffect, useRef, useState } from "react";



const HeroVideoPlayer: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1️⃣ Wistia asosiy player script
    if (!document.getElementById("wistia-player-script")) {
      const script = document.createElement("script");
      script.src = "https://fast.wistia.com/player.js";
      script.async = true;
      script.id = "wistia-player-script";
      document.head.appendChild(script);
    }

    // 2️⃣ Media embed script (Wistia tavsiyasi)
    if (!document.getElementById("wistia-media-script")) {
      const script = document.createElement("script");
      script.src = "https://fast.wistia.com/embed/go38znbq56.js";
      script.async = true;
      script.type = "module";
      script.id = "wistia-media-script";
      document.head.appendChild(script);
    }

    // 3️⃣ Player tayyor bo‘lishini kutish
    const interval = setInterval(() => {
      const player = containerRef.current?.querySelector("wistia-player");
      if (player && (window as any).Wistia) {
        setIsLoaded(true);
        clearInterval(interval);
      }
    }, 100);

    // 4️⃣ Timeout (10s)
    const timeout = setTimeout(() => {
      if (!isLoaded) {
        setHasError(true);
        clearInterval(interval);
      }
    }, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [isLoaded]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className="relative rounded-2xl overflow-hidden shadow-lg">
        <div
          ref={containerRef}
          className="relative aspect-video bg-black"
        >
          {/* Loading */}
          {!isLoaded && !hasError && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-black">
              <div className="text-center">
                <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <p className="text-white text-sm">Video yuklanmoqda…</p>
              </div>
            </div>
          )}

          {/* Error */}
          {hasError && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-black">
              <div className="text-center">
                <p className="text-red-400 text-sm mb-3">
                  Video yuklanmadi
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm"
                >
                  Qayta urinish
                </button>
              </div>
            </div>
          )}

          {/* ✅ Wistia Player */}
          <wistia-player
  media-id="go38znbq56"
  aspect="1.7777777777777777"
  playsinline="true"
  preload="auto"
  controlsvisibleonload="true"
  fullscreenbutton="true"
  playbutton="true"
  settingscontrol="true"
  volumecontrol="true"
  style={{
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    display: "block",
  }}
/>

        </div>
      </div>

      {/* Wistia fallback poster */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            wistia-player:not(:defined) {
              background: center / cover no-repeat
                url("https://fast.wistia.com/embed/medias/go38znbq56/swatch");
              display: block;
              padding-top: 56.25%;
            }
          `,
        }}
      />
    </div>
  );
};

export default HeroVideoPlayer;
