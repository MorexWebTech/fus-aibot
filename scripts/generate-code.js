const express = require('express');
const { pipeline } = require('@xenova/transformers');

const app = express();
app.use(express.json());

let generator;

async function initializeModel() {
  generator = await pipeline('text-generation', 'Xenova/codegen-350M-mono');
}

app.post('/generate', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const result = await generator(prompt, {
      max_new_tokens: 200,
      temperature: 0.7,
      do_sample: true,
    });
    res.json({ code: result[0].generated_text });
  } catch (error) {
    console.error('Error generating code:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.CLAUDE_PORT || 4000;

initializeModel().then(() => {
  app.listen(PORT, () => {
    console.log(`Code generation server listening on port ${PORT}`);
  });
});
