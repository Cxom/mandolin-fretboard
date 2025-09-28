import React, { createContext, useContext, useState, Dispatch, SetStateAction } from 'react';
import { chromaticNotes, scaleDegrees } from './constants.js';

export interface ScaleContextType {
  selectedTonic: string;
  setSelectedTonic: Dispatch<SetStateAction<string>>;
  selectedDegrees: Record<string, boolean>;
  setSelectedDegrees: Dispatch<SetStateAction<Record<string, boolean>>>;
  selectedScale: string;
  setSelectedScale: Dispatch<SetStateAction<string>>;
};

export const ScaleContext = createContext<ScaleContextType | undefined>(undefined);

export function useScaleContext() {
  const ctx = useContext(ScaleContext);
  if (!ctx) throw new Error('useScaleContext must be used within a ScaleContextProvider');
  return ctx;
}

export const ScaleContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const noteNames = Object.keys(chromaticNotes);
  const [selectedTonic, setSelectedTonic] = useState(noteNames[0]);
  const scaleDegreeBooleans = Object.fromEntries(Object.keys(scaleDegrees).map(degree => [degree, false]));
  const [selectedDegrees, setSelectedDegrees] = useState<Record<string, boolean>>(scaleDegreeBooleans);
  const [selectedScale, setSelectedScale] = useState('major');

  return (
    <ScaleContext.Provider value={{ selectedTonic: selectedTonic, setSelectedTonic: setSelectedTonic, selectedDegrees, setSelectedDegrees, selectedScale, setSelectedScale }}>
      {children}
    </ScaleContext.Provider>
  );
};
