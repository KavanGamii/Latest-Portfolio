import { useState } from "react";
import { motion } from "framer-motion";

interface SkillNode {
  name: string;
  category: "core" | "framework" | "ui" | "tool" | "performance";
  connections: string[];
}

const skills: SkillNode[] = [
  { name: "HTML5", category: "core", connections: ["CSS3", "JavaScript (ES6+)"] },
  { name: "CSS3", category: "core", connections: ["HTML5", "SCSS", "Tailwind CSS", "Bootstrap"] },
  { name: "SCSS", category: "core", connections: ["CSS3", "Tailwind CSS"] },
  { name: "JavaScript (ES6+)", category: "core", connections: ["HTML5", "React.js", "Vue.js"] },
  { name: "React.js", category: "framework", connections: ["JavaScript (ES6+)", "Tailwind CSS", "Vue.js"] },
  { name: "Vue.js", category: "framework", connections: ["JavaScript (ES6+)", "React.js"] },
  { name: "Tailwind CSS", category: "ui", connections: ["CSS3", "React.js", "SCSS"] },
  { name: "Bootstrap", category: "ui", connections: ["CSS3", "HTML5"] },
  { name: "Figma", category: "tool", connections: ["CSS3", "Tailwind CSS"] },
  { name: "Git", category: "tool", connections: ["GitHub"] },
  { name: "GitHub", category: "tool", connections: ["Git", "React.js"] },
  { name: "Optimization", category: "performance", connections: ["React.js", "JavaScript (ES6+)"] },
  { name: "Cross-browser", category: "performance", connections: ["CSS3", "HTML5"] },
];

const categoryColors: Record<string, string> = {
  core: "hsl(190 90% 50%)",
  framework: "hsl(260 80% 70%)",
  ui: "hsl(150 80% 50%)",
  tool: "hsl(40 90% 55%)",
  performance: "hsl(340 80% 60%)",
};

const categoryLabels: Record<string, string> = {
  core: "Core",
  framework: "Frameworks",
  ui: "UI Systems",
  tool: "Tools",
  performance: "Performance",
};

const SkillMatrix = () => {
  const [hovered, setHovered] = useState<string | null>(null);

  const isConnected = (name: string) => {
    if (!hovered) return false;
    const hoveredNode = skills.find((s) => s.name === hovered);
    return hoveredNode?.connections.includes(name) || name === hovered;
  };

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
          Skill Matrix — {skills.length} nodes
        </span>
      </div>

      <div className="flex flex-wrap gap-3 mb-4">
        {Object.entries(categoryColors).map(([cat, color]) => (
          <div key={cat} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
            <span className="font-mono text-[10px] text-muted-foreground">{categoryLabels[cat]}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => {
          const active = hovered === null || isConnected(skill.name);
          const color = categoryColors[skill.category];
          return (
            <motion.button
              key={skill.name}
              onMouseEnter={() => setHovered(skill.name)}
              onMouseLeave={() => setHovered(null)}
              animate={{
                opacity: active ? 1 : 0.2,
                scale: hovered === skill.name ? 1.05 : 1,
              }}
              transition={{ duration: 0.2 }}
              className="relative font-mono text-xs px-3 py-2 rounded-md border transition-colors duration-200"
              style={{
                borderColor: active ? `${color}40` : "hsl(0 0% 100% / 0.03)",
                backgroundColor: hovered === skill.name ? `${color}15` : "hsl(230 15% 7% / 0.5)",
              }}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    backgroundColor: color,
                    boxShadow: hovered === skill.name ? `0 0 8px ${color}80` : "none",
                  }}
                />
                <span className={active ? "text-foreground" : "text-muted-foreground"}>{skill.name}</span>
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="mt-4 h-6 font-mono text-[10px] text-muted-foreground">
        {hovered ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
            <span className="text-primary">{hovered}</span>
            <span>→</span>
            <span>{skills.find((s) => s.name === hovered)?.connections.join(", ")}</span>
          </motion.div>
        ) : (
          <span className="text-muted-foreground/40">Hover to explore dependencies</span>
        )}
      </div>
    </motion.div>
  );
};

export default SkillMatrix;
