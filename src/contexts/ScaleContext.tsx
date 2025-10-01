import React, {createContext, Dispatch, SetStateAction, useContext, useMemo, useReducer} from 'react';
import {scaleDegrees} from '../constants.js';
import {ChromaticNote, ScaleDegree, ScaleDegreeSelection} from "../types";
import {chromaticScaleForTonic} from "../assets/scaleUtils";

export interface ScaleContextType {
  selectedTonic: ChromaticNote;
  setSelectedTonic: Dispatch<SetStateAction<ChromaticNote>>;
  selectedDegrees: ScaleDegreeSelection;
  setSelectedDegrees: (degrees: ScaleDegreeSelection) => void;
  selectedScaleName: string;
  setSelectedScaleName: (scale: string) => void;
  selectedNotes: [ChromaticNote, ScaleDegree][];
}

const scalePatterns: Record<string, string[]> = {
  major: ['1', '2', '3', '4', '5', '6', '7'],
  minor: ['1', '2', 'b3', '4', '5', 'b6', 'b7'],
  pentatonicMajor: ['1', '2', '3', '5', '6'],
  pentatonicMinor: ['1', 'b3', '4', '5', 'b7'],
  blues: ['1', 'b3', '4', 'b5', '5', 'b7'],
  chromatic: ['1', 'b2', '2', 'b3', '3', '4', 'b5', '5', 'b6', '6', 'b7', '7'],
  melodicMinor: ['1', '2', 'b3', '4', '5', '6', '7'],
  harmonicMinor: ['1', '2', 'b3', '4', '5', 'b6', '7'],
  dorian: ['1', '2', 'b3', '4', '5', '6', 'b7'],
  mixolydian: ['1', '2', '3', '4', '5', '6', 'b7'],
    // TODO enharmonic support
  lydian: ['1', '2', '3', /*'#4',*/ 'b5', '5', '6', '7'],
};

function getScaleNameFromDegrees(degrees: Record<string, boolean>) {
  for (const [name, pattern] of Object.entries(scalePatterns)) {
    const allMatch = Object.keys(degrees).every(degree => degrees[degree] === pattern.includes(degree));
    if (allMatch) return name;
  }
  return 'custom';
}

function getDegreesFromScaleName(scaleName: string) :ScaleDegreeSelection {
  const pattern = scalePatterns[scaleName];
  return Object.fromEntries(
      scaleDegrees.keys().map(name => [name, pattern.some(p => p === name)])
  ) as ScaleDegreeSelection;
}

type ScaleState = {
  selectedDegrees: ScaleDegreeSelection;
  selectedScaleName: string;
};

type ScaleAction =
  | { type: 'setScale'; scaleName: string }
  | { type: 'setDegrees'; degrees: ScaleDegreeSelection };

function scaleReducer(state: ScaleState, action: ScaleAction): ScaleState {
  switch (action.type) {
    case 'setScale': {
      const newDegrees = getDegreesFromScaleName(action.scaleName);
      return { selectedScaleName: action.scaleName, selectedDegrees: newDegrees };
    }
    case 'setDegrees': {
      const newDegrees = { ...state.selectedDegrees, ...action.degrees };
      const scaleName = getScaleNameFromDegrees(newDegrees);
      return { selectedScaleName: scaleName, selectedDegrees: newDegrees };
    }
    default:
      return state;
  }
}

export const ScaleContext = createContext<ScaleContextType | undefined>(undefined);

// TODO this needs a better name
export function useScaleContext() {
  const ctx = useContext(ScaleContext);
  if (!ctx) throw new Error('useScaleContext must be used within a ScaleContextProvider');
  return ctx;
}

function resolveNotesForScale(selectedTonic: ChromaticNote, degreeSelection: ScaleDegreeSelection) {
    let tonicChromaticScale = chromaticScaleForTonic(selectedTonic);

    const degreeToSemitone: [ScaleDegree, number][] = [
        ['1', 0],
        ['b2', 1],
        ['2', 2],
        ['b3', 3],
        ['3', 4],
        ['4', 5],
        ['b5', 6],
        ['5', 7],
        ['b6', 8],
        ['6', 9],
        ['b7', 10],
        ['7', 11]
    ];

    const selectedNotes: [ChromaticNote, ScaleDegree][] = degreeToSemitone
        // filter only selected degrees (those set to true in degreeSelection)
        .filter(([degree]) => degreeSelection[degree])
        .map(([degree, offset]) => [tonicChromaticScale[offset], degree]);

    return selectedNotes;
}

export const ScaleContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedTonic, setSelectedTonic] = React.useState<ChromaticNote>('G');
  const initialDegrees = getDegreesFromScaleName("major")
  const [state, dispatch] = useReducer(scaleReducer, {
    selectedScaleName: 'major',
    selectedDegrees: initialDegrees,
  });

  const setSelectedScaleName = (scale: string) => dispatch({ type: 'setScale', scaleName: scale });
  const setSelectedDegrees = (degrees: ScaleDegreeSelection) => dispatch({ type: 'setDegrees', degrees });

  const selectedNotes = useMemo(() => resolveNotesForScale(selectedTonic, state.selectedDegrees), [selectedTonic, state.selectedDegrees])

  return (
    <ScaleContext.Provider value={{
        selectedTonic,
        setSelectedTonic,
        selectedDegrees: state.selectedDegrees,
        setSelectedDegrees,
        selectedScaleName: state.selectedScaleName,
        setSelectedScaleName,
        selectedNotes
    }}>
      {children}
    </ScaleContext.Provider>
  );
};
