import React from 'react';
import './ScaleSelector.css';
import { useScaleContext } from './ScaleContext';

const scaleOptions = [
  { value: 'major', label: 'Major' },
  { value: 'minor', label: 'Minor' },
  { value: 'pentatonicMajor', label: 'Pentatonic Major' }
  // Custom is intentionally omitted from the dropdown
];

function ScaleSelector() {
  const { selectedScale, setSelectedScale } = useScaleContext();
  return (
    <div style={{ marginBottom: '16px' }}>
      <select
        value={selectedScale}
        onChange={e => setSelectedScale(e.target.value)}
        className="scale-selector-dropdown"
      >
        {scaleOptions.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
}

export default ScaleSelector;
