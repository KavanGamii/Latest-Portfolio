import { motion } from "framer-motion";
import { Github, GitCommit, GitBranch, Code2 } from "lucide-react";

// Generate a realistic-looking contribution grid (52 weeks x 7 days)
const generateContributions = () => {
  const weeks = 52;
  const days = 7;
  const grid: number[][] = [];
  for (let w = 0; w < weeks; w++) {
    const week: number[] = [];
    for (let d = 0; d < days; d++) {
      // Weekdays more active, some bursts, some quiet weeks
      const isWeekend = d === 0 || d === 6;
      const burstWeek = w % 7 === 3 || w % 11 === 5;
      const quietWeek = w % 9 === 0;
      let val = 0;
      if (!quietWeek) {
        const base = isWeekend ? 0.3 : 0.65;
        const r = Math.random();
        if (r < base) val = burstWeek ? Math.floor(Math.random() * 3) + 2 : 1;
        if (r < base * 0.4) val = burstWeek ? 4 : Math.floor(Math.random() * 2) + 2;
        if (r < base * 0.15) val = 4;
      }
      week.push(val);
    }
    grid.push(week);
  }
  return grid;
};

const grid = generateContributions();

const totalContributions = grid.flat().filter((v) => v > 0).length * 3 + 247;

const cellColor = (val: number) => {
  if (val === 0) return "bg-muted/30";
  if (val === 1) return "bg-primary/20";
  if (val === 2) return "bg-primary/45";
  if (val === 3) return "bg-primary/70";
  return "bg-primary";
};

const stats = [
  { label: "Contributions", value: totalContributions, icon: GitCommit, color: "text-primary" },
  { label: "Repositories", value: 16, icon: Code2, color: "text-secondary" },
  { label: "Active Branches", value: 8, icon: GitBranch, color: "text-success" },
];

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const GitHubStats = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.65, ease: [0.2, 0, 0, 1] }}
      className="glass-panel p-4 sm:p-5"
    >
      <div className="window-title-bar -mx-4 sm:-mx-5 -mt-4 sm:-mt-5 mb-4 px-4 sm:px-5 pt-3 pb-2">
        <div className="window-dot bg-destructive/60" />
        <div className="window-dot bg-warning/60" />
        <div className="window-dot bg-success/60" />
        <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest ml-2">
          GitHub — Contribution Graph
        </span>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center gap-1 p-2 rounded-md border border-border/30 bg-surface/30"
          >
            <stat.icon className={`w-3 h-3 ${stat.color}`} />
            <span className="font-mono text-sm font-semibold text-foreground">{stat.value}+</span>
            <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-wider text-center">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Month labels */}
      <div className="flex gap-[3px] mb-1 pl-0 overflow-hidden">
        {months.map((m, i) => (
          <div
            key={m}
            className="font-mono text-[8px] text-muted-foreground/50"
            style={{ width: `${(100 / 12)}%` }}
          >
            {m}
          </div>
        ))}
      </div>

      {/* Contribution heatmap */}
      <div className="flex gap-[3px] overflow-hidden">
        {grid.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-[3px]">
            {week.map((val, di) => (
              <motion.div
                key={di}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: 0.6 + wi * 0.008 }}
                className={`w-[9px] h-[9px] rounded-[2px] ${cellColor(val)}`}
                title={`${val} contributions`}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Legend + link */}
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-[9px] text-muted-foreground/50">Less</span>
          {[0, 1, 2, 3, 4].map((v) => (
            <div key={v} className={`w-[9px] h-[9px] rounded-[2px] ${cellColor(v)}`} />
          ))}
          <span className="font-mono text-[9px] text-muted-foreground/50">More</span>
        </div>
        <a
          href="https://github.com/KavanGamii"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground hover:text-primary transition-colors"
        >
          <Github className="w-3 h-3" />
          KavanGamii →
        </a>
      </div>
    </motion.div>
  );
};

export default GitHubStats;
