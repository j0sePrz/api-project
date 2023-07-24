// middleware/auth.js

const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    //console.log('authHeader:', authHeader); // Debug line
  
    if (token == null) return res.sendStatus(401);
  
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        console.error('Token verification failed:', err);
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  }
  
module.exports = authenticateToken;
