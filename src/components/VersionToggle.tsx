"use client";

import { useVersion } from "@/lib/VersionContext";
import { motion } from "framer-motion";

export default function VersionToggle() {
  const { version, setVersion } = useVersion();

  return (
    <div className="flex items-center gap-2 p-1 rounded-full bg-muted/50 border border-border/50 backdrop-blur-sm">
      <button
        onClick={() => setVersion("v1")}
        className={`relative px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-full transition-all ${
          version === "v1"
            ? "text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        {version === "v1" && (
          <motion.div
            layoutId="version-bg"
            className="absolute inset-0 bg-primary rounded-full -z-10"
            transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
          />
        )}
        v1
      </button>
      <button
        onClick={() => setVersion("v2")}
        className={`relative px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-full transition-all ${
          version === "v2"
            ? "text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        {version === "v2" && (
          <motion.div
            layoutId="version-bg"
            className="absolute inset-0 bg-primary rounded-full -z-10"
            transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
          />
        )}
        v2
      </button>
    </div>
  );
}
