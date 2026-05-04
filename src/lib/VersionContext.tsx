"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Version = "v1" | "v2";

interface VersionContextType {
  version: Version;
  setVersion: (v: Version) => void;
}

const VersionContext = createContext<VersionContextType | undefined>(undefined);

export function VersionProvider({ children }: { children: React.ReactNode }) {
  const [version, setVersion] = useState<Version>("v2");

  useEffect(() => {
    const saved = localStorage.getItem("site-version") as Version;
    if (saved) {
      setVersion(saved);
    }
  }, []);

  const handleSetVersion = (v: Version) => {
    setVersion(v);
    localStorage.setItem("site-version", v);
    if (v === "v2") {
      document.documentElement.classList.add("v2");
    } else {
      document.documentElement.classList.remove("v2");
    }
  };

  useEffect(() => {
    if (version === "v2") {
      document.documentElement.classList.add("v2");
    } else {
      document.documentElement.classList.remove("v2");
    }
  }, [version]);

  return (
    <VersionContext.Provider value={{ version, setVersion: handleSetVersion }}>
      {children}
    </VersionContext.Provider>
  );
}

export function useVersion() {
  const context = useContext(VersionContext);
  if (context === undefined) {
    throw new Error("useVersion must be used within a VersionProvider");
  }
  return context;
}
