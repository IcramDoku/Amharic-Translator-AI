import React, { useState, useEffect } from 'react';
import AIPrompt from './AIPrompt';
import EnglishToAmharicTranslator from './EnglishToAmharicTranslator';
import AmharicKeyboard from './amharicTransliteration';
import SimpleTranslator from './SimpleTranslator';


const Translators = () => {
  const [generatedText, setGeneratedText] = useState('');
  const [translatedText, setTranslatedText] = useState('');

  const handleTranslatedTextChange = (text) => {
    setTranslatedText(text);
  };

  const handleGeneratedText = (text) => {
    setGeneratedText(text);
  };

  return (
    <div>
      <AmharicKeyboard onTranslatedTextChange={handleTranslatedTextChange}/>
      <h1>AI Prompt Generator</h1>
      <AIPrompt onGeneratedText={handleGeneratedText} englishText={translatedText}  />
      <hr />
      <EnglishToAmharicTranslator englishTextTranslate={generatedText} /> 
      <SimpleTranslator/>
    </div>
  );
};


export default Translators;






