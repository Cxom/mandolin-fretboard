# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


## Feature List
- Choose a key center
- Indicate resolved note in scale degree selector
- Choose scale degrees to show (or load a scale type preset)
- Choose whether to show scale degrees, note names, or both. Adjust enharmonic notation preferences if chromatic
- Customize the presentation of the scale degrees (Allow adjusting colors - provide presets too)
- Choose a hand position for a narrower view
- If using a scale preset, choose a chord from the scale to highlight those notes
- Program in a chord sequence (and tempo) to highlight for
- Animate movements like enclosures
- Coloring method options for what's displayed on the fretboard (colored to degrees, colored to notes)
- Multiple fretboard views?
- Toggleable text labels on the fretboard
- Optional octave indication on the fretboard indicators
- Changeable labels for the note indicator text

## General TODO
- recolor and decolor key center buttons to not confuse scale degree thinking, add options
- make open string fretting note indicator further to left, a hollow circle instead of filled
- add a zero fret number label above the open string note indicators
- make fret dots less visual clutter - less opacity or different shape maybe