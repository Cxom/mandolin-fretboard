import './App.css';
import SvgFretboard from './SvgFretboard';
import { useState } from 'react';
import ScaleDegreeSelectorButtons from './ScaleDegreeSelectorButtons';
import KeySelectorButtons from './KeySelectorButtons';
import ScaleSelector from './ScaleSelector';
import { chromaticNotes, scaleDegrees } from './constants.js';

function App() {
  const noteNames = Object.keys(chromaticNotes);
  const [selectedNote, setSelectedNote] = useState(noteNames[0]);
  const scaleDegreeBooleans = Object.fromEntries(Object.keys(scaleDegrees).map(degree => [degree, false]));
  const [selectedDegrees, setSelectedDegrees] = useState(scaleDegreeBooleans);
  const [selectedScale, setSelectedScale] = useState('major');

  return (
    <>
      <ScaleSelector selectedScale={selectedScale} setSelectedScale={setSelectedScale} />
      <KeySelectorButtons selectedNote={selectedNote} setSelectedNote={setSelectedNote} chromaticNotes={chromaticNotes}/>
      <ScaleDegreeSelectorButtons selectedDegrees={selectedDegrees} setSelectedDegrees={setSelectedDegrees} />
      <SvgFretboard notes={{ C: true, D: true, E: true, F: true, G: true, A: true, B: true }} />
    </>
  );
}

export default App;
