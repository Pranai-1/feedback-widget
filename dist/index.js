import * as React from 'react';
import { useRef, useState, useEffect } from 'react';

function FeedbackWidget({ pageName, spaceName }) {
    const iframeRef = useRef(null);
    const [loading, setLoading] = useState(true); // ✅ Loading state
    useEffect(() => {
        const iframe = iframeRef.current;
        if (!iframe)
            return;
        const handleLoad = () => {
            setLoading(false); // ✅ Hide loader when content loads
            if (window.iFrameResize) {
                window.iFrameResize({
                    log: false,
                    checkOrigin: ["https://feedback-io-xi.vercel.app"],
                    heightCalculationMethod: "max",
                }, iframe);
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
    return (React.createElement("div", { style: { position: "relative" } },
        loading && (React.createElement("div", { style: {
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "black",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
                fontWeight: "bold",
                gap: "24px",
            } }, [...Array(window.innerWidth < 640 ? 1 : 3)].map((_, index) => (React.createElement("div", { key: index, style: {
                backgroundColor: "#E5E7EB",
                height: "80%",
                width: window.innerWidth < 640 ? "50%" : "25%",
                borderRadius: "0.375rem",
                animation: "pulse 1.5s infinite ease-in-out",
            } }))))),
        React.createElement("iframe", { ref: iframeRef, src: `https://feedback-io-xi.vercel.app/${pageName}/${spaceName}`, style: {
                border: "none",
                minHeight: window.innerWidth < 640 ? "400px" : "500px",
                width: "100%",
                display: "block",
            } })));
}

export { FeedbackWidget };
