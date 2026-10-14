// Exercise 5: Node.js, Express & MongoDB CRUD Application
// Run with: node ex5.js

const express = require('express');
const path = require('path');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON and Form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS, images) from the project directory
app.use(express.static(__dirname));

// MongoDB Database Configuration
const mongoUrl = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017';
const dbName = 'storeDB';
let db, products;

MongoClient.connect(mongoUrl)
  .then((client) => {
    db = client.db(dbName);
    products = db.collection('products');
    console.log(`Connected successfully to MongoDB: "${dbName}"`);
  })
  .catch((err) => {
    console.warn('MongoDB connection notice:', err.message);
    console.log('Ensure MongoDB daemon is running locally or set MONGO_URI.');
  });

// Root Route: Serve ex5.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'ex5.html'));
});

// ==========================================
// CRUD REST API ENDPOINTS (/api/products)
// ==========================================

// [READ - GET] Fetch all products
app.get('/api/products', async (req, res) => {
  try {
    if (!products) {
      return res.status(503).json({ error: 'Database not connected yet' });
    }
    const list = await products.find().toArray();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// [CREATE - POST] Add a new product
app.post('/api/products', async (req, res) => {
  try {
    if (!products) {
      return res.status(503).json({ error: 'Database not connected yet' });
    }
    const { name, price } = req.body;
    if (!name || price === undefined) {
      return res.status(400).json({ error: 'Name and price are required' });
    }

    const newProduct = { name, price: parseFloat(price) };
    const result = await products.insertOne(newProduct);

    if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
      res.redirect('/');
    } else {
      res.status(201).json({
        message: 'Product created successfully',
        id: result.insertedId,
        product: newProduct
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// [UPDATE - PUT] Update product price by ID
app.put('/api/products/:id', async (req, res) => {
  try {
    if (!products) {
      return res.status(503).json({ error: 'Database not connected yet' });
    }
    const { id } = req.params;
    const { price } = req.body;

    if (price === undefined || isNaN(parseFloat(price))) {
      return res.status(400).json({ error: 'A valid numeric price is required' });
    }

    const result = await products.updateOne(
      { _id: new ObjectId(id) },
      { $set: { price: parseFloat(price) } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// [DELETE - DELETE] Remove a product by ID
app.delete('/api/products/:id', async (req, res) => {
  try {
    if (!products) {
      return res.status(503).json({ error: 'Database not connected yet' });
    }
    const { id } = req.params;

    const result = await products.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start Express server
app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}`);
  console.log(`Open in browser: http://localhost:${PORT}/ex5.html`);
});
