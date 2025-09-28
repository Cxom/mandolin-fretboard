import React from 'react';
import { scaleDegrees } from './constants';
import {useScaleContext} from "./ScaleContext";

function ScaleDegreeSelectorButtons() {
  const { selectedDegrees, setSelectedDegrees } = useScaleContext();
  const handleToggle = (degree: string) => {
    setSelectedDegrees({
      ...selectedDegrees,
      [degree]: degree !in selectedDegrees
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
            boxShadow: selectedDegrees[name] ? '0px 0px 5px 5px #fff' : 'none',
            opacity: selectedDegrees[name] ? 1 : 0.6
          }}
        >
          {name}
        </button>
      ))}
    </div>
  );
}

export default ScaleDegreeSelectorButtons;

