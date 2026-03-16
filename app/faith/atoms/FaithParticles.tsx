// atoms/FaithParticles.tsx — ambient gold floating particles
"use client";
import React from "react";

const particleData = Array.from({ length: 18 }, (_, i) => ({
  left: `${(i * 5.5 + 3) % 100}%`,
  dur:  `${15 + (i * 3.1) % 12}s`,
  delay:`${(i * 2.3) % 10}s`,
  op:   `${0.15 + (i % 4) * 0.08}`,
  drift:`${-20 + (i % 5) * 12}px`,
}));

export function FaithParticles() {
  return (
    <div className="fdp-particles" aria-hidden="true">
      {particleData.map((p, i) => (
        <div
          key={i}
          className="fdp-p"
          style={{
            left: p.left, bottom: 0,
            ["--dur" as string]:   p.dur,
            ["--delay" as string]: p.delay,
            ["--op" as string]:    p.op,
            ["--drift" as string]: p.drift,
          }}
        />
      ))}
    </div>
  );
}
