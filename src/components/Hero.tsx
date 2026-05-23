import React, { useEffect, useState } from "react";

const WORDS = ["SMARTER.", "FASTER.", "AI-READY.", "UNSTOPPABLE."];

const STATS = [
  { value: "50+",     label: "Businesses Served" },
  { value: "4",       label: "Core Services" },
  { value: "98%",     label: "Client Retention" },
  { value: "Nairobi", label: "HQ, Kenya" },
];

export const Hero: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % WORDS.length);
        setVisible(true);
      }, 380);
    }, 2600);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      style={{
        minHeight: "100vh",
        background: "#0d0d0d",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        padding: "120px 40px 80px",
      }}
    >
      {/* Grid overlay */}
      <div
        className="grid-overlay"
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      />

      {/* Subtle vertical rule lines */}
      <div style={{ position: "absolute", top: 0, bottom: 0, right: "20%", width: 1, background: "rgba(255,255,255,0.055)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: 0, bottom: 0, right: "40%", width: 1, background: "rgba(255,255,255,0.03)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%", position: "relative" }}>

        {/* Status badge */}
        <div
          style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            border: "1px solid rgba(255,255,255,0.13)",
            padding: "8px 20px", marginBottom: 48,
          }}
        >
          <span
            className="animate-pulse-dot"
            style={{ width: 6, height: 6, background: "#ffffff", display: "block", flexShrink: 0 }}
          />
          <span style={{ fontFamily: "system-ui, sans-serif", fontSize: 10, letterSpacing: "3.5px", color: "rgba(255,255,255,0.52)", fontWeight: 600 }}>
            BRIDGING THE AI GAP
          </span>
        </div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "clamp(52px, 8vw, 108px)",
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.0,
            letterSpacing: "-2px",
            margin: 0,
          }}
        >
          YOUR BUSINESS,
          <br />
          <span style={{ color: "rgba(255,255,255,0.26)" }}>ONLY </span>
          <span
            style={{
              display: "inline-block",
              borderBottom: "3px solid rgba(255,255,255,0.88)",
              paddingBottom: 4,
              minWidth: 340,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(10px)",
              transition: "opacity 0.35s ease, transform 0.35s ease",
            }}
          >
            {WORDS[index]}
          </span>
        </h1>

        {/* Sub-copy */}
        <p
          style={{
            fontFamily: "system-ui, sans-serif",
            fontSize: 16,
            fontWeight: 300,
            lineHeight: 1.8,
            color: "rgba(255,255,255,0.46)",
            maxWidth: 520,
            marginTop: 40,
            marginBottom: 56,
          }}
        >
          We help modern businesses in Kenya and beyond make the AI transition —
          through intelligent websites, workflow automation, AI integrations, and
          hands-on training.
        </p>

        {/* CTA row */}
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <button
            onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              background: "#ffffff", color: "#0d0d0d", border: "none",
              padding: "16px 40px", cursor: "pointer",
              fontFamily: "system-ui, sans-serif", fontSize: 11, letterSpacing: "3px", fontWeight: 700,
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#e8e8e8")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#ffffff")}
          >
            VIEW SERVICES
          </button>
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              background: "transparent", color: "#ffffff",
              border: "1px solid rgba(255,255,255,0.28)",
              padding: "16px 40px", cursor: "pointer",
              fontFamily: "system-ui, sans-serif", fontSize: 11, letterSpacing: "3px", fontWeight: 500,
              transition: "border-color 0.2s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.8)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.28)")}
          >
            GET IN TOUCH
          </button>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "flex", gap: 64, marginTop: 96, paddingTop: 48, flexWrap: "wrap",
            borderTop: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {STATS.map(({ value, label }) => (
            <div key={label}>
              <div style={{ fontFamily: "Georgia, serif", fontSize: 32, fontWeight: 700, color: "#ffffff" }}>
                {value}
              </div>
              <div style={{ fontFamily: "system-ui, sans-serif", fontSize: 10, letterSpacing: "2px", color: "rgba(255,255,255,0.36)", marginTop: 5 }}>
                {label.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
