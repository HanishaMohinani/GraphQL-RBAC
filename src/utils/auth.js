const jwt = require('jsonwebtoken');

function authMiddleware(req) {
  const token = req.headers.authorization || '';
  if (!token) return { user: null };
  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
    return { user: decoded };
  } catch {
    return { user: null };
  }
}

module.exports = { authMiddleware };
