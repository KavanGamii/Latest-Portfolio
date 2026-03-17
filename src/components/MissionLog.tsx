import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";

interface LogEntry {
  id: string;
  role: string;
  company: string;
  period: string;
  status: "active" | "completed";
  payload: string[];
}

const entries: LogEntry[] = [
  {
    id: "0xA7F3",
    role: "Web Designer & Developer",
    company: "Softqube Technology",
    period: "Jun 2025 — Present",
    status: "active",
    payload: [
      "Improved frontend performance by 30%",
      "Built responsive UI using Tailwind CSS",
      "Converted Figma designs into production-ready components",
    ],
  },
  {
    id: "0x8B21",
    role: "Associate Web Designer & Developer",
    company: "Tridhya Tech",
    period: "Feb 2024 — Jun 2025",
    status: "completed",
    payload: [
      "Built reusable UI systems using React and Vue",
      "Resolved cross-browser issues in production",
      "Improved UI scalability and maintainability",
    ],
  },
];

const MissionLog = () => {
  const [expanded, setExpanded] = useState<string | null>(entries[0].id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: [0.2, 0, 0, 1] }}
      className="glass-panel p-4 sm:p-5"
    >
      <div className="window-title-bar -mx-4 sm:-mx-5 -mt-4 sm:-mt-5 mb-4 px-4 sm:px-5 pt-3 pb-2">
        <div className="window-dot bg-destructive/60" />
        <div className="window-dot bg-warning/60" />
        <div className="window-dot bg-success/60" />
        <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest ml-2">Mission Log</span>
      </div>

      <div className="relative space-y-0">
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-muted-foreground/20" />

        {entries.map((entry, i) => (
          <div key={entry.id} className="relative pl-7">
            <div
              className={`absolute left-0 top-[10px] w-[15px] h-[15px] rounded-full border-2 transition-all duration-300 ${
                entry.status === "active"
                  ? "border-primary bg-primary/20 shadow-[0_0_10px_hsl(190_90%_50%_/_0.4)]"
                  : expanded === entry.id
                  ? "border-secondary bg-secondary/20"
                  : "border-muted-foreground/30 bg-background"
              }`}
            />

            <button
              onClick={() => setExpanded(expanded === entry.id ? null : entry.id)}
              className="w-full text-left py-3 group"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-[10px] text-muted-foreground">{entry.id}</span>
                    {entry.status === "active" && (
                      <span className="font-mono text-[9px] text-success bg-success/10 px-1.5 py-0.5 rounded uppercase tracking-wider">
                        Active
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-medium text-foreground mt-1 group-hover:text-primary transition-colors">
                    {entry.role}
                  </h3>
                  <p className="font-mono text-xs text-muted-foreground">
                    {entry.company} · {entry.period}
                  </p>
                </div>
                <ChevronRight
                  className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-300 ${
                    expanded === entry.id ? "rotate-90" : ""
                  }`}
                />
              </div>
            </button>

            <AnimatePresence>
              {expanded === entry.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-3 space-y-1.5">
                    {entry.payload.map((item, j) => (
                      <div key={j} className="flex items-start gap-2 text-xs text-muted-foreground font-mono">
                        <span className="text-primary shrink-0 mt-0.5">→</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {i < entries.length - 1 && <div className="border-b border-border/30" />}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default MissionLog;
