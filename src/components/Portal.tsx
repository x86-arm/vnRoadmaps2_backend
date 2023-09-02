"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
export default function Portal({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (document) {
      setIsClient(true);
    }
  }, []);

  return isClient ? createPortal(children, document.body) : null;
}
