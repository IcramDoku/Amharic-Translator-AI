import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AIPrompt = ({ englishText, onGeneratedText }) => {
  const [inputText, setInputText] = useState(englishText);
  const [generatedText, setGeneratedText] = useState('');

  // Update inputText when the prop changes
  useEffect(() => {
    setInputText(englishText); 
  }, [englishText]);

  const handleInputChange = (event) => {
    const newText = event.target.value;
    setInputText(newText);
  };

  const generatePrompt = async () => {
    try {
      const response = await axios.get(`https://amharic-translator-ai.vercel.app/generate-meta/${inputText}`);
      setGeneratedText(response.data);
      onGeneratedText(response.data);
    } catch (error) {
      console.error('Meta generation error:', error);
    }
  };

  return (
    <div>
      <textarea
        value={inputText}
        placeholder="Enter your prompt..."
        onChange={handleInputChange}
      />
      <button onClick={generatePrompt}>Generate Prompt</button>
      <div>
        <strong>Generated Text:</strong> {generatedText}
      </div>
      
    </div>
  );
};

export default AIPrompt;
