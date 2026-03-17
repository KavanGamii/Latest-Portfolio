import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface TerminalLine {
  type: "input" | "output" | "error" | "system";
  text: string;
}

const helpText = `Available commands:
  about       — System overview
  projects    — List active projects
  skills      — Show skill matrix
  contact     — Send a message
  clear       — Clear terminal
  help        — Show this help

Usage: contact --message "Your message here"`;

const Terminal = () => {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: "system", text: 'SENTINEL Terminal v4.2.1 — Type "help" for available commands.' },
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  const processCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const newLines: TerminalLine[] = [{ type: "input", text: `> ${cmd}` }];

    if (trimmed === "help") {
      newLines.push({ type: "output", text: helpText });
    } else if (trimmed === "about") {
      newLines.push({
        type: "output",
        text: "Kavan Gami — Frontend UI Engineer\nAhmedabad, India | 2+ years experience\nBuilding scalable web apps with React.js and modern UI systems.\nFocus: performance, responsiveness, clean architecture.",
      });
    } else if (trimmed === "projects") {
      newLines.push({
        type: "output",
        text: "● Split By Yours       [LIVE]  — Real-time bill splitting\n● MYE Expense Tracker  [LIVE]  — Offline-first PWA\n● Store By Yours       [LIVE]  — Document management",
      });
    } else if (trimmed === "skills") {
      newLines.push({
        type: "output",
        text: "Core     → HTML5, CSS3, SCSS, JS (ES6+)\nFramework → React.js, Vue.js\nUI       → Tailwind CSS, Bootstrap\nTools    → Figma, Git, GitHub",
      });
    } else if (trimmed.startsWith("contact")) {
      const msgMatch = cmd.match(/--message\s+"([^"]+)"/);
      if (msgMatch) {
        newLines.push({ type: "system", text: `Message received: "${msgMatch[1]}"\nReach me at kavangami13@gmail.com — I'll respond within 24 hours.` });
      } else {
        newLines.push({ type: "error", text: 'Usage: contact --message "Your message here"\nOr email directly: kavangami13@gmail.com' });
      }
    } else if (trimmed === "clear") {
      setLines([{ type: "system", text: "Terminal cleared." }]);
      return;
    } else if (trimmed === "") {
      return;
    } else {
      newLines.push({ type: "error", text: `Command not found: ${trimmed}. Type "help" for available commands.` });
    }

    setLines((prev) => [...prev, ...newLines]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    processCommand(input);
    setInput("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.7, ease: [0.2, 0, 0, 1] }}
      className="glass-panel overflow-hidden"
    >
      <div className="window-title-bar px-4 pt-3 pb-2">
        <div className="window-dot bg-destructive/60" />
        <div className="window-dot bg-warning/60" />
        <div className="window-dot bg-success/60" />
        <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest ml-2">Terminal — Contact Interface</span>
      </div>

      <div
        ref={scrollRef}
        className="p-4 max-h-64 overflow-y-auto font-mono text-xs leading-relaxed"
        onClick={() => inputRef.current?.focus()}
      >
        {lines.map((line, i) => (
          <div
            key={i}
            className={`whitespace-pre-wrap mb-1 ${
              line.type === "input"
                ? "text-foreground"
                : line.type === "error"
                ? "text-destructive"
                : line.type === "system"
                ? "text-primary"
                : "text-muted-foreground"
            }`}
          >
            {line.text}
          </div>
        ))}

        <form onSubmit={handleSubmit} className="flex items-center mt-1">
          <span className="text-primary mr-2">{">"}</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent outline-none text-foreground caret-primary"
            placeholder="Type a command..."
            autoComplete="off"
            spellCheck={false}
          />
        </form>
      </div>

      <div className="px-4 pb-3 flex flex-wrap gap-1.5">
        {["help", "about", "projects", "skills", "contact"].map((cmd) => (
          <button
            key={cmd}
            onClick={() => processCommand(cmd)}
            className="font-mono text-[10px] text-muted-foreground bg-muted/30 hover:bg-muted/50 hover:text-foreground px-2 py-1 rounded transition-colors"
          >
            {cmd}
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default Terminal;
