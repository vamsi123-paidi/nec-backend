const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const dotenv = require('dotenv');
dotenv.config()
const cors = require('cors');
const path = require('path');
const User = require('./models/User');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongo_url=process.env.MONGO_URL
// MongoDB Atlas connection
try{
    mongoose.connect(mongo_url);
    console.log("mongodb connected")
}catch{
    console.log("error occured in connection")
}

// Multer config
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// Routes
app.post('/register', upload.single('file'), async (req, res) => {
  try {
    const {
      name,
      email,
      dob,
      password,
      residentialAddress,
      permanentAddress,
    } = req.body;

    const filePath = req.file ? req.file.path : null;

    const user = new User({
      name,
      email,
      dob,
      password,
      residentialAddress,
      permanentAddress,
      filePath,
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find(); 
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
