import { useEffect, useState } from "react";
import { GitBranch, Wifi, MapPin, Code2, Clock } from "lucide-react";

const StatusBar = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const timeStr = time.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "Asia/Kolkata",
    hour12: false,
  });

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 h-6 flex items-center justify-between px-3 font-mono text-[10px] select-none"
      style={{
        background: "hsl(190 90% 50%)",
        color: "hsl(230 15% 4%)",
      }}
    >
      {/* Left side */}
      <div className="flex items-center gap-0">
        <span className="flex items-center gap-1 px-2 h-6 bg-black/10 hover:bg-black/20 transition-colors cursor-default">
          <GitBranch className="w-3 h-3" />
          main
        </span>
        <span className="flex items-center gap-1 px-2 h-6 hover:bg-black/10 transition-colors cursor-default">
          <Wifi className="w-3 h-3" />
          Available for work
        </span>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-0">
        <span className="flex items-center gap-1 px-2 h-6 hover:bg-black/10 transition-colors cursor-default">
          <MapPin className="w-3 h-3" />
          Ahmedabad, India
        </span>
        <span className="flex items-center gap-1 px-2 h-6 bg-black/10 hover:bg-black/20 transition-colors cursor-default tabular-nums">
          <Clock className="w-3 h-3" />
          {timeStr}
        </span>
      </div>
    </div>
  );
};

export default StatusBar;
