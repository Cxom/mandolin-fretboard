import React from 'react';
import { chromaticNotes } from './constants.js';

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
            outline: selectedNote === note ? '5px solid #fff' : 'none'
          }}
        >
          {displayText}
        </button>
      ))}
    </div>
  );
}

export default KeySelectorButtons;
