require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public')); 

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB is connected...');
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};
connectDB();

// Function to get API data
const getApiData = async () => {
  try {
    const response = await axios.get('https://api.sampleapis.com/coffee/hot');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// Routes setup
app.use('/playlists', require('./routes/playlists'));
app.use('/auth', require('./routes/auth'));

app.get('/getApiData', async (req, res) => {
  const data = await getApiData();
  
  // Select a random coffee
  const randomIndex = Math.floor(Math.random() * data.length);
  const randomCoffee = data[randomIndex];

  res.json(randomCoffee);
});

// JWT Authentication Middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Server Start
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
