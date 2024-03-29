import React, { useState } from 'react';
import AIPrompt from './AIPrompt';
import EnglishToAmharicTranslator from './EnglishToAmharicTranslator';
import AmharicKeyboard from './AmharicTransliteration';
import SimpleTranslator from './SimpleTranslator';


const Translators = () => {
  const [generatedText, setGeneratedText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleTranslatedTextChange = (text) => {
    setTranslatedText(text);
  };

  const handleGeneratedText = (text) => {
    setGeneratedText(text);
  };

  const handleIsLoading = (Boolean) => {
    setIsLoading(Boolean)
  }

  return (
    <div>
      <AmharicKeyboard onTranslatedTextChange={handleTranslatedTextChange} Loading={isLoading}/>
      <AIPrompt onGeneratedText={handleGeneratedText} englishText={translatedText} onLoading={handleIsLoading} />
      <EnglishToAmharicTranslator englishTextTranslate={generatedText} />
      <SimpleTranslator />
      <p style={{ marginLeft:'10px', marginRight: '10px' }}>አመልካች ፦ ኤ አይ ለጥያቄዎቹ የሚሰጠው መልስ ሁልጊዜ ሙሉ በሙሉ ትክክል ላይሆን ወይም በቅርብ ጊዜ የተከናወኑትን ነገሮች ሊያንጸባርቅ ይችላል ።</p>
      <p style={{ marginLeft:'10px', marginRight: '10px' }}>Disclaimer: The answers generated by the AI may not always be completely accurate or reflect the latest developments.</p>
    </div>
  );
   
};


export default Translators;






