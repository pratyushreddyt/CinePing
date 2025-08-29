const mongoose = require('mongoose');

// This is a placeholder for a real authentication function.
// It simply attaches a hardcoded user ID to the request object.
exports.verifyToken = (req, res, next) => {
  try {
    // In a real application, you would:
    // 1. Get the token from the request header (e.g., req.headers.authorization).
    // 2. Verify the token using a JWT secret.
    // 3. Decode the user information from the token.

    // For now, we'll use a static user ID for testing.
    req.user = { id: new mongoose.Types.ObjectId("60c72b2f9b1d8c001c8e4d2a") };
    
    // Pass control to the next middleware or route handler
    next();
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed. Please log in.' });
  }
};