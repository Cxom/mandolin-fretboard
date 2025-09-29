import {ChromaticNote, ScaleDegree, ScaleDegreeSelection} from "./types";
import React from "react";

// TODO convert to dictinonary like scaleDegrees
export const chromaticNotes: { name: ChromaticNote, color: string, displayText: React.ReactNode }[] = [
  { name: 'C',        color: '#FF0000', displayText: 'C' },
  { name: 'CSharp',   color: '#FF7F00', displayText: <>{'C'}#</> },
  { name: 'D',        color: '#FFEA00', displayText: 'D' },
  { name: 'DSharp',   color: '#00FF00', displayText: <>{'D'}#</> },
  { name: 'E',        color: '#0000FF', displayText: 'E' },
  { name: 'F',        color: '#4B0082', displayText: 'F' },
  { name: 'FSharp',   color: '#9400D3', displayText: <>{'F'}#</> },
  { name: 'G',        color: '#00CED1', displayText: 'G' },
  { name: 'GSharp',   color: '#FFD700', displayText: <>{'G'}#</> },
  { name: 'A',        color: '#FF1493', displayText: 'A' },
  { name: 'ASharp',   color: '#00FF7F', displayText: <>{'A'}#</> },
  { name: 'B',        color: '#8B4513', displayText: 'B' }
];

export const scaleDegrees: Map<ScaleDegree, { color: string }> = new Map<ScaleDegree, {color: string}>([
  ['1', { color: '#FF0000' }],
  ['b2', { color: '#FF7F00' }],
  ['2', { color: '#FFEA00' }],
  ['b3', { color: '#00FF00' }],
  ['3', { color: '#0000FF' }],
  ['4', { color: '#4B0082' }],
  ['b5', { color: '#9400D3' }],
  ['5', { color: '#00CED1' }],
  ['b6', { color: '#FFD700' }],
  ['6', { color: '#FF1493' }],
  ['b7', { color: '#00FF7F' }],
  ['7', { color: '#8B4513' }]
]);


