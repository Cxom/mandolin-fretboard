import './App.css';
import SvgFretboard from './SvgFretboard';
import ScaleDegreeSelectorButtons from './ScaleDegreeSelectorButtons';
import KeySelectorButtons from './KeySelectorButtons';
import ScaleSelector from './ScaleSelector';
import { ScaleContextProvider } from './contexts/ScaleContext';
import { DisplayOptionsContextProvider } from './contexts/DisplayOptionsContext';
import DisplayOptions from './DisplayOptions';

function App() {

  return (
    <DisplayOptionsContextProvider>
      <DisplayOptions />
      <ScaleContextProvider>
        <ScaleSelector />
        <KeySelectorButtons />
        <ScaleDegreeSelectorButtons />
        <SvgFretboard />
      </ScaleContextProvider>
    </DisplayOptionsContextProvider>
  );
}

export default App;
