const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const WEBHOOK_URL = 'https://discord.com/api/webhooks/1375801999031009481/vd7Jp0aByQintEklFwy2tQurKJFdGPF9uIKczMqwTbEOV70avbjTXKdEpK2YViaiXD8r'; // replace with your actual webhook URL

app.post('/send-webhook', async (req, res) => {
  try {
    const { content, embeds } = req.body;

    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content, embeds })
    });

    if (!response.ok) throw new Error(`Discord error: ${response.status}`);

    res.status(200).json({ message: 'Webhook sent' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to send webhook' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
