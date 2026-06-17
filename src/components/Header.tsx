
import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";

export default function Header() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-surface-950/80 border-b border-surface-200/60 dark:border-surface-800/40 px-4 sm:px-6 py-3.5 sm:py-5 transition-colors duration-300">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo + Name */}
        <div className="flex items-center gap-1.5">
          <img
            src="/Clearcut logo.png"
            alt="ClearCut logo"
            className="w-8 h-8"
            style={{ filter: 'invert(30%) sepia(90%) saturate(2000%) hue-rotate(220deg) brightness(90%)' }}
          />
          <span className="text-xl font-display font-extrabold tracking-tight text-surface-900 dark:text-white">
            ClearCut<span className="text-primary">.</span>
          </span>
        </div>



        {/* Dark mode toggle */}
        <button
          onClick={() => setIsDark(!isDark)}
          className="relative w-10 h-10 rounded-xl border border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800 flex items-center justify-center cursor-pointer hover:bg-surface-100 dark:hover:bg-surface-700 transition-all duration-300 shadow-sm"
          aria-label="Toggle dark mode"
        >
          <Sun className={`w-[18px] h-[18px] text-amber-500 absolute transition-all duration-300 ${isDark ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"}`} />
          <Moon className={`w-[18px] h-[18px] text-indigo-400 absolute transition-all duration-300 ${isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"}`} />
        </button>
      </div>
    </header>
  );
}
