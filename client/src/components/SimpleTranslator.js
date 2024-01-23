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
    <div className="simple-translator">
      <h1>Simple Translator/ ቀላል ተርጓሚ</h1>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
        <div>
          <p>Translate from ({fromLanguage === 'am' ? 'አማርኛ' : 'English'}):</p>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={`${fromLanguage === 'am' ? 'ጽሁፍ ያስገቡ...' : 'Enter text in...'}`}
            style={{ marginBottom: '10px', border: '1px solid #ddd', width: '100%', borderRadius: '8px', fontSize: '16px' }}
          />
          
        </div>
        <div><button onClick={handleLanguageSwitch}>⇄</button></div>
        <div>
          <p>Translated To ({toLanguage === 'am' ? 'አማርኛ' : 'English'}):</p>
          <textarea
            value={translatedText}
            style={{ marginBottom: '10px', border: '1px solid #ddd', width: '100%', borderRadius: '8px', fontSize: '16px' }}
            readOnly
          />
        </div>
      </div>
      <div>
        <button onClick={handleTranslate} 
        style={{ marginRight: '10px', padding: '5px', fontSize: '17px', fontFamily: 'Arial, sans-serif', }}
        >
          Translate
        </button>
      </div>
    </div>
  );
};

export default SimpleTranslator;
