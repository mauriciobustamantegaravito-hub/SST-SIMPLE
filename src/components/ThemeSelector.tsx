"use client";

import { useEffect, useState } from "react";
const themes = ["normal", "blanco", "oscuro"] as const;
type Theme = typeof themes[number];
export function ThemeSelector() {
  const [theme, setTheme] = useState<Theme>("normal");
  useEffect(() => {
    let saved: string | null = null;
    try { saved = localStorage.getItem("saanva-theme"); } catch {}
    const next = themes.includes(saved as Theme) ? saved as Theme : "normal";
    document.documentElement.dataset.theme = next;
    const frame = requestAnimationFrame(() => setTheme(next));
    return () => cancelAnimationFrame(frame);
  }, []);
  function change(next: Theme) {
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("saanva-theme", next); } catch {}
  }
  return <div className="theme-toolbar"><label htmlFor="site-theme">Tema de la página</label><select id="site-theme" value={theme} onChange={e => change(e.target.value as Theme)}><option value="normal">Normal · original</option><option value="blanco">Blanco</option><option value="oscuro">Oscuro</option></select></div>;
}
