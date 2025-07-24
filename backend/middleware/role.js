// backend/middleware/role.js

module.exports = function checkRole(requiredRole) {
  return function (req, res, next) {
    if (!req.user || req.user.role !== requiredRole) {
      return res.status(403).json({ message: 'Access Denied: Unauthorized Role' });
    }
    next(); // User has required role, move to the next middleware/controller
  };
};
