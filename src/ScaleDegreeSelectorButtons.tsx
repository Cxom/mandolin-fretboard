import React from 'react';
import { scaleDegrees } from './constants';
import {useScaleContext} from "./ScaleContext";

function ScaleDegreeSelectorButtons() {
  const { selectedDegrees, setSelectedDegrees } = useScaleContext();
  const handleToggle = (degree: string) => {
    console.log("Clicked degree:", degree);
    console.log("Current selectedDegrees:", selectedDegrees);
    setSelectedDegrees({
      ...selectedDegrees,
      [degree]: !selectedDegrees[degree]
    });
    console.log("Updated selectedDegrees:", {
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

