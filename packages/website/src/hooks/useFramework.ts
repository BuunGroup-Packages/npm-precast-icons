import { useContext } from 'react';
import { FrameworkContext } from '../contexts/FrameworkContextDef';

export function useFramework() {
  const context = useContext(FrameworkContext);
  if (context === undefined) {
    throw new Error('useFramework must be used within a FrameworkProvider');
  }
  return context;
}
