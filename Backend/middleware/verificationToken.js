// middleware/verificationToken.js
import jwt from "jsonwebtoken";

/**
 * Middleware to verify JWT token from either:
 * 1. Authorization header (Bearer token)
 * 2. Cookies (req.cookies.token)
 */
export const verifyToken = (req, res, next) => {
  let token;

  // Check Authorization header first
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  // Fallback to cookie if no Authorization header
  if (!token && req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  // If token is still missing, deny access
  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Pass decoded user (id, etc.) to next middleware/handler
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token." });
  }
};
