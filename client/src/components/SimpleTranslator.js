import React, { useState } from 'react';
import axios from 'axios';

const SimpleTranslator = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [toLanguage, setToLanguage] = useState('am'); //default to Amharic
  const [fromLanguage, setFromLanguage] = useState('en'); //default to English

  const translateText = async (text, fromLanguage, toLanguage) => {
    const option = {
      method: 'POST',
      url: 'https://microsoft-translator-text.p.rapidapi.com/translate',
      params: {
        'from': fromLanguage, //source language as English
        'to': toLanguage,   //target language as Amharic
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
          Text: inputText
        }
      ]
    };

    try {
      const response = await axios.request(option);
      console.log('Translation API response:', response.data);

      // Update the translatedText state with the translated text
      setTranslatedText(response.data[0].translations[0].text);
    } catch (error) {
      console.error(error);
    }

  };
  const handleTranslate = () => {
    translateText(inputText, fromLanguage, toLanguage);
  };  

  const handleLanguageSwitch = () => {
    // Switch between English and Amharic
    const newToLanguage = toLanguage === 'en' ? 'am' : 'en';
    const newFromLanguage = fromLanguage === 'am' ? 'en' : 'am';
    setFromLanguage(newFromLanguage);
    setToLanguage(newToLanguage);
    //clear the states
    setInputText('');
    setTranslatedText('');
  };

  return (
    <div>
      <div>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter text..."
        />
      </div>
      <div>
        <button onClick={handleTranslate}>Translate</button>
        <button onClick={handleLanguageSwitch}>Switch Language</button>
      </div>
      <div>
        <strong>Translated Text ({toLanguage === 'am' ? 'Amharic' : 'English'}):</strong> {translatedText}
      </div>
    </div>
  );
};

export default SimpleTranslator;
