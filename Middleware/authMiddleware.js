const jwt = require('jsonwebtoken');


const AUTH0_DOMAIN = 'dev-btad0jdv6jenv1st.us.auth0.com';
const AUDIENCE = 'https://dev-btad0jdv6jenv1st.us.auth0.com/api/v2/';
const EXEMPT_ROUTES = ['/login', '/register']; 
const SECRET_KEY = 'nigga'; 





const authMiddleware = (req, res, next) => {
  
  if (EXEMPT_ROUTES.includes(req.path)) {
    return next();
  }

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    console.error('Unauthorized - No token provided');
    return res.status(401).json({ message: 'Unauthorized' });
  }

  
  const token = authHeader.startsWith('Bearer ')
    ? authHeader.slice(7) // Remove "Bearer " prefix
    : authHeader;

 
  const decodedToken = jwt.decode(token, { complete: true });
  if (!decodedToken || !decodedToken.payload) {
    console.error('Invalid token structure or decoding failed');
    return res.status(403).json({ message: 'Invalid token structure' });
  }

 


    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        console.error('Custom token verification failed:', err.message);
        return res.status(403).json({ message: 'Invalid or expired custom token' });
      }
    //  console.log('Verified Custom Token:', decoded); // Debugging verified token
      req.user = decoded;
      next();
    });
  
};

module.exports = authMiddleware;



