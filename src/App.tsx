import './App.css';
import SvgFretboard from './SvgFretboard';
import ScaleDegreeSelectorButtons from './ScaleDegreeSelectorButtons';
import KeySelectorButtons from './KeySelectorButtons';
import ScaleSelector from './ScaleSelector';
import { ScaleContextProvider } from './ScaleContext';

function App() {

  return (
    <ScaleContextProvider>
      <ScaleSelector />
      <KeySelectorButtons />
      <ScaleDegreeSelectorButtons />
      <SvgFretboard />
    </ScaleContextProvider>
  );
}

export default App;
