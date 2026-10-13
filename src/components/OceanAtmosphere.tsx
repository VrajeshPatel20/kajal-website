import { useState } from "react";
/** Composited light fields, with both an explicit pause and reduced-motion support. */
export function OceanAtmosphere() {
  const [paused, setPaused] = useState(false);
  return (
    <>
      <div
        className={`ocean-atmosphere ${paused ? "is-paused" : ""}`}
        aria-hidden="true"
      >
        <div className="ocean-glow" />
        <svg viewBox="0 0 1000 220" preserveAspectRatio="none">
          <path d="M-100 115 Q150 15 400 110 T1100 85" />
          <path d="M-100 135 Q150 35 400 130 T1100 105" />
          <path d="M-100 155 Q150 55 400 150 T1100 125" />
        </svg>
      </div>
      <button
        className="ocean-motion"
        aria-pressed={paused}
        onClick={() => setPaused(!paused)}
      >
        {paused ? "Resume motion" : "Pause motion"}
      </button>
    </>
  );
}
