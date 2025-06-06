const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
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

const PORT = process.env.PORT || 5000;

app.listen(PORT, (res) => {
  console.log(`✅ Server http://localhost:${PORT} is running`, res);
});
app.get('/', (req, res) => {
  res.send('Itransition Task4')
})
