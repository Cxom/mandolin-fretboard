import React from 'react';
import { scaleDegrees } from './constants.js';

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
