# QUICK REFERENCE GUIDE

## 🚀 LAUNCH THE WEBSITE (3 COMMANDS)

```bash
# Terminal 1
cd c:\Interior-Duct-Ltd\interiorductltd
npm install          # Only needed once
npm run server       # Start backend

# Terminal 2
npm run dev          # Start frontend
```

**Website**: http://localhost:3000  
**Admin**: http://localhost:3000/admin  
**API**: http://localhost:5000  

---

## 📖 KEY PAGES

| Page | URL | What It Does |
|------|-----|--------------|
| Home | / | Hero slider, featured products, why choose us |
| Shop | /shop | Browse all products, filters, search |
| Product | /product/[id] | Full details, gallery, specs, related items |
| About | /about | Company info, team, stats, services |
| Contact | /contact | Contact form, location, hours, social |
| Admin | /admin | Manage products and quotes |

---

## 🛠 FILE LOCATIONS & PURPOSES

### Core Functionality
| File | Purpose |
|------|---------|
| `backend/server.js` | REST API server (port 5000) |
| `backend/db.json` | Product & quote database |
| `frontend/pages/index.js` | Homepage |
| `frontend/pages/shop.js` | Product catalog |
| `frontend/pages/admin.js` | CMS dashboard |

### Components
| Component | Purpose |
|-----------|---------|
| `HeroSlider.js` | Auto-rotating hero (4 seconds) |
| `ProductCard.js` | Individual product card with hover |
| `ProductGrid.js` | Grid of products |
| `ChatWidget.js` | AI assistant chatbot |
| `QuotesTicker.js` | Rotating sales quotes |
| `Navigation.js` | Top menu bar |
| `Footer.js` | Footer with links |

### Styling
| File | Purpose |
|------|---------|
| `frontend/styles/globals.css` | All global styles |
| `tailwind.config.js` | Tailwind color customization |

---

## 🎯 COMMON TASKS

### Add a New Product
1. Go to http://localhost:3000/admin
2. Fill in product details
3. Click "Add Product"
4. See it in shop instantly

### Edit Product Prices
1. Edit `backend/db.json` directly
2. OR add via admin dashboard
3. Changes apply immediately

### Add/Edit Quotes
1. Go to http://localhost:3000/admin
2. Switch to "Manage Quotes"
3. Fill in quote & author
4. See rotation every 8 seconds on homepage

### Change Website Colors
1. Open `tailwind.config.js`
2. Edit colors in `theme.extend.colors`
3. Restart `npm run dev`

### Add a New Page
1. Create file in `frontend/pages/newpage.js`
2. Import `Head` from 'next/head'
3. Add content and export component
4. Auto-routes to `/newpage`

### Update Navigation
1. Edit `frontend/components/Navigation.js`
2. Add Link components
3. Save and see changes

---

## 🔌 API ENDPOINTS

### Products
```
GET  /products          → All products
GET  /products/:id      → Single product
POST /products          → Add product
PUT  /products/:id      → Update product
DELETE /products/:id    → Delete product
```

### Chat/AI
```
POST /chat              → Get recommendation
```

### Quotes
```
GET  /quotes            → All quotes
POST /quotes            → Add quote
```

### Health
```
GET  /health            → Check if backend is running
```

---

## 💾 DATABASE STRUCTURE

### db.json
```json
{
  "products": [
    {
      "id": "1",
      "name": "Product Name",
      "price": 450000,
      "category": "Living Room",
      "description": "...",
      "images": ["/images/pic.jpg"],
      "material": "Wood",
      "color": "Brown",
      "inStock": true,
      "rating": 4.8,
      "reviews": 24
    }
  ],
  "quotes": [
    {
      "id": "1",
      "text": "Quote text",
      "author": "Author name"
    }
  ]
}
```

---

## 🎨 CUSTOMIZATION QUICK LINKS

### Colors
- Primary: `#1f2937` (gray-900)
- Secondary: `#d97706` (amber-600)
- Accent: `#f59e0b` (amber-400)
- Edit in: `tailwind.config.js`

### Typography
- Font: Inter (from Google Fonts)
- Sizes: sm (small), md (medium), lg (large), xl (extra-large)
- Edit in: `globals.css`

### Images
- Location: `public/images/`
- 138 product images already loaded
- Add more by dropping files in folder

---

## 🚨 TROUBLESHOOTING

### Website won't load
1. Is backend running? Check terminal
2. Is frontend running? Check other terminal
3. Clear browser cache (Ctrl+Shift+Delete)

### No images showing
1. Check `public/images/` folder
2. Verify image names in `db.json`
3. Restart frontend server

### Admin dashboard broken
1. Backend must be running
2. Check http://localhost:5000/health
3. Clear browser localStorage

### Cart/Wishlist not working
1. Enable localStorage in browser
2. Check DevTools → Application → LocalStorage
3. Clear and refresh

### Chat widget not responding
1. Check backend is running
2. Verify http://localhost:5000/health works
3. Check browser console for errors

---

## 📱 RESPONSIVE BREAKPOINTS

- **Mobile**: Under 768px (phones)
- **Tablet**: 768px - 1024px (tablets)
- **Desktop**: 1024px+ (large screens)

All pages auto-respond to screen size.

---

## 🔐 ADMIN FEATURES

### Current
- No login needed (development)
- Full product CRUD
- Full quote management
- Real-time database updates

### Before Production
Add:
- Login/authentication
- User roles
- Edit product functionality
- Delete confirmation

---

## 📊 PERFORMANCE TIPS

1. **Images**: Already optimized by Next.js
2. **CSS**: Tailwind automatically minifies
3. **JavaScript**: Code-split automatically
4. **Caching**: Browser cache used for speed
5. **Database**: Lightning-fast JSON responses

---

## 🌐 DEPLOYMENT

### Frontend (Vercel - Free)
```bash
vercel login
vercel
```

### Backend (Render - Free)
1. Push to GitHub
2. Connect to Render
3. Set command: `node backend/server.js`

### Update API URL
After deployment, create `.env.local`:
```
NEXT_PUBLIC_API_URL=https://your-backend.render.com
```

---

## 📚 IMPORTANT FILES TO KNOW

### Must Keep
- `package.json` - All dependencies
- `backend/db.json` - All data
- `frontend/pages/` - All pages
- `frontend/components/` - All UI

### Nice to Have
- `.gitignore` - Git rules
- `README.md` - Documentation
- `.env.example` - Config template

### Don't Delete
- `node_modules/` - Dependencies (can reinstall)
- `.next/` - Build files (auto-generated)

---

## 🎓 TECH STACK AT A GLANCE

```
┌─────────────────────────────────────────┐
│  Browser                                │
│  ┌───────────────────────────────────┐  │
│  │  Next.js Frontend (React)         │  │
│  │  - Homepage, Shop, Product pages  │  │
│  │  - Admin dashboard                │  │
│  │  - Cart & Wishlist (localStorage) │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
           ↓ (API Calls)
┌─────────────────────────────────────────┐
│  Node.js Backend (Express)              │
│  ┌───────────────────────────────────┐  │
│  │  REST API (port 5000)             │  │
│  │  - /products                      │  │
│  │  - /chat (AI)                     │  │
│  │  - /quotes                        │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
           ↓ (CRUD)
┌─────────────────────────────────────────┐
│  JSON Database (db.json)                │
│  - Products (8 items)                   │
│  - Quotes (5 items)                     │
│  - Testimonials (3 items)               │
└─────────────────────────────────────────┘
```

---

## ✨ FEATURES SHOWCASE

### What Makes It Special

1. **Auto-Rotating Hero** → 4-second slideshow with manual controls
2. **Smart Filtering** → Category, price, and search all together
3. **Hover Effects** → Product images rotate on hover
4. **AI Assistant** → Chatbot recommends products
5. **Admin Panel** → Manage content without coding
6. **Mobile Ready** → Works on phones, tablets, desktop
7. **Fast Loading** → Next.js optimization built-in
8. **Social Ready** → Links to all social platforms
9. **SEO Friendly** → Google-ready meta tags
10. **Professional** → Modern, clean, business-focused

---

## 🆘 GET HELP

### Documentation
- `README.md` - Full feature list
- `INSTALLATION_GUIDE.md` - Setup help
- `PROJECT_SUMMARY.md` - Complete overview

### Code Comments
- All files have helpful comments
- Components explain what they do

### Support
- Email: info@interiorductltd.com
- Contact form: `/contact`
- Admin: `/admin`

---

## 📝 CHEAT SHEET

```bash
# START
npm run server          # Backend
npm run dev             # Frontend
npm run dev-all         # Both

# BUILD
npm run build           # Production build
npm start               # Run production

# MANAGE
npm install             # Install packages
npm update              # Update packages
npm audit               # Check security

# COMMANDS
npm run                 # Show all scripts
```

---

**Version**: 1.0.0  
**Built**: February 2026  
**Status**: Ready to Use ✅  
**Questions?** Check the README or PROJECT_SUMMARY
