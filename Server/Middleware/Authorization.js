const jwt = require("jsonwebtoken");
const dotenv = require('dotenv')
dotenv.config()
const Register = require('../Model/register')

// Middleware to verify JWT token
const authenticateJWT = (req, res, next) => {
  try {
      let token = null;
  
      // Try getting token from headers
      if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        token = req.headers.authorization.split(' ')[1];
      }
      // Else try getting from cookies
      else if (req.cookies && req.cookies.jwt) {
        token = req.cookies.jwt;
      }
  
      if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
      }
  
      const decoded = jwt.verify(token, process.env.SECRET_CODE);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: "Invalid token" });
    }
  };

// Middleware to check roles
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: Access denied" });
    }
    next();
  };
};

module.exports = { authenticateJWT, authorizeRoles };