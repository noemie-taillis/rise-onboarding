const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'RISE Onboarding API',
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`✦ RISE API → http://localhost:${PORT}`);
});
