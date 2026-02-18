# Interior Duct Ltd - Premium Furniture eCommerce Website

A fully functional, professional furniture manufacturing and eCommerce website for Interior Duct Ltd built with Next.js, Express, and Tailwind CSS.

## 🎯 Features

✅ **Automated Hero Slideshow** - Beautiful rotating product showcase
✅ **Product Hover Animations** - Multi-angle product image rotation on hover
✅ **AI Recommendation Assistant** - Rule-based intelligent chatbot
✅ **eCommerce Cart** - Add to cart with localStorage persistence
✅ **Wishlist** - Save favorite products locally
✅ **Product Filtering** - Filter by category, price, and search
✅ **Dynamic Quotes Engine** - Rotating sales motivation quotes
✅ **CMS Admin Dashboard** - Manage products, quotes, and content
✅ **Responsive Design** - Mobile, tablet, and desktop optimized
✅ **Professional Layout** - Modern, clean, business-focused design
✅ **SEO Optimized** - Meta tags and structured data
✅ **Fast Performance** - Built with Next.js for optimal speed

## 🛠 Tech Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: JSON (lowdb-compatible)
- **Styling**: Tailwind CSS
- **Package Manager**: npm

## 📁 Project Structure

```
interiorductltd/
├── frontend/
│   ├── pages/
│   │   ├── index.js          # Homepage with hero slider
│   │   ├── shop.js           # Product listing with filters
│   │   ├── product/[id].js   # Product detail page
│   │   ├── about.js          # About page
│   │   ├── contact.js        # Contact form
│   │   ├── admin.js          # CMS admin dashboard
│   │   ├── _app.js           # App wrapper
│   │   └── _document.js      # Document setup
│   ├── components/
│   │   ├── Navigation.js     # Header navigation
│   │   ├── HeroSlider.js     # Auto-rotating slideshow
│   │   ├── ProductGrid.js    # Product grid layout
│   │   ├── ProductCard.js    # Individual product card
│   │   ├── QuotesTicker.js   # Rotating quotes
│   │   ├── ChatWidget.js     # AI chat assistant
│   │   └── Footer.js         # Footer section
│   └── styles/
│       └── globals.css       # Global styles
├── backend/
│   ├── server.js             # Express server
│   └── db.json               # JSON database
├── public/
│   └── images/               # Product images
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── next.config.js
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Navigate to the project directory:**
```bash
cd interiorductltd
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the backend server (in one terminal):**
```bash
npm run server
```

The backend will run on `http://localhost:5000`

4. **Start the frontend (in another terminal):**
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

5. **Access the application:**
- **Main Site**: http://localhost:3000
- **Admin CMS**: http://localhost:3000/admin
- **Backend API**: http://localhost:5000

## 📋 API Endpoints

### Products
- `GET /products` - Get all products
- `GET /products/:id` - Get single product
- `POST /products` - Add new product (CMS)
- `PUT /products/:id` - Update product (CMS)
- `DELETE /products/:id` - Delete product (CMS)

### Chat
- `POST /chat` - Send message to AI assistant

### Quotes
- `GET /quotes` - Get all quotes
- `POST /quotes` - Add new quote (CMS)

### Health
- `GET /health` - Backend health check

## 🎨 Pages & Features

### Home Page (`/`)
- Hero slider with auto-rotation
- Featured products section
- Why Choose Us section
- Call-to-action buttons
- Responsive grid layout

### Shop Page (`/shop`)
- Product catalog with grid layout
- Category filter
- Price range slider
- Search functionality
- Wishlist and cart buttons
- Stock status indicators

### Product Detail Page (`/product/[id]`)
- Full product information
- Multi-image gallery
- Variant selection
- Quantity selector
- Add to cart / Wishlist
- Related products
- Product specifications
- Customer reviews section

### About Page (`/about`)
- Company information
- Services overview
- Leadership team
- Company statistics
- Call-to-action

### Contact Page (`/contact`)
- Contact form
- Business information
- Hours of operation
- Social media links
- Embedded map

### Admin Dashboard (`/admin`)
- **Products Management**
  - Add new products
  - Edit product details
  - Delete products
  - View all products
  
- **Quotes Management**
  - Add motivational quotes
  - Edit quotes
  - Delete quotes
  - View all quotes

## 🤖 AI Assistant Features

The rule-based AI assistant provides intelligent recommendations:

- **Living Room Keywords**: Recommends sofas and living room furniture
- **Dining Keywords**: Recommends dining sets and chairs
- **Kitchen Keywords**: Recommends kitchen cabinets and furniture
- **Bedroom Keywords**: Recommends bedroom furniture
- **Fallback**: Shows general encouragement

## 💾 Local Storage Features

- **Cart**: Saved in browser localStorage for persistence
- **Wishlist**: Favorite products saved locally
- **Preferences**: User selections and filters

## 🎯 Key Components

### HeroSlider Component
- Auto-rotates every 4 seconds
- Manual navigation with arrows
- Pagination dots
- Responsive design

### ProductCard Component
- Multi-image carousel on hover (200ms rotation)
- Stock status indicator
- Quick add to cart
- Rating display
- Price formatting

### ChatWidget Component
- Floating chat button
- Message history
- Typing indicator
- Product recommendations
- Auto-scroll to latest message

### QuotesTicker Component
- Rotates quotes every 8 seconds
- Manual navigation
- Pagination indicators
- Inspirational sales quotes

## 📸 Product Images

All product images are sourced from the IDL Product branding folder. Images are automatically used in:
- Product cards
- Hero slider
- Product detail pages
- Admin dashboard

## 🌐 Deployment

### Frontend - Vercel (Free)
```bash
npm run build
vercel deploy
```

### Backend - Render/Railway (Free)
1. Push backend folder to GitHub
2. Connect to Render/Railway
3. Set start command: `npm run server`

## 📝 Environment Variables

Create a `.env.local` file (optional):
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## 🎓 Customization

### Adding Products
1. Go to `/admin` dashboard
2. Fill in product details
3. Click "Add Product"
4. Products appear immediately in shop

### Editing Quotes
1. Navigate to `/admin`
2. Switch to "Manage Quotes" tab
3. Add new quotes for the rotating ticker

### Modifying Styles
- Edit `frontend/styles/globals.css` for global styles
- Update `tailwind.config.js` for theme customization
- Modify component files for specific styling

## 🔍 SEO Features

- Meta tags for title and description
- Open Graph tags
- Structured data markup
- Sitemap generation (planned)
- Robot.txt configuration

## 📱 Responsive Breakpoints

- Mobile: 320px - 768px
- Tablet: 768px - 1024px
- Desktop: 1024px+

## 🐛 Troubleshooting

### Backend not connecting
- Ensure backend is running on port 5000
- Check `http://localhost:5000/health`

### Images not displaying
- Verify images are in `public/images/` folder
- Check image paths in database

### Cart not persisting
- Check browser localStorage is enabled
- Clear cache if issues persist

## 📞 Support

For issues or questions:
- Email: info@interiorductltd.com
- Contact form: `/contact`
- Admin: `/admin`

## 📄 License

MIT License - Interior Duct Ltd © 2026

## 🙏 Credits

Built for Interior Duct Ltd by a professional development team.
Featuring premium furniture collections from Nigeria's leading manufacturer.

---

**Version**: 1.0.0  
**Last Updated**: February 2026  
**Status**: Production Ready ✅
