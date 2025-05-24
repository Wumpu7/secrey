const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.use(express.json());

const WEBHOOK_URL = 'https://webhook.lewisakura.moe/api/webhooks/1375801999031009481/vd7Jp0aByQintEklFwy2tQurKJFdGPF9uIKczMqwTbEOV70avbjTXKdEpK2YViaiXD8r';

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow from all domains
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.post('/send-webhook', async (req, res) => {
  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });

    if (!response.ok) throw new Error(`Webhook failed: ${response.status}`);
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Webhook proxy running on port ${PORT}`));
