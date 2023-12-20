import React, { useState } from 'react';
import axios from 'axios';

const AIPrompt = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedText, setGeneratedText] = useState('');

  const generatePrompt = async () => {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/engines/davinci-codex/completions', // Replace with your OpenAI API endpoint
        {
          prompt,
          max_tokens: 100, // Adjust as needed
        },
        {
          headers: {
            Authorization: 'Bearer YOUR_OPENAI_API_KEY', // Replace with your OpenAI API key
          },
        }
      );

      setGeneratedText(response.data.choices[0].text);
    } catch (error) {
      console.error('AI prompt generation error:', error);
    }
  };

  return (
    <div>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
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
