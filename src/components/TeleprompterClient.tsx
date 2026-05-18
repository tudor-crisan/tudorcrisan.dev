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

export default function TeleprompterClient({ scripts }: TeleprompterClientProps) {
  const [activeScript, setActiveScript] = useState<Script | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(3);
  const [fontSize, setFontSize] = useState(48); // in pixels
  const [mode, setMode] = useState<"scroll" | "step">("scroll");
  const [currentStep, setCurrentStep] = useState<"hook" | "body" | "cta" | "done">("hook");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Smooth Auto-Scrolling logic via requestAnimationFrame
  useEffect(() => {
    if (mode !== "scroll" || !isPlaying || !isFullscreen) return;

    let animationFrameId: number;
    const scroll = () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop += speed * 0.4;
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying, speed, mode, isFullscreen]);

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

  const enterFullscreen = () => {
    setIsFullscreen(true);
    setIsPlaying(true);
    // Request native browser fullscreen if supported
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(() => {});
    }
  };

  const handleScreenTouch = (e: React.MouseEvent | React.TouchEvent) => {
    // Avoid triggering when tapping controls in dashboard mode
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
    setCurrentStep("hook");
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  };

  // If in fullscreen recorder mode, render the pitch-black OLED teleprompter
  if (isFullscreen && activeScript) {
    return (
      <div
        onClick={handleScreenTouch}
        className="fixed inset-0 bg-black text-white z-[99999] overflow-hidden flex flex-col justify-center items-center cursor-pointer select-none font-sans"
        style={{ backgroundColor: "#000000" }}
      >
        {/* Startup Instruction Overlay (Fades Out) */}
        {showInstructions && (
          <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full text-sm font-bold tracking-wider uppercase text-white/90 animate-pulse pointer-events-none transition-opacity duration-1000 z-50">
            {mode === "scroll" 
              ? "Tapping pauses / plays • Refresh page to exit" 
              : "Tapping advances script • Refresh page to exit"}
          </div>
        )}

        {/* Mode 1: Smooth Scrolling View */}
        {mode === "scroll" && (
          <div
            ref={scrollContainerRef}
            className="w-full max-w-4xl h-[70vh] overflow-y-auto px-6 py-32 text-center scrollbar-none"
            style={{
              scrollBehavior: "smooth",
              maskImage: "linear-gradient(to bottom, transparent 0%, white 25%, white 75%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, white 25%, white 75%, transparent 100%)"
            }}
          >
            {/* Top spacing to let text scroll up */}
            <div className="h-[25vh]" />
            <div 
              className="font-black leading-tight tracking-tight whitespace-pre-line text-white/90 transition-all duration-300"
              style={{ fontSize: `${fontSize}px` }}
            >
              {activeScript.fullText}
            </div>
            {/* Bottom spacing */}
            <div className="h-[40vh]" />
          </div>
        )}

        {/* Mode 2: Step-by-Step Viewer (Hook, Body, CTA) */}
        {mode === "step" && (
          <div className="w-full max-w-5xl px-8 text-center flex flex-col justify-center items-center min-h-[60vh]">
            {currentStep !== "done" && (
              <span className="text-xs font-black uppercase tracking-widest text-primary mb-6 bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20">
                {currentStep}
              </span>
            )}
            
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
          <div className="mb-12">
            <span className="text-[10px] font-black uppercase tracking-widest text-primary mb-2 block">
              Creator tools
            </span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 leading-none">
              Reels <span className="text-primary-gradient v2-glow">Teleprompter.</span>
            </h1>
            <p className="text-muted-foreground text-lg font-medium max-w-xl">
              Select a script from your script sheet to begin recording with optimized OLED layouts.
            </p>
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

        {/* Dashboard: Script Selector Grid */}
        {!activeScript ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        ) : (
          /* Prompter Sandbox & Settings Control Center */
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
                  min="24"
                  max="80"
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

              {/* Enter Fullscreen Button */}
              <button
                onClick={enterFullscreen}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-primary text-primary-foreground font-black text-sm uppercase tracking-wider hover:shadow-[0_0_30px_rgba(0,229,255,0.2)] transition-all cta-glow-button mt-4"
              >
                <Maximize size={16} /> Enter Fullscreen Recorder
              </button>
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
        )}
      </div>
    </div>
  );
}
