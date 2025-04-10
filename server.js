const express = require('express');
const path = require('path');
const helmet = require('helmet');
const app = express();

// Use helmet
app.use(helmet());

// Set a custom CSP
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"], 
      imgSrc: ["'self'", "https:"],           
      fontSrc: ["'self'", "https:"],
      connectSrc: ["'self'"],
    },
  })
);

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
