import './App.css';
import SvgFretboard from './SvgFretboard';
import { useState } from 'react';
import ScaleDegreeSelectorButtons from './ScaleDegreeSelectorButtons';
import KeySelectorButtons from './KeySelectorButtons';
import ScaleSelector from './ScaleSelector';
import { chromaticNotes, scaleDegrees } from './constants.js';
import { ScaleContextProvider } from './ScaleContext';

function App() {
  const noteNames = Object.keys(chromaticNotes);
  const [selectedNote, setSelectedNote] = useState(noteNames[0]);
  const scaleDegreeBooleans = Object.fromEntries(Object.keys(scaleDegrees).map(degree => [degree, false]));
  const [selectedDegrees, setSelectedDegrees] = useState(scaleDegreeBooleans);
  const [selectedScale, setSelectedScale] = useState('major');

  return (
    <ScaleContextProvider>
      <ScaleSelector />
      <KeySelectorButtons />
      <ScaleDegreeSelectorButtons />
      <SvgFretboard />
    </ScaleContextProvider>
  );
}

export default App;
