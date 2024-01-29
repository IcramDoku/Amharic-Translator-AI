import React, { useState } from 'react';
import axios from 'axios';

const SimpleTranslator = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [toLanguage, setToLanguage] = useState('am'); 
  const [fromLanguage, setFromLanguage] = useState('en'); 

  const translateText = async (text, fromLanguage, toLanguage) => {
    const option = {
      method: 'POST',
      url: 'https://microsoft-translator-text.p.rapidapi.com/translate',
      params: {
        'from': fromLanguage,
        'to': toLanguage,
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
    <div style={{ padding: '25px', color: 'white' }}>
      <div style={{ borderRadius: '10px', backgroundColor: `rgba(120, 50, 120, 0.6)`, backgroundSize: 'cover'}}>
        <hr />
        <h2 style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>Simple Translator/ ቀላል ተርጓሚ</h2>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
          
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`${fromLanguage === 'am' ? 'ጽሁፍ ያስገቡ...' : 'Enter text in...'}`}
              style={{ marginLeft: '10px', marginBottom: '10px', border: '1px solid #ddd', width: '100%', borderRadius: '8px', fontSize: '16px' }}
            />
            
          <div><button onClick={handleLanguageSwitch} style={{ marginLeft: '15px'}}>⇄</button></div>

            <textarea
              value={translatedText}
              style={{ marginLeft: '10px', marginRight: '10px', marginBottom: '10px', border: '1px solid #ddd', width: '100%', borderRadius: '8px', fontSize: '16px' }}
              placeholder= {toLanguage === 'am' ?  'Translation in Amharic.' : 'Translation in English.'}
              readOnly
            />
          
        </div>
        <div>
          <button onClick={handleTranslate} 
          style={{ marginLeft: '10px', marginBottom: '10px', marginRight: '10px', padding: '5px', fontSize: '17px', fontFamily: 'Arial, sans-serif', }}
          >
            {fromLanguage === 'am' ? 'ተረጉም' : 'Translate'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SimpleTranslator;
