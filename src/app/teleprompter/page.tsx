import React from "react";
import fs from "fs";
import path from "path";
import TeleprompterClient, { Script } from "@/components/TeleprompterClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Teleprompter | Tudor Crișan",
  description: "High-contrast fullscreen OLED teleprompter for LinkedIn and video script recording.",
};

function parseScripts(): Script[] {
  try {
    const filePath = path.join(process.cwd(), "reels_scripts.md");
    const content = fs.readFileSync(filePath, "utf-8");
    
    // Split by "### Script "
    const parts = content.split("### Script ");
    const scripts: Script[] = [];
    
    for (let i = 1; i < parts.length; i++) {
      const part = parts[i];
      const lines = part.split("\n");
      
      const titleLine = lines[0].trim();
      // Extract ID and actual title: e.g. "1 — Burning hours on developers?"
      const idMatch = titleLine.match(/^(\d+)\s*—\s*(.*)$/);
      const id = idMatch ? parseInt(idMatch[1]) : i;
      const title = idMatch ? idMatch[2] : titleLine;
      
      let duration = "";
      let hook = "";
      let body = "";
      let cta = "";
      
      let currentSection: "none" | "hook" | "body" | "cta" = "none";
      
      for (let j = 1; j < lines.length; j++) {
        const line = lines[j].trim();
        if (!line) continue;
        
        if (line.startsWith("*~")) {
          duration = line.replace(/^\*~/, "").replace(/\*$/, "").trim();
          continue;
        }
        
        if (line.toLowerCase().includes("**hook**")) {
          currentSection = "hook";
          continue;
        }
        if (line.toLowerCase().includes("**body**")) {
          currentSection = "body";
          continue;
        }
        if (line.toLowerCase().includes("**cta**")) {
          currentSection = "cta";
          continue;
        }
        
        // Append based on currently parsed section
        if (currentSection === "hook") {
          hook += (hook ? " " : "") + line;
        } else if (currentSection === "body") {
          body += (body ? " " : "") + line;
        } else if (currentSection === "cta") {
          cta += (cta ? " " : "") + line;
        }
      }
      
      const fullText = `${hook}\n\n${body}\n\n${cta}`;
      
      scripts.push({
        id,
        title,
        duration,
        hook,
        body,
        cta,
        fullText,
      });
    }
    
    return scripts;
  } catch (error) {
    console.error("Error reading or parsing reels_scripts.md:", error);
    return [];
  }
}

export default async function TeleprompterPage() {
  const scripts = parseScripts();
  return <TeleprompterClient scripts={scripts} />;
}
