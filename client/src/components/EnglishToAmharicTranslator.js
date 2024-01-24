import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EnglishToAmharicTranslator = ({ englishTextTranslate }) => {
  const [translatedText, setTranslatedText] = useState('');

  useEffect(() => {
    const translateText = async () => {
      const options = {
        method: 'POST',
        url: 'https://microsoft-translator-text.p.rapidapi.com/translate',
        params: {
          'from': 'en', 
          'to': 'am',  
          'api-version': '3.0',
          profanityAction: 'NoAction',
          textType: 'plain'
        },
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
          'X-RapidAPI-Host': process.env.REACT_APP_RAPID_API_HOST
        },
        data: [
          {
            Text: englishTextTranslate
          }
        ]
      };

      try {
        const response = await axios.request(options);
        // Update the translatedText state with the translated text
        setTranslatedText(response.data[0].translations[0].text);
      } catch (error) {
        console.error(error);
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
        <strong style={{ marginLeft: '10px'}}>የAI ምላሽ:</strong> {translatedText}
        <hr />
      </div>
    </div>
  );
};

export default EnglishToAmharicTranslator;
