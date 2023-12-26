import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AIPrompt from './AIPrompt';
import EnglishToAmharicTranslator from './EnglishToAmharicTranslator';

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
    'ፐ', 'ፑ', 'ፒ', 'ፓ', 'ፔ', 'ፕ', 'ፖ', '.', ',', '፡', '።', '፣', '፤', '፥', '፦',
    '፧', '፨', '፠'
  ];

  //THIS PART NOT YET USED
  // English alphabet keys mapped to Fidel characters
  const englishToFidelMapping = {
    ha: 'ሀ',hu: 'ሁ', he: 'ሄ', hi: 'ሂ', ho: 'ሆ', 
    le: 'ለ',
    lu: 'ሉ', // Added 'lu'
    le: 'ሌ', // Added 'le'
    li: 'ሊ', // Added 'li'
    lo: 'ሎ', // Added 'lo'
    Ha: 'ሐ',
    Hu: 'ሑ', // Added 'Hu'
    He: 'ሔ', // Added 'He'
    Hi: 'ሒ', // Added 'Hi'
    Ho: 'ሖ', // Added 'Ho'
    me: 'መ',
    mu: 'ሙ', // Added 'mu'
    me: 'ሜ', // Added 'me'
    mi: 'ሚ', // Added 'mi'
    mo: 'ሞ', // Added 'mo'
    se: 'ሠ',
    su: 'ሡ', // Added 'su'
    se: 'ሤ', // Added 'se'
    si: 'ሢ', // Added 'si'
    so: 'ሦ', // Added 'so'
    re: 'ረ',
    ru: 'ሩ', // Added 'ru'
    re: 'ሬ', // Added 're'
    ri: 'ሪ', // Added 'ri'
    ro: 'ሮ', // Added 'ro'
    se: 'ሰ',
    su: 'ሱ', // Added 'su' (previously used for 'se')
    si: 'ሲ', // Added 'si'
    sa: 'ሳ', // Added 'sa'
    se: 'ሴ', // Added 'se'
    she: 'ሸ',
    shu: 'ሹ', // Added 'shu'
    she: 'ሼ', // Added 'she'
    shi: 'ሺ', // Added 'shi'
    sho: 'ሾ', // Added 'sho'
    qe: 'ቀ',
    qu: 'ቁ', // Added 'qu'
    qi: 'ቂ', // Added 'qi'
    qa: 'ቃ', // Added 'qa'
    qe: 'ቄ', // Added 'qe'
    qHa: 'ቐ',
    qHu: 'ቑ', // Added 'qHu'
    qHe: 'ቔ', // Added 'qHe'
    qHi: 'ቓ', // Added 'qHi'
    qHo: 'ቖ', // Added 'qHo'
    ne: 'ነ',
    nu: 'ኑ', // Added 'nu'
    ne: 'ኔ', // Added 'ne'
    ni: 'ኒ', // Added 'ni'
    no: 'ኖ', // Added 'no'
    ñe: 'ኘ',
    ñu: 'ኙ', // Added 'ñu'
    ñe: 'ኜ', // Added 'ñe'
    ñi: 'ኚ', // Added 'ñi'
    ño: 'ኞ', // Added 'ño'
    A: 'አ',
    u: 'ኡ', // Added 'u'
    i: 'ኢ', // Added 'i'
    o: 'ኦ', // Added 'o'
    ke: 'ከ',
    ku: 'ኩ', // Added 'ku'
    ke: 'ኬ', // Added 'ke'
    ki: 'ኪ', // Added 'ki'
    ko: 'ኮ', // Added 'ko'
    He: 'ኸ',
    Hu: 'ኹ', // Added 'Hu'
    He: 'ኼ', // Added 'He'
    Hi: 'ኻ', // Added 'Hi'
    Ho: 'ኾ', // Added 'Ho'
    we: 'ወ',
    wu: 'ዉ', // Added 'wu'
    we: 'ዌ', // Added 'we'
    wi: 'ዊ', // Added 'wi'
    wo: 'ዎ', // Added 'wo'
    a: 'ዐ',
    u: 'ዑ', // Added 'u' (previously used for 'u')
    i: 'ዒ', // Added 'i'
    o: 'ዖ', // Added 'o'
    ze: 'ዘ',
    zu: 'ዙ', // Added 'zu'
    ze: 'ዜ', // Added 'ze'
    zi: 'ዚ', // Added 'zi'
    zo: 'ዞ', // Added 'zo'
    zhe: 'ዠ',
    zhu: 'ዡ', // Added 'zhu'
    zhe: 'ዤ', // Added 'zhe'
    zhi: 'ዢ', // Added 'zhi'
    zho: 'ዦ', // Added 'zho'
    ye: 'የ',
    yu: 'ዩ', // Added 'yu'
    ye: 'ዬ', // Added 'ye'
    yi: 'ዪ', // Added 'yi'
    yo: 'ዮ', // Added 'yo'
    de: 'ደ',
    du: 'ዱ', // Added 'du'
    de: 'ዴ', // Added 'de'
    di: 'ዲ', // Added 'di'
    do: 'ዶ', // Added 'do'
    je: 'ጀ',
    ju: 'ጁ', // Added 'ju'
    je: 'ጄ', // Added 'je'
    ji: 'ጂ', // Added 'ji'
    jo: 'ጆ', // Added 'jo'
    ge: 'ገ',
    gu: 'ጉ', // Added 'gu'
    ge: 'ጊ', // Added 'ge'
    gi: 'ጊ', // Added 'gi'
    go: 'ጎ', // Added 'go'
    Te: 'ጠ',
    Tu: 'ጡ', // Added 'Tu'
    Te: 'ጤ', // Added 'Te'
    Ti: 'ጢ', // Added 'Ti'
    To: 'ጦ', // Added 'To'
    Che: 'ጨ',
    Chu: 'ጩ', // Added 'Chu'
    Che: 'ጬ', // Added 'Che'
    Chi: 'ጪ', // Added 'Chi'
    Cho: 'ጮ', // Added 'Cho'
    Pe: 'ጰ',
    Pu: 'ጱ', // Added 'Pu'
    Pe: 'ጴ', // Added 'Pe'
    Pi: 'ጲ', // Added 'Pi'
    Po: 'ጶ', // Added 'Po'
    Tse: 'ጸ',
    Tsu: 'ጹ', // Added 'Tsu'
    Tse: 'ጼ', // Added 'Tse'
    Tsi: 'ጺ', // Added 'Tsi'
    Tso: 'ጾ', // Added 'Tso'
    Tze: 'ፀ',
    Tzu: 'ፁ', // Added 'Tzu'
    Tze: 'ፄ', // Added 'Tze'
    Tzi: 'ፂ', // Added 'Tzi'
    Tzo: 'ፆ', // Added 'Tzo'
    fe: 'ፈ',
    fu: 'ፉ', // Added 'fu'
    fe: 'ፌ', // Added 'fe'
    fi: 'ፊ', // Added 'fi'
    fo: 'ፎ', // Added 'fo'
    pe: 'ፐ',
    pu: 'ፑ', // Added 'pu'
    pe: 'ፒ', // Added 'pe'
    pi: 'ፐ', // Added 'pi'
    po: 'ፖ', // Added 'po'
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
  const [generatedText, setGeneratedText] = useState('');
  const [backToOriginal, setBackToOriginal] = useState('');

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

  const handleGeneratedText = (text) => {
    setGeneratedText(text);
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
        <strong>Translated Text (English):</strong> {translatedText}
      </div>
      <hr />
      <h1>AI Prompt Generator</h1>
      <AIPrompt onGeneratedText={handleGeneratedText} englishText={translatedText}  />
      <hr />
      <EnglishToAmharicTranslator englishTextTranslate={generatedText} />
    </div>
  );
};


export default Translators;


// import React, { useState } from 'react';

// const AmharicAlphabet = [
//   // Consonants

//   { character: 'ሀ', sound: '[ha]' }, { character: 'ሁ', sound: '[hu]' },
//   { character: 'ሂ', sound: '[hi]' }, { character: 'ሃ', sound: '[haa]' },
//   { character: 'ሄ', sound: '[hee]' }, { character: 'ህ', sound: '[he]' },
//   { character: 'ሆ', sound: '[ho]' }, { character: 'ለ', sound: '[la]' },
//   { character: 'ሉ', sound: '[lu]' }, { character: 'ሊ', sound: '[li]' },
//   { character: 'ላ', sound: '[laa]' }, { character: 'ሌ', sound: '[lee]' },
//   { character: 'ል', sound: '[le]' }, { character: 'ሎ', sound: '[lo]' },
//   { character: 'ሐ', sound: '[hha]' }, { character: 'ሑ', sound: '[hhu]' },
//   { character: 'ሒ', sound: '[hhi]' }, { character: 'ሓ', sound: '[hhaa]' },
//   { character: 'ሔ', sound: '[hhee]' }, { character: 'ሕ', sound: '[hhe]' },
//   { character: 'ሖ', sound: '[hho]' }, { character: 'መ', sound: '[ma]' },
//   { character: 'ሙ', sound: '[mu]' }, { character: 'ሚ', sound: '[mi]' },
//   { character: 'ማ', sound: '[maa]' }, { character: 'ሜ', sound: '[mee]' },
//   { character: 'ም', sound: '[me]' }, { character: 'ሞ', sound: '[mo]' },
//   { character: 'ሠ', sound: '[sza]' }, { character: 'ሠ', sound: '[szu]' },
//   // ... Add the rest of the characters

//   // Vowels
//   { character: 'ሀ', sound: '[a]' },
//   { character: 'ሁ', sound: '[u]' },
//   { character: 'ሂ', sound: '[i]' },
//   { character: 'ሃ', sound: '[a]' },
//   { character: 'ሄ', sound: '[e]' },
//   { character: 'ህ', sound: '[ə]' },
//   { character: 'ሆ', sound: '[o]' },

//   // Numerals
//   { character: 'ዜሮ', sound: '[zero]' },
//   { character: 'አንድ', sound: '[1]' },
//   { character: 'ሁለት', sound: '[2]' },
//   { character: 'ሶስት', sound: '[3]' },
//   { character: 'አራት', sound: '[4]' },
//   { character: 'አምስት', sound: '[5]' },
//   { character: 'ስድስት', sound: '[6]' },
//   { character: 'ሰባት', sound: '[7]' },
//   { character: 'ዘጠኝ', sound: '[8]' },
//   { character: 'አስር', sound: '[9]' },
//   { character: '.', sound: '.' }, 
// ];

// const Translators = () => {
//   const [englishText, setEnglishText] = useState('');
//   const [amharicText, setAmharicText] = useState('');

//   const englishToAmharicMap = {
//     a: 'U', // Vowels

//   };

//   const handleInputChange = (e) => {
//     const inputText = e.target.value;
//     setEnglishText(inputText);

//     const amharicText = translateToAmharic(inputText);
//     setAmharicText(amharicText);
//   };

//   const translateToAmharic = (text) => {
//     return text
//       .toLowerCase()
//       .split('')
//       .map((char) => englishToAmharicMap[char] || char)
//       .join('');
//   };

//   return (
//     <div>
//       <h1>English to Amharic Translator</h1>
//       <input
//         type="text"
//         placeholder="Type in English..."
//         value={englishText}
//         onChange={handleInputChange}
//       />
//       <div>
//         <strong>Amharic:</strong> {amharicText}
//       </div>
//     </div>
//   );
// };

// export default Translators;





