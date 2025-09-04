import { createContext } from 'react';

export type Framework = 'react' | 'vue' | 'svelte' | 'svg' | 'html';

export interface FrameworkContextType {
  selectedFramework: Framework;
  setSelectedFramework: (framework: Framework) => void;
}

export const FrameworkContext = createContext<FrameworkContextType | undefined>(undefined);
