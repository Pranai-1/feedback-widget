import * as React from "react";
import { useEffect, useRef, useState } from "react";

function FeedbackWidget({ pageName, spaceName }: { pageName: string; spaceName: string }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const handleLoad = () => {
      setLoading(false);
      if (window.iFrameResize) {
        window.iFrameResize(
          {
            log: true, // Enable logs for debugging
            checkOrigin: false, // Allow local development
            heightCalculationMethod: "bodyScroll", // Alternative: "documentElementScroll"
          },
          iframe
        );
      }
    };

    iframe.addEventListener("load", handleLoad);

    return () => {
      iframe.removeEventListener("load", handleLoad);
      if (window.iFrameResizer?.close) {
        window.iFrameResizer.close(iframe);
      }
    };
  }, []);

  return (
    <div style={{ position: "relative" }}>
      {loading && <p>Loading...</p>}
      <iframe
        ref={iframeRef}
        src={`https://feedback-io-xi.vercel.app/${pageName}/${spaceName}`}
        style={{
          height: "350px", // Ensure it expands fully
          width: "100%",
          backgroundColor: "black",
        }}
      />
    </div>
  );
}

export { FeedbackWidget };
