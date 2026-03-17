import { motion } from "framer-motion";
import { Zap, Shield, Smartphone, Bug } from "lucide-react";

const metrics = [
  { label: "Performance", value: "High", icon: Zap, color: "text-primary" },
  { label: "Reusability", value: "High", icon: Shield, color: "text-secondary" },
  { label: "Responsiveness", value: "Maximum", icon: Smartphone, color: "text-success" },
  { label: "Bug Tolerance", value: "Low", icon: Bug, color: "text-warning" },
];

const SystemMetrics = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6, ease: [0.2, 0, 0, 1] }}
      className="glass-panel p-4 sm:p-5"
    >
      <div className="window-title-bar -mx-4 sm:-mx-5 -mt-4 sm:-mt-5 mb-4 px-4 sm:px-5 pt-3 pb-2">
        <div className="window-dot bg-destructive/60" />
        <div className="window-dot bg-warning/60" />
        <div className="window-dot bg-success/60" />
        <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest ml-2">System Metrics</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.8 + i * 0.1 }}
            className="space-y-2"
          >
            <div className="flex items-center gap-1.5">
              <m.icon className={`w-3.5 h-3.5 ${m.color}`} />
              <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">{m.label}</span>
            </div>
            <div className="font-mono text-lg font-semibold text-foreground">{m.value}</div>
            {/* Visual bar */}
            <div className="w-full h-1 rounded-full bg-muted/30 overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${
                  m.label === "Bug Tolerance" ? "bg-warning" : "bg-primary"
                }`}
                initial={{ width: 0 }}
                animate={{ width: m.label === "Bug Tolerance" ? "15%" : m.label === "Responsiveness" ? "100%" : "85%" }}
                transition={{ duration: 0.8, delay: 1 + i * 0.1 }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SystemMetrics;
