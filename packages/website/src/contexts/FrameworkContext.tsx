import React, { useState, useEffect } from 'react';
import { FrameworkContext, type Framework } from './FrameworkContextDef';

export function FrameworkProvider({ children }: { children: React.ReactNode }) {
  const [selectedFramework, setSelectedFramework] = useState<Framework>(() => {
    const saved = localStorage.getItem('preferredFramework');
    return (saved as Framework) || 'react';
  });

  useEffect(() => {
    localStorage.setItem('preferredFramework', selectedFramework);
  }, [selectedFramework]);

  return (
    <FrameworkContext.Provider value={{ selectedFramework, setSelectedFramework }}>
      {children}
    </FrameworkContext.Provider>
  );
}
