import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

const education = [
  {
    id: "0xED01",
    degree: "Bachelor of Technology",
    field: "Information Technology",
    institution: "Ganpat University, Gujarat",
    period: "Aug 2021 – Jul 2024",
    status: "completed" as const,
  },
  {
    id: "0xED02",
    degree: "Diploma",
    field: "Information Technology",
    institution: "Ganpat University, Gujarat",
    period: "Aug 2018 – Jul 2021",
    status: "completed" as const,
  },
];

const Education = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5, ease: [0.2, 0, 0, 1] }}
      className="glass-panel p-4 sm:p-5"
    >
      <div className="window-title-bar -mx-4 sm:-mx-5 -mt-4 sm:-mt-5 mb-4 px-4 sm:px-5 pt-3 pb-2">
        <div className="window-dot bg-destructive/60" />
        <div className="window-dot bg-warning/60" />
        <div className="window-dot bg-success/60" />
        <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest ml-2">
          Education — Academic Log
        </span>
      </div>

      <div className="relative space-y-0">
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-muted-foreground/20" />

        {education.map((entry, i) => (
          <div key={entry.id} className="relative pl-7">
            <div className="absolute left-0 top-[10px] w-[15px] h-[15px] rounded-full border-2 border-secondary bg-secondary/20" />

            <div className="py-3">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="font-mono text-[10px] text-muted-foreground">{entry.id}</span>
                <span className="font-mono text-[9px] text-secondary bg-secondary/10 px-1.5 py-0.5 rounded uppercase tracking-wider">
                  {entry.status}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <GraduationCap className="w-3.5 h-3.5 text-secondary shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-foreground">
                    {entry.degree} <span className="text-secondary">in {entry.field}</span>
                  </h3>
                  <p className="font-mono text-xs text-muted-foreground mt-0.5">
                    {entry.institution}
                  </p>
                  <p className="font-mono text-[10px] text-muted-foreground/60 mt-0.5">
                    {entry.period}
                  </p>
                </div>
              </div>
            </div>

            {i < education.length - 1 && <div className="border-b border-border/30" />}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Education;
