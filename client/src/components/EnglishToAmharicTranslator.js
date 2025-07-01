import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EnglishToAmharicTranslator = ({ englishTextTranslate }) => {
  const [translatedText, setTranslatedText] = useState('');

  useEffect(() => {
    const translateText = async () => {
      try {
        const response = await axios.post('https://amharic-translator-ai.vercel.app/translate', {
          text: englishTextTranslate,
          from: 'en',
          to: 'am'
        });

        // Update the translatedText state with the translated text
        setTranslatedText(response.data.translatedText);
      } catch (error) {
        console.error('Translation failed:', error);
      }
    };

    // Translate the text when the English text changes
    if (englishTextTranslate) {
      translateText();
    }
  }, [englishTextTranslate]);

  return (
    <div style={{ marginLeft: '25px', marginTop: '25px', marginRight: '25px', color: 'white' }}>
      <div style={{ borderRadius: '10px', backgroundColor: `rgba(120, 120, 120, 0.8)`, backgroundSize: 'cover'}}>
        <hr />
        <strong style={{ marginLeft: '10px'}}>የኤ አይ ምላሽ:</strong> {translatedText}
        <hr />
      </div>
    </div>
  );
};

export default EnglishToAmharicTranslator;
