import React from 'react';
import { chromaticNotes } from './constants.js';
import {useScaleContext} from "./contexts/ScaleContext";



function KeySelectorButtons() {
  const { selectedTonic, setSelectedTonic } = useScaleContext()
  return (
    <div className="key-selector-buttons-container">
      {chromaticNotes.map(({ name, color, displayText }) => (
        <button
          key={name}
          className="key-selector-btn"
          onClick={() => setSelectedTonic(name)}
          style={{
            background: color,
            outline: selectedTonic === name ? '5px solid #fff' : 'none'
          }}
        >
          {displayText}
        </button>
      ))}
    </div>
  );
}

export default KeySelectorButtons;
