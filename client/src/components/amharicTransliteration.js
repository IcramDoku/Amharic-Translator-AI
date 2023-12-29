import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

// Function component representing the Amharic Keyboard
const AmharicKeyboard = ({ onTranslatedTextChange }) => {
  // State to manage input and output text
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    // Whenever the translatedText state changes, invoke the callback
    // function provided through props to notify the parent component
    onTranslatedTextChange(translatedText);
  }, [translatedText, onTranslatedTextChange]);

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
        'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
        'X-RapidAPI-Host': process.env.REACT_APP_RAPID_API_HOST
      },
      data: [
        {
          Text: outputText
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

  const AmharicLetters = ({ onKeyPress }) => {
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

  // Mapping of Amharic alphabets
  const alphabets = {
    h: ['ሀ', 'ሁ', 'ሂ', 'ሃ', 'ሄ', 'ህ', 'ሆ', 'ኋ'],
    l: ['ለ', 'ሉ', 'ሊ', 'ላ', 'ሌ', 'ል', 'ሎ', 'ሏ'],
    h2: ['ሐ', 'ሑ', 'ሒ', 'ሓ', 'ሔ', 'ሕ', 'ሖ', 'ሗ'],
    m: ['መ', 'ሙ', 'ሚ', 'ማ', 'ሜ', 'ም', 'ሞ', 'ሟ'],
    s2: ['ሠ', 'ሡ', 'ሢ', 'ሣ', 'ሤ', 'ሥ', 'ሦ', 'ሧ'],
    r: ['ረ', 'ሩ', 'ሪ', 'ራ', 'ሬ', 'ር', 'ሮ', 'ሯ'],
    s: ['ሰ', 'ሱ', 'ሲ', 'ሳ', 'ሴ', 'ስ', 'ሶ', 'ሷ'],
    sh: ['ሸ', 'ሹ', 'ሺ', 'ሻ', 'ሼ', 'ሽ', 'ሾ', 'ሿ'],
    q: ['ቀ', 'ቁ', 'ቂ', 'ቃ', 'ቄ', 'ቅ', 'ቆ', 'ቋ'],
    b: ['በ', 'ቡ', 'ቢ', 'ባ', 'ቤ', 'ብ', 'ቦ', 'ቧ'],
    v: ['ቨ', 'ቩ', 'ቪ', 'ቫ', 'ቬ', 'ቭ', 'ቮ', 'ቯ'],
    t: ['ተ', 'ቱ', 'ቲ', 'ታ', 'ቴ', 'ት', 'ቶ', 'ቷ'],
    ch: ['ቸ', 'ቹ', 'ቺ', 'ቻ', 'ቼ', 'ች', 'ቾ', 'ቿ'],
    n: ['ነ', 'ኑ', 'ኒ', 'ና', 'ኔ', 'ን', 'ኖ', 'ኗ'],
    gn: ['ኘ', 'ኙ', 'ኚ', 'ኛ', 'ኜ', 'ኝ', 'ኞ', 'ኟ'],
    e: ['አ', 'ኡ', 'ኢ', 'ኣ', 'ኤ', 'እ', 'ኦ', 'ኧ'],
    i: ['አ', 'ኡ', 'ኢ', 'ኣ', 'ኤ', 'እ', 'ኦ', 'ኧ'],
    a: ['አ', 'ኡ', 'ኢ', 'ኣ', 'ኤ', 'እ', 'ኦ', 'ኧ'],
    k: ['ከ', 'ኩ', 'ኪ', 'ካ', 'ኬ', 'ክ', 'ኮ', 'ኳ'],
    w: ['ወ', 'ዉ', 'ዊ', 'ዋ', 'ዌ', 'ው', 'ዎ', ''],
    z: ['ዘ', 'ዙ', 'ዚ', 'ዛ', 'ዜ', 'ዝ', 'ዞ', 'ዟ'],
    zh: ['ዠ', 'ዡ', 'ዢ', 'ዣ', 'ዤ', 'ዥ', 'ዦ', 'ዧ'],
    y: ['የ', 'ዩ', 'ዪ', 'ያ', 'ዬ', 'ይ', 'ዮ', 'ዯ'],
    d: ['ደ', 'ዱ', 'ዲ', 'ዳ', 'ዴ', 'ድ', 'ዶ', 'ዷ'],
    j: ['ጀ', 'ጁ', 'ጂ', 'ጃ', 'ጄ', 'ጅ', 'ጆ', 'ጇ'],
    g: ['ገ', 'ጉ', 'ጊ', 'ጋ', 'ጌ', 'ግ', 'ጎ', 'ጏ'],
    x: ['ጠ', 'ጡ', 'ጢ', 'ጣ', 'ጤ', 'ጥ', 'ጦ', 'ጧ'],
    c: ['ጨ', 'ጩ', 'ጪ', 'ጫ', 'ጬ', 'ጭ', 'ጮ', 'ጯ'],
    ts2: ['ጰ', 'ጱ', 'ጲ', 'ጳ', 'ጴ', 'ጵ', 'ጶ', 'ጷ'],
    ph: ['ጰ', 'ጹ', 'ጺ', 'ጻ', 'ጼ', 'ጽ', 'ጾ', 'ጷ'],
    ts: ['ፀ', 'ፁ', 'ፂ', 'ፃ', 'ፄ', 'ፅ', 'ፆ', 'ፇ'],
    f: ['ፈ', 'ፉ', 'ፊ', 'ፋ', 'ፌ', 'ፍ', 'ፎ', 'ፏ'],
    p: ['ፐ', 'ፑ', 'ፒ', 'ፓ', 'ፔ', 'ፕ', 'ፖ', 'ፗ'],
    ' ': [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    '-': ['፡'],
    ',': ['፣'],
    '.': ['።'],
    ';': ['፤'],
    ':': ['፥'],
  };

  // Helper functions for checking conditions
  const isVowel = (char) => {
    // Check if the character is a vowel
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    return vowels.includes(char);
  };

  const doesNeedH = (char) => {
    // Check if the character needs 'h' after it
    const letters = ['s', 'c', 'z', 'p'];
    return letters.includes(char);
  };

  const isCh = (str) => {
    // Check if the substring is one of the special cases
    const lts = ['ch', 'sh', 'zh', 'ph', 'gn', 'ts'];
    return lts.includes(str);
  };

  const isPunctuation = (char) => {
    // Check if the character is a punctuation mark
    const allowedPuncs = ['.', ',', '-', ':', ';'];
    return allowedPuncs.includes(char);
  };

  // Function to get the Amharic letter based on the English letter and vowel
  const getLetter = (a, b) => {
    // Mapping of options for each vowel
    const options = {
      a: alphabets[a][3],
      e: alphabets[a][0],
      i: alphabets[a][2],
      o: alphabets[a][6],
      u: alphabets[a][1],
    };

    // Return the corresponding letter based on the English letter and vowel
    return a in alphabets && b in options ? options[b] : '';
  };

  // Function to process a substring of English text and return the Amharic equivalent
  const processSubstring = (str) => {
    const ln = str.length;

    if (ln === 1) {
      // For a single character, handle punctuation and simple cases
      if (str in alphabets) {
        if (isPunctuation(str) || str === 'a') {
          return alphabets[str][0];
        }
        return alphabets[str][5];
      }
      return str;
    } else if (ln === 2) {
      // For two characters, handle special cases, vowels, and combinations
      if (str[0] === ' ' && str[1] === 'e') {
        return ' ' + alphabets['e'][5];
      }
      if (isCh(str)) {
        return alphabets[str][5];
      }
      if (isVowel(str[0]) && isVowel(str[1])) {
        if (str[0] === 'e') {
          return getLetter(str[0], str[1]);
        }
        if ((str[0] !== 'e' && str[1] !== 'e') || (str[0] !== 'a' && str[1] !== 'a')) {
          return '';
        }
      }
      if (str[1] === 'i') {
        return alphabets[str[0]][5];
      }
      if (str[0] in alphabets && !isPunctuation(str[0])) {
        if (str[0] === ' ' && str[1] === 'a') {
          return ' ' + alphabets['a'][0];
        }
        return getLetter(str[0], str[1]);
      }
      return str;
    } else if (ln === 3) {
      // For three characters, handle special cases and combinations
      const f2 = str.slice(0, 2);
      const l2 = str.slice(-2);

      if (str[0] === ' ' && l2 === 'ee') {
        return ' ' + alphabets['e'][0];
      }

      if (isCh(f2)) {
        if (str[2] === 'i') {
          return alphabets[f2][5];
        }
        return getLetter(f2, str[2]);
      }
      if (str === 'eee') {
        return alphabets[str[0]][4];
      }
      if (l2 === 'ee') {
        return alphabets[str[0]][4];
      }
      if (l2 === 'ua') {
        return alphabets[str[0]][7];
      }
      if (l2 === 'ii') {
        if (str[0] !== 'i') {
          return alphabets[str[0]][2];
        }
        return '';
      }
      return '';
    } else if (ln === 4) {
      // For four characters, handle special cases and combinations
      const f2 = str.slice(0, 2);
      const l2 = str.slice(-2);
      const l3 = str.slice(-3);

      if (l3 === 'eee' && str[0] === ' ') {
        return alphabets['e'][4];
      }

      if (l2 === 'ee') {
        if (isCh(f2)) {
          return alphabets[f2][4];
        }
        return alphabets[str[0]][4];
      }
      if (l2 === 'ua') {
        return alphabets[f2][7];
      }
      if (l2 === 'ii') {
        if (isCh(f2)) {
          return alphabets[f2][2];
        }
        return alphabets[str[0]][2];
      }
      return processSubstring(str.slice(0, 4));
    } else {
      // For more than four characters, recursively process the substring
      return processSubstring(str.slice(0, 4));
    }
  };

  // Function to transform English text to Amharic
  const transform = (text) => {
    text = String(text).trim();
    const lenx = text.length;

    if (lenx === 0) {
      return '';
    }

    let substr = '';
    let transformed = '';
    let i = 0;

    // Loop through each character of the input text
    while (i < lenx) {
      if (substr === '') {
        // If the substring is empty, start a new substring
        substr += text[i];
      } else {
        // If the substring is not empty, process it based on certain conditions
        if (doesNeedH(substr[substr.length - 1]) && text[i] === 'h') {
            substr += text[i];
          } else if (substr[substr.length - 1] === 't' && text[i] === 's') {
            substr += text[i];
          } else if (substr[substr.length - 1] === 'g' && text[i] === 'n') {
            substr += text[i];
          } else if (isVowel(text[i])) {
            if (isVowel(substr[substr.length - 1]) && isVowel(text[i])) {
              if (text[i] === 'a' && substr[substr.length - 1] !== 'u') {
                transformed += processSubstring(substr);
                substr = text[i];
              }
              if (substr[substr.length - 1] === 'e' && text[i] === 'e' || substr[substr.length - 1] === 'u' && text[i] === 'a' || substr[substr.length - 1] === 'i' && text[i] === 'i') {
                substr += text[i];
              }
              if (lenx === 2 && substr[0] === 'e' && isVowel(text[i])) {
                substr += text[i];
              }
            } else {
              substr += text[i];
            }
        } else {
          transformed += processSubstring(substr);
          substr = text[i];
        }
      }
      i += 1;
    }

    // Process the last substring
    transformed += processSubstring(substr);

    // Return the transformed text
    return transformed.trim();
  };

  // Event handler for input change
  const handleInputChange = (event) => {
    // Update input text state
    const newText = event.target.value;
    setInputText(newText);

    // Transform the text
    const transformedText = transform(newText);
    setOutputText(transformedText);
  };

  // Event handler for key press
  const handleKeyPress = (letter) => {
    // Get the cursor position
    const cursorPosition = inputRef.current.selectionStart;
  
    // Get the current text in the textarea
    const currentText = inputText;
  
    // Insert the letter at the cursor position
    const newText = currentText.slice(0, cursorPosition) + letter + currentText.slice(cursorPosition);
  
    // Update the input text and cursor position
    setInputText(newText);
    inputRef.current.selectionStart = cursorPosition + 1;
    inputRef.current.selectionEnd = cursorPosition + 1;
  
    // Transform the text
    const transformedText = transform(newText);
    setOutputText(transformedText);
  };  

  // JSX structure for the component
  return (
    <div>
      {/* Textarea for input */}
      <textarea 
        ref={inputRef}
        value={inputText} 
        onChange={handleInputChange} 
        placeholder="መጻፍ ጀምሩ...(e.g.indeeti nehi?)"
      />
      <div>
        {/* Display the transformed text */}
        <strong>Transformed Text:</strong>
        <div>{outputText}</div>
      </div>
      <div>
        <button onClick={translateText}>Translate</button>
        <hr />
        <AmharicLetters onKeyPress={handleKeyPress} />
      </div>
      <div>
        <strong>Translated Text (English):</strong> {translatedText}
      </div>

    </div>
  );
};

// Export the component for use in other parts of the application
export default AmharicKeyboard;







// import React, { useState } from 'react';

// const AmharicKeyboard = () => {
//   const [inputText, setInputText] = useState('');
//   const [outputText, setOutputText] = useState('');

//   const alphabets = {
//     h: ['ሀ', 'ሁ', 'ሂ', 'ሃ', 'ሄ', 'ህ', 'ሆ', 'ኋ'],
//     l: ['ለ', 'ሉ', 'ሊ', 'ላ', 'ሌ', 'ል', 'ሎ', 'ሏ'],
//     h2: ['ሐ', 'ሑ', 'ሒ', 'ሓ', 'ሔ', 'ሕ', 'ሖ', 'ሗ'],
//     m: ['መ', 'ሙ', 'ሚ', 'ማ', 'ሜ', 'ም', 'ሞ', 'ሟ'],
//     s2: ['ሠ', 'ሡ', 'ሢ', 'ሣ', 'ሤ', 'ሥ', 'ሦ', 'ሧ'],
//     r: ['ረ', 'ሩ', 'ሪ', 'ራ', 'ሬ', 'ር', 'ሮ', 'ሯ'],
//     s: ['ሰ', 'ሱ', 'ሲ', 'ሳ', 'ሴ', 'ስ', 'ሶ', 'ሷ'],
//     sh: ['ሸ', 'ሹ', 'ሺ', 'ሻ', 'ሼ', 'ሽ', 'ሾ', 'ሿ'],
//     q: ['ቀ', 'ቁ', 'ቂ', 'ቃ', 'ቄ', 'ቅ', 'ቆ', 'ቋ'],
//     b: ['በ', 'ቡ', 'ቢ', 'ባ', 'ቤ', 'ብ', 'ቦ', 'ቧ'],
//     v: ['ቨ', 'ቩ', 'ቪ', 'ቫ', 'ቬ', 'ቭ', 'ቮ', 'ቯ'],
//     t: ['ተ', 'ቱ', 'ቲ', 'ታ', 'ቴ', 'ት', 'ቶ', 'ቷ'],
//     ch: ['ቸ', 'ቹ', 'ቺ', 'ቻ', 'ቼ', 'ች', 'ቾ', 'ቿ'],
//     n: ['ነ', 'ኑ', 'ኒ', 'ና', 'ኔ', 'ን', 'ኖ', 'ኗ'],
//     gn: ['ኘ', 'ኙ', 'ኚ', 'ኛ', 'ኜ', 'ኝ', 'ኞ', 'ኟ'],
//     e: ['አ', 'ኡ', 'ኢ', 'ኣ', 'ኤ', 'እ', 'ኦ', 'ኧ'],
//     a: ['አ', 'ኡ', 'ኢ', 'ኣ', 'ኤ', 'እ', 'ኦ', 'ኧ'],
//     k: ['ከ', 'ኩ', 'ኪ', 'ካ', 'ኬ', 'ክ', 'ኮ', 'ኳ'],
//     w: ['ወ', 'ዉ', 'ዊ', 'ዋ', 'ዌ', 'ው', 'ዎ', ''],
//     z: ['ዘ', 'ዙ', 'ዚ', 'ዛ', 'ዜ', 'ዝ', 'ዞ', 'ዟ'],
//     zh: ['ዠ', 'ዡ', 'ዢ', 'ዣ', 'ዤ', 'ዥ', 'ዦ', 'ዧ'],
//     y: ['የ', 'ዩ', 'ዪ', 'ያ', 'ዬ', 'ይ', 'ዮ', 'ዯ'],
//     d: ['ደ', 'ዱ', 'ዲ', 'ዳ', 'ዴ', 'ድ', 'ዶ', 'ዷ'],
//     j: ['ጀ', 'ጁ', 'ጂ', 'ጃ', 'ጄ', 'ጅ', 'ጆ', 'ጇ'],
//     g: ['ገ', 'ጉ', 'ጊ', 'ጋ', 'ጌ', 'ግ', 'ጎ', 'ጏ'],
//     x: ['ጠ', 'ጡ', 'ጢ', 'ጣ', 'ጤ', 'ጥ', 'ጦ', 'ጧ'],
//     c: ['ጨ', 'ጩ', 'ጪ', 'ጫ', 'ጬ', 'ጭ', 'ጮ', 'ጯ'],
//     ts2: ['ጰ', 'ጱ', 'ጲ', 'ጳ', 'ጴ', 'ጵ', 'ጶ', 'ጷ'],
//     ph: ['ጰ', 'ጹ', 'ጺ', 'ጻ', 'ጼ', 'ጽ', 'ጾ', 'ጷ'],
//     ts: ['ፀ', 'ፁ', 'ፂ', 'ፃ', 'ፄ', 'ፅ', 'ፆ', 'ፇ'],
//     f: ['ፈ', 'ፉ', 'ፊ', 'ፋ', 'ፌ', 'ፍ', 'ፎ', 'ፏ'],
//     p: ['ፐ', 'ፑ', 'ፒ', 'ፓ', 'ፔ', 'ፕ', 'ፖ', 'ፗ'],
//     ' ': [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
//     '-': ['፡'],
//     ',': ['፣'],
//     '.': ['።'],
//     ';': ['፤'],
//     ':': ['፥'],
//   };

//   const isVowel = (char) => {
//     const vowels = ['a', 'e', 'i', 'o', 'u'];
//     return vowels.includes(char);
//   };

//   const doesNeedH = (char) => {
//     const letters = ['s', 'c', 'z', 'p'];
//     return letters.includes(char);
//   };

//   const isCh = (str) => {
//     const lts = ['ch', 'sh', 'zh', 'ph', 'gn', 'ts'];
//     return lts.includes(str);
//   };

//   const isPunctuation = (char) => {
//     const allowedPuncs = ['.', ',', '-', ':', ';'];
//     return allowedPuncs.includes(char);
//   };

//   const getLetter = (a, b) => {
//     const options = {
//       a: alphabets[a][3],
//       e: alphabets[a][0],
//       i: alphabets[a][2],
//       o: alphabets[a][6],
//       u: alphabets[a][1],
//     };
//     return a in alphabets && b in options ? options[b] : '';
//   };

//   const processSubstring = (str) => {
//     const ln = str.length;

//     if (ln === 1) {
//       if (str in alphabets) {
//         if (isPunctuation(str) || str === 'a') {
//           return alphabets[str][0];
//         }
//         return alphabets[str][5];
//       }
//       return str;
//     } else if (ln === 2) {
//       if (str[0] === ' ' && str[1] === 'e') {
//         return ' ' + alphabets['e'][5];
//       }
//       if (isCh(str)) {
//         return alphabets[str][5];
//       }
//       if (isVowel(str[0]) && isVowel(str[1])) {
//         if (str[0] === 'e') {
//           return getLetter(str[0], str[1]);
//         }
//         if ((str[0] !== 'e' && str[1] !== 'e') || (str[0] !== 'a' && str[1] !== 'a')) {
//           return '';
//         }
//       }
//       if (str[1] === 'i') {
//         return alphabets[str[0]][5];
//       }
//       if (str[0] in alphabets && !isPunctuation(str[0])) {
//         if (str[0] === ' ' && str[1] === 'a') {
//           return ' ' + alphabets['a'][0];
//         }
//         return getLetter(str[0], str[1]);
//       }
//       return str;
//     } else if (ln === 3) {
//       const f2 = str.slice(0, 2);
//       const l2 = str.slice(-2);

//       if (str[0] === ' ' && l2 === 'ee') {
//         return ' ' + alphabets['e'][0];
//       }

//       if (isCh(f2)) {
//         if (str[2] === 'i') {
//           return alphabets[f2][5];
//         }
//         return getLetter(f2, str[2]);
//       }
//       if (str === 'eee') {
//         return alphabets[str[0]][4];
//       }
//       if (l2 === 'ee') {
//         return alphabets[str[0]][4];
//       }
//       if (l2 === 'ua') {
//         return alphabets[str[0]][7];
//       }
//       if (l2 === 'ii') {
//         if (str[0] !== 'i') {
//           return alphabets[str[0]][2];
//         }
//         return '';
//       }
//       return '';
//     } else if (ln === 4) {
//       const f2 = str.slice(0, 2);
//       const l2 = str.slice(-2);
//       const l3 = str.slice(-3);

//       if (l3 === 'eee' && str[0] === ' ') {
//         return alphabets['e'][4];
//       }

//       if (l2 === 'ee') {
//         if (isCh(f2)) {
//           return alphabets[f2][4];
//         }
//         return alphabets[str[0]][4];
//       }
//       if (l2 === 'ua') {
//         return alphabets[f2][7];
//       }
//       if (l2 === 'ii') {
//         if (isCh(f2)) {
//           return alphabets[f2][2];
//         }
//         return alphabets[str[0]][2];
//       }
//       return processSubstring(str.slice(0, 4));
//     } else {
//       return processSubstring(str.slice(0, 4));
//     }
//   };

//   const transform = (text) => {
//     text = String(text).trim();
//     const lenx = text.length;

//     if (lenx === 0) {
//       return '';
//     }

//     let substr = '';
//     let transformed = '';
//     let i = 0;

//     while (i < lenx) {
//       if (substr === '') {
//         substr += text[i];
//       } else {
//         if (doesNeedH(substr[substr.length - 1]) && text[i] === 'h') {
//           substr += text[i];
//         } else if (substr[substr.length - 1] === 't' && text[i] === 's') {
//           substr += text[i];
//         } else if (substr[substr.length - 1] === 'g' && text[i] === 'n') {
//           substr += text[i];
//         } else if (isVowel(text[i])) {
//           if (isVowel(substr[substr.length - 1]) && isVowel(text[i])) {
//             if (text[i] === 'a' && substr[substr.length - 1] !== 'u') {
//               transformed += processSubstring(substr);
//               substr = text[i];
//             }
//             if (substr[substr.length - 1] === 'e' && text[i] === 'e' || substr[substr.length - 1] === 'u' && text[i] === 'a' || substr[substr.length - 1] === 'i' && text[i] === 'i') {
//               substr += text[i];
//             }
//             if (lenx === 2 && substr[0] === 'e' && isVowel(text[i])) {
//               substr += text[i];
//             }
//           } else {
//             substr += text[i];
//           }
//         } else {
//           transformed += processSubstring(substr);
//           substr = text[i];
//         }
//       }
//       i += 1;
//     }

//     transformed += processSubstring(substr);
//     return transformed.trim();
//   };

//   const handleInputChange = (event) => {
//     const newText = event.target.value;
//     setInputText(newText);
//     const transformedText = transform(newText);
//     setOutputText(transformedText);
//   };

//   return (
//     <div>
//       <textarea value={inputText} onChange={handleInputChange} />
//       <div>
//         <strong>Transformed Text:</strong>
//         <div>{outputText}</div>
//       </div>
//     </div>
//   );
// };

// export default AmharicKeyboard;
