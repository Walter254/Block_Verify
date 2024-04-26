const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  if (!token) {
    console.log('No token found, authorization denied');
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // {config_description: "Ensure the JWT_SECRET environment variable is set to your secret key."}
    req.user = decoded;
    console.log(`Token verified for user ID: ${req.user.userId}`);
    next();
  } catch (error) {
    console.error('Token is not valid', error);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = auth;