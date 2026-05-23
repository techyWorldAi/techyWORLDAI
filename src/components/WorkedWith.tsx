import React from "react";
import { Company } from "../types";
import { useInView } from "../hooks/useInView";

interface WorkedWithProps {
  companies: Company[];
}

export const WorkedWith: React.FC<WorkedWithProps> = ({ companies }) => {
  const [ref, inView] = useInView();

  if (!companies.length) return null;

  return (
    <section id="work" style={{ background: "#f7f7f5", padding: "100px 40px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <p style={{ fontFamily: "system-ui, sans-serif", fontSize: 10, letterSpacing: "4px", color: "#aaaaaa", fontWeight: 600, marginBottom: 16 }}>
          TRUSTED BY
        </p>
        <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, color: "#0d0d0d", marginBottom: 64 }}>
          Companies We've Worked With
        </h2>

        <div
          ref={ref}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: 1,
            background: "#e0e0e0",
          }}
        >
          {companies.map((company, i) => (
            <div
              key={company.id}
              style={{
                background: "#f7f7f5",
                padding: "36px 32px",
                opacity: inView ? 1 : 0,
                transform: inView ? "none" : "translateY(20px)",
                transition: `opacity 0.55s ${i * 60}ms ease, transform 0.55s ${i * 60}ms ease`,
              }}
            >
              {company.logo_url && (
                <img
                  src={company.logo_url}
                  alt={`${company.name} logo`}
                  style={{ height: 36, objectFit: "contain", display: "block", marginBottom: 16, filter: "grayscale(1)" }}
                />
              )}
              <div style={{ fontFamily: "Georgia, serif", fontSize: 18, fontWeight: 700, color: "#0d0d0d", marginBottom: 6 }}>
                {company.name}
              </div>
              <div style={{ fontFamily: "system-ui, sans-serif", fontSize: 11, color: "#999999", letterSpacing: "1.5px" }}>
                {company.industry?.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
