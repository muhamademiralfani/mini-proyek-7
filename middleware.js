const jsonServer = require('json-server');
const fs = require('fs');
const cors = require('cors');

const server = jsonServer.create();
const router = jsonServer.router('db.json'); // Path to your db.json
const middlewares = jsonServer.defaults();

// Use CORS
server.use(cors());

// Custom middleware to enforce unique IDs
server.use((req, res, next) => {
  if (req.method === 'POST' && req.url === '/products') {
    const newProduct = req.body;

    // Read the current products from db.json
    const data = fs.readFileSync('./db.json');
    const db = JSON.parse(data);

    // Check if the ID already exists
    const existingProduct = db.products.find(product => product.id === newProduct.id);

    if (existingProduct) {
      // If the ID exists, return a 400 error
      return res.status(400).json({ error: 'ID must be unique' });
    }
  }

  // If everything is fine, proceed to the next middleware
  next();
});

// Use default middlewares (logger, static, cors, etc.)
server.use(middlewares);
server.use(router);

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
});
