const jwt = require("jsonwebtoken");

// Verify token middleware
const auth = (req, res, next) => {
  try {
    const header = req.headers.authorization;

    // Check header exists
    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const token = header.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user id to request
    req.user = { id: decoded.id };

    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = auth;