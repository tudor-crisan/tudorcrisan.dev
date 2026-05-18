"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, Play, Pause, Maximize, RotateCcw, Sliders, Check } from "lucide-react";

export interface Script {
  id: number;
  title: string;
  duration: string;
  hook: string;
  body: string;
  cta: string;
  fullText: string;
}

interface TeleprompterClientProps {
  scripts: Script[];
}

const powerWordsSet = new Set([
  'founder', 'founders', 'developer', 'developers', 'systems', 'system', 'people', 
  'problem', 'problems', 'ceos', 'ceo', 'bottlenecks', 'bottleneck', 'needle', 
  'deals', 'raising', 'capital', 'revenue', 'scaling', 'scale', 'product', 
  'release', 'disaster', 'zidy', 'zidy.fun', 'mrr', 'businesses', 'broken', 
  'prototype', 'consultant', 'vetting', 'babysitting', 'outcome', 'outcomes', 
  'strategy', 'execution', 'bugs', 'quality', 'delivery', 'firefighting', 'hours'
]);

function isPowerWord(word: string) {
  const clean = word.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()—?]/g,"");
  return powerWordsSet.has(clean);
}

export default function TeleprompterClient({ scripts }: TeleprompterClientProps) {
  const [activeScript, setActiveScript] = useState<Script | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(3);
  const [fontSize, setFontSize] = useState(32); // in pixels
  const [mode, setMode] = useState<"scroll" | "step">("scroll");
  const [currentStep, setCurrentStep] = useState<"hook" | "body" | "cta" | "done">("hook");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [customText, setCustomText] = useState("");
  const [customTitle, setCustomTitle] = useState("");
  const [isEditingCustom, setIsEditingCustom] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activeWordRef = useRef<HTMLSpanElement | null>(null);

  // Smooth scroll active word to center of screen when currentWordIndex changes
  useEffect(() => {
    if (activeWordRef.current) {
      activeWordRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [currentWordIndex]);

  // Split script words dynamically
  const rsvpWords = React.useMemo(() => {
    if (!activeScript) return [];
    return activeScript.fullText.trim().split(/\s+/).filter(w => w.length > 0 && !/^[-—–•*]+$/.test(w));
  }, [activeScript]);

  // Word-by-Word RSVP Playback Loop with Dynamic speech pacing and slower base WPM
  useEffect(() => {
    if (!isPlaying || !isFullscreen || !activeScript || rsvpWords.length === 0) return;

    let timeoutId: NodeJS.Timeout;

    const runLoop = (index: number) => {
      // WPM = 80 + speed * 25 (half of previous speed by default)
      const wpm = 80 + speed * 25;
      const baseIntervalMs = (60 / wpm) * 1000;

      const activeWord = rsvpWords[index];
      let intervalMs = baseIntervalMs;

      if (activeWord) {
        // Pause on sentence endings: . ? !
        if (/[.?!]/.test(activeWord)) {
          intervalMs += 450; // generous breathing pause
        }
        // Pause on clauses: , : ; —
        else if (/[,:;—]/.test(activeWord)) {
          intervalMs += 220; // clause phrasing pause
        }

        // Pause on power words to allow emphasis
        if (isPowerWord(activeWord)) {
          intervalMs *= 1.25; // extend duration by 25%
        }

        // Faster pace on ultra-short articles/conjunctions
        const cleanWord = activeWord.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()—?]/g,"");
        if (cleanWord.length <= 3 && ["a", "an", "the", "of", "to", "in", "is", "it", "on", "at", "by"].includes(cleanWord)) {
          intervalMs *= 0.75; // speed up by 25%
        }
      }

      timeoutId = setTimeout(() => {
        const nextIndex = index + 1;
        if (nextIndex >= rsvpWords.length) {
          setIsPlaying(false);
          return;
        }
        setCurrentWordIndex(nextIndex);
        runLoop(nextIndex);
      }, intervalMs);
    };

    runLoop(currentWordIndex);

    return () => clearTimeout(timeoutId);
  }, [isPlaying, isFullscreen, speed, activeScript, rsvpWords, currentWordIndex]);

  // Handle Fullscreen UI instructions fade-out
  useEffect(() => {
    if (isFullscreen) {
      setShowInstructions(true);
      const timer = setTimeout(() => {
        setShowInstructions(false);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [isFullscreen, activeScript, mode]);

  // Rich Studio Keyboard Shortcuts for RSVP playback
  useEffect(() => {
    if (!isFullscreen || !activeScript) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Spacebar: Play/Pause
      if (e.code === "Space") {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      }
      // ArrowRight: Step one word forward, pause playback
      if (e.code === "ArrowRight") {
        e.preventDefault();
        setIsPlaying(false);
        setCurrentWordIndex((prev) => Math.min(rsvpWords.length - 1, prev + 1));
      }
      // ArrowLeft: Step one word backward, pause playback
      if (e.code === "ArrowLeft") {
        e.preventDefault();
        setIsPlaying(false);
        setCurrentWordIndex((prev) => Math.max(0, prev - 1));
      }
      // ArrowUp: Adjust Font Size larger
      if (e.code === "ArrowUp") {
        e.preventDefault();
        setFontSize((prev) => Math.min(60, prev + 2));
      }
      // ArrowDown: Adjust Font Size smaller
      if (e.code === "ArrowDown") {
        e.preventDefault();
        setFontSize((prev) => Math.max(16, prev - 2));
      }
      // [ : Decrease prompter speed
      if (e.code === "BracketLeft") {
        e.preventDefault();
        setSpeed((prev) => Math.max(1, prev - 1));
      }
      // ] : Increase prompter speed
      if (e.code === "BracketRight") {
        e.preventDefault();
        setSpeed((prev) => Math.min(10, prev + 1));
      }
      // Key R: Reset prompter to start
      if (e.code === "KeyR") {
        e.preventDefault();
        resetScript();
      }
      // Escape: Exit fullscreen studio prompter
      if (e.code === "Escape") {
        e.preventDefault();
        setIsFullscreen(false);
        setIsPlaying(false);
        if (document.exitFullscreen) {
          document.exitFullscreen().catch(() => {});
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen, activeScript, rsvpWords]);

  const enterFullscreen = () => {
    setIsFullscreen(true);
    setCurrentWordIndex(0);
    // Give a short delay for preparation
    setTimeout(() => {
      setIsPlaying(true);
    }, 1500);
    // Request native browser fullscreen if supported
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(() => {});
    }
  };

  const handleScreenTouch = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isFullscreen) return;

    if (mode === "scroll") {
      setIsPlaying((prev) => !prev);
    } else {
      // Step-by-Step advancement
      if (currentStep === "hook") {
        setCurrentStep("body");
      } else if (currentStep === "body") {
        setCurrentStep("cta");
      } else if (currentStep === "cta") {
        setCurrentStep("done");
      } else {
        setCurrentStep("hook");
      }
    }
  };

  const resetScript = () => {
    setIsPlaying(false);
    setCurrentWordIndex(0);
    setCurrentStep("hook");
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  };

  const handleLaunchCustom = () => {
    if (!customText.trim()) return;
    const wordCount = customText.trim().split(/\s+/).length;
    const estSec = Math.round((wordCount / 155) * 60);
    
    const tempScript: Script = {
      id: 99,
      title: customTitle.trim() || "Custom Studio Script",
      duration: `${estSec}s`,
      hook: "Custom Hook",
      body: customText,
      cta: "Custom CTA",
      fullText: customText
    };
    setActiveScript(tempScript);
    resetScript();
  };

  // Sync native fullscreen exits with React state
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!document.fullscreenElement;
      setIsFullscreen(isCurrentlyFullscreen);
      if (!isCurrentlyFullscreen) {
        setIsPlaying(false);
      }
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // If in fullscreen recorder mode, render the pitch-black OLED teleprompter
  if (isFullscreen && activeScript) {
    return (
      <div
        onClick={handleScreenTouch}
        className="fixed inset-0 bg-black text-white z-[99999] overflow-hidden flex flex-col justify-center items-center cursor-pointer select-none font-sans"
        style={{ backgroundColor: "#000000" }}
      >
        {/* Top visual timeline progress bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/[0.03] z-50 pointer-events-none">
          <div 
            className="h-full bg-gradient-to-r from-primary to-[#00b8cc] transition-all duration-300 shadow-[0_0_12px_rgba(0,229,255,0.6)]"
            style={{ width: `${rsvpWords.length > 0 ? (currentWordIndex / rsvpWords.length) * 100 : 0}%` }}
          />
        </div>

        {/* Replicated Tudor Profile Photo Glow - Scaled down for perfect black edge boundaries */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] bg-gradient-to-tr from-primary to-secondary rounded-[2.5rem] opacity-[0.12] blur-3xl animate-pulse pointer-events-none z-0" />

        {/* Animated background glow spheres matching home hero section */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-[0.08]">
          <div className="absolute top-[30%] left-[20%] w-[280px] h-[280px] rounded-full bg-[#00e5ff] blur-[80px] animate-pulse-slow" />
          <div className="absolute bottom-[25%] right-[20%] w-[220px] h-[220px] rounded-full bg-[#ffaa00] blur-[80px] animate-pulse-slow" style={{ animationDelay: "2s" }} />
        </div>

        {/* High-End Visual Focus Guide Band */}
        {mode === "scroll" && (
          <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-[76px] bg-white/[0.015] border-y border-white/[0.03] pointer-events-none z-0 flex items-center justify-between px-12 select-none">
            <span className="text-[7px] font-black tracking-[0.25em] text-primary opacity-25 uppercase">Focus Zone</span>
            <span className="text-[7px] font-black tracking-[0.25em] text-primary opacity-25 uppercase">Focus Zone</span>
          </div>
        )}

        {/* Floating Presenter Hotkey Guide Overlay */}
        <div 
          onClick={(e) => e.stopPropagation()}
          className={`absolute top-6 right-6 p-4 rounded-2xl bg-black/45 border border-white/5 backdrop-blur-md flex flex-col gap-2 z-50 text-[10px] tracking-wide text-muted-foreground select-none transition-all duration-500 hover:opacity-100 hover:scale-100 ${
            isPlaying ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100"
          }`}
        >
          <span className="font-black text-white uppercase text-[8px] tracking-widest border-b border-white/5 pb-1 mb-1 block">Studio Hotkeys</span>
          <div className="flex justify-between gap-6"><span>Space</span> <span className="font-bold text-primary">Play/Pause</span></div>
          <div className="flex justify-between gap-6"><span>← / →</span> <span className="font-bold text-primary">Scrub Word</span></div>
          <div className="flex justify-between gap-6"><span>[ / ]</span> <span className="font-bold text-primary">Speed Adj</span></div>
          <div className="flex justify-between gap-6"><span>↑ / ↓</span> <span className="font-bold text-primary">Font Size</span></div>
          <div className="flex justify-between gap-6"><span>R Key</span> <span className="font-bold text-primary">Reset Script</span></div>
          <div className="flex justify-between gap-6"><span>Esc</span> <span className="font-bold text-primary">Exit Studio</span></div>
        </div>

        {/* Mode 1: Sentence-based RSVP View */}
        {mode === "scroll" && (
          <div className="w-full max-w-[900px] h-[75vh] overflow-y-auto px-24 py-[35vh] flex flex-wrap content-center justify-center gap-x-4 gap-y-5 scroll-behavior-smooth scrollbar-none select-none scroll-smooth relative z-10">
            {rsvpWords.map((word, idx) => {
              const isPower = isPowerWord(word);
              const isCapitalized = /^[A-Z]/.test(word) && idx > 0;
              const isActive = idx === currentWordIndex;
              const isPast = idx < currentWordIndex;

              let scaleFactor = 1.0;
              if (isPower) scaleFactor = 1.25;
              else if (isCapitalized) scaleFactor = 1.1;

              const wordFontSize = Math.round(fontSize * scaleFactor);

              return (
                <span
                  key={idx}
                  ref={isActive ? activeWordRef : null}
                  className={`inline-block font-sans transition-all duration-200 origin-center ${
                    isActive
                      ? "scale-[1.12] opacity-100 font-black"
                      : isPast
                      ? "scale-[0.88] opacity-[0.10] blur-[1px]"
                      : "scale-[1.0] opacity-[0.65] font-bold"
                  }`}
                  style={{
                    fontSize: `${wordFontSize}px`,
                    letterSpacing: "-0.5px",
                    lineHeight: "1.3",
                    ...(isActive
                      ? isPower
                        ? {
                            background: "linear-gradient(135deg, #00e5ff 30%, #ffaa00 90%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                            filter: "drop-shadow(0 0 12px rgba(0, 229, 255, 0.85)) drop-shadow(0 0 20px rgba(255, 170, 0, 0.55))",
                          }
                        : {
                            color: "#ffffff",
                            textShadow: "0 0 15px rgba(255, 255, 255, 0.80)",
                          }
                      : {
                          color: "#ffffff",
                        }),
                  }}
                >
                  {word}
                </span>
              );
            })}
          </div>
        )}

        {/* Mode 2: Step-by-Step Viewer (Hook, Body, CTA) */}
        {mode === "step" && (
          <div className="w-full max-w-5xl px-8 text-center flex flex-col justify-center items-center min-h-[60vh]">
            <div 
              className="font-black leading-snug tracking-tight text-white transition-all duration-500 max-w-4xl"
              style={{ fontSize: `${fontSize * 1.1}px` }}
            >
              {currentStep === "hook" && activeScript.hook}
              {currentStep === "body" && activeScript.body}
              {currentStep === "cta" && activeScript.cta}
              {currentStep === "done" && (
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-2">
                    <Check className="text-emerald-400" size={32} />
                  </div>
                  <span className="text-emerald-400 text-3xl font-black">Script Finished</span>
                  <span className="text-muted-foreground text-sm font-medium mt-1">Tap screen to restart or swipe down & refresh page to exit.</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Audio Visualizer Bar HUD (Simulated Pacing Indicator) */}
        <div 
          className={`absolute bottom-10 left-1/2 -translate-x-1/2 flex items-end gap-1 h-8 opacity-40 pointer-events-none z-10 transition-opacity duration-500 ${
            isPlaying ? "opacity-30" : "opacity-15"
          }`}
        >
          {Array.from({ length: 18 }).map((_, i) => {
            const heights = [12, 16, 24, 8, 14, 18, 28, 10, 6, 20, 22, 12, 16, 24, 8, 14, 18, 10];
            const h = heights[i % heights.length];
            return (
              <div
                key={i}
                className="w-1 rounded-t-full bg-gradient-to-t from-primary to-secondary transition-all duration-300"
                style={{
                  height: isPlaying ? "auto" : `${h}px`,
                  minHeight: "4px",
                  maxHeight: "32px",
                  animation: isPlaying ? `bounce-bar 1.2s infinite ease-in-out alternate` : "none",
                  animationDelay: `${i * 0.08}s`,
                }}
              />
            );
          })}
        </div>

        {/* Floating HUD Controller Capsule */}
        <div 
          onClick={(e) => e.stopPropagation()}
          className={`fixed bottom-24 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full bg-black/40 border border-white/10 backdrop-blur-lg flex items-center gap-6 z-50 select-none transition-all duration-500 hover:opacity-100 hover:scale-100 ${
            isPlaying 
              ? "opacity-0 scale-95 pointer-events-none hover:pointer-events-auto hover:opacity-100 hover:scale-100" 
              : "opacity-100 scale-100"
          }`}
        >
          {/* Back/Close Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsFullscreen(false);
              setIsPlaying(false);
              if (document.exitFullscreen) {
                document.exitFullscreen().catch(() => {});
              }
            }}
            className="p-2 rounded-full hover:bg-white/10 text-muted-foreground hover:text-white transition-all"
            title="Exit Fullscreen"
          >
            <ArrowLeft size={16} />
          </button>

          <div className="h-4 w-[1px] bg-white/10" />

          {/* Reset Progress */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              resetScript();
            }}
            className="p-2 rounded-full hover:bg-white/10 text-muted-foreground hover:text-white transition-all"
            title="Reset Script"
          >
            <RotateCcw size={16} />
          </button>

          {/* Play/Pause Visual indicator */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsPlaying((prev) => !prev);
            }}
            className={`p-2.5 rounded-full transition-all ${
              isPlaying 
                ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" 
                : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
            }`}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>

          <div className="h-4 w-[1px] bg-white/10" />

          {/* Adjust Speed Panel inside HUD */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-wider">Speed</span>
            <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-lg p-0.5">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSpeed((s) => Math.max(1, s - 1));
                }}
                className="w-6 h-6 rounded flex items-center justify-center text-xs font-black hover:bg-white/10 text-muted-foreground hover:text-white"
              >
                -
              </button>
              <span className="px-1.5 text-xs font-black text-white">{speed}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSpeed((s) => Math.min(10, s + 1));
                }}
                className="w-6 h-6 rounded flex items-center justify-center text-xs font-black hover:bg-white/10 text-muted-foreground hover:text-white"
              >
                +
              </button>
            </div>
          </div>

          {/* Adjust Font Size Panel inside HUD */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-wider">Size</span>
            <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-lg p-0.5">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setFontSize((s) => Math.max(16, s - 2));
                }}
                className="w-6 h-6 rounded flex items-center justify-center text-xs font-black hover:bg-white/10 text-muted-foreground hover:text-white"
              >
                -
              </button>
              <span className="px-1.5 text-xs font-black text-white">{fontSize}px</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setFontSize((s) => Math.min(60, s + 2));
                }}
                className="w-6 h-6 rounded flex items-center justify-center text-xs font-black hover:bg-white/10 text-muted-foreground hover:text-white"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground pt-32 pb-24 relative overflow-hidden select-none">
      {/* Background elements */}
      <div className="fixed inset-0 bg-mesh opacity-50 -z-10" />

      <div className="container-custom max-w-6xl relative z-10">
        {/* Main Dashboard Header */}
        {!activeScript ? (
          <div className="mb-12 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-primary mb-2 block">
                CREATOR ENGINE v2.0
              </span>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 leading-none">
                Reels <span className="text-primary-gradient v2-glow">Teleprompter.</span>
              </h1>
              <p className="text-muted-foreground text-sm font-medium max-w-lg leading-relaxed mt-2">
                Select a high-impact script to begin recording. The prompter will run at your ideal speech pace in full dark mode.
              </p>
            </div>

            {/* Premium Creator HUD Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full lg:w-auto min-w-[320px] lg:min-w-[450px]">
              <div className="glass p-4 rounded-2xl border-white/5 bg-black/10 flex flex-col justify-center min-w-[100px]">
                <span className="text-[8px] font-black text-muted-foreground uppercase tracking-widest mb-1">Scripts</span>
                <span className="text-xl font-black text-white flex items-center gap-1.5 leading-none">
                  <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse" />
                  {scripts.length}
                </span>
              </div>
              <div className="glass p-4 rounded-2xl border-white/5 bg-black/10 flex flex-col justify-center min-w-[100px]">
                <span className="text-[8px] font-black text-muted-foreground uppercase tracking-widest mb-1">Base WPM</span>
                <span className="text-xl font-black text-white flex items-baseline gap-0.5 leading-none">
                  155 <span className="text-[9px] text-primary font-black uppercase">WPM</span>
                </span>
              </div>
              <div className="glass p-4 rounded-2xl border-white/5 bg-black/10 flex flex-col justify-center min-w-[100px]">
                <span className="text-[8px] font-black text-muted-foreground uppercase tracking-widest mb-1">Pacing</span>
                <span className="text-xs font-black text-emerald-400 uppercase tracking-widest leading-none">
                  Perfect
                </span>
              </div>
              <div className="glass p-4 rounded-2xl border-white/5 bg-black/15 flex flex-col justify-center min-w-[100px] border border-primary/20 shadow-[0_0_15px_rgba(0,229,255,0.05)]">
                <span className="text-[8px] font-black text-[#00e5ff] uppercase tracking-widest mb-1">Glare Guard</span>
                <span className="text-xs font-black text-[#00e5ff] uppercase tracking-widest leading-none">
                  OLED safe
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <button
              onClick={() => setActiveScript(null)}
              className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-white transition-colors self-start"
            >
              <ArrowLeft size={14} /> Back to Scripts
            </button>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
                Active Script:
              </span>
              <span className="text-sm font-black text-white px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10">
                {activeScript.id} — {activeScript.title}
              </span>
            </div>
          </div>
        )}

        {/* Dashboard: Script Selector Grid or Custom Workspace Editor */}
        {!activeScript ? (
          isEditingCustom ? (
            <div className="glass rounded-[2rem] border-white/5 p-8 bg-black/40 flex flex-col gap-6 w-full max-w-4xl mx-auto">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                  <h3 className="text-lg font-black text-white">Custom Script Workspace</h3>
                </div>
                <button
                  onClick={() => setIsEditingCustom(false)}
                  className="text-xs font-black uppercase tracking-wider text-muted-foreground hover:text-white transition-colors"
                >
                  Cancel
                </button>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">Script Title</label>
                <input
                  type="text"
                  placeholder="e.g. Scaling bottlenecks in SaaS systems"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white font-bold placeholder-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-all font-sans"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">Script Text (RSVP Reader Format)</label>
                <textarea
                  placeholder="Write or paste your script content here. The speech coach pacing engine will automatically adjust focus intervals on punctuation and power words..."
                  rows={8}
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-sm text-white leading-relaxed placeholder-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-all font-sans"
                />
              </div>

              <div className="flex items-center justify-between border-t border-white/5 pt-6 mt-2">
                <span className="text-[10px] font-bold text-muted-foreground uppercase">
                  {customText.trim() ? `${customText.trim().split(/\s+/).length} Words` : "0 Words"} • Est. {customText.trim() ? Math.round((customText.trim().split(/\s+/).length / 155) * 60) : 0}s Duration
                </span>
                <button
                  onClick={handleLaunchCustom}
                  disabled={!customText.trim()}
                  className="px-6 py-3 rounded-full bg-primary text-black font-black text-xs uppercase tracking-widest hover:scale-[1.03] active:scale-[0.97] disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer shadow-[0_0_20px_rgba(0,229,255,0.2)] border-none"
                >
                  Launch Prompter
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Custom script draft card */}
              <div
                onClick={() => {
                  setIsEditingCustom(true);
                }}
                className="glass rounded-3xl border border-dashed border-primary/30 p-6 hover:border-primary/60 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,229,255,0.04)] cursor-pointer group bg-primary/[0.01] flex flex-col justify-between min-h-[220px]"
              >
                <div>
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <span className="text-[10px] font-black bg-primary/10 border border-primary/20 text-primary px-2.5 py-1 rounded-full uppercase tracking-wider">
                      Interactive Workspace
                    </span>
                    <span className="text-[10px] font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full animate-pulse">
                      Studio Draft
                    </span>
                  </div>
                  <h3 className="text-xl font-black tracking-tight text-white/90 group-hover:text-primary transition-colors mb-3">
                    Draft a Custom Script
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Type, paste, or rewrite your custom video script instantly to launch it in OLED teleprompter mode.
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-bold text-primary">
                  <span>Open Draft Workspace</span>
                  <Play size={12} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {scripts.map((script) => (
                <div
                  key={script.id}
                  onClick={() => {
                    setActiveScript(script);
                    resetScript();
                  }}
                  className="glass rounded-3xl border-white/5 p-6 hover:border-primary/20 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,229,255,0.03)] cursor-pointer group bg-black/10 flex flex-col justify-between min-h-[220px]"
                >
                  <div>
                    <div className="flex justify-between items-start gap-4 mb-4">
                      <span className="text-[10px] font-black bg-primary/10 border border-primary/20 text-primary px-2.5 py-1 rounded-full uppercase tracking-wider">
                        Script {script.id}
                      </span>
                      <span className="text-[10px] font-bold text-muted-foreground/80 bg-white/5 px-2 py-1 rounded-full">
                        {script.duration}
                      </span>
                    </div>
                    <h3 className="text-xl font-black tracking-tight text-white/90 group-hover:text-primary transition-colors line-clamp-2 mb-3">
                      {script.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                      {script.hook}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Open Prompter</span>
                    <Play size={12} />
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          /* Prompter Sandbox & Settings Control Center */
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Control Panel */}
            <div className="glass rounded-[2rem] border-white/5 p-8 bg-black/30 flex flex-col gap-8 h-fit">
              <div className="flex items-center gap-2 border-b border-white/5 pb-4">
                <Sliders className="text-primary" size={18} />
                <h3 className="text-lg font-black tracking-tight text-white">Prompter Settings</h3>
              </div>

              {/* Mode Toggle */}
              <div className="flex flex-col gap-3">
                <label className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">
                  Display Mode
                </label>
                <div className="grid grid-cols-2 gap-2 bg-black/30 p-1.5 rounded-2xl border border-white/5">
                  <button
                    onClick={() => {
                      setMode("scroll");
                      resetScript();
                    }}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                      mode === "scroll" 
                        ? "bg-primary text-primary-foreground font-black shadow-md shadow-primary/15" 
                        : "text-muted-foreground hover:text-white"
                    }`}
                  >
                    Auto-Scroll
                  </button>
                  <button
                    onClick={() => {
                      setMode("step");
                      resetScript();
                    }}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                      mode === "step" 
                        ? "bg-primary text-primary-foreground font-black shadow-md shadow-primary/15" 
                        : "text-muted-foreground hover:text-white"
                    }`}
                  >
                    Tap-to-Advance
                  </button>
                </div>
              </div>

              {/* Font Size slider */}
              <div className="flex flex-col gap-3">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-wider text-muted-foreground">
                  <span>Font Size</span>
                  <span className="text-primary font-black">{fontSize}px</span>
                </div>
                <input
                  type="range"
                  min="16"
                  max="60"
                  value={fontSize}
                  onChange={(e) => setFontSize(parseInt(e.target.value))}
                  className="w-full accent-primary bg-black/30 h-1.5 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Speed Slider (only shown in scroll mode) */}
              {mode === "scroll" && (
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-wider text-muted-foreground">
                    <span>Scroll Speed</span>
                    <span className="text-primary font-black">{speed}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={speed}
                    onChange={(e) => setSpeed(parseInt(e.target.value))}
                    className="w-full accent-primary bg-black/30 h-1.5 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              )}

              {/* Enter Fullscreen Button Removed from Sidebar */}
            </div>

            {/* Live Interactive Sandbox Preview */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <div className="glass rounded-[2rem] border-white/5 bg-black/40 overflow-hidden flex flex-col justify-between min-h-[480px]">
                {/* Sandbox Header */}
                <div className="px-8 py-5 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                    Sandbox Preview
                  </span>
                  
                  {/* Standard Playback buttons for Sandbox */}
                  {mode === "scroll" && (
                    <div className="flex items-center gap-3">
                      <button
                        onClick={resetScript}
                        className="p-2 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10 text-muted-foreground hover:text-white transition-all"
                        title="Reset Scroll"
                      >
                        <RotateCcw size={14} />
                      </button>
                      <button
                        onClick={() => setIsPlaying((prev) => !prev)}
                        className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                          isPlaying 
                            ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" 
                            : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        }`}
                      >
                        {isPlaying ? <Pause size={12} /> : <Play size={12} />}
                        {isPlaying ? "Pause" : "Play"}
                      </button>
                    </div>
                  )}
                </div>

                {/* Sandbox Viewer Area */}
                <div className="p-8 flex-grow flex items-center justify-center overflow-hidden bg-black/10 relative min-h-[350px]">
                  {mode === "scroll" ? (
                    <div
                      ref={scrollContainerRef}
                      className="w-full h-[320px] overflow-y-auto px-4 py-10 scrollbar-none text-center select-none"
                      style={{
                        maskImage: "linear-gradient(to bottom, transparent 0%, white 20%, white 80%, transparent 100%)",
                        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, white 20%, white 80%, transparent 100%)"
                      }}
                    >
                      <div className="h-[80px]" />
                      <p 
                        className="font-black leading-tight text-white/90 whitespace-pre-line tracking-tight select-none"
                        style={{ fontSize: `${fontSize * 0.75}px` }}
                      >
                        {activeScript.fullText}
                      </p>
                      <div className="h-[120px]" />
                    </div>
                  ) : (
                    /* Step-by-Step Preview Sandbox */
                    <div className="w-full text-center flex flex-col justify-center items-center py-6 select-none">
                      <div className="flex gap-2 mb-6">
                        {(["hook", "body", "cta"] as const).map((s) => (
                          <button
                            key={s}
                            onClick={() => setCurrentStep(s)}
                            className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                              currentStep === s 
                                ? "bg-primary/20 text-primary border border-primary/30" 
                                : "bg-white/5 text-muted-foreground hover:text-white"
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                      <p 
                        className="font-black leading-snug text-white tracking-tight max-w-xl transition-all duration-300 min-h-[140px] flex items-center justify-center select-none"
                        style={{ fontSize: `${fontSize * 0.75}px` }}
                      >
                        {currentStep === "hook" && activeScript.hook}
                        {currentStep === "body" && activeScript.body}
                        {currentStep === "cta" && activeScript.cta}
                        {currentStep === "done" && "Script Finished. Click a step above to preview again."}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Quick instructions block */}
              <div className="glass p-6 rounded-3xl border-white/5 bg-black/10 flex flex-col gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-primary">Recorder instructions</span>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  1. Hook your phone to the system or record your phone screen. 
                  2. Choose your preferred display mode and tap <strong className="text-white">Enter Fullscreen Recorder</strong>.
                  3. The view will switch to absolute pitch-black to prevent reflections.
                  4. Single-tap the screen to control the prompt.
                  5. Since exit buttons are disabled to prevent accidental touches during your run, simply <strong className="text-white">refresh the browser page</strong> once you are finished.
                </p>
              </div>
            </div>
          </div>

          {/* Launch Teleprompter Mode CTA Button */}
          <div className="mt-12 flex justify-center w-full">
            <button
              onClick={enterFullscreen}
              className="w-full max-w-xl py-5 rounded-full bg-gradient-to-r from-primary to-[#00b8cc] text-black font-black text-lg uppercase tracking-widest hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(0,229,255,0.6)] active:scale-[0.97] transition-all cursor-pointer border-none shadow-[0_0_20px_rgba(0,229,255,0.25)] flex items-center justify-center gap-2 outline-none font-sans"
            >
              Lezzz GOOO!!
            </button>
          </div>
        </>
      )}
      </div>
    </div>
  );
}
