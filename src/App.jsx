import './App.css';
import SvgFretboard from './SvgFretboard';
import { useState } from 'react';


const chromaticNotes = {
  C:        { color: '#FF0000', displayText: 'C' },
  CSharp:   { color: '#FF7F00', displayText: <>{'C'}<sup>#</sup></> },
  D:        { color: '#FFFF00', displayText: 'D' },
  DSharp:   { color: '#00FF00', displayText: <>{'D'}<sup>#</sup></> },
  E:        { color: '#0000FF', displayText: 'E' },
  F:        { color: '#4B0082', displayText: 'F' },
  FSharp:   { color: '#9400D3', displayText: <>{'F'}<sup>#</sup></> },
  G:        { color: '#00CED1', displayText: 'G' },
  GSharp:   { color: '#FFD700', displayText: <>{'G'}<sup>#</sup></> },
  A:        { color: '#FF1493', displayText: 'A' },
  ASharp:   { color: '#00FF7F', displayText: <>{'A'}<sup>#</sup></> },
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
            border: selectedNote === note ? '2px solid #222' : 'none'
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

  return (
    <>
      <KeySelectorButtons selectedNote={selectedNote} setSelectedNote={setSelectedNote} />
      <SvgFretboard notes={{ C: true, D: true, E: true, F: true, G: true, A: true, B: true }} />
    </>
  );
}

export default App;
