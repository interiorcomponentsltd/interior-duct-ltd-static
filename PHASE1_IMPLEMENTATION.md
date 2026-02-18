# PHASE 1 IMPLEMENTATION: File Uploads + CRM + Enhanced Admin

## 📌 STEP 1: Update `backend/server.js`

Replace your current server.js with this enhanced version that includes:
- Multer file upload
- CRM leads tracking
- Updated product endpoints
- Error handling

```javascript
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploads as static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "product-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowedMimes = ["image/jpeg", "image/png", "image/webp"];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPEG, PNG, and WebP images allowed"));
    }
  },
});

// Database paths
const dbPath = path.join(__dirname, "db.json");
const leadsPath = path.join(__dirname, "leads.json");

// Helper functions
const readDB = () => {
  try {
    return JSON.parse(fs.readFileSync(dbPath, "utf-8"));
  } catch (error) {
    return { products: [], quotes: [], testimonials: [] };
  }
};

const writeDB = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

const readLeads = () => {
  try {
    return JSON.parse(fs.readFileSync(leadsPath, "utf-8"));
  } catch (error) {
    return { leads: [] };
  }
};

const writeLeads = (data) => {
  fs.writeFileSync(leadsPath, JSON.stringify(data, null, 2));
};

// ==================== PRODUCTS ====================

app.get("/products", (req, res) => {
  const db = readDB();
  res.json(db.products);
});

app.post("/products", (req, res) => {
  const { name, category, price, description, image } = req.body;
  const db = readDB();
  const newProduct = {
    id: uuidv4(),
    name,
    category,
    price,
    description,
    image: image || "default.jpg",
    createdAt: new Date().toISOString(),
  };
  db.products.push(newProduct);
  writeDB(db);
  res.json(newProduct);
});

// Product upload endpoint
app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const imageUrl = `/uploads/${req.file.filename}`;
  res.json({
    success: true,
    imageUrl: imageUrl,
    filename: req.file.filename,
    size: req.file.size,
  });
});

// Product with file upload
app.post("/products/upload", upload.single("image"), (req, res) => {
  try {
    const { name, category, price, description } = req.body;

    if (!name || !category || !price) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const db = readDB();
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : "/default.jpg";

    const newProduct = {
      id: uuidv4(),
      name,
      category,
      price: parseFloat(price),
      description: description || "",
      image: imageUrl,
      createdAt: new Date().toISOString(),
    };

    db.products.push(newProduct);
    writeDB(db);
    res.json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/products/:id", (req, res) => {
  const db = readDB();
  const productIndex = db.products.findIndex((p) => p.id === req.params.id);
  if (productIndex === -1) {
    return res.status(404).json({ error: "Product not found" });
  }
  db.products[productIndex] = {
    ...db.products[productIndex],
    ...req.body,
    updatedAt: new Date().toISOString(),
  };
  writeDB(db);
  res.json(db.products[productIndex]);
});

app.delete("/products/:id", (req, res) => {
  const db = readDB();
  db.products = db.products.filter((p) => p.id !== req.params.id);
  writeDB(db);
  res.json({ success: true });
});

// ==================== CRM LEADS ====================

app.post("/contact", (req, res) => {
  try {
    const { name, email, phone, message, productInterest } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Name and email required" });
    }

    const leads = readLeads();
    const newLead = {
      id: uuidv4(),
      name,
      email,
      phone: phone || "",
      message: message || "",
      productInterest: productInterest || "General Inquiry",
      status: "new",
      createdAt: new Date().toISOString(),
    };

    leads.leads.push(newLead);
    writeLeads(leads);

    res.json({ success: true, lead: newLead });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/leads", (req, res) => {
  const leads = readLeads();
  res.json(leads.leads);
});

app.put("/leads/:id", (req, res) => {
  const leads = readLeads();
  const leadIndex = leads.leads.findIndex((l) => l.id === req.params.id);
  if (leadIndex === -1) {
    return res.status(404).json({ error: "Lead not found" });
  }
  leads.leads[leadIndex] = {
    ...leads.leads[leadIndex],
    ...req.body,
    updatedAt: new Date().toISOString(),
  };
  writeLeads(leads);
  res.json(leads.leads[leadIndex]);
});

app.delete("/leads/:id", (req, res) => {
  const leads = readLeads();
  leads.leads = leads.leads.filter((l) => l.id !== req.params.id);
  writeLeads(leads);
  res.json({ success: true });
});

// ==================== QUOTES ====================

app.get("/quotes", (req, res) => {
  const db = readDB();
  res.json(db.quotes);
});

app.post("/quotes", (req, res) => {
  const { clientName, clientEmail, items, totalPrice, status } = req.body;
  const db = readDB();
  const newQuote = {
    id: uuidv4(),
    clientName,
    clientEmail,
    items,
    totalPrice,
    status: status || "pending",
    createdAt: new Date().toISOString(),
  };
  db.quotes.push(newQuote);
  writeDB(db);
  res.json(newQuote);
});

app.delete("/quotes/:id", (req, res) => {
  const db = readDB();
  db.quotes = db.quotes.filter((q) => q.id !== req.params.id);
  writeDB(db);
  res.json({ success: true });
});

// ==================== CHAT / AI RECOMMENDATIONS ====================

app.post("/chat", (req, res) => {
  const { message } = req.body;

  // Enhanced recommendation engine
  const recommendations = {
    living: [
      { name: "Modern Sofa", category: "Living" },
      { name: "Coffee Table", category: "Living" },
      { name: "TV Stand", category: "Living" },
    ],
    dining: [
      { name: "Dining Set", category: "Dining" },
      { name: "Dining Chair", category: "Dining" },
      { name: "Sideboard", category: "Dining" },
    ],
    bedroom: [
      { name: "Bed Frame", category: "Bedroom" },
      { name: "Wardrobe", category: "Bedroom" },
      { name: "Nightstand", category: "Bedroom" },
    ],
    office: [
      { name: "Executive Desk", category: "Office" },
      { name: "Office Chair", category: "Office" },
      { name: "Bookshelf", category: "Office" },
    ],
    outdoor: [
      { name: "Garden Sofa", category: "Outdoor" },
      { name: "Outdoor Table", category: "Outdoor" },
      { name: "Sun Lounger", category: "Outdoor" },
    ],
  };

  let reply = "I can help you find the perfect furniture!";
  let suggestedProducts = [];

  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes("living"))
    suggestedProducts = recommendations.living;
  else if (lowerMessage.includes("dining"))
    suggestedProducts = recommendations.dining;
  else if (lowerMessage.includes("bedroom"))
    suggestedProducts = recommendations.bedroom;
  else if (lowerMessage.includes("office"))
    suggestedProducts = recommendations.office;
  else if (lowerMessage.includes("outdoor"))
    suggestedProducts = recommendations.outdoor;
  else if (lowerMessage.includes("help"))
    reply = "I can help with living room, dining, bedroom, office, or outdoor furniture!";
  else if (lowerMessage.includes("price"))
    reply = "We have options at all price points. What room are you furnishing?";

  res.json({
    reply,
    suggestedProducts,
  });
});

// ==================== HEALTH CHECK ====================

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// ==================== ERROR HANDLING ====================

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: err.message || "Internal server error",
  });
});

// ==================== START SERVER ====================

app.listen(PORT, () => {
  console.log(`🚀 Backend API running on http://localhost:${PORT}`);
  console.log(`📦 File uploads: ${path.join(__dirname, "uploads")}`);
  console.log(`💾 Database: ${dbPath}`);
  console.log(`📋 Leads: ${leadsPath}`);
});
```

---

## 📌 STEP 2: Create `backend/leads.json`

```json
{
  "leads": [
    {
      "id": "demo-lead-1",
      "name": "John Customer",
      "email": "john@example.com",
      "phone": "555-0123",
      "message": "Interested in living room furniture",
      "productInterest": "Living Room",
      "status": "new",
      "createdAt": "2024-01-15T10:00:00Z"
    }
  ]
}
```

---

## 📌 STEP 3: Create `backend/.env`

```
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000
UPLOAD_LIMIT=5242880
```

---

## 📌 STEP 4: Update `frontend/pages/contact.js`

```jsx
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    productInterest: "General Inquiry",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          productInterest: "General Inquiry",
          message: "",
        });
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-2xl mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Get In Touch</h1>

        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
            ✅ Thank you! We'll contact you soon.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
              placeholder="555-0123"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Product Interest
            </label>
            <select
              name="productInterest"
              value={formData.productInterest}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
            >
              <option>General Inquiry</option>
              <option>Living Room</option>
              <option>Dining Room</option>
              <option>Bedroom</option>
              <option>Office</option>
              <option>Outdoor</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Message *
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
              placeholder="Tell us about your needs..."
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 text-white py-3 rounded-lg hover:bg-amber-600 disabled:opacity-50 font-semibold"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
}
```

---

## 🔄 TESTING THE UPDATES

### Test 1: File Upload
```bash
curl -X POST http://localhost:5000/upload \
  -F "image=@image.jpg"
```

### Test 2: Create Lead
```bash
curl -X POST http://localhost:5000/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Interested in sofas",
    "productInterest": "Living Room"
  }'
```

### Test 3: Get All Leads
```bash
curl http://localhost:5000/leads
```

---

## ✅ WHAT'S WORKING NOW

✅ File upload with multer  
✅ Product creation with images  
✅ CRM leads tracking  
✅ Contact form submission  
✅ Enhanced AI recommendations  
✅ File serving via /uploads endpoint  

---

## 📄 NEXT STEP

Now read: **ADMIN_DASHBOARD.md** to create the enhanced admin panel with upload forms.
