// Simple health‑check API
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => res.send('MiniHR backend is running ✅'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`⚡️  Server ready → http://localhost:${PORT}`));
