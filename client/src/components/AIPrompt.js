import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AIPrompt = ({ englishText, onGeneratedText }) => {
  const [inputText, setInputText] = useState(englishText);
  const [generatedText, setGeneratedText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setInputText(englishText);
  }, [englishText]);

  useEffect(() => {
    if (!isVisible && !isLoading) {
      generatePrompt();
    }
  }, [isVisible, isLoading]);

  const toggleVisibility = () => {
    setIsVisible((prevIsVisible) => !prevIsVisible);
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const generatePrompt = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(`https://amharic-translator-ai.vercel.app/generate-meta/${inputText}`);
      setGeneratedText(response.data);
      onGeneratedText(response.data);
    } catch (error) {
      console.error('Meta generation error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button onClick={toggleVisibility}>
        {isVisible ? 'Hide' : 'Show'}
      </button>
      {isVisible && (
        <>
          <h1>AI Prompt</h1>
          <textarea
            value={inputText}
            placeholder="Enter your prompt..."
            onChange={handleInputChange}
            style={{ marginBottom: '10px', border: '1px solid #ddd', width: '100%', borderRadius: '8px', fontSize: '16px' }}
          />
          <button onClick={generatePrompt} disabled={isLoading}
          style={{
            marginRight: '10px',
            padding: '5px',
            fontSize: '17px',
            fontFamily: 'Arial, sans-serif', // Use the desired font family
          }}>
            {isLoading ? 'Generating...' : 'Generate Prompt'}
          </button>
          <div>
            <strong>AI response:</strong> {generatedText}
          </div>
        </>
      )}
    </div>
  );
};

export default AIPrompt;
