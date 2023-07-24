const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
// Dummy users data
const users = [
  {id: 1, username: "user1", password: "password1"},
  {id: 2, username: "user2", password: "password2"}
];

router.post('/login', (req, res) => {
  console.log(req.body);
  const user = users.find(user => user.username === req.body.username);
  
  if (user == null) {
    return res.status(400).send('Cannot find user');
  }

  if (user.password !== req.body.password) {
    return res.status(400).send('Invalid password');
  }
  
  const accessToken = generateAccessToken(user);
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  refreshTokens.push(refreshToken);
  res.json({ accessToken: accessToken, refreshToken: refreshToken });
});

let refreshTokens = [];

router.post('/token', (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken({ name: user.name });
    res.json({ accessToken: accessToken });
  });
});

function generateAccessToken(user) {
  return jwt.sign(user, process.env.SECRET_KEY, { expiresIn: '10h' });
}


module.exports = router;
