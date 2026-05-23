import React, { useEffect, useState } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { WorkedWith } from "./components/WorkedWith";
import { Stories } from "./components/Stories";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { AdminPanel } from "./components/AdminPanel";
import { CMSData } from "./types";
import { loadCompanies, loadStories } from "./hooks/useSupabase";

const App: React.FC = () => {
  const [showAdmin, setShowAdmin] = useState(false);
  const [cmsData, setCmsData] = useState<CMSData>({ companies: [], stories: [] });

  // Auto-load from Supabase on mount if credentials are saved
  useEffect(() => {
    const url = localStorage.getItem("tw_sb_url");
    const key = localStorage.getItem("tw_sb_key");
    if (!url || !key) return;

    Promise.all([
      loadCompanies({ url, key }),
      loadStories({ url, key }),
    ])
      .then(([companies, stories]) => {
        if (Array.isArray(companies) && Array.isArray(stories)) {
          setCmsData({ companies, stories });
        }
      })
      .catch(() => {
        // Silently fail on auto-load — user can reconnect via admin panel
      });
  }, []);

  // Keyboard shortcut: Ctrl + Shift + A
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "A") {
        setShowAdmin((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <Navbar onAdminClick={() => setShowAdmin(true)} />

      <main>
        <Hero />
        <Services />
        <WorkedWith companies={cmsData.companies} />
        <Stories stories={cmsData.stories} />
        <Contact />
      </main>

      <Footer onAdminClick={() => setShowAdmin(true)} />

      {showAdmin && (
        <AdminPanel
          onClose={() => setShowAdmin(false)}
          onDataSave={setCmsData}
        />
      )}
    </>
  );
};

export default App;
