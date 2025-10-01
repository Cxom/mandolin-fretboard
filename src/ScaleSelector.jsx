import React from 'react';
import './ScaleSelector.css';
import { useScaleContext } from './contexts/ScaleContext.js';

const scaleOptions = [
  { value: 'major', label: 'Major' },
  { value: 'minor', label: 'Minor' },
  { value: 'pentatonicMajor', label: 'Pentatonic Major' }
  // Custom is intentionally omitted from the dropdown
];

function ScaleSelector() {
  const { selectedScaleName, setSelectedScaleName } = useScaleContext();
  return (
    <div style={{ marginBottom: '16px' }}>
      <select
        value={selectedScaleName}
        onChange={e => setSelectedScaleName(e.target.value)}
        className="scale-selector-dropdown"
      >
        {scaleOptions.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
        {
          selectedScaleName === 'custom' && <option value="custom">Custom</option>
        }
      </select>
    </div>
  );
}

export default ScaleSelector;
