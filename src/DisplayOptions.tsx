import React from 'react';
import { useDisplayOptions } from './contexts/DisplayOptionsContext';
import './DisplayOptions.css';

const DisplayOptions: React.FC = () => {
  const { displayOptions, setDisplayOptions } = useDisplayOptions();

  const handleFretNumbersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayOptions((prev) => ({ ...prev, showFretNumbers: e.target.checked }));
  };

  const handleFretScalingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayOptions((prev) => ({ ...prev, fretScaling: Number(e.target.value) }));
  };

  return (
    <div className="display-options-root">
      <h2>Display Options</h2>
      <label className="fret-scaling-label">
        <input
          type="checkbox"
          checked={displayOptions.showFretNumbers}
          onChange={handleFretNumbersChange}
        />
        Show Fret Numbers
      </label>
      <label className="fret-scaling-label">
        Fret Scaling: <span className="fret-scaling-value-text">{displayOptions.fretScaling}</span>
        <input
          type="range"
          min={1}
          max={2}
          step={0.01}
          value={displayOptions.fretScaling}
          onChange={handleFretScalingChange}
          className="display-options-slider"
        />
      </label>
    </div>
  );
};

export default DisplayOptions;
