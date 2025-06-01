const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const path=require('path');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://157.230.26.234:3000',
  credentials: true
}));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// React frontend statik fayllar
app.use(express.static(path.join(__dirname, 'client', 'build')));

// React routing uchun barcha so‘rovlarni index.html ga yo‘naltiramiz
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, (res) => {
  console.log(`✅ Server http://localhost:${PORT} is running`, res);
});
