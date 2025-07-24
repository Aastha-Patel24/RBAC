const jwt = require('jsonwebtoken');

/**
 * Middleware to verify the JWT token.
 * If valid, attaches user info (id & role) to `req.user`.
 */
module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('Authorization')?.split(' ')[1];

  // Check if no token
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user data to request object
    req.user = decoded.user;

    next(); // Proceed to next middleware or controller
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Token is not valid' });
  }
};
