require('dotenv').config();
const express = require('express');
const connectDB = require('./db');
const authRoute = require('./routes/authRoutes')

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

connectDB()

app.use('/auth',authRoute)


// 404 and Error Handling
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ error: 'Server error' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
