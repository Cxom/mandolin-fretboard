import {ScaleDegrees} from "./types";

export const chromaticNotes = {
  C:        { color: '#FF0000', displayText: 'C' },
  CSharp:   { color: '#FF7F00', displayText: <>{'C'}#</> },
  D:        { color: '#FFEA00', displayText: 'D' },
  DSharp:   { color: '#00FF00', displayText: <>{'D'}#</> },
  E:        { color: '#0000FF', displayText: 'E' },
  F:        { color: '#4B0082', displayText: 'F' },
  FSharp:   { color: '#9400D3', displayText: <>{'F'}#</> },
  G:        { color: '#00CED1', displayText: 'G' },
  GSharp:   { color: '#FFD700', displayText: <>{'G'}#</> },
  A:        { color: '#FF1493', displayText: 'A' },
  ASharp:   { color: '#00FF7F', displayText: <>{'A'}#</> },
  B:        { color: '#8B4513', displayText: 'B' }
};

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


