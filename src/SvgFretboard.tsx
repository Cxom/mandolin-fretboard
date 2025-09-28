import React from 'react';
import {ChromaticNotes} from "./types";
import {chromaticNotes} from "./constants";

type DisplayOptions = Record<string, never>;

type SvgFretboardProps = {
  displayOptions?: DisplayOptions;
};

const FRETS = 12;
const SVG_WIDTH = '100%';
const SVG_HEIGHT = '100%';
const VERTICAL_LINES = 13;
const HORIZONTAL_START_Y = 20; // percent
const HORIZONTAL_GAP = 20; // percent
const VERTICAL_GAP = 7; // percent
const NUT_FRET_BUFFER = 2; // percent
const STRING_OFFSET = 2; // percent, for double string spacing
const LABEL_X = 2; // percent, for string label position
const LABEL_FONT_SIZE = 150; // percent, for font size

const STRING_WIDTH = 0.2;
const FRET_WIDTH = 0.3;
const NUT_WIDTH = 2;

function SvgFretboard({ displayOptions = {} }: SvgFretboardProps) {
  return (
    <svg
      width={SVG_WIDTH}
      height={SVG_HEIGHT}
      preserveAspectRatio="xMidYMid meet"
      style={{ display: 'block', background: '#0096c7', borderRadius: 12, padding: '1em 4em', width: '100%', height: '100%' }}
    >
      {strings()}
      {stringLabels()}
      {nut()}
      {frets()}
      {noteIndicators({ displayOptions })}
    </svg>
  );
}

function noteIndicators({ displayOptions }: { displayOptions: DisplayOptions }) {

  return <></>
}

function strings() {
  const lines = [];
  for (let i = 0; i < 4; i++) {
    const centerY = HORIZONTAL_START_Y + i * HORIZONTAL_GAP;
    lines.push(
      <line
        key={`string-${i}-up`}
        x1={"0%"}
        y1={`${centerY - STRING_OFFSET}%`}
        x2={"100%"}
        y2={`${centerY - STRING_OFFSET}%`}
        stroke="black"
        strokeWidth={`${STRING_WIDTH}%`}
      />
    );
    lines.push(
      <line
        key={`string-${i}-down`}
        x1={"0%"}
        y1={`${centerY + STRING_OFFSET}%`}
        x2={"100%"}
        y2={`${centerY + STRING_OFFSET}%`}
        stroke="black"
        strokeWidth={`${STRING_WIDTH}%`}
      />
    );
  }
  return lines;
}

function stringLabels() {
  const labels = ['G', 'D', 'A', 'E'];
  return labels.map((label, i) => (
    <text
      key={label}
      x={`${LABEL_X}%`}
      y={`${HORIZONTAL_START_Y + i * HORIZONTAL_GAP + 6}%`}
      fontFamily="'Josefin Sans', Arial, Helvetica, sans-serif"
      fontWeight={800}
      fontSize={`${LABEL_FONT_SIZE}%`}
      fill="#fff"
      textAnchor="start"
      alignmentBaseline="middle"
    >
      {label}
    </text>
  ));
}

function nut() {
  const nutTop = HORIZONTAL_START_Y - NUT_FRET_BUFFER;
  const nutBottom = HORIZONTAL_START_Y + (HORIZONTAL_GAP * 3) + NUT_FRET_BUFFER;
  return (
    <line
      key="nut"
      x1={"0%"}
      y1={`${nutTop}%`}
      x2={"0%"}
      y2={`${nutBottom}%`}
      stroke="#DDD"
      strokeWidth={`${NUT_WIDTH}%`}
    />
  );
}

function frets() {
  const fretTop = HORIZONTAL_START_Y - NUT_FRET_BUFFER;
  const fretBottom = HORIZONTAL_START_Y + (HORIZONTAL_GAP * 3) + NUT_FRET_BUFFER;
  return Array.from({ length: VERTICAL_LINES - 1 }, (_, i) => {
    const x = ((i + 1) * VERTICAL_GAP);
    return (
      <line
        key={`fret-${i + 1}`}
        x1={`${x}%`}
        y1={`${fretTop}%`}
        x2={`${x}%`}
        y2={`${fretBottom}%`}
        stroke="#555"
        strokeWidth={`${FRET_WIDTH}%`}
      />
    );
  });
}

export default SvgFretboard;
