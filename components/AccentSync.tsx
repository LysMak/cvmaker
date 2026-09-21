'use client';

import { useEffect } from 'react';

/** Mirrors the given accent color onto the document root so page chrome
 * outside this component's own subtree (the site header) picks it up too. */
export default function AccentSync({ accent }: { accent: string }) {
  useEffect(() => {
    const root = document.documentElement;
    const previous = root.style.getPropertyValue('--color-accent');
    root.style.setProperty('--color-accent', accent);
    return () => {
      if (previous) {
        root.style.setProperty('--color-accent', previous);
      } else {
        root.style.removeProperty('--color-accent');
      }
    };
  }, [accent]);

  return null;
}
