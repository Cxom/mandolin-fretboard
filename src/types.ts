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

export type ScaleDegree = keyof ScaleDegrees;
export type ScaleDegrees = {
    '1': boolean;
    'b2': boolean;
    '2': boolean;
    'b3': boolean;
    '3': boolean;
    '4': boolean;
    'b5': boolean;
    '5': boolean;
    'b6': boolean;
    '6': boolean;
    'b7': boolean;
    '7': boolean;
}