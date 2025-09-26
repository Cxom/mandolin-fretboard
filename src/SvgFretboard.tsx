import React from 'react';

type DisplayOptions = Record<string, never>;
type ChromaticNotes = {
  C: boolean;
  CSharp: boolean;
  D: boolean;
  DSharp: boolean;
  E: boolean;
  F: boolean;
  FSharp: boolean;
  G: boolean;
  GSharp: boolean;
  A: boolean;
  ASharp: boolean;
  B: boolean;
};
type SvgFretboardProps = {
  notes?: ChromaticNotes;
  displayOptions?: DisplayOptions;
};

const FRETS = 12;
const SVG_WIDTH = (FRETS + 1) * 75;
const SVG_HEIGHT = 250;
const VERTICAL_LINES = 13;
const HORIZONTAL_START_Y = 50;
const HORIZONTAL_GAP = 50;
const VERTICAL_GAP = 75;
const NUT_FRET_BUFFER = 5;

function SvgFretboard({
  notes = {
    C: false,
    CSharp: false,
    D: false,
    DSharp: false,
    E: false,
    F: false,
    FSharp: false,
    G: false,
    GSharp: false,
    A: false,
    ASharp: false,
    B: false,
  },
  displayOptions = {},
}: SvgFretboardProps) {
  return (
    <svg
      width={SVG_WIDTH}
      height={SVG_HEIGHT}
      style={{ display: 'block', background: '#0096c7', borderRadius: 12, padding: '1em 4em' }}
    >
      {strings()}
      {nut()}
      {frets()}
      {noteIndicators({ notes, displayOptions })}
    </svg>
  );
}

function noteIndicators({ notes, displayOptions }: { notes: ChromaticNotes; displayOptions: DisplayOptions }) {
  // Chromatic scale order
  const chromaticOrder = [
    'C', 'CSharp', 'D', 'DSharp', 'E', 'F', 'FSharp', 'G', 'GSharp', 'A', 'ASharp', 'B'
  ] as const;
  return chromaticOrder.map((note, i) =>
    notes[note] ? (
      <circle
        key={`note-${note}`}
        cx={(i + 1) * VERTICAL_GAP - VERTICAL_GAP / 2}
        cy={HORIZONTAL_START_Y - NUT_FRET_BUFFER - 12}
        r={12}
        fill="#ffeb3b"
        stroke="#333"
        strokeWidth={2}
      />
    ) : null
  );
}

function strings() {
  // Draw 4 pairs of lines, each pair 8px apart (4px up, 4px down from center)
  const lines = [];
  for (let i = 0; i < 4; i++) {
    const centerY = HORIZONTAL_START_Y + i * HORIZONTAL_GAP;
    lines.push(
      <line
        key={`string-${i}-up`}
        x1={0}
        y1={centerY - 4}
        x2={SVG_WIDTH}
        y2={centerY - 4}
        stroke="black"
        strokeWidth={2}
      />
    );
    lines.push(
      <line
        key={`string-${i}-down`}
        x1={0}
        y1={centerY + 4}
        x2={SVG_WIDTH}
        y2={centerY + 4}
        stroke="black"
        strokeWidth={2}
      />
    );
  }
  return lines;
}

function nut() {
  // Extend nut to cover all double strings
  const nutTop = HORIZONTAL_START_Y - NUT_FRET_BUFFER;
  const nutBottom = HORIZONTAL_START_Y + (HORIZONTAL_GAP * 3) + NUT_FRET_BUFFER;
  return (
    <line
      key="nut"
      x1={0}
      y1={nutTop}
      x2={0}
      y2={nutBottom}
      stroke="#DDD"
      strokeWidth={12}
    />
  );
}

function frets() {
  // Extend frets to cover all double strings
  const fretTop = HORIZONTAL_START_Y - NUT_FRET_BUFFER;
  const fretBottom = HORIZONTAL_START_Y + (HORIZONTAL_GAP * 3) + NUT_FRET_BUFFER;
  return Array.from({ length: VERTICAL_LINES - 1 }, (_, i) => {
    const x = (i + 1) * VERTICAL_GAP;
    return (
      <line
        key={`fret-${i + 1}`}
        x1={x}
        y1={fretTop}
        x2={x}
        y2={fretBottom}
        stroke="#555"
        strokeWidth={3}
      />
    );
  });
}

export default SvgFretboard;
