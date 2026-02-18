# ⚡ QUICK REFERENCE: PHASE 2 COMMANDS

**Copy-paste commands to implement Phase 2**

---

## 🔧 STEP 1: INSTALL DEPENDENCIES

```bash
# From project root
npm install multer dotenv sharp

# Or with backend dependencies
cd backend
npm install multer
cd ..
```

---

## 📁 STEP 2: CREATE FOLDERS & FILES

### Create admin folder structure
```bash
mkdir -p frontend/pages/admin/components
mkdir -p backend/uploads
```

### Create empty leads.json
```bash
# Windows (PowerShell)
$content = @{ leads = @() } | ConvertTo-Json
Set-Content -Path backend/leads.json -Value $content

# Mac/Linux (Bash)
echo '{"leads": []}' > backend/leads.json
```

### Create .env files
```bash
# Windows (PowerShell)
copy .env.example .env.production

# Mac/Linux (Bash)
cp .env.example .env.production
```

---

## 🔄 STEP 3: UPDATE FILES

### Backend: server.js
**Location**: `backend/server.js`

Replace entire file with code from: `PHASE1_IMPLEMENTATION.md`

Key additions:
- Multer configuration
- POST /upload endpoint
- POST /contact → leads.json
- GET /leads, PUT /leads, DELETE /leads

### Frontend: contact.js
**Location**: `frontend/pages/contact.js`

Replace form submission to POST to backend:
```javascript
const response = await fetch("http://localhost:5000/contact", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(formData),
});
```

---

## 🎨 STEP 4: CREATE ADMIN COMPONENTS

Copy these 8 files from `ADMIN_DASHBOARD.md`:

```bash
# Main pages
frontend/pages/admin/index.js              # Dashboard home
frontend/pages/admin/products.js           # Product management
frontend/pages/admin/leads.js              # CRM leads
frontend/pages/admin/quotes.js             # Quote editor
frontend/pages/admin/settings.js           # Settings

# Components
frontend/pages/admin/components/AdminNav.js        # Sidebar
frontend/pages/admin/components/StatCard.js        # Stats
frontend/pages/admin/components/UploadForm.js      # Upload
```

---

## 🧪 STEP 5: TEST LOCALLY

### Start backend
```bash
npm run dev:backend
# or
node backend/server.js
```

### Start frontend (new terminal)
```bash
npm run dev
# or
cd frontend && next dev
```

### Test endpoints
```bash
# Test health check
curl http://localhost:5000/health

# Test product upload
curl -X POST http://localhost:5000/upload \
  -F "image=@test-image.jpg"

# Test contact (create lead)
curl -X POST http://localhost:5000/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","message":"Test"}'

# Get all leads
curl http://localhost:5000/leads
```

### Test in browser
- Frontend: http://localhost:3000
- Admin dashboard: http://localhost:3000/admin
- Product upload: http://localhost:3000/admin/products
- Leads: http://localhost:3000/admin/leads

---

## 🐙 STEP 6: GITHUB SETUP

### Initialize git (if needed)
```bash
git init
git config user.name "Your Name"
git config user.email "your@email.com"
```

### Create .gitignore
**File**: `.gitignore`

```
node_modules/
.next/
.env
backend/uploads/*
!backend/uploads/.gitkeep
```

### Push to GitHub
```bash
# Add all files
git add .

# First commit
git commit -m "feat: Phase 2 implementation - multer, CRM, admin dashboard"

# Set main branch
git branch -M main

# Add remote (replace URL)
git remote add origin https://github.com/YOUR_USERNAME/interior-duct-ltd.git

# Push to GitHub
git push -u origin main
```

---

## ☁️ STEP 7: AWS LIGHTSAIL DEPLOY

### Create instance
```bash
# Via AWS Console:
1. Go to AWS Lightsail
2. Create Instance → Ubuntu 22.04
3. Select $5/month plan
4. Download SSH key
```

### SSH to instance
```bash
# Windows (PowerShell)
ssh -i "C:\path\to\lightsail.pem" ubuntu@YOUR_IP

# Mac/Linux
ssh -i lightsail.pem ubuntu@YOUR_IP
```

### Install Node.js
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs pm2 git nginx certbot python3-certbot-nginx
```

### Clone and deploy
```bash
cd ~
git clone https://github.com/YOUR_USERNAME/interior-duct-ltd.git
cd interior-duct-ltd
npm install
npm run build

# Create ecosystem config and start
pm2 start ecosystem.config.js
pm2 save
sudo pm2 startup
```

### Configure Nginx
```bash
# Create config file
sudo nano /etc/nginx/sites-available/interior-duct-ltd

# Paste config from: AWS_DEPLOYMENT.md

# Enable
sudo ln -s /etc/nginx/sites-available/interior-duct-ltd /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Add SSL
```bash
# For domain with email
sudo certbot certonly --nginx -d yourdomain.com -d www.yourdomain.com

# Enable auto-renewal
sudo systemctl enable certbot.timer
```

### Check running
```bash
pm2 status
pm2 logs
curl http://localhost:5000/health
```

---

## 📊 STEP 8: MONITORING

### View logs
```bash
pm2 logs              # All logs
pm2 logs IDL-Backend  # Backend only
pm2 logs IDL-Frontend # Frontend only
```

### Monitor processes
```bash
pm2 monit
pm2 status
```

### Restart services
```bash
pm2 restart all
pm2 restart IDL-Backend
pm2 restart IDL-Frontend
```

### Backup database
```bash
cp backend/db.json backend/db.json.backup.$(date +%Y%m%d)
cp backend/leads.json backend/leads.json.backup.$(date +%Y%m%d)
```

---

## 🆘 QUICK FIXES

### Port already in use
```bash
# Windows: Kill process
netstat -ano | findstr :3000
taskkill /PID [PID] /F

# Mac/Linux: Kill process
lsof -i :3000
kill -9 [PID]
```

### Module not found
```bash
npm install [module-name]
```

### Permission denied on SSH
```bash
chmod 600 lightsail.pem
```

### Nginx not reloading
```bash
sudo nginx -t        # Test config
sudo systemctl restart nginx
```

### PM2 not starting
```bash
pm2 delete all
pm2 start ecosystem.config.js
pm2 save
```

---

## 📝 KEY FILES TO HAVE

```
✅ backend/server.js         (updated with multer)
✅ backend/leads.json        (new, for CRM)
✅ backend/uploads/          (new folder)
✅ frontend/pages/admin/*    (8 new files)
✅ .github/workflows/deploy.yml (optional, for CI/CD)
✅ ecosystem.config.js       (for PM2)
✅ .env.production           (for secrets)
✅ .gitignore               (updated)
✅ GITHUB_SETUP.md          (guide)
✅ AWS_DEPLOYMENT.md        (guide)
```

---

## 🚀 SUCCESS CHECKLIST

- [ ] npm install multer complete
- [ ] backend/server.js updated
- [ ] backend/leads.json created
- [ ] Admin components created
- [ ] contact.js updated
- [ ] Testing locally successful
- [ ] Code pushed to GitHub
- [ ] Lightsail instance created
- [ ] Node.js installed on Lightsail
- [ ] Code cloned to Lightsail
- [ ] Nginx configured
- [ ] SSL certificate installed
- [ ] Website accessible from IP/domain
- [ ] Admin dashboard working
- [ ] File uploads functional
- [ ] Leads being saved

---

## 📱 USEFUL URLS

```
Local Development:
- Frontend: http://localhost:3000
- Admin: http://localhost:3000/admin
- API: http://localhost:5000/health

Production (after deploy):
- Website: http://YOUR_IP or http://yourdomain.com
- Admin: http://yourdomain.com/admin
- API: http://yourdomain.com/api/* (via Nginx proxy)
```

---

## 💾 BACKUP COMMANDS

```bash
# Backup database
cp backend/db.json backend/db.json.backup.$(date +%Y%m%d_%H%M%S)

# Download from Lightsail to local
scp -i lightsail.pem ubuntu@YOUR_IP:~/interior-duct-ltd/backend/db.json ./backup/

# Upload backup to Lightsail
scp -i lightsail.pem ./backup/db.json ubuntu@YOUR_IP:~/interior-duct-ltd/backend/
```

---

## 🔐 ENVIRONMENT VARIABLES

**Create `.env.production`:**

```env
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://yourdomain.com
DATABASE_PATH=./backend/db.json
LEADS_PATH=./backend/leads.json
UPLOAD_DIR=./backend/uploads
MAX_FILE_SIZE=5242880
```

---

## 📊 COMMON PORTS

```
80/443  - Nginx (HTTP/HTTPS)
3000    - Next.js frontend
5000    - Express backend
22      - SSH
```

---

## 🎯 NEXT COMMANDS AFTER DEPLOYMENT

```bash
# Update code from GitHub
git pull origin main

# Install new dependencies
npm install

# Rebuild frontend
npm run build

# Restart services
pm2 restart all

# View updated logs
pm2 logs
```

---

**Print this page for quick reference while implementing!** 📋
