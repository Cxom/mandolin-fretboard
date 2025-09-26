
import './App.css';
import SvgFretboard from './SvgFretboard';
import { useState } from 'react';

const scaleDegrees = [
  { name: '1', color: '#FF0000' },
  { name: 'b2', color: '#FF7F00' },
  { name: '2', color: '#FFFF00' },
  { name: 'b3', color: '#00FF00' },
  { name: '3', color: '#0000FF' },
  { name: '4', color: '#4B0082' },
  { name: 'b5', color: '#9400D3' },
  { name: '5', color: '#00CED1' },
  { name: 'b6', color: '#FFD700' },
  { name: '6', color: '#FF1493' },
  { name: 'b7', color: '#00FF7F' },
  { name: '7', color: '#8B4513' }
];

function ScaleDegreeSelectorButtons({ selectedDegrees, setSelectedDegrees }) {
  const handleToggle = (degree) => {
    setSelectedDegrees((prev) => ({
      ...prev,
      [degree]: !prev[degree]
    }));
  };
  return (
    <div className="key-selector-buttons-container">
      {scaleDegrees.map(({ name, color }) => (
        <button
          key={name}
          className="key-selector-btn"
          onClick={() => handleToggle(name)}
          style={{
            background: color,
            color: '#fff',
            border: selectedDegrees[name] ? '5px solid #fff' : 'none',
            opacity: selectedDegrees[name] ? 1 : 0.6
          }}
        >
          {name}
        </button>
      ))}
    </div>
  );
}

const chromaticNotes = {
  C:        { color: '#FF0000', displayText: 'C' },
  CSharp:   { color: '#FF7F00', displayText: <>{'C'}#</> },
  D:        { color: '#ffea00e3', displayText: 'D' },
  DSharp:   { color: '#00FF00', displayText: <>{'D'}#</> },
  E:        { color: '#0000FF', displayText: 'E' },
  F:        { color: '#4B0082', displayText: 'F' },
  FSharp:   { color: '#9400D3', displayText: <>{'F'}#</> },
  G:        { color: '#00CED1', displayText: 'G' },
  GSharp:   { color: '#FFD700', displayText: <>{'G'}#</> },
  A:        { color: '#FF1493', displayText: 'A' },
  ASharp:   { color: '#00FF7F', displayText: <>{'A'}#</> },
  B:        { color: '#8B4513', displayText: 'B' }
};

function KeySelectorButtons({ selectedNote, setSelectedNote }) {
  return (
    <div className="key-selector-buttons-container">
      {Object.entries(chromaticNotes).map(([note, { color, displayText }]) => (
        <button
          key={note}
          className="key-selector-btn"
          onClick={() => setSelectedNote(note)}
          style={{
            background: color,
            color: '#fff',
            border: selectedNote === note ? '5px solid #fff' : 'none'
          }}
        >
          {displayText}
        </button>
      ))}
    </div>
  );
}

function App() {
  const noteNames = Object.keys(chromaticNotes);
  const [selectedNote, setSelectedNote] = useState(noteNames[0]);
  const [selectedDegrees, setSelectedDegrees] = useState({
    '1': false,
    'b2': false,
    '2': false,
    'b3': false,
    '3': false,
    '4': false,
    'b5': false,
    '5': false,
    'b6': false,
    '6': false,
    'b7': false,
    '7': false
  });

  return (
    <>
      <KeySelectorButtons selectedNote={selectedNote} setSelectedNote={setSelectedNote} />
      <ScaleDegreeSelectorButtons selectedDegrees={selectedDegrees} setSelectedDegrees={setSelectedDegrees} />
      <SvgFretboard notes={{ C: true, D: true, E: true, F: true, G: true, A: true, B: true }} />
    </>
  );
}

export default App;
