# SITE MAP & NAVIGATION

## Website Structure

```
interiorductltd.com/
│
├── / (HOME)
│   ├── Hero Slider (Auto-rotating)
│   ├── Featured Products Grid
│   ├── Why Choose Us Section
│   ├── Floating Chat Widget
│   └── Footer with Social Links
│
├── /shop (PRODUCTS)
│   ├── Sidebar Filters
│   │   ├── Search Box
│   │   ├── Category Filter
│   │   └── Price Range Slider
│   ├── Product Grid (Dynamic)
│   │   └── Product Cards
│   │       ├── Multi-Image Hover
│   │       ├── Price Display
│   │       ├── Rating Stars
│   │       ├── Add to Cart
│   │       └── Add to Wishlist
│   └── Pagination (if needed)
│
├── /product/[id] (PRODUCT DETAIL)
│   ├── Product Gallery
│   │   ├── Main Image
│   │   └── Thumbnail Navigation
│   ├── Product Information
│   │   ├── Name & Rating
│   │   ├── Price (Highlighted)
│   │   ├── Description
│   │   ├── Specifications Table
│   │   ├── Material & Color Info
│   │   └── Stock Status
│   ├── Purchase Options
│   │   ├── Quantity Selector
│   │   ├── Add to Cart Button
│   │   ├── Add to Wishlist Button
│   │   └── Ask AI Button
│   ├── Tabs
│   │   ├── Description Tab
│   │   ├── Specifications Tab
│   │   └── Reviews Tab
│   └── Related Products (Similar items)
│
├── /about (COMPANY)
│   ├── Hero Section (Company Name)
│   ├── Company Story
│   │   └── Mission & Values
│   ├── Services Section
│   │   ├── Custom Interior Design
│   │   ├── Commercial Projects
│   │   └── Bespoke Furniture
│   ├── Leadership Team
│   │   ├── CEO Photo & Bio
│   │   ├── CTO Photo & Bio
│   │   └── Sales Lead Photo & Bio
│   ├── Company Statistics
│   │   ├── Clients Served
│   │   ├── Projects Completed
│   │   ├── Years of Experience
│   │   └── Quality Guarantee
│   └── Call-to-Action (Get in Touch)
│
├── /contact (INQUIRIES)
│   ├── Hero Section (Title)
│   ├── Contact Information
│   │   ├── Address
│   │   ├── Phone
│   │   ├── Email
│   │   ├── Hours
│   │   └── Social Media Links
│   ├── Contact Form
│   │   ├── Name Input
│   │   ├── Email Input
│   │   ├── Phone Input
│   │   ├── Subject Dropdown
│   │   ├── Message Textarea
│   │   └── Submit Button
│   └── Location Map (Embedded)
│
├── /admin (CMS DASHBOARD)
│   ├── Navigation Tabs
│   │   ├── Manage Products
│   │   └── Manage Quotes
│   │
│   ├── MANAGE PRODUCTS
│   │   ├── Add Product Form
│   │   │   ├── Name
│   │   │   ├── Price
│   │   │   ├── Category Dropdown
│   │   │   ├── Material
│   │   │   ├── Color
│   │   │   ├── Description
│   │   │   └── Add Button
│   │   │
│   │   └── Products List
│   │       ├── Product Card
│   │       ├── Delete Button
│   │       └── (Scrollable List)
│   │
│   └── MANAGE QUOTES
│       ├── Add Quote Form
│       │   ├── Quote Text Textarea
│       │   ├── Author Name Input
│       │   └── Add Button
│       │
│       └── Quotes List
│           ├── Quote Display
│           └── (Scrollable List)
│
└── SHARED COMPONENTS
    ├── Navigation Bar (All Pages)
    │   ├── Logo/Home Link
    │   ├── Menu Links (Home, Shop, About, Contact)
    │   ├── Wishlist Icon (Mobile/Desktop)
    │   ├── Cart Icon (Mobile/Desktop)
    │   └── Mobile Menu Toggle
    │
    ├── Footer (All Pages)
    │   ├── Company Info
    │   ├── Quick Links
    │   ├── Categories
    │   ├── Contact Info
    │   └── Social Media Links
    │
    └── Chat Widget (All Pages)
        ├── Floating Chat Button
        ├── Chat Window
        │   ├── Message History
        │   ├── Input Field
        │   └── Send Button
        └── Product Links (from AI)
```

---

## 🧭 USER FLOWS

### Shopping Flow
```
Home → Shop → Filter/Search → Product Detail → Add to Cart → Checkout
```

### Information Flow
```
Home → About (learn company) → Contact (ask question)
```

### Admin Flow
```
Admin Dashboard → Manage Products/Quotes → Edit Data → Save → Live Update
```

### Support Flow
```
Chat Widget (any page) → Ask Question → AI Response → View Product → Add to Cart
```

---

## 📱 Mobile Navigation

On mobile devices:
- Menu hamburger button appears
- Vertical navigation menu
- Touch-friendly buttons
- Responsive images
- Stack-based layout

---

## ⌨️ KEYBOARD SHORTCUTS

| Action | Keyboard |
|--------|----------|
| Open Menu | Alt + M |
| Toggle Cart | Alt + C |
| Focus Search | Alt + S |
| Submit Form | Enter |
| Close Menu | Esc |

---

## 🎨 COLOR SCHEME

| Element | Color | Usage |
|---------|-------|-------|
| Primary | Gray 900 (#1f2937) | Headers, main text |
| Secondary | Amber 600 (#d97706) | Links, accents |
| Accent | Amber 400 (#f59e0b) | Buttons, highlights |
| Background | White/Gray 50 | Page background |
| Text | Gray 900 | Body text |
| Light Text | Gray 600 | Secondary text |

---

## 📐 COMPONENT HIERARCHY

```
App (_app.js)
├── Navigation
│   ├── Logo
│   ├── Menu Links
│   ├── Cart Icon
│   └── Wishlist Icon
│
├── Main Content (Each Page)
│   ├── Head (Meta tags)
│   ├── Page-specific Components
│   └── Content Sections
│
├── ChatWidget (Floating)
│   ├── Chat Button
│   └── Chat Window
│
└── Footer
    ├── Company Info
    ├── Links
    └── Social Media
```

---

## 🔄 DATA FLOW

```
User Action → Page Component → API Call → Backend Server → Database → Response → UI Update
```

### Example: Add to Cart
```
User clicks "Add to Cart" → ProductCard Component → localStorage.setItem() → Cart Updated → Toast Alert
```

### Example: Get Products
```
Page Load → fetch('/products') → Backend responds with JSON → ProductGrid renders → Images load
```

---

## 🚀 Performance Optimizations

### Frontend
- Next.js automatic code splitting
- Image optimization
- Lazy loading
- CSS minification

### Backend
- Fast JSON responses
- Efficient routing
- Minimal database queries
- CORS caching

### Browser
- localStorage for cart/wishlist
- Image caching
- CSS file caching

---

## 📊 CONTENT STRUCTURE

### Homepage
- Hero Section: 3 rotating slides
- Featured Products: 6 items
- Why Choose Us: 3 benefits
- Footer: 4 sections

### Shop Page
- Sidebar: 5 filter options
- Grid: 3 columns (responsive)
- Products: Dynamic count

### Product Page
- Gallery: 4 images average
- Tabs: 3 (Description, Specs, Reviews)
- Related: 4 similar products

### About Page
- Story: 1 section
- Services: 3 cards
- Team: 3 members
- Stats: 4 metrics

### Contact Page
- Info: 4 details
- Form: 5 fields
- Map: 1 embedded

---

## 🔌 API INTEGRATION POINTS

```
Frontend ──(fetch)──> Backend ──(JSON)──> Database

Examples:
/ (Home)              → GET /products (6 items)
/shop                 → GET /products (all)
/product/[id]         → GET /products/:id
/admin                → GET /products & GET /quotes
Chat Widget           → POST /chat
Quote Rotation        → GET /quotes
```

---

## 📋 PAGE METRICS

| Page | Load Time | Size | Images |
|------|-----------|------|--------|
| Home | Fast | ~500KB | 10+ |
| Shop | Fast | ~800KB | 20+ |
| Product | Fast | ~600KB | 5+ |
| About | Fast | ~400KB | 5+ |
| Contact | Fast | ~300KB | 2+ |
| Admin | Fast | ~400KB | 0+ |

---

## 🎯 CONVERSION POINTS

Key areas to drive sales:

1. **Hero Slider** (home) - First impression
2. **Product Cards** (shop) - Browse & add
3. **Chat Widget** (everywhere) - Get help
4. **Call-to-Action** (about) - Contact
5. **Contact Form** (contact) - Inquire

---

## 📞 CONTACT POINTS

Users can reach out via:
1. Contact form (`/contact`)
2. Chat widget (floating, all pages)
3. Footer email link
4. Footer phone link
5. Footer social links

---

**Version**: 1.0.0  
**Last Updated**: February 2026  
**Status**: Production Ready ✅
