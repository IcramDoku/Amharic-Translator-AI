import React, { useState } from 'react';
import axios from 'axios';

const AIPrompt = ({ englishText, onGeneratedText }) => {
  const [generatedText, setGeneratedText] = useState('');

  const generatePrompt = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/generate-meta/${englishText}`);
      setGeneratedText(response.data);
      onGeneratedText(response.data);
    } catch (error) {
      console.error('Meta generation error:', error);
    }
  };

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
