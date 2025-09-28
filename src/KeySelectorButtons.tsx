import React from 'react';
import { chromaticNotes } from './constants.js';
import {useScaleContext} from "./ScaleContext";



function KeySelectorButtons() {
  const { selectedTonic, setSelectedTonic } = useScaleContext()
  return (
    <div className="key-selector-buttons-container">
      {Object.entries(chromaticNotes).map(([note, { color, displayText }]) => (
        <button
          key={note}
          className="key-selector-btn"
          onClick={() => setSelectedTonic(note)}
          style={{
            background: color,
            outline: selectedTonic === note ? '5px solid #fff' : 'none'
          }}
        >
          {displayText}
        </button>
      ))}
    </div>
  );
}

export default KeySelectorButtons;
