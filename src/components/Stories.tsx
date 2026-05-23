import React, { useState } from "react";
import { Story } from "../types";
import { PLATFORM_COLORS } from "../constants";
import { useInView } from "../hooks/useInView";

/* ── Single story card ───────────────────────────── */
interface StoryCardProps {
  story: Story;
  delay: number;
  inView: boolean;
}

const StoryCard: React.FC<StoryCardProps> = ({ story, delay, inView }) => {
  const [hovered, setHovered] = useState(false);
  const color = PLATFORM_COLORS[story.platform] ?? PLATFORM_COLORS.other;

  return (
    <a
      href={story.link}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: "none" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          border: `1px solid ${hovered ? "#0d0d0d" : "#e8e8e8"}`,
          padding: "36px 32px",
          background: "#ffffff",
          height: "100%",
          opacity: inView ? 1 : 0,
          transform: inView
            ? hovered ? "translateY(-4px)" : "translateY(0)"
            : "translateY(24px)",
          transition: `
            opacity 0.6s ${delay}ms ease,
            transform 0.3s ease,
            border-color 0.25s ease
          `,
          boxSizing: "border-box",
        }}
      >
        {/* Platform badge + company */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <span style={{
            fontFamily: "system-ui, sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: "2.5px",
            color: "black",
            border: `1px solid ${color}30`,
            background: `${color}0d`,
            padding: "4px 10px",
          }}>
            {story.platform.toUpperCase()}
          </span>
          <span style={{ fontFamily: "system-ui, sans-serif", fontSize: 11, color: "#bbbbbb" }}>
            {story.company_name}
          </span>
        </div>

        {/* Title */}
        <h3 style={{ fontFamily: "Georgia, serif", fontSize: 20, fontWeight: 700, color: "#0d0d0d", margin: "0 0 12px", lineHeight: 1.3 }}>
          {story.title}
        </h3>

        {/* Description */}
        <p style={{ fontFamily: "system-ui, sans-serif", fontSize: 13, color: "#777777", lineHeight: 1.7, margin: "0 0 24px" }}>
          {story.description}
        </p>

        {/* CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "system-ui, sans-serif", fontSize: 11, letterSpacing: "1.5px", fontWeight: 600, color: "#0d0d0d" }}>
          READ STORY
          <span style={{ fontSize: 14, transition: "transform 0.2s", transform: hovered ? "translateX(4px)" : "none", display: "inline-block" }}>
            →
          </span>
        </div>
      </div>
    </a>
  );
};

/* ── Stories section ─────────────────────────────── */
interface StoriesProps {
  stories: Story[];
}

export const Stories: React.FC<StoriesProps> = ({ stories }) => {
  const [ref, inView] = useInView();

  if (!stories.length) return null;

  return (
    <section id="stories" style={{ background: "#ffffff", padding: "120px 40px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 80, flexWrap: "wrap", gap: 32 }}>
          <div>
            <p style={{ fontFamily: "system-ui, sans-serif", fontSize: 10, letterSpacing: "4px", color: "#aaaaaa", fontWeight: 600, marginBottom: 16 }}>
              CLIENT RESULTS
            </p>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 700, color: "#0d0d0d", lineHeight: 1.1 }}>
              Success Stories.
            </h2>
          </div>
          <p style={{ fontFamily: "system-ui, sans-serif", fontSize: 13, color: "#888888", maxWidth: 300, lineHeight: 1.75 }}>
            Real outcomes from real businesses that chose to bridge the AI gap.
          </p>
        </div>

        <div
          ref={ref}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: 32,
            alignItems: "start",
          }}
        >
          {stories.map((story, i) => (
            <StoryCard key={story.id} story={story} delay={i * 80} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
};
