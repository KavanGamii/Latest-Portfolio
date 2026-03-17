import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight } from "lucide-react";

interface CommandOption {
  label: string;
  description: string;
  action: string;
}

const options: CommandOption[] = [
  { label: "About", description: "System overview & status", action: "about" },
  { label: "Projects", description: "View active project instances", action: "projects" },
  { label: "Experience", description: "Browse mission log", action: "experience" },
  { label: "Skills", description: "Explore the skill matrix", action: "skills" },
  { label: "Contact", description: "Open terminal interface", action: "contact" },
  { label: "Download CV", description: "Export resume as PDF", action: "cv" },
];

interface CommandPaletteProps {
  onNavigate?: (section: string) => void;
}

const CommandPalette = ({ onNavigate }: CommandPaletteProps) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filtered = options.filter(
    (o) =>
      o.label.toLowerCase().includes(query.toLowerCase()) ||
      o.description.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeydown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
        setQuery("");
      }
      if (e.key === "Escape") setOpen(false);
    },
    []
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [handleKeydown]);

  const handleSelect = (action: string) => {
    setOpen(false);
    onNavigate?.(action);
  };

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => {
          setOpen(true);
          setQuery("");
        }}
        className="font-mono text-[10px] text-muted-foreground border border-border/50 rounded-md px-2.5 py-1.5 hover:border-primary/30 hover:text-foreground transition-all flex items-center gap-2"
      >
        <Search className="w-3 h-3" />
        <span className="hidden sm:inline">Command</span>
        <kbd className="text-[9px] bg-muted/30 px-1 py-0.5 rounded">⌘K</kbd>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] p-4"
            onClick={() => setOpen(false)}
          >
            <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
              className="relative glass-panel w-full max-w-md overflow-hidden !bg-[#000000]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 px-4 py-3 border-b border-border/30">
                <Search className="w-4 h-4 text-muted-foreground shrink-0" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search commands..."
                  className="flex-1 bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground font-mono"
                />
              </div>

              <div className="py-2 max-h-64 overflow-y-auto">
                {filtered.length === 0 ? (
                  <div className="px-4 py-6 text-center font-mono text-xs text-muted-foreground">
                    No results found.
                  </div>
                ) : (
                  filtered.map((option) => (
                    <button
                      key={option.action}
                      onClick={() => handleSelect(option.action)}
                      className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-primary/5 transition-colors group"
                    >
                      <div className="text-left">
                        <div className="text-sm text-foreground font-medium">{option.label}</div>
                        <div className="font-mono text-[10px] text-muted-foreground">{option.description}</div>
                      </div>
                      <ArrowRight className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CommandPalette;
