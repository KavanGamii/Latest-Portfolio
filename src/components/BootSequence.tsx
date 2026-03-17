import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const bootLines = [
  { text: "GROW X v4.2.1", delay: 0 },
  { text: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", delay: 100 },
  { text: "", delay: 150 },
  { text: "> Initializing kernel modules...", delay: 200 },
  { text: "> Loading display driver.......... OK", delay: 400 },
  { text: "> Mounting /dev/portfolio......... OK", delay: 600 },
  { text: "> Scanning skill_matrix........... 12 nodes found", delay: 800 },
  { text: "> Indexing project_registry........ 3 active instances", delay: 1000 },
  { text: "> Establishing secure channel..... OK", delay: 1200 },
  { text: "", delay: 1300 },
  { text: '{ "name": "Kavan Gami",', delay: 1400 },
  { text: '  "role": "Frontend UI Engineer",', delay: 1500 },
  { text: '  "location": "Ahmedabad, India",', delay: 1600 },
  { text: '  "status": "AVAILABLE",', delay: 1700 },
  { text: '  "clearance": "FULL_ACCESS" }', delay: 1800 },
  { text: "", delay: 1900 },
  { text: "> All systems nominal.", delay: 2000 },
  { text: "> Ready for initialization.", delay: 2200 },
];

interface BootSequenceProps {
  onComplete: () => void;
}

const BootSequence = ({ onComplete }: BootSequenceProps) => {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    bootLines.forEach((line, index) => {
      setTimeout(() => {
        setVisibleLines(index + 1);
        if (index === bootLines.length - 1) {
          setTimeout(() => setReady(true), 400);
        }
      }, line.delay);
    });
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background p-6"
        exit={{ opacity: 0, scale: 1.02 }}
        transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
      >
        <div className="w-full max-w-2xl">
          <div className="font-mono text-xs sm:text-sm leading-relaxed">
            {bootLines.slice(0, visibleLines).map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.15 }}
                className={
                  line.text.startsWith(">")
                    ? "text-muted-foreground"
                    : line.text.startsWith("{") || line.text.startsWith("  ")
                    ? "text-primary"
                    : line.text.startsWith("SENTINEL")
                    ? "text-foreground font-semibold tracking-widest"
                    : line.text.startsWith("━")
                    ? "text-muted-foreground/30"
                    : "text-muted-foreground"
                }
              >
                {line.text || "\u00A0"}
              </motion.div>
            ))}
          </div>

          <AnimatePresence>
            {ready && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-8"
              >
                <button
                  onClick={onComplete}
                  className="group font-mono text-sm border border-primary/30 px-6 py-3 rounded-md bg-primary/5 text-primary hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 flex items-center gap-3"
                >
                  <span className="animate-blink">▌</span>
                  <span>ENTER COMMAND CENTER</span>
                  <span className="text-muted-foreground group-hover:text-primary transition-colors">[ENTER]</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      </motion.div>
    </AnimatePresence>
  );
};

export default BootSequence;
