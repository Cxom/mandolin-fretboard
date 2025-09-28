import React, { createContext, useContext, useReducer, Dispatch, SetStateAction } from 'react';
import { scaleDegrees } from './constants.js';

export interface ScaleContextType {
  selectedTonic: string;
  setSelectedTonic: Dispatch<SetStateAction<string>>;
  selectedDegrees: Record<string, boolean>;
  setSelectedDegrees: (degrees: Record<string, boolean>) => void;
  selectedScale: string;
  setSelectedScale: (scale: string) => void;
}

const scalePatterns: Record<string, string[]> = {
  major: ['1', '2', '3', '4', '5', '6', '7'],
  minor: ['1', '2', 'b3', '4', '5', 'b6', 'b7'],
  pentatonicMajor: ['1', '2', '3', '5', '6'],
};

function getScaleNameFromDegrees(degrees: Record<string, boolean>) {
  for (const [name, pattern] of Object.entries(scalePatterns)) {
    const allMatch = Object.keys(degrees).every(degree => degrees[degree] === pattern.includes(degree));
    if (allMatch) return name;
  }
  return 'custom';
}

type ScaleState = {
  selectedDegrees: Record<string, boolean>;
  selectedScale: string;
};

type ScaleAction =
  | { type: 'setScale'; scale: string }
  | { type: 'setDegrees'; degrees: Record<string, boolean> };

function scaleReducer(state: ScaleState, action: ScaleAction): ScaleState {
  switch (action.type) {
    case 'setScale': {
      const pattern = scalePatterns[action.scale];
      const newDegrees = Object.fromEntries(
        scaleDegrees.map(({name}) => [name, pattern.some(p => p === name)])
      );
      return { selectedScale: action.scale, selectedDegrees: newDegrees };
    }
    case 'setDegrees': {
      const newDegrees = { ...state.selectedDegrees, ...action.degrees };
      const scaleName = getScaleNameFromDegrees(newDegrees);
      return { selectedScale: scaleName, selectedDegrees: newDegrees };
    }
    default:
      return state;
  }
}

export const ScaleContext = createContext<ScaleContextType | undefined>(undefined);

export function useScaleContext() {
  const ctx = useContext(ScaleContext);
  if (!ctx) throw new Error('useScaleContext must be used within a ScaleContextProvider');
  return ctx;
}

export const ScaleContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedTonic, setSelectedTonic] = React.useState('G');
  const initialDegrees = Object.fromEntries(Object.keys(scaleDegrees).map(degree => [degree, false]));
  const [state, dispatch] = useReducer(scaleReducer, {
    selectedScale: 'major',
    selectedDegrees: initialDegrees,
  });

  const setSelectedScale = (scale: string) => dispatch({ type: 'setScale', scale });
  const setSelectedDegrees = (degrees: Record<string, boolean>) => dispatch({ type: 'setDegrees', degrees });

  return (
    <ScaleContext.Provider value={{ selectedTonic, setSelectedTonic, selectedDegrees: state.selectedDegrees, setSelectedDegrees, selectedScale: state.selectedScale, setSelectedScale }}>
      {children}
    </ScaleContext.Provider>
  );
};
