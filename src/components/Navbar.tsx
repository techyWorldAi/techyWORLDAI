import React, { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { NAV_LINKS } from "../constants";

interface NavbarProps {
  onAdminClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onAdminClick }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const textColor = scrolled ? "#0d0d0d" : "#ffffff";

  return (
    <nav
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 100,
        padding: "0 40px",
        background: scrolled ? "rgba(255,255,255,0.97)" : "transparent",
        borderBottom: scrolled ? "1px solid #e8e8e8" : "1px solid transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        transition: "background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 72,
        }}
      >
        {/* Brand */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            display: "flex", alignItems: "center", gap: 12,
            background: "none", border: "none", cursor: "pointer", padding: 0,
          }}
        >
          <Logo size={34} light={!scrolled} />
          <span
            style={{
              fontFamily: "Georgia, serif",
              fontSize: 17,
              fontWeight: 700,
              letterSpacing: "-0.3px",
              color: textColor,
              transition: "color 0.4s",
            }}
          >
            techy
            <span
              style={{
                fontFamily: "system-ui, sans-serif",
                fontWeight: 300,
                letterSpacing: "4px",
                fontSize: 14,
              }}
            >
              WORLD
            </span>
            <span
              style={{
                background: textColor,
                color: scrolled ? "#ffffff" : "#0d0d0d",
                padding: "1px 7px",
                marginLeft: 4,
                fontSize: 10,
                letterSpacing: "2px",
                fontFamily: "system-ui, sans-serif",
                fontWeight: 700,
                transition: "background 0.4s, color 0.4s",
              }}
            >
              AI
            </span>
          </span>
        </button>

        {/* Nav links */}
        <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link.toLowerCase())}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "system-ui, sans-serif",
                fontSize: 11, letterSpacing: "2.5px", fontWeight: 500,
                color: textColor, opacity: 0.75,
                transition: "color 0.4s, opacity 0.2s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.75")}
            >
              {link.toUpperCase()}
            </button>
          ))}

          <button
            onClick={() => scrollTo("contact")}
            style={{
              background: scrolled ? "#0d0d0d" : "#ffffff",
              color: scrolled ? "#ffffff" : "#0d0d0d",
              border: "none", cursor: "pointer",
              padding: "10px 24px",
              fontFamily: "system-ui, sans-serif",
              fontSize: 11, letterSpacing: "2.5px", fontWeight: 700,
              transition: "background 0.4s, color 0.4s, opacity 0.2s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.82")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
          >
            START PROJECT
          </button>
        </div>
      </div>
    </nav>
  );
};
