import {ChromaticNote, ScaleDegrees} from "./types";
import React from "react";

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

export const scaleDegrees: { name: keyof ScaleDegrees, color: string }[] = [
  { name: '1', color: '#FF0000' },
  { name: 'b2', color: '#FF7F00' },
  { name: '2', color: '#FFEA00' },
  { name: 'b3', color: '#00FF00' },
  { name: '3', color: '#0000FF' },
  { name: '4', color: '#4B0082' },
  { name: 'b5', color: '#9400D3' },
  { name: '5', color: '#00CED1' },
  { name: 'b6', color: '#FFD700' },
  { name: '6', color: '#FF1493' },
  { name: 'b7', color: '#00FF7F' },
  { name: '7', color: '#8B4513' }
];


