export type ChromaticNote =
    | 'C'
    | 'CSharp'
    | 'D'
    | 'DSharp'
    | 'E'
    | 'F'
    | 'FSharp'
    | 'G'
    | 'GSharp'
    | 'A'
    | 'ASharp'
    | 'B';

export type ScaleDegree =
    | '1'
    | 'b2'
    | '2'
    | 'b3'
    | '3'
    | '4'
    | 'b5'
    | '5'
    | 'b6'
    | '6'
    | 'b7'
    | '7';

export type ScaleDegreeSelection = {
    [key in ScaleDegree]: boolean;
}