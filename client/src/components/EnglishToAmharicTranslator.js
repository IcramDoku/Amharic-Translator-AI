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
          'from': 'en', //source language as English
          'to': 'am',   //target language as Amharic
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
    <div>
      <strong>Translated Text (Amharic):</strong> {translatedText}
    </div>
  );
};

export default EnglishToAmharicTranslator;
