const jwt = require('jsonwebtoken');
const secretKey = 'here-secret';
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
  
    if (token == null) {
      return res.sendStatus(401);
    }
  
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  };
const token =(user) => jwt.sign(user, secretKey);
module.exports = {authenticateToken, token};