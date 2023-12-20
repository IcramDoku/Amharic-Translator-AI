import React from 'react';
import Translators from './components/Translator';
import AIPrompt from './components/AIPrompt';

function App() {
  return (
    <div>
      <h1>Amharic Translator</h1>
      <Translators />
      <hr />
      <h1>AI Prompt Generator</h1>
      <AIPrompt />
    </div>
  );
}

export default App;



{/* <a
  className="App-link"
  href="https://reactjs.org"
  target="_blank"
  rel="noopener noreferrer"
>
  Learn React
</a> */}
