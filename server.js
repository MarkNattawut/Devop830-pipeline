import express from 'express';
import cors from 'cors';
import { products as initialProducts } from './src/data/products.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

let products = [...initialProducts];
let orders = [];

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.post('/api/products', (req, res) => {
  const data = req.body;
  if (!data.name || !data.price) {
    return res.status(400).json({ error: 'Invalid product data' });
  }
  const newProduct = {
    id: Date.now(),
    name: data.name,
    brand: data.brand || 'SIZE N TAG',
    price: Number(data.price),
    image: data.image || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
    size: Array.isArray(data.size) ? data.size : (data.size?.split(',').map(s => s.trim()) || []),
    color: Array.isArray(data.color) ? data.color : (data.color?.split(',').map(c => c.trim()) || []),
    description: data.description || ''
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.put('/api/products/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = products.findIndex(p => p.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Product not found' });

  const update = { ...products[idx], ...req.body };
  update.price = Number(update.price);
  products[idx] = update;
  res.json(update);
});

app.delete('/api/products/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = products.findIndex(p => p.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Product not found' });
  products.splice(idx, 1);
  res.sendStatus(204);
});

app.get('/api/orders', (req, res) => {
  res.json(orders);
});

app.post('/api/orders', (req, res) => {
  const data = req.body;
  if (!data.items || !Array.isArray(data.items) || data.items.length === 0) {
    return res.status(400).json({ error: 'Invalid order data' });
  }
  const order = {
    id: Date.now(),
    user: data.user || null,
    items: data.items,
    total: Number(data.total || 0),
    createdAt: new Date().toISOString(),
    status: 'pending'
  };
  orders.push(order);
  res.status(201).json(order);
});

app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
});