"use client";

import { useEffect, useRef } from "react";

interface CalendlyEmbedProps {
  url: string;
  height?: number;
  className?: string;
}

export default function CalendlyEmbed({
  url,
  height = 700,
  className = "",
}: CalendlyEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadCalendly = () => {
      if (typeof window === "undefined") return;

      if (!document.getElementById("calendly-custom-styles")) {
        const style = document.createElement("style");
        style.id = "calendly-custom-styles";
        style.textContent = `
          .calendly-inline-widget {
            width: 100% !important;
            min-width: 100% !important;
            max-width: none !important;
          }
          .calendly-inline-widget .calendly-popup-content {
            width: 100% !important;
            margin: 0 !important;
          }
          .calendly-inline-widget iframe {
            width: 100% !important;
            min-width: 100% !important;
            border: none !important;
          }
        `;
        document.head.appendChild(style);
      }

      const initWidget = () => {
        if (window.Calendly && containerRef.current) {
          containerRef.current.innerHTML = "";
          window.Calendly.initInlineWidget({
            url,
            parentElement: containerRef.current,
          });

          // Force iframe to fill container after Calendly injects it
          const forceWidth = () => {
            const iframe = containerRef.current?.querySelector("iframe");
            if (iframe) {
              iframe.style.width = "100%";
              iframe.style.minWidth = "100%";
            }
          };
          forceWidth();
          setTimeout(forceWidth, 1000);
          setTimeout(forceWidth, 3000);
        }
      };

      const existingScript = document.querySelector(
        'script[src="https://assets.calendly.com/assets/external/widget.js"]'
      );

      if (existingScript) {
        initWidget();
        return;
      }

      const link = document.createElement("link");
      link.href = "https://assets.calendly.com/assets/external/widget.css";
      link.rel = "stylesheet";
      document.head.appendChild(link);

      const script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      script.onload = initWidget;
      document.body.appendChild(script);
    };

    loadCalendly();
  }, [url]);

  return (
    <div
      ref={containerRef}
      className={`w-full ${className}`}
      style={{ minWidth: "320px", height: `${height}px` }}
    />
  );
}
