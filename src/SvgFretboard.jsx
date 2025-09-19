import React from 'react';

const SVG_WIDTH = 1000;
const SVG_HEIGHT = 250;
const HORIZONTAL_LINES = 4;
const VERTICAL_LINES = 13;
const HORIZONTAL_START_Y = 50;
const HORIZONTAL_GAP = 50;
const VERTICAL_GAP = 75;
const VERTICAL_TOP = 50;
const VERTICAL_BOTTOM = 200;

function SvgFretboard() {
  // Horizontal lines
  const horizontalLines = Array.from({ length: HORIZONTAL_LINES }, (_, i) => {
    const y = HORIZONTAL_START_Y + i * HORIZONTAL_GAP;
    return (
      <line
        key={`h-${i}`}
        x1={0}
        y1={y}
        x2={SVG_WIDTH}
        y2={y}
        stroke="black"
        strokeWidth={4}
      />
    );
  });

  // Leftmost vertical line (thicker, lighter)
  const leftVerticalLine = (
    <line
      key="v-0"
      x1={0}
      y1={VERTICAL_TOP}
      x2={0}
      y2={VERTICAL_BOTTOM}
      stroke="#DDD"
      strokeWidth={12}
    />
  );

  // Remaining vertical lines (medium gray)
  const verticalLines = Array.from({ length: VERTICAL_LINES - 1 }, (_, i) => {
    const x = (i + 1) * VERTICAL_GAP;
    return (
      <line
        key={`v-${i + 1}`}
        x1={x}
        y1={VERTICAL_TOP}
        x2={x}
        y2={VERTICAL_BOTTOM}
        stroke="#555"
        strokeWidth={3}
      />
    );
  });

  return (
    <svg
      width={SVG_WIDTH}
      height={SVG_HEIGHT}
      style={{ display: 'block', background: '#0096c7', borderRadius: 12 }}
    >
      {horizontalLines}
      {leftVerticalLine}
      {verticalLines}
    </svg>
  );
}

export default SvgFretboard;
