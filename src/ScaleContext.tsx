import React, {createContext, Dispatch, SetStateAction, useContext, useReducer} from 'react';
import {scaleDegrees} from './constants.js';
import {ScaleDegrees} from "./types";

export interface ScaleContextType {
  selectedTonic: string;
  setSelectedTonic: Dispatch<SetStateAction<string>>;
  selectedDegrees: ScaleDegrees;
  setSelectedDegrees: (degrees: ScaleDegrees) => void;
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

function getDegreesFromScaleName(scaleName: string) :ScaleDegrees {
  const pattern = scalePatterns[scaleName];
  return Object.fromEntries(
      scaleDegrees.map(({name}) => [name, pattern.some(p => p === name)])
  ) as ScaleDegrees;
}

type ScaleState = {
  selectedDegrees: ScaleDegrees;
  selectedScaleName: string;
};

type ScaleAction =
  | { type: 'setScale'; scaleName: string }
  | { type: 'setDegrees'; degrees: ScaleDegrees };

function scaleReducer(state: ScaleState, action: ScaleAction): ScaleState {
  switch (action.type) {
    case 'setScale': {
      const newDegrees = getDegreesFromScaleName(action.scaleName);
      return { selectedScaleName: action.scaleName, selectedDegrees: newDegrees };
    }
    case 'setDegrees': {
      const newDegrees = { ...state.selectedDegrees, ...action.degrees };
      const scaleName = getScaleNameFromDegrees(newDegrees);
      console.log("set degrees, new scale name:", scaleName);
      return { selectedScaleName: scaleName, selectedDegrees: newDegrees };
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
  const initialDegrees = getDegreesFromScaleName("major")
  const [state, dispatch] = useReducer(scaleReducer, {
    selectedScaleName: 'major',
    selectedDegrees: initialDegrees,
  });

  const setSelectedScale = (scale: string) => dispatch({ type: 'setScale', scaleName: scale });
  const setSelectedDegrees = (degrees: ScaleDegrees) => dispatch({ type: 'setDegrees', degrees });

  return (
    <ScaleContext.Provider value={{ selectedTonic, setSelectedTonic, selectedDegrees: state.selectedDegrees, setSelectedDegrees, selectedScale: state.selectedScaleName, setSelectedScale }}>
      {children}
    </ScaleContext.Provider>
  );
};
