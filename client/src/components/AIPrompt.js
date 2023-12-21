import React, { useState } from 'react';
import axios from 'axios';
import Translators from './Translator';

const AIPrompt = ({ englishText }) => {
  const [generatedText, setGeneratedText] = useState('');

  const generatePrompt = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/generate-meta/${englishText}`);
      setGeneratedText(response.data);
    } catch (error) {
      console.error('Meta generation error:', error);
    }
  };
  const translatedComponent = <Translators englishResponse={generatedText} />;

  return (
    <div>
      <textarea
        value={englishText}
        placeholder="Enter your prompt..."
      />
      <button onClick={generatePrompt}>Generate Prompt</button>
      <div>
        <strong>Generated Text:</strong> {generatedText}
      </div>
      
    </div>
  );
};

export default AIPrompt;
