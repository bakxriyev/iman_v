import React from "react";

declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        "wistia-player": React.DetailedHTMLProps<
          React.HTMLAttributes<HTMLElement>,
          HTMLElement
        > & {
          "media-id"?: string;
          aspect?: string;
          playsinline?: string;
          silentautoplay?: string;
          preload?: string;
          controlsvisibleonload?: string;
          fullscreenbutton?: string;
          playbutton?: string;
          settingscontrol?: string;
          volumecontrol?: string;
        };
      }
    }
  }
}

export {};
