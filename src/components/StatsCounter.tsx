import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const stats = [
  { label: "Years Experience", value: 2, suffix: "+", color: "text-primary" },
  { label: "Projects Shipped", value: 15, suffix: "+", color: "text-secondary" },
  { label: "UI Components Built", value: 200, suffix: "+", color: "text-success" },
  { label: "Performance Boost", value: 30, suffix: "%", color: "text-warning" },
];

const useCountUp = (target: number, duration = 1500, started = false) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // ease out
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, started]);

  return count;
};

const StatItem = ({ label, value, suffix, color, delay, started }: {
  label: string; value: number; suffix: string; color: string; delay: number; started: boolean;
}) => {
  const count = useCountUp(value, 1400, started);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={started ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col items-center gap-1 p-3 rounded-md border border-border/30 bg-surface/30 text-center"
    >
      <div className={`font-mono text-2xl font-bold tabular-nums ${color}`}>
        {count}{suffix}
      </div>
      <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider leading-tight">
        {label}
      </div>
    </motion.div>
  );
};

const StatsCounter = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.2, 0, 0, 1] }}
      className="glass-panel p-4 sm:p-5"
    >
      <div className="window-title-bar -mx-4 sm:-mx-5 -mt-4 sm:-mt-5 mb-4 px-4 sm:px-5 pt-3 pb-2">
        <div className="window-dot bg-destructive/60" />
        <div className="window-dot bg-warning/60" />
        <div className="window-dot bg-success/60" />
        <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest ml-2">
          System Stats — Runtime Metrics
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map((s, i) => (
          <StatItem key={s.label} {...s} delay={i * 0.1} started={started} />
        ))}
      </div>
    </motion.div>
  );
};

export default StatsCounter;
