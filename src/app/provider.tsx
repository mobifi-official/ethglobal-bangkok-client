"use client";

import { useEffect, useState } from "react";
import { ParticleConnectKitProvider } from "./features/web3/hooks/particle-connect/providers/ParticleConnectKitProvider";

// Context providers for various application functionalities


export default function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <ParticleConnectKitProvider>
      {mounted && children}
    </ParticleConnectKitProvider>
  );
}
