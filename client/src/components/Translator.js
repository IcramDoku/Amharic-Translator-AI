import React, { useState } from 'react';
import AIPrompt from './AIPrompt';
import EnglishToAmharicTranslator from './EnglishToAmharicTranslator';
import AmharicKeyboard from './AmharicTransliteration';
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
      <AmharicKeyboard onTranslatedTextChange={handleTranslatedTextChange} />
      <AIPrompt onGeneratedText={handleGeneratedText} englishText={translatedText} />
      <EnglishToAmharicTranslator englishTextTranslate={generatedText} />
      <SimpleTranslator />
    </div>
  );
   
};


export default Translators;






