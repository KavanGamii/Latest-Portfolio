import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BootSequence from "@/components/BootSequence";
import SystemOverview from "@/components/SystemOverview";
import MissionLog from "@/components/MissionLog";
import ActiveProjects from "@/components/ActiveProjects";
import SkillMatrix from "@/components/SkillMatrix";
import SystemMetrics from "@/components/SystemMetrics";
import ToolsBelt from "@/components/ToolsBelt";
import Terminal from "@/components/Terminal";
import CommandPalette from "@/components/CommandPalette";

const Index = () => {
  const [booted, setBooted] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const handleNavigate = (section: string) => {
    const el = sectionRefs.current[section];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {!booted && <BootSequence onComplete={() => setBooted(true)} />}
      </AnimatePresence>

      {booted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.2, 0, 0, 1] }}
          className="min-h-screen bg-background relative"
        >
          {/* Grid background */}
          <div className="fixed inset-0 grid-bg opacity-20 pointer-events-none" />

          {/* Scanline overlay */}
          <div className="scanline" />

          {/* Top bar */}
          <header className="sticky top-0 z-30 backdrop-blur-lg bg-background/60 border-b border-border/30">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-success shadow-[0_0_8px_hsl(150_80%_50%_/_0.6)]" />
                <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase">
                  GROW<span className="text-primary ml-1">X</span>
                </span>
              </div>

              <div className="flex items-center gap-3">
                <CommandPalette onNavigate={handleNavigate} />
                <nav className="hidden md:flex items-center gap-1 font-mono text-[10px]">
                  {["about", "projects", "experience", "skills", "contact"].map((s) => (
                    <button
                      key={s}
                      onClick={() => handleNavigate(s)}
                      className="px-2.5 py-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors uppercase tracking-wider"
                    >
                      {s}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </header>

          {/* Main dashboard grid */}
          <main className="max-w-7xl mx-auto px-4 py-6 space-y-4">
            {/* Row 1: Overview */}
            <div ref={(el) => (sectionRefs.current["about"] = el)}>
              <SystemOverview />
            </div>

            {/* Row 2: Two columns on desktop */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 space-y-4">
                <div ref={(el) => (sectionRefs.current["projects"] = el)}>
                  <ActiveProjects />
                </div>
                <div ref={(el) => (sectionRefs.current["experience"] = el)}>
                  <MissionLog />
                </div>
              </div>

              <div className="space-y-4">
                <div ref={(el) => (sectionRefs.current["skills"] = el)}>
                  <SkillMatrix />
                </div>
                <SystemMetrics />
                <ToolsBelt />
              </div>
            </div>

            {/* Row 3: Terminal */}
            <div ref={(el) => (sectionRefs.current["contact"] = el)}>
              <Terminal />
            </div>

            {/* Footer */}
            <footer className="py-6 text-center font-mono text-[10px] text-muted-foreground/40 space-y-1">
              <p>GROW X v4.2.1 — All systems nominal</p>
              <p>Built with React · TypeScript · Tailwind · Framer Motion</p>
            </footer>
          </main>
        </motion.div>
      )}
    </>
  );
};

export default Index;
