const express = require('express');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const app = express();
const port = 4000;
app.use(cors()); // Enable CORS for all routes

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});

const openai = new OpenAIApi(configuration);  

app.get('/generate-meta/:title', async (req, res) => {
  try {
    const { title } = req.params;

    const description = await openai.createChatCompletion({
      model: "gpt-3.5-turbo-1106",
      messages: [
        {
          role: 'user',
          content: `${title}`,
        },
      ],
      max_tokens: 100,
    });

    const generatedContent = description.data.choices[0].message.content;

    console.log(generatedContent);

    res.status(200).json(generatedContent);
  } catch (error) {
    console.error('Error generating meta description:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
