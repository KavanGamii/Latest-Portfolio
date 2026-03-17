import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Loader } from "lucide-react";
import emailjs from "@emailjs/browser";

const SERVICE_ID = "service_ilb2q7j";
const TEMPLATE_ID = "template_nxwoto8";
const PUBLIC_KEY = "y5jqun0RDkUcYY52H";

type Status = "idle" | "sending" | "success" | "error";

const ContactForm = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        { name: form.name, email: form.email, message: form.message },
        PUBLIC_KEY
      );
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full bg-surface/50 border border-border/50 rounded-md px-3 py-2 font-mono text-xs text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 focus:bg-surface transition-all duration-200";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.75, ease: [0.2, 0, 0, 1] }}
      className="glass-panel p-4 sm:p-5"
    >
      <div className="window-title-bar -mx-4 sm:-mx-5 -mt-4 sm:-mt-5 mb-4 px-4 sm:px-5 pt-3 pb-2">
        <div className="window-dot bg-destructive/60" />
        <div className="window-dot bg-warning/60" />
        <div className="window-dot bg-success/60" />
        <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest ml-2">
          Contact — Transmission Interface
        </span>
      </div>

      {status === "success" ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center py-8 gap-3 text-center"
        >
          <CheckCircle className="w-8 h-8 text-success" />
          <p className="font-mono text-sm text-success">Transmission successful.</p>
          <p className="font-mono text-xs text-muted-foreground">I'll respond within 24 hours.</p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-2 font-mono text-[10px] text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider"
          >
            [ Send another ]
          </button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
                <span className="text-primary">$</span> identifier
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Your name"
                className={inputClass}
              />
            </div>
            <div className="space-y-1">
              <label className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
                <span className="text-primary">$</span> return_address
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
                className={inputClass}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
              <span className="text-primary">$</span> payload
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Your message..."
              className={`${inputClass} resize-none`}
            />
          </div>

          {status === "error" && (
            <div className="flex items-center gap-2 text-destructive font-mono text-xs">
              <AlertCircle className="w-3.5 h-3.5" />
              Transmission failed. Try emailing kavangami13@gmail.com directly.
            </div>
          )}

          <div className="flex items-center justify-between pt-1">
            <span className="font-mono text-[10px] text-muted-foreground/40">
              kavangami13@gmail.com
            </span>
            <button
              type="submit"
              disabled={status === "sending"}
              className="flex items-center gap-2 px-4 py-2 rounded-md border border-primary/40 text-primary hover:bg-primary/10 transition-all font-mono text-[10px] uppercase tracking-wider disabled:opacity-50"
            >
              {status === "sending" ? (
                <Loader className="w-3 h-3 animate-spin" />
              ) : (
                <Send className="w-3 h-3" />
              )}
              {status === "sending" ? "Sending..." : "Transmit"}
            </button>
          </div>
        </form>
      )}
    </motion.div>
  );
};

export default ContactForm;
