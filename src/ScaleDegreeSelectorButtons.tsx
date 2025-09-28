import React from 'react';
import { scaleDegrees } from './constants';
import {useScaleContext} from "./ScaleContext";
import {ScaleDegrees} from "./types";

function ScaleDegreeSelectorButtons() {
  const { selectedDegrees, setSelectedDegrees } = useScaleContext();
  const handleToggle = (degree: keyof ScaleDegrees) => {
    setSelectedDegrees({
      ...selectedDegrees,
      [degree]: !selectedDegrees[degree]
    });
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
            boxShadow: selectedDegrees[name] ? '0px 0px 5px 5px #5df' : 'none',
            opacity: selectedDegrees[name] ? 1 : 0.2
          }}
        >
          {name}
        </button>
      ))}
    </div>
  );
}

export default ScaleDegreeSelectorButtons;

