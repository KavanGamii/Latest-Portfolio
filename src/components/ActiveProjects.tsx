import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Maximize2, X, Github } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  status: "live";
  color: string;
  link: string;
  github: string;
}

const projects: Project[] = [
  {
    id: "proj-001",
    title: "Split By Yours",
    description: "Real-time bill splitting application with instant calculations.",
    tech: ["React.js", "Tailwind CSS"],
    status: "live",
    color: "hsl(190 90% 50%)",
    link: "https://split-by-yours.vercel.app",
    github: "https://github.com/KavanGamii",
  },
  {
    id: "proj-002",
    title: "MYE (Manage Your Expense)",
    description: "Offline-first expense tracker PWA with optimized mobile experience.",
    tech: ["React.js", "Tailwind CSS"],
    status: "live",
    color: "hsl(260 80% 70%)",
    link: "https://mye-manage-your-expence.vercel.app/",
    github: "https://github.com/KavanGamii",
  },
  {
    id: "proj-003",
    title: "Store By Yours",
    description: "Document management platform for uploading and organizing files.",
    tech: ["Next.js", "Tailwind CSS"],
    status: "live",
    color: "hsl(150 80% 50%)",
    link: "https://storebyyours.netlify.app/",
    github: "https://github.com/KavanGamii",
  },
];

const ActiveProjects = () => {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4, ease: [0.2, 0, 0, 1] }}
      className="glass-panel p-4 sm:p-5"
    >
      <div className="window-title-bar -mx-4 sm:-mx-5 -mt-4 sm:-mt-5 mb-4 px-4 sm:px-5 pt-3 pb-2">
        <div className="window-dot bg-destructive/60" />
        <div className="window-dot bg-warning/60" />
        <div className="window-dot bg-success/60" />
        <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest ml-2">
          Active Projects — {projects.length} instances
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            layoutId={project.id}
            onClick={() => setExpanded(expanded === project.id ? null : project.id)}
            className="relative border border-border/50 rounded-md p-3 cursor-pointer group hover:border-primary/20 transition-all duration-300 bg-surface/50"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{
                    backgroundColor: project.color,
                    boxShadow: `0 0 8px ${project.color}60`,
                  }}
                />
                <h3 className="text-sm font-medium text-foreground">{project.title}</h3>
              </div>
              <span className="font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded text-success bg-success/10">
                {project.status}
              </span>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed mb-3">{project.description}</p>

            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <span key={t} className="font-mono text-[10px] text-muted-foreground bg-muted/50 px-1.5 py-0.5 rounded">
                  {t}
                </span>
              ))}
            </div>

            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <Maximize2 className="w-3 h-3 text-muted-foreground" />
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex items-center justify-center p-4 sm:p-8"
            onClick={() => setExpanded(null)}
          >
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
            <motion.div
              layoutId={expanded}
              className="relative glass-panel p-6 sm:p-8 max-w-lg w-full z-10"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const project = projects.find((p) => p.id === expanded);
                if (!project) return null;
                return (
                  <>
                    <button
                      onClick={() => setExpanded(null)}
                      className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{
                          backgroundColor: project.color,
                          boxShadow: `0 0 12px ${project.color}60`,
                        }}
                      />
                      <h2 className="text-lg font-semibold text-foreground">{project.title}</h2>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((t) => (
                        <span key={t} className="font-mono text-xs text-primary bg-primary/10 px-2 py-1 rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-3 font-mono text-xs">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-primary hover:text-primary/80 transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" />
                        View Live
                      </a>
                      <span className="text-muted-foreground/30">|</span>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Github className="w-3 h-3" />
                        Source Code
                      </a>
                    </div>
                  </>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ActiveProjects;
