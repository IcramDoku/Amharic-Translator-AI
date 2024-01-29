import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AIPrompt = ({ englishText, onGeneratedText, onLoading }) => {
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
  }, [englishText]);

  useEffect(() => {
    // Whenever the isLoading state changes, invoke the callback
    // function provided through props to notify the parent component
    onLoading(isLoading);
  }, [isLoading, onLoading]);

  const toggleVisibility = () => {
    setIsVisible((prevIsVisible) => !prevIsVisible);
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const generatePrompt = async () => {
    console.log('generatePrompt called - isVisible:', isVisible, 'isLoading:', isLoading, 'englishText:', englishText, 'inputText:', inputText);
    setIsLoading(true);

    try {
      const response = await axios.get(`https://amharic-translator-ai.vercel.app/generate-meta/${isVisible ? inputText : englishText}`);
      setGeneratedText(response.data);
      onGeneratedText(response.data);
    } catch (error) {
      console.error('Meta generation error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div  style={{ marginRight: '25px', marginLeft: '25px', color: 'white'}}>
      <div style={{ borderRadius: '10px', backgroundColor: `rgba(70, 120, 120, 0.7)`, backgroundSize: 'cover'}}>
        <hr/>
        <button onClick={toggleVisibility} style={{ marginLeft: '10px'}}>
          {isVisible ? 'Hide' : 'Show'}
        </button>
        {isVisible && (
          <>
            <h2 style={{ marginLeft: '10px'}}>AI Prompt in English</h2>
            <textarea
              value={inputText}
              placeholder="Enter your prompt..."
              onChange={handleInputChange}
              style={{ marginLeft: '10px', marginBottom: '10px', border: '1px solid #ddd', width: '95%', borderRadius: '8px', fontSize: '16px' }}
            />
            <button onClick={generatePrompt} disabled={isLoading}
            style={{
              marginLeft: '10px',
              marginRight: '10px',
              padding: '5px',
              fontSize: '17px',
              fontFamily: 'Arial, sans-serif',
            }}>
              {isLoading ? 'Generating...' : 'Generate Prompt'}
            </button>
            <div>
              <strong style={{ marginLeft: '10px'}}>AI response:</strong> {generatedText}
            </div>
          </>
        )}
        <hr/>
      </div>
    </div>
  );
};

export default AIPrompt;
