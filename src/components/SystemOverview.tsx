import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Wifi, Github, Linkedin, Mail } from "lucide-react";

const SystemOverview = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const utc = time.toUTCString().slice(17, 25);
  const date = time.toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.2, 0, 0, 1] }}
      className="glass-panel p-4 sm:p-5"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-3 min-w-0">
          <div className="flex items-center gap-2">
            <div className="dot-indicator" />
            <span className="font-mono text-xs text-success uppercase tracking-wider">System Online</span>
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground text-balance">
              Kavan Gami
            </h1>
            <p className="font-mono text-sm text-primary mt-0.5">Frontend UI Engineer</p>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed max-w-md">
            I build fast, scalable, and performance-driven user interfaces. Not just UI — engineered frontend systems for real-world usage.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono flex-wrap">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3 h-3" />
              Ahmedabad, India
            </span>
            <span className="flex items-center gap-1.5">
              <Wifi className="w-3 h-3 text-success" />
              Available
            </span>
          </div>
          <div className="flex items-center gap-2 pt-1">
            <a href="https://github.com/KavanGamii" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Github className="w-4 h-4" />
            </a>
            <a href="https://www.linkedin.com/in/kavanpatel-it" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="mailto:kavangami13@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="text-right shrink-0 space-y-1">
          <div className="font-mono text-lg sm:text-xl text-foreground tabular-nums tracking-tight">{utc}</div>
          <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">UTC</div>
          <div className="font-mono text-[10px] text-muted-foreground">{date}</div>
        </div>
      </div>
    </motion.div>
  );
};

export default SystemOverview;
