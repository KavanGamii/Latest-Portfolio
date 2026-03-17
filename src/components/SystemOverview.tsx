import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Wifi, Github, Linkedin, Mail, Download } from "lucide-react";

const roles = [
  "Frontend UI Engineer",
  "React.js Developer",
  "UI Systems Builder",
  "Performance Engineer",
];

const useTypingEffect = (texts: string[], speed = 60, pause = 1800) => {
  const [display, setDisplay] = useState("");
  const [index, setIndex] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[index];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx <= current.length) {
      timeout = setTimeout(() => {
        setDisplay(current.slice(0, charIdx));
        setCharIdx((c) => c + 1);
      }, speed);
    } else if (!deleting && charIdx > current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx >= 0) {
      timeout = setTimeout(() => {
        setDisplay(current.slice(0, charIdx));
        setCharIdx((c) => c - 1);
      }, speed / 2);
    } else {
      setDeleting(false);
      setIndex((i) => (i + 1) % texts.length);
    }

    return () => clearTimeout(timeout);
  }, [charIdx, deleting, index, texts, speed, pause]);

  return display;
};

const SystemOverview = () => {
  const [time, setTime] = useState(new Date());
  const typedRole = useTypingEffect(roles);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const utc = time.toLocaleTimeString("en-GB", {
    hour: "2-digit", minute: "2-digit", second: "2-digit",
    timeZone: "Asia/Kolkata", hour12: false,
  });
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
              <span className="glitch-wrapper" data-text="Kavan Gami">Kavan Gami</span>
            </h1>
            <p className="font-mono text-sm text-primary mt-0.5 h-5">
              {typedRole}
              <span className="animate-pulse">▋</span>
            </p>
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
            <a
              href="/resume.pdf"
              download="Kavan-Gami-Resume.pdf"
              className="flex items-center gap-1.5 ml-2 px-2.5 py-1 rounded border border-primary/40 text-primary hover:bg-primary/10 transition-colors font-mono text-[10px] uppercase tracking-wider"
            >
              <Download className="w-3 h-3" />
              Resume
            </a>
          </div>
        </div>

        <div className="text-right shrink-0 space-y-1">
          <div className="font-mono text-lg sm:text-xl text-foreground tabular-nums tracking-tight">{utc}</div>
          <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">IST</div>
          <div className="font-mono text-[10px] text-muted-foreground">{date}</div>
        </div>
      </div>
    </motion.div>
  );
};

export default SystemOverview;
