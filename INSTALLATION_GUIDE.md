# Installation & Deployment Guide

## Prerequisites

- **Node.js**: v16 or higher
- **npm**: v7 or higher
- **Windows/Mac/Linux**: Any operating system
- **Git**: For version control (optional)

## Local Development Setup

### Step 1: Install Dependencies

Navigate to the project root and install all required packages:

```bash
cd c:\Interior-Duct-Ltd\interiorductltd
npm install
```

This will install:
- Next.js (Frontend framework)
- React (UI library)
- Express (Backend server)
- Tailwind CSS (Styling)
- And all other dependencies

**Installation Time**: ~2-3 minutes

### Step 2: Start the Backend Server

Open a terminal and run:

```bash
npm run server
```

Expected output:
```
🚀 Backend running at http://localhost:5000
```

The backend is now ready to accept requests.

**Port**: 5000
**Health Check**: Visit http://localhost:5000/health

### Step 3: Start the Frontend Server (New Terminal)

Open a second terminal and run:

```bash
npm run dev
```

Expected output:
```
> next dev
- ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```

The frontend is now running.

**Port**: 3000
**URL**: http://localhost:3000

## Accessing the Application

### Main Pages
- **Homepage**: http://localhost:3000
- **Shop**: http://localhost:3000/shop
- **About**: http://localhost:3000/about
- **Contact**: http://localhost:3000/contact
- **Product Detail**: http://localhost:3000/product/1

### Admin Panel
- **Admin Dashboard**: http://localhost:3000/admin
- Manage products and quotes
- Add/edit/delete content
- No authentication required (for development)

### Backend API
- **Base URL**: http://localhost:5000
- **Health Check**: http://localhost:5000/health
- **Products**: http://localhost:5000/products
- **Quotes**: http://localhost:5000/quotes

## Running Both Servers Simultaneously

Use the combined command (requires `concurrently` package):

```bash
npm run dev-all
```

This starts both backend and frontend in parallel.

## Building for Production

### Frontend Build

```bash
npm run build
npm start
```

This creates an optimized production build.

### Output
```
> next build
✓ Compiled successfully
✓ Linting and type checking...
Ready to start production server
```

## Deployment

### Option 1: Deploy Frontend on Vercel (Free)

1. **Create a Vercel account**: https://vercel.com
2. **Connect your GitHub repo**:
   - Push your code to GitHub
   - Import project in Vercel
   - Vercel auto-deploys on push

3. **Configure environment**:
   Create `.env.local`:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend.render.com
   ```

4. **Deploy**:
   ```bash
   npm install -g vercel
   vercel
   ```

### Option 2: Deploy Backend on Render (Free)

1. **Create a Render account**: https://render.com
2. **Create a new Web Service**:
   - Connect your GitHub repo
   - Select the backend folder
   - Set start command: `node backend/server.js`

3. **Environment Variables**:
   - PORT: 5000 (if needed)

4. **Deploy**:
   - Render auto-deploys on push

### Backend Deployment URL
After deployment, your backend URL will be:
```
https://interiorductltd-backend.render.com
```

Update frontend `.env.local`:
```
NEXT_PUBLIC_API_URL=https://interiorductltd-backend.render.com
```

## Database Management

### Adding Products via Admin Panel

1. Navigate to http://localhost:3000/admin
2. Go to "Manage Products" tab
3. Fill in product details:
   - Name
   - Price
   - Category
   - Material
   - Color
   - Description
4. Click "Add Product"
5. Product appears immediately in shop

### Managing Quotes

1. Navigate to http://localhost:3000/admin
2. Go to "Manage Quotes" tab
3. Enter quote text and author
4. Click "Add Quote"
5. Quote rotates in the homepage ticker

### Editing Database Directly

Edit `backend/db.json`:
```json
{
  "products": [...],
  "quotes": [...],
  "testimonials": [...]
}
```

Changes take effect immediately.

## Troubleshooting

### Issue: Port 3000 already in use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
# Or run on different port
npm run dev -- -p 3001
```

### Issue: Port 5000 already in use
```bash
# Edit backend/server.js and change port
const PORT = 5001
```

### Issue: Images not loading
1. Verify images exist in `public/images/`
2. Check image paths in `backend/db.json`
3. Clear browser cache
4. Restart development servers

### Issue: API connection fails
1. Ensure backend is running: `npm run server`
2. Check http://localhost:5000/health
3. Verify CORS is enabled in `backend/server.js`
4. Check browser console for errors

### Issue: Chat widget not responding
1. Backend must be running
2. Check backend/server.js is listening on port 5000
3. Clear localStorage: DevTools > Application > Clear

## Performance Optimization

### Frontend
- Images are optimized by Next.js
- CSS is minified with Tailwind
- JavaScript is code-split automatically

### Backend
- API responses are fast JSON
- Database is in-memory compatible

### Caching
- Browser localStorage for cart/wishlist
- Next.js static generation for pages

## Security Notes

### For Production:
1. Add authentication to `/admin` route
2. Implement JWT tokens for API
3. Add rate limiting
4. Validate all user inputs
5. Use HTTPS only
6. Set secure CORS headers

### Current Setup (Development):
- No authentication required
- CORS allows all origins
- API is public

## Monitoring

### Backend Logs
Watch the backend terminal for:
- Server startup
- API requests
- Errors

### Frontend Logs
Check browser console (F12):
- Component errors
- Network requests
- API responses

## Maintenance

### Regular Tasks
1. Backup `backend/db.json` regularly
2. Monitor server logs
3. Check for unused dependencies: `npm audit`
4. Update packages: `npm update`

### Scaling (Future)
1. Replace JSON DB with PostgreSQL
2. Add Redis for caching
3. Implement CDN for images
4. Add image optimization service

## Contact & Support

- **Email**: info@interiorductltd.com
- **Phone**: +234 (0) XXX XXX XXXX
- **Admin Dashboard**: /admin
- **Contact Form**: /contact

## Environment Checklist

Before deployment:
- [ ] All dependencies installed
- [ ] Backend runs on port 5000
- [ ] Frontend runs on port 3000
- [ ] API endpoints respond
- [ ] Images load correctly
- [ ] Admin panel accessible
- [ ] Cart/wishlist work
- [ ] Chat widget functional
- [ ] Mobile responsive
- [ ] Forms submit successfully
- [ ] No console errors
- [ ] All links functional

## Quick Commands Reference

```bash
# Development
npm install          # Install dependencies
npm run dev          # Start frontend
npm run server       # Start backend
npm run dev-all      # Start both

# Production
npm run build        # Build frontend
npm start            # Start production server

# Utilities
npm audit            # Check security
npm update           # Update packages
npm prune            # Remove unused packages
```

---

**Version**: 1.0.0  
**Last Updated**: February 2026  
**Status**: Production Ready ✅
