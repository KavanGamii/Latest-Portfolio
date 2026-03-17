import { motion } from "framer-motion";

const tools = [
  { name: "React.js", abbr: "Re" },
  { name: "Vue.js", abbr: "Vu" },
  { name: "Tailwind", abbr: "TW" },
  { name: "Bootstrap", abbr: "BS" },
  { name: "Figma", abbr: "FG" },
  { name: "Git", abbr: "GT" },
  { name: "GitHub", abbr: "GH" },
  { name: "SCSS", abbr: "SC" },
];

const ToolsBelt = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.55, ease: [0.2, 0, 0, 1] }}
      className="glass-panel p-4 sm:p-5"
    >
      <div className="window-title-bar -mx-4 sm:-mx-5 -mt-4 sm:-mt-5 mb-4 px-4 sm:px-5 pt-3 pb-2">
        <div className="window-dot bg-destructive/60" />
        <div className="window-dot bg-warning/60" />
        <div className="window-dot bg-success/60" />
        <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest ml-2">Environment</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {tools.map((tool, i) => (
          <motion.div
            key={tool.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.7 + i * 0.05 }}
            whileHover={{ scale: 1.08, y: -2 }}
            className="group flex flex-col items-center gap-1.5 cursor-default"
          >
            <div className="w-12 h-12 rounded-lg border border-border/50 bg-surface-elevated flex items-center justify-center font-mono text-xs font-semibold text-muted-foreground group-hover:text-primary group-hover:border-primary/30 transition-all duration-200">
              {tool.abbr}
            </div>
            <span className="font-mono text-[9px] text-muted-foreground/60 group-hover:text-muted-foreground transition-colors">
              {tool.name}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ToolsBelt;
