import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AmharicKeyboard = ({ onKeyPress }) => {
  const amharicLetters = [
    'ሀ', 'ሁ', 'ሂ', 'ሃ', 'ሄ', 'ህ', 'ሆ', 'ለ', 'ሉ', 'ሊ', 'ላ', 'ሌ', 'ል', 'ሎ',
    'ሐ', 'ሑ', 'ሒ', 'ሓ', 'ሔ', 'ሕ', 'ሖ', 'መ', 'ሙ', 'ሚ', 'ማ', 'ሜ', 'ም', 'ሞ',
    'ሠ', 'ሡ', 'ሢ', 'ሣ', 'ሤ', 'ሥ', 'ሦ', 'ረ', 'ሩ', 'ሪ', 'ራ', 'ሬ', 'ር', 'ሮ',
    'ሰ', 'ሱ', 'ሲ', 'ሳ', 'ሴ', 'ስ', 'ሶ', 'ሸ', 'ሹ', 'ሺ', 'ሻ', 'ሼ', 'ሽ', 'ሾ', 'ሿ',
    'ቀ', 'ቁ', 'ቂ', 'ቃ', 'ቄ', 'ቅ', 'ቆ', 'ቈ', 'ቊ', 'ቋ', 'ቌ', 'ቍ',
    'በ', 'ቡ', 'ቢ', 'ባ', 'ቤ', 'ብ', 'ቦ', 'ቨ', 'ቩ', 'ቪ', 'ቫ', 'ቬ', 'ቭ', 'ቮ',
    'ተ', 'ቱ', 'ቲ', 'ታ', 'ቴ', 'ት', 'ቶ', 'ቸ', 'ቹ', 'ቺ', 'ቻ', 'ቼ', 'ች', 'ቾ', 'ቿ',
    'ኀ', 'ኁ', 'ኂ', 'ኃ', 'ኄ', 'ኅ', 'ኆ', 'ኈ', 'ኊ', 'ኋ', 'ኌ', 'ኍ',
    'ነ', 'ኑ', 'ኒ', 'ና', 'ኔ', 'ን', 'ኖ', 'ኘ', 'ኙ', 'ኚ', 'ኛ', 'ኜ', 'ኝ', 'ኞ',
    'አ', 'ኡ', 'ኢ', 'ኣ', 'ኤ', 'እ', 'ኦ', 'ከ', 'ኩ', 'ኪ', 'ካ', 'ኬ', 'ክ', 'ኮ',
    'ኰ', 'ኲ', 'ኳ', 'ኴ', 'ኵ', 'ኸ', 'ኹ', 'ኺ', 'ኻ', 'ኼ', 'ኽ', 'ኾ',
    'ወ', 'ዉ', 'ዊ', 'ዋ', 'ዌ', 'ው', 'ዎ',
    'ዐ', 'ዑ', 'ዒ', 'ዓ', 'ዔ', 'ዕ', 'ዖ', 'ዘ', 'ዙ', 'ዚ', 'ዛ', 'ዜ', 'ዝ', 'ዞ',
    'ዠ', 'ዡ', 'ዢ', 'ዣ', 'ዤ', 'ዥ', 'ዦ', 'የ', 'ዩ', 'ዪ', 'ያ', 'ዬ', 'ይ', 'ዮ',
    'ደ', 'ዱ', 'ዲ', 'ዳ', 'ዴ', 'ድ', 'ዶ', 'ጀ', 'ጁ', 'ጂ', 'ጃ', 'ጄ', 'ጅ', 'ጆ',
    'ገ', 'ጉ', 'ጊ', 'ጋ', 'ጌ', 'ግ', 'ጎ',
    'ጠ', 'ጡ', 'ጢ', 'ጣ', 'ጤ', 'ጥ', 'ጦ', 'ጨ', 'ጩ', 'ጪ', 'ጫ', 'ጬ', 'ጭ', 'ጮ',
    'ጰ', 'ጱ', 'ጲ', 'ጳ', 'ጴ', 'ጵ', 'ጶ', 'ጸ', 'ጹ', 'ጺ', 'ጻ', 'ጼ', 'ጽ', 'ጾ', 'ጿ',
    'ፀ', 'ፁ', 'ፂ', 'ፃ', 'ፄ', 'ፅ', 'ፆ', 'ፈ', 'ፉ', 'ፊ', 'ፋ', 'ፌ', 'ፍ', 'ፎ',
    'ፐ', 'ፑ', 'ፒ', 'ፓ', 'ፔ', 'ፕ', 'ፖ'
  ];
  // English alphabet keys mapped to Fidel characters
  const englishToFidelMapping = {
    ha: 'ሀ',
    le: 'ለ',
    Ha: 'ሐ',
    me: 'መ',
    se: 'ሠ',
    re: 'ረ',
    se: 'ሰ',
    she: 'ሸ',
    qe: 'ቀ',
    be: 'በ',
    te: 'ተ',
    che: 'ቸ',
    kHa: 'ኀ',
    ne: 'ነ',
    ñe: 'ኘ',
    A: 'አ',
    ke: 'ከ',
    He: 'ኸ',
    we: 'ወ',
    a: 'ዐ',
    ze: 'ዘ',
    zhe: 'ዠ',
    ye: 'የ',
    de: 'ደ',
    je: 'ጀ',
    ge: 'ገ',
    Te: 'ጠ',
    Che: 'ጨ',
    Pe: 'ጰ',
    Tse: 'ጸ',
    Tze: 'ፀ',
    fe: 'ፈ',
    pe: 'ፐ',
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      const pressedKey = event.key.toLowerCase();
      if (englishToFidelMapping[pressedKey]) {
        event.preventDefault();
        onKeyPress(englishToFidelMapping[pressedKey]);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onKeyPress]);

  return (
    <div>
      {/* Amharic buttons */}
      {amharicLetters.map((letter) => (
        <button key={letter} onClick={() => onKeyPress(letter)}>
          {letter}
        </button>
      ))}
    </div>
  );
};

const Translators = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');

  const translateText = async () => {
    const options = {
      method: 'POST',
      url: 'https://microsoft-translator-text.p.rapidapi.com/translate',
      params: {
        'from': 'am', // Specify the source language as Amharic
        'to': 'en',
        'api-version': '3.0',
        profanityAction: 'NoAction',
        textType: 'plain'
      },
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '21300ca6ccmsh6849dca0145d3f3p143772jsnd56847991b9b',
        'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com'
      },
      data: [
        {
          Text: inputText
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

  const handleKeyPress = (letter) => {
    setInputText((prevText) => prevText + letter);
  };

  return (
    <div>
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter text to translate..."
      />
      <AmharicKeyboard onKeyPress={handleKeyPress} />
      <button onClick={translateText}>Translate</button>
      <div>
        <strong>Translated Text:</strong> {translatedText}
      </div>
    </div>
  );
};

export default Translators;





