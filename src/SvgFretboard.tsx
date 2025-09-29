import React from 'react';
import {useScaleContext} from "./ScaleContext";

type DisplayOptions = Record<string, never>;

type SvgFretboardProps = {
  displayOptions?: DisplayOptions;
};

const SVG_WIDTH = '100%';
const SVG_HEIGHT = '100%';

const FRETS = 12;

const VERTICAL_TOP = 20; // percent
const GAP_BETWEEN_COURSES = 20; // percent
const GAP_BETWEEN_STRINGS_IN_COURSE = 4; // percent, for double string spacing

const NUT_FRET_BUFFER = 2.5; // percent

const LABEL_X = 0; // percent, for string label position
const LABEL_FONT_SIZE = 150; // percent, for font size

const STRING_WIDTH = 0.2; // percent
const FRET_WIDTH = 0.3; // percent
const NUT_WIDTH = 1.1; // percent

const NUT_START = 4.1; // percent

const FRETBOARD_LENGTH = 100 - NUT_START; // percent
const FRET_GAP = FRETBOARD_LENGTH / FRETS; // percent

const FRET_INDICATOR_SIZE = 1.05;

function fretIndicators() {
  // Positions for fret dots
  const indicators = [
    // Between 2nd and 3rd string, between frets 4/5, 6/7, 9/10
    { fret: 4.5, string: 1.5 },
    { fret: 6.5, string: 1.5 },
    { fret: 9.5, string: 1.5 },
    // Between 1st and 2nd string, between frets 11/12
    { fret: 11.5, string: 0.5 },
    // Between 3rd and 4th string, between frets 11/12
    { fret: 11.5, string: 2.5 },
  ];

  return indicators.map((ind, idx) => {
    // Calculate X position: NUT_START + FRET_GAP * ind.fret
    const x = NUT_START + FRET_GAP * ind.fret;
    // Calculate Y position: VERTICAL_TOP + GAP_BETWEEN_COURSES * ind.string
    const y = VERTICAL_TOP + GAP_BETWEEN_COURSES * ind.string;
    return (
      <circle
        key={`fret-indicator-${idx}`}
        cx={`${x}%`}
        cy={`${y}%`}
        r={`${FRET_INDICATOR_SIZE}%`}
        fill="#ddd"
      />
    );
  });
}

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
      {fretIndicators()}
      {noteIndicators({ displayOptions })}
    </svg>
  );
}

function noteIndicators({ displayOptions }: { displayOptions: DisplayOptions }) {
  const { selectedTonic, selectedDegrees } = useScaleContext()

  return <></>
}

function strings() {
  const lines = [];
  for (let i = 0; i < 4; i++) {
    const courseCenterY = VERTICAL_TOP + i * GAP_BETWEEN_COURSES;
    lines.push(
      <line
        key={`string-${i}-up`}
        x1={`${NUT_START}%`}
        y1={`${courseCenterY - GAP_BETWEEN_STRINGS_IN_COURSE / 2}%`}
        x2={"100%"}
        y2={`${courseCenterY - GAP_BETWEEN_STRINGS_IN_COURSE / 2}%`}
        stroke="black"
        strokeWidth={`${STRING_WIDTH}%`}
      />
    );
    lines.push(
      <line
        key={`string-${i}-down`}
        x1={`${NUT_START}%`}
        y1={`${courseCenterY + GAP_BETWEEN_STRINGS_IN_COURSE / 2}%`}
        x2={"100%"}
        y2={`${courseCenterY + GAP_BETWEEN_STRINGS_IN_COURSE / 2}%`}
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
      y={`${VERTICAL_TOP + i * GAP_BETWEEN_COURSES + 6}%`}
      fontFamily="'Josefin Sans', Arial, Helvetica, sans-serif"
      fontWeight={800}
      fontSize={`${LABEL_FONT_SIZE}%`}
      fill="#fff"
      textAnchor="start"
      alignmentBaseline="baseline"
    >
      {label}
    </text>
  ));
}

function nut() {
  const nutTop = VERTICAL_TOP - NUT_FRET_BUFFER;
  const nutBottom = VERTICAL_TOP + (GAP_BETWEEN_COURSES * 3) + NUT_FRET_BUFFER;
  return (
    <line
      key="nut"
      x1={`${NUT_START}%`}
      y1={`${nutTop}%`}
      x2={`${NUT_START}%`}
      y2={`${nutBottom}%`}
      stroke="#DDD"
      strokeWidth={`${NUT_WIDTH}%`}
    />
  );
}

function frets() {
  const fretTop = VERTICAL_TOP - NUT_FRET_BUFFER;
  const fretBottom = VERTICAL_TOP + (GAP_BETWEEN_COURSES * 3) + NUT_FRET_BUFFER;
  return Array.from({ length: FRETS }, (_, i) => {
    const horizontalPosition = NUT_START + ((i + 1) * FRET_GAP);
    return (
      <line
        key={`fret-${i + 1}`}
        x1={`${horizontalPosition}%`}
        y1={`${fretTop}%`}
        x2={`${horizontalPosition}%`}
        y2={`${fretBottom}%`}
        stroke="#555"
        strokeWidth={`${FRET_WIDTH}%`}
      />
    );
  });
}

export default SvgFretboard;
