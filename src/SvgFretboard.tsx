import React from 'react';
import {useScaleContext} from "./contexts/ScaleContext";
import {ChromaticNote} from "./types";
import {scaleDegrees} from "./constants";
import {determineScaleDegree} from "./assets/scaleUtils";
import {useDisplayOptions} from "./contexts/DisplayOptionsContext";

const SVG_WIDTH = '100%';
const SVG_HEIGHT = '100%';

const FRETS = 20;

const VERTICAL_TOP = 20; // percent
const GAP_BETWEEN_COURSES = 20; // percent
const GAP_BETWEEN_STRINGS_IN_COURSE = 4; // percent, for double string spacing

const NUT_FRET_BUFFER = 2.5; // percent

const LABEL_X = 0; // percent, for string label position
const LABEL_FONT_SIZE = 150; // percent, for font size

const STRING_WIDTH = 0.2; // percent
const FRET_WIDTH = 0.3; // percent
const NUT_WIDTH = 1.1; // percent

const NUT_START = 5.85; // percent
const FRETBOARD_END = 99;

const FRETBOARD_LENGTH = FRETBOARD_END - NUT_START; // percent

const FRET_DOT_SIZE = 1.05; // percent
const FRET_NUMBER_LABEL_VERTICAL_POSITION = 12; // percent

const NOTE_INDICATOR_OFFSET = -0.5; // percent
const NOTE_INDICATOR_OPEN_STRING_OFFSET_FROM_NUT = -1.3; // percent
const NOTE_INDICATOR_SIZE = 1.5;
const NOTE_INDICATOR_FONT_SIZE = 80;
const FRET_NUMBER_LABEL_FONT_SIZE = 80;

// TODO pull a lot of styles out into CSS

function SvgFretboard() {

  const { displayOptions: { showFretNumbers, fretScaling } } = useDisplayOptions()
  // TODO fretScaling display option

  const { calcFretGap, calcFretPosition } = React.useMemo(() => {
    const BIGGEST_FRET_SIZE = FRETBOARD_LENGTH / (FRETS + ((FRETS * (FRETS - 1)) / 2) * ((1 - fretScaling) / (11 * fretScaling)));
    const FRET_SIZE_SCALING_INCREMENT = (BIGGEST_FRET_SIZE * (1 - fretScaling)) / (11 * fretScaling);
    const calcFretGap = (fretIndex: number) => BIGGEST_FRET_SIZE + fretIndex * FRET_SIZE_SCALING_INCREMENT;
    const calcFretPosition = (fretIndex: number) => NUT_START + fretIndex * BIGGEST_FRET_SIZE + (fretIndex * (fretIndex - 1) * FRET_SIZE_SCALING_INCREMENT) / 2;
    return { calcFretGap, calcFretPosition };
  }, [fretScaling]);

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
      {fretDots()}
      {showFretNumbers && fretNumberLabels()}
      {noteIndicators()}
    </svg>
  );

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
    const labels = ['E', 'A', 'D', 'G'];
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
      let fretNumber = i + 1;
      const horizontalPosition = calcFretPosition(fretNumber);
      return (
          <line
              key={`fret-${fretNumber}`}
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

  function fretDots() {
    // Positions for fret dots
    const fretDots = [
      // Between 2nd and 3rd string, between frets 4/5, 6/7, 9/10
      { fret: 4.5, string: 1.5 },
      { fret: 6.5, string: 1.5 },
      { fret: 9.5, string: 1.5 },
      // Between 1st and 2nd string, between frets 11/12
      { fret: 11.5, string: 0.5 },
      // Between 3rd and 4th string, between frets 11/12
      { fret: 11.5, string: 2.5 },
      // Between 2nd and 3rd string, between frets 14/15
      { fret: 14.5, string: 1.5 },
    ];

    return fretDots.map(fretDot => {

      // follows scaling between frets to center dot
      const scaledDotPosition = calcFretPosition(fretDot.fret);
      // linearly centers dot between frets
      const centeredDotPosition = calcFretPosition(Math.floor(fretDot.fret)) + .5 * calcFretGap(Math.floor(fretDot.fret));

      const y = VERTICAL_TOP + GAP_BETWEEN_COURSES * fretDot.string;
      return (
          <circle
              key={`fret-dot-${Math.ceil(fretDot.fret)}-${fretDot.string}`}
              cx={`${centeredDotPosition}%`}
              cy={`${y}%`}
              r={`${FRET_DOT_SIZE}%`}
              fill="#ddd"
          />
      );
    });
  }

  function fretNumberLabels() {
    const labels = [];
    for (let i = 1; i <= FRETS; i++) {
      const horizontalPosition = calcFretPosition(i) - calcFretGap(i) / 2;
      labels.push(
          <text
              key={`fret-label-${i}`}
              x={`${horizontalPosition}%`}
              y={`${FRET_NUMBER_LABEL_VERTICAL_POSITION}%`}
              fontFamily="'Josefin Sans', Arial, Helvetica, sans-serif"
              fontWeight={800}
              fontSize={`${FRET_NUMBER_LABEL_FONT_SIZE}%`}
              fill="#fff"
              textAnchor="middle"
              alignmentBaseline="baseline"
          >
            {i}
          </text>
      );
    }
    return labels;
  }

  function noteIndicators() {
    const indicators = [];

    const { selectedTonic, selectedDegrees } = useScaleContext()

    const stringTunings: ChromaticNote[] = ['E', 'A', 'D', 'G']; // from highest to lowest course

    for (let course = 0; course < stringTunings.length; course++) {

      // Determine which scale degree the tuning note is.
      // Then, iterate through each fret, ticking up the chromatic note and the scale degree as we go.
      // If the scale degree is selected in selectedDegrees from the scale context, then we add a circle indicator in the color of the scale degree

      const tuningNote = stringTunings[course];
      let currentScaleDegree = determineScaleDegree(selectedTonic, tuningNote);
      for (let fret = 0; fret <= FRETS; fret++) {
        const degreeInfo = scaleDegrees.get(currentScaleDegree);
        const isOpenString = fret === 0;
        const noteIndicatorHorizontalPosition = isOpenString ? NUT_START + NOTE_INDICATOR_OPEN_STRING_OFFSET_FROM_NUT : calcFretPosition(fret) + NOTE_INDICATOR_OFFSET
        if (selectedDegrees[currentScaleDegree]) {
          indicators.push(
              <circle
                  key={`note-indicator-course-${course}-fret-${fret}`}
                  cx={`${noteIndicatorHorizontalPosition}%`}
                  cy={`${VERTICAL_TOP + GAP_BETWEEN_COURSES * course}%`}
                  r={`${NOTE_INDICATOR_SIZE}%`}
                  fill={degreeInfo!.color}
              />
          );
          if (isOpenString) {
            indicators.push(
                <circle
                    key={`note-indicator-open-string-course-${course}`}
                    cx={`${noteIndicatorHorizontalPosition}%`}
                    cy={`${VERTICAL_TOP + GAP_BETWEEN_COURSES * course}%`}
                    r={`${NOTE_INDICATOR_SIZE * .7}%`}
                    fill="#00000044"
                />
            )
          }
          indicators.push(
              <text
                  key={`note-indicator-course-${course}-fret-${fret}-text`}
                  x={`${noteIndicatorHorizontalPosition}%`}
                  y={`${VERTICAL_TOP + GAP_BETWEEN_COURSES * course + 2.95}%`}
                  fontFamily="'Josefin Sans', Arial, Helvetica, sans-serif"
                  fontWeight={800}
                  fontSize={`${NOTE_INDICATOR_FONT_SIZE}%`}
                  fill="#fff"
                  textAnchor="middle"
                  alignmentBaseline="baseline"
              >
                {currentScaleDegree}
              </text>
          )
        }
        currentScaleDegree = degreeInfo!.next;
      }
    }

    return indicators
  }
}



export default SvgFretboard;
