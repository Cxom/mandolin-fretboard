import React, { createContext, useContext, useState, ReactNode } from 'react';

export type DisplayOptions = {
  showFretNumbers: boolean;
  fretScaling: number; // range [1, 2] // the ratio between the size of fret 1 and fret 12
};

const defaultDisplayOptions: DisplayOptions = {
  showFretNumbers: true,
  fretScaling: 1.7,
};

const DisplayOptionsContext = createContext<{
  displayOptions: DisplayOptions;
  setDisplayOptions: React.Dispatch<React.SetStateAction<DisplayOptions>>;
}>({
  displayOptions: defaultDisplayOptions,
  setDisplayOptions: () => {},
});

export const useDisplayOptions = () => useContext(DisplayOptionsContext);

export const DisplayOptionsContextProvider = ({ children }: { children: ReactNode }) => {
  const [displayOptions, setDisplayOptions] = useState<DisplayOptions>(defaultDisplayOptions);

  return (
    <DisplayOptionsContext.Provider value={{ displayOptions, setDisplayOptions }}>
      {children}
    </DisplayOptionsContext.Provider>
  );
};
