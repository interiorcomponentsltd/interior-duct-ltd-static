const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database paths
const dbPath = path.join(__dirname, 'db.json');
const leadsPath = path.join(__dirname, 'leads.json');

// Ensure leads.json exists
if (!fs.existsSync(leadsPath)) {
  fs.writeFileSync(leadsPath, JSON.stringify({ leads: [] }, null, 2));
}

// Serve uploads
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
app.use('/uploads', express.static(uploadsDir));

// Serve static demo (project root) so the static `index.html` and branding images are accessible
const siteRoot = path.join(__dirname, '..');
app.use(express.static(siteRoot));

// Serve index.html at root for convenience
app.get('/', (req, res) => {
  res.sendFile(path.join(siteRoot, 'index.html'));
});

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `product-${unique}${path.extname(file.originalname)}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error('Only JPEG, PNG and WebP allowed'));
  }
});

// Helper functions
const readDB = () => {
  try {
    const data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return { products: [], quotes: [], testimonials: [] };
  }
};

const writeDB = (data) => fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

const readLeads = () => {
  try {
    return JSON.parse(fs.readFileSync(leadsPath, 'utf8'));
  } catch (err) {
    return { leads: [] };
  }
};

const writeLeads = (data) => fs.writeFileSync(leadsPath, JSON.stringify(data, null, 2));

// ==================== PRODUCTS ====================

app.get('/products', (req, res) => {
  try {
    const db = readDB();
    res.json(db.products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.get('/products/:id', (req, res) => {
  try {
    const db = readDB();
    const product = db.products.find(p => p.id === req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// Create product (JSON body)
app.post('/products', (req, res) => {
  try {
    const db = readDB();
    const newProduct = { id: uuidv4(), ...req.body, createdAt: new Date().toISOString() };
    db.products.push(newProduct);
    writeDB(db);
    res.json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add product' });
  }
});

// Upload image only
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.json({ success: true, imageUrl: `/uploads/${req.file.filename}` });
});

// Create product with image file (multipart/form-data)
app.post('/products/upload', upload.single('image'), (req, res) => {
  try {
    const { name, category, price, description } = req.body;
    if (!name || !category || !price) return res.status(400).json({ error: 'Missing required fields' });
    const db = readDB();
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '/uploads/default.jpg';
    const newProduct = {
      id: uuidv4(),
      name,
      category,
      price: parseFloat(price),
      description: description || '',
      image: imageUrl,
      createdAt: new Date().toISOString()
    };
    db.products.push(newProduct);
    writeDB(db);
    res.json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/products/:id', (req, res) => {
  try {
    const db = readDB();
    const idx = db.products.findIndex(p => p.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Product not found' });
    db.products[idx] = { ...db.products[idx], ...req.body, updatedAt: new Date().toISOString() };
    writeDB(db);
    res.json(db.products[idx]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

app.delete('/products/:id', (req, res) => {
  try {
    const db = readDB();
    db.products = db.products.filter(p => p.id !== req.params.id);
    writeDB(db);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// ==================== QUOTES ====================
app.get('/quotes', (req, res) => {
  try {
    const db = readDB();
    res.json(db.quotes || []);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quotes' });
  }
});

app.post('/quotes', (req, res) => {
  try {
    const db = readDB();
    const newQuote = { id: uuidv4(), ...req.body, createdAt: new Date().toISOString() };
    db.quotes = db.quotes || [];
    db.quotes.push(newQuote);
    writeDB(db);
    res.json(newQuote);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add quote' });
  }
});

app.delete('/quotes/:id', (req, res) => {
  try {
    const db = readDB();
    db.quotes = (db.quotes || []).filter(q => q.id !== req.params.id);
    writeDB(db);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete quote' });
  }
});

// ==================== CRM LEADS ====================
app.post('/contact', (req, res) => {
  try {
    const { name, email, phone, message, productInterest } = req.body;
    if (!name || !email) return res.status(400).json({ error: 'Name and email required' });
    const leads = readLeads();
    const newLead = {
      id: uuidv4(),
      name,
      email,
      phone: phone || '',
      message: message || '',
      productInterest: productInterest || 'General',
      status: 'new',
      createdAt: new Date().toISOString()
    };
    leads.leads.push(newLead);
    writeLeads(leads);
    res.json({ success: true, lead: newLead });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/leads', (req, res) => {
  try {
    const leads = readLeads();
    res.json(leads.leads || []);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leads' });
  }
});

app.put('/leads/:id', (req, res) => {
  try {
    const leads = readLeads();
    const idx = leads.leads.findIndex(l => l.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Lead not found' });
    leads.leads[idx] = { ...leads.leads[idx], ...req.body, updatedAt: new Date().toISOString() };
    writeLeads(leads);
    res.json(leads.leads[idx]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update lead' });
  }
});

app.delete('/leads/:id', (req, res) => {
  try {
    const leads = readLeads();
    leads.leads = leads.leads.filter(l => l.id !== req.params.id);
    writeLeads(leads);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete lead' });
  }
});

// ==================== CHAT / AI RECOMMENDATIONS ====================
app.post('/chat', (req, res) => {
  try {
    const { message } = req.body || {};
    const db = readDB();
    const lower = (message || '').toLowerCase();
    const recommendations = {
      living: [{ name: 'Modern Sofa', category: 'Living' }],
      dining: [{ name: 'Dining Set', category: 'Dining' }],
      bedroom: [{ name: 'Bed Frame', category: 'Bedroom' }],
      office: [{ name: 'Executive Desk', category: 'Office' }],
      outdoor: [{ name: 'Garden Sofa', category: 'Outdoor' }]
    };
    let reply = 'I can help you find furniture.';
    let suggested = [];
    if (lower.includes('living')) suggested = recommendations.living;
    else if (lower.includes('dining')) suggested = recommendations.dining;
    else if (lower.includes('bedroom')) suggested = recommendations.bedroom;
    else if (lower.includes('office')) suggested = recommendations.office;
    else if (lower.includes('outdoor')) suggested = recommendations.outdoor;
    else if (lower.includes('price')) reply = 'We have options at various price points. Which room?';
    res.json({ reply, suggestedProducts: suggested });
  } catch (error) {
    res.status(500).json({ error: 'Chat failed' });
  }
});

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend API running on http://localhost:${PORT}`);
  console.log(`📦 Uploads directory: ${uploadsDir}`);
  console.log(`📋 DB: ${dbPath}  | Leads: ${leadsPath}`);
});
