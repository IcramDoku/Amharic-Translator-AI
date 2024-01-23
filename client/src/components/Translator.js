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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
  
      <div style={{ background: '#b1bcbe', padding: '10px', borderRadius: '8px', marginBottom: '10px' }}>
        <AmharicKeyboard onTranslatedTextChange={handleTranslatedTextChange} />
      </div>
  
      <div style={{ background: '#b1bcbe', padding: '10px', borderRadius: '8px', marginBottom: '10px' }}>
        <p>Details here in English:</p>
        <AIPrompt onGeneratedText={handleGeneratedText} englishText={translatedText} />
      </div>
  
      <div style={{ background: '#b1bcbe', padding: '10px', borderRadius: '8px', marginBottom: '10px' }}>
        <hr />
        <EnglishToAmharicTranslator englishTextTranslate={generatedText} />
        <hr />
      </div>
  
      <div style={{ background: '#b1bcbe', padding: '10px', borderRadius: '8px' }}>
        <SimpleTranslator />
      </div>
    </div>
  );
   
};


export default Translators;






