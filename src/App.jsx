import './App.css';
import TwoScene from './TwoScene';



function KeySelectorButtons() {
  return (
    <div className="key-selector-buttons-container">
      {[...Array(12)].map((_, i) => (
        <button key={i} className="key-selector-btn" />
      ))}
    </div>
  );
}

function App() {
  return (
    <>
      <KeySelectorButtons />
      <div className="two-scene-container">
        <TwoScene />
      </div>
    </>
  );
}

export default App;
