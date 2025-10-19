// Middleware to check for a valid API Key in the 'x-api-key' header
const requireApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key']; // Get key from standard header

  // Check if the header exists
  if (!apiKey) {
    console.warn('API Key Middleware: Missing API Key');
    // Send a 401 Unauthorized response
    return res.status(401).json({ success: false, message: 'Unauthorized: Missing API Key' });
  }

  // Compare the received key with your secret key stored in .env
  console.log(apiKey);
  
  if (apiKey === process.env.NOTIFICATION_API_KEY) {
    // Key is valid, allow the request to proceed to the next handler
    next();
  } else {
    // Key is invalid
    console.warn('API Key Middleware: Invalid API Key provided');
    return res.status(401).json({ success: false, message: 'Unauthorized: Invalid API Key' });
  }
};

// Export the middleware function
export default requireApiKey;