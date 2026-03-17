import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";

const certs = [
  {
    id: "CERT-001",
    title: "TCS iON Career Edge",
    issuer: "TCS",
    color: "hsl(190 90% 50%)",
  },
  {
    id: "CERT-002",
    title: "C++ Programming",
    issuer: "C-DAC",
    color: "hsl(260 80% 70%)",
  },
  {
    id: "CERT-003",
    title: "JavaScript Project",
    issuer: "Great Learning",
    color: "hsl(40 90% 55%)",
  },
];

const Certifications = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.58, ease: [0.2, 0, 0, 1] }}
      className="glass-panel p-4 sm:p-5"
    >
      <div className="window-title-bar -mx-4 sm:-mx-5 -mt-4 sm:-mt-5 mb-4 px-4 sm:px-5 pt-3 pb-2">
        <div className="window-dot bg-destructive/60" />
        <div className="window-dot bg-warning/60" />
        <div className="window-dot bg-success/60" />
        <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest ml-2">
          Certifications — {certs.length} verified
        </span>
      </div>

      <div className="space-y-2">
        {certs.map((cert, i) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.7 + i * 0.08 }}
            className="flex items-center gap-3 p-2.5 rounded-md border border-border/30 bg-surface/30 hover:border-primary/20 transition-colors group"
          >
            <BadgeCheck
              className="w-4 h-4 shrink-0"
              style={{ color: cert.color }}
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-foreground group-hover:text-primary transition-colors truncate">
                {cert.title}
              </p>
              <p className="font-mono text-[10px] text-muted-foreground">{cert.issuer}</p>
            </div>
            <span className="font-mono text-[9px] text-muted-foreground/50 shrink-0">{cert.id}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Certifications;
