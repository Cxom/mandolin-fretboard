import {ChromaticNote, ScaleDegree} from "../types";
import {scaleDegrees} from "../constants";

export function chromaticScaleForTonic(tonic: ChromaticNote) {
    const cChromaticScale: ChromaticNote[] = [
        'C', 'CSharp', 'D', 'DSharp', 'E', 'F', 'FSharp', 'G', 'GSharp', 'A', 'ASharp', 'B'
    ];
    const tonicIndex = cChromaticScale.indexOf(tonic);
    if (tonicIndex === -1) throw new Error('Invalid tonic note');
    return [
        ...cChromaticScale.slice(tonicIndex),
        ...cChromaticScale.slice(0, tonicIndex)
    ];
}

export function determineScaleDegree(tonic: ChromaticNote, noteInQuestion: ChromaticNote): ScaleDegree {
    const chromaticScale = chromaticScaleForTonic(tonic)
    const index = chromaticScale.indexOf(noteInQuestion);
    if (index === -1) throw new Error('Invalid tuning note');
    return [...scaleDegrees.keys()][index];
}