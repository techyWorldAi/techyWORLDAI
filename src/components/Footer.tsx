import React from "react";
import { Logo } from "./Logo";

interface FooterProps {
  onAdminClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onAdminClick }) => {
  return (
    <footer
      style={{
        background: "#0a0a0a",
        borderTop: "1px solid #1a1a1a",
        padding: "36px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 16,
      }}
    >
      {/* Brand */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Logo size={22} light />
        <span style={{ fontFamily: "system-ui, sans-serif", fontSize: 10, color: "rgba(255,255,255,0.28)", letterSpacing: "2.5px" }}>
          TECHYWORLDAI © {new Date().getFullYear()}
        </span>
      </div>

      {/* Tagline */}
      <span style={{ fontFamily: "system-ui, sans-serif", fontSize: 10, color: "rgba(255,255,255,0.18)", letterSpacing: "2px" }}>
        WORK SMARTER · SCALE FASTER
      </span>

      {/* Hidden admin trigger */}
      <button
        onClick={onAdminClick}
        title="Admin"
        style={{
          background: "none", border: "none", cursor: "pointer",
          color: "#ffffff", fontSize: 18, letterSpacing: "4px",
          opacity: 0.1,
          transition: "opacity 0.3s",
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.45")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.1")}
      >
        ···
      </button>
    </footer>
  );
};
