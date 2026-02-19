# GITHUB SETUP & DEPLOYMENT GUIDE

**Set up GitHub repository and automated deployment for Interior Duct Ltd**

---

## PREREQUISITES

- GitHub account (free)
- Git installed locally
- Project ready to push

---

## STEP 1: CREATE GITHUB REPOSITORY

### 1.1 Go to GitHub

1. Visit [github.com/new](https://github.com/new)
2. Fill in form:

| Field | Value |
|-------|-------|
| **Repository name** | `interior-duct-ltd` |
| **Description** | Furniture eCommerce Platform |
| **Visibility** | Public or Private |
| **Initialize** | ☐ None (add existing code) |

3. Click **Create repository**

### 1.2 Copy Repository URL

After creation, copy the HTTPS URL:
```
https://github.com/YOUR_USERNAME/interior-duct-ltd.git
```

---

## STEP 2: PUSH LOCAL CODE TO GITHUB

### 2.1 Initialize Git (if not already done)

```bash
cd c:\Interior-Duct-Ltd\interiorductltd

# Check if git is initialized
git status

# If not initialized:
git init
```

### 2.2 Configure Git

```bash
git config user.name "Your Name"
git config user.email "your@email.com"

# Or globally:
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

### 2.3 Create `.gitignore`

Create file: `c:\Interior-Duct-Ltd\interiorductltd\.gitignore`

```gitignore
# Dependencies
node_modules/
package-lock.json
yarn.lock

# Next.js
.next/
out/
build/
dist/

# Environment variables
.env
.env.local
.env.*.local

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db
.DS_Store?

# Logs
logs/
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Testing
coverage/
.nyc_output/

# Build artifacts
.turbo/
.cache/

# Backend
backend/uploads/*
!backend/uploads/.gitkeep

# Database backups
*.backup
*.bak
```

### 2.4 Add Remote and Push

```bash
# Add remote
git remote add origin https://github.com/YOUR_USERNAME/interior-duct-ltd.git

# Verify remote
git remote -v

# Add all files
git add .

# Initial commit
git commit -m "Initial commit: Full eCommerce platform setup"

# Push to GitHub
git branch -M main
git push -u origin main
```

### 2.5 Verify on GitHub

Visit `https://github.com/YOUR_USERNAME/interior-duct-ltd` and confirm files are there.

---

## 📁 STEP 3: ORGANIZE REPOSITORY STRUCTURE

### 3.1 Expected Structure

```
interior-duct-ltd/
├── frontend/                    # Next.js app
│   ├── pages/
│   │   ├── index.js
│   │   ├── shop.js
│   │   ├── about.js
│   │   ├── contact.js
│   │   ├── [product].js
│   │   └── admin/
│   │       ├── index.js
│   │       ├── products.js
│   │       ├── leads.js
│   │       ├── quotes.js
│   │       ├── settings.js
│   │       └── components/
│   │           ├── AdminNav.js
│   │           ├── StatCard.js
│   │           ├── UploadForm.js
│   │           └── LeadsTable.js
│   ├── components/
│   │   ├── Navigation.js
│   │   ├── Footer.js
│   │   ├── ProductCard.js
│   │   ├── ProductGrid.js
│   │   ├── HeroSlider.js
│   │   ├── QuotesTicker.js
│   │   └── ChatWidget.js
│   ├── styles/
│   │   └── globals.css
│   ├── public/
│   │   ├── images/             # Product images
│   │   ├── product-images/     # Uploaded images
│   │   └── favicon.ico
│   ├── next.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
│
├── backend/                     # Express API
│   ├── server.js              # Main server file
│   ├── db.json                # Product database
│   ├── leads.json             # CRM leads
│   ├── uploads/               # File storage
│   │   └── .gitkeep
│   ├── routes/
│   │   ├── products.js        # Product endpoints
│   │   ├── leads.js           # CRM endpoints
│   │   └── upload.js          # File upload
│   ├── middleware/
│   │   ├── auth.js            # JWT auth
│   │   └── upload.js          # Multer config
│   └── package.json
│
├── docs/                        # Documentation
│   ├── PRODUCTION_ROADMAP.md
│   ├── PHASE1_IMPLEMENTATION.md
│   ├── ADMIN_DASHBOARD.md
│   ├── AWS_DEPLOYMENT.md
│   ├── GITHUB_SETUP.md
│   ├── WORDPRESS_ALTERNATIVE.md
│   ├── QUICK_START.md
│   ├── ARCHITECTURE.md
│   └── INSTALLATION_GUIDE.md
│
├── .github/                     # GitHub Actions
│   └── workflows/
│       └── deploy.yml          # Auto-deployment
│
├── scripts/                     # Utility scripts
│   ├── deploy.sh              # Deployment script
│   ├── backup.sh              # Backup script
│   └── seed-db.js             # Database seeding
│
├── .env.example               # Environment template
├── .gitignore                 # Git ignore rules
├── package.json               # Root dependencies
├── ecosystem.config.js        # PM2 config
├── Dockerfile                 # Docker config
├── docker-compose.yml         # Docker Compose
├── README.md                  # Main readme
├── LICENSE                    # MIT License
└── CONTRIBUTING.md            # Contribution guide
```

### 3.2 Create Missing Structure Files

**Create `scripts/deploy.sh` for easy deployment:**

```bash
#!/bin/bash
# Deployment script for Lightsail

set -e

echo "🚀 Deploying Interior Duct Ltd..."

# Pull latest code
git pull origin main

# Install dependencies
npm install

# Build frontend
npm run build

# Restart services
pm2 restart all

# Show status
pm2 status

echo "✅ Deployment complete!"
```

**Create `scripts/backup.sh` for database backups:**

```bash
#!/bin/bash
# Backup script

BACKUP_DIR="/home/ubuntu/backups"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

# Backup database
cp backend/db.json $BACKUP_DIR/db_${DATE}.json
cp backend/leads.json $BACKUP_DIR/leads_${DATE}.json

# Keep only last 30 days
find $BACKUP_DIR -name "*.json" -mtime +30 -delete

echo "✅ Backup created: $BACKUP_DIR/db_${DATE}.json"
```

**Create `README.md` for GitHub:**

```markdown
# 🪑 Interior Duct Ltd - Furniture eCommerce Platform

Modern, responsive furniture eCommerce website built with **Next.js + Express**.

## 🌟 Features

- **Product Catalog**: Browse 138+ furniture items
- **Shopping Cart**: Add to cart, wishlist, persistent storage
- **Admin Dashboard**: Manage products, leads, quotes with file uploads
- **CRM System**: Track customer inquiries and leads
- **AI Chatbot**: Intelligent product recommendations
- **File Upload**: Product images via multer
- **Responsive Design**: Mobile-first approach
- **Production Ready**: Deployed on AWS Lightsail

## 🚀 Quick Start

### Local Development

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/interior-duct-ltd.git
cd interior-duct-ltd

# Install dependencies
npm install

# Start development
npm run dev

# Backend runs on http://localhost:5000
# Frontend runs on http://localhost:3000
```

### Production Deployment

See [AWS_DEPLOYMENT.md](docs/AWS_DEPLOYMENT.md) for full guide.

```bash
# Quick deploy to Lightsail
./scripts/deploy.sh
```

## 📋 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14, React 18, Tailwind CSS |
| Backend | Node.js, Express.js, Multer |
| Database | JSON (file-based) |
| File Storage | Local uploads + AWS S3 ready |
| Deployment | AWS Lightsail, Nginx, PM2 |

## 📚 Documentation

- [Quick Start](docs/QUICK_START.md)
- [Installation Guide](docs/INSTALLATION_GUIDE.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Admin Dashboard](docs/ADMIN_DASHBOARD.md)
- [AWS Deployment](docs/AWS_DEPLOYMENT.md)
- [Production Roadmap](docs/PRODUCTION_ROADMAP.md)

## 🎯 Project Structure

```
├── frontend/          # Next.js app
├── backend/           # Express API
├── docs/              # Documentation
├── scripts/           # Utility scripts
└── README.md          # This file
```

## 👨‍💼 Admin Dashboard

Access admin panel: `http://yourdomain.com/admin`

### Features

- 📦 Product management (CRUD + file upload)
- 📧 CRM leads tracking
- 📋 Quote management
- 📊 Dashboard with stats
- ⚙️ Settings management

## 💾 Database

**File-based JSON (development/MVP)**:
- `backend/db.json` - Products, quotes, testimonials
- `backend/leads.json` - Customer leads

**Migration Path**:
1. Current: JSON files (FREE)
2. Phase 2: PostgreSQL on AWS RDS ($15/month)
3. Phase 3: MongoDB Atlas (optional)

## 🚀 Deployment Options

### Option 1: AWS Lightsail ($5/month)
- Recommended for production
- Includes 1GB RAM, 40GB SSD
- Full setup in [AWS_DEPLOYMENT.md](docs/AWS_DEPLOYMENT.md)

### Option 2: Vercel + Render (FREE)
- Frontend: Vercel free tier
- Backend: Render free tier
- Good for hobby projects

### Option 3: WordPress Alternative
- See [WORDPRESS_ALTERNATIVE.md](docs/WORDPRESS_ALTERNATIVE.md)
- WooCommerce + Dokan
- For CMS-based approach

## 🔐 Security

- Environment variables for secrets
- Input validation on all endpoints
- File upload restrictions (5MB, image only)
- CORS enabled
- SSH access to Lightsail

## 📞 Support

- GitHub Issues: [Create an issue](https://github.com/YOUR_USERNAME/interior-duct-ltd/issues)
- Documentation: See [docs/](docs/) folder
- AWS Support: [AWS Help Center](https://console.aws.amazon.com/support)

## 📄 License

MIT License - see LICENSE file

## 👥 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/new-feature`)
3. Commit changes (`git commit -am 'Add feature'`)
4. Push to branch (`git push origin feature/new-feature`)
5. Create Pull Request

---

**Made with ❤️ for Interior Duct Ltd**
```

### 3.3 Update Root `package.json`

```json
{
  "name": "interior-duct-ltd",
  "version": "1.0.0",
  "description": "Furniture eCommerce platform",
  "scripts": {
    "dev": "concurrently \"npm run dev:frontend\" \"npm run dev:backend\"",
    "dev:frontend": "cd frontend && next dev",
    "dev:backend": "node backend/server.js",
    "build": "cd frontend && next build",
    "start": "node backend/server.js & next start",
    "deploy": "./scripts/deploy.sh",
    "backup": "./scripts/backup.sh"
  },
  "dependencies": {
    "concurrently": "^8.2.0"
  },
  "devDependencies": {}
}
```

---

## 🔄 STEP 4: VERSION CONTROL BEST PRACTICES

### 4.1 Create Branches

```bash
# Main branch (production-ready)
git checkout -b main

# Develop branch (staging)
git checkout -b develop

# Feature branches
git checkout -b feature/file-uploads
git checkout -b feature/caching
git checkout -b feature/seo-optimization
```

### 4.2 Commit Message Format

```bash
# Feature
git commit -m "feat: add product image upload"

# Fix
git commit -m "fix: resolve cart calculation bug"

# Docs
git commit -m "docs: update deployment guide"

# Refactor
git commit -m "refactor: simplify admin components"

# Test
git commit -m "test: add upload validation tests"
```

### 4.3 Push to GitHub

```bash
# Push feature to GitHub
git push origin feature/your-feature

# Create Pull Request on GitHub UI
# Merge to develop after review
# Then merge develop to main for release
```

---

## 🤖 STEP 5: GITHUB ACTIONS (AUTOMATED DEPLOYMENT)

### 5.1 Create Workflow File

Create: `.github/workflows/deploy.yml`

```yaml
name: Deploy to Lightsail

on:
  push:
    branches: [main]
  pull_request:
    branches: [develop]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to Lightsail
        env:
          LIGHTSAIL_KEY: ${{ secrets.LIGHTSAIL_SSH_KEY }}
          LIGHTSAIL_IP: ${{ secrets.LIGHTSAIL_IP }}
          LIGHTSAIL_USER: ubuntu
        run: |
          mkdir -p ~/.ssh
          echo "$LIGHTSAIL_KEY" > ~/.ssh/lightsail.pem
          chmod 600 ~/.ssh/lightsail.pem
          ssh -o StrictHostKeyChecking=no -i ~/.ssh/lightsail.pem $LIGHTSAIL_USER@$LIGHTSAIL_IP '
            cd interior-duct-ltd
            git pull origin main
            npm install
            npm run build
            pm2 restart all
            echo "✅ Deployment complete"
          '
```

### 5.2 Add GitHub Secrets

1. Go to GitHub repo **Settings**
2. Click **Secrets and variables** → **Actions**
3. Add secrets:

| Name | Value |
|------|-------|
| `LIGHTSAIL_SSH_KEY` | (paste contents of lightsail.pem) |
| `LIGHTSAIL_IP` | Your static IP |

4. Now every push to `main` automatically deploys!

---

## 📊 STEP 6: PROTECT MAIN BRANCH

### 6.1 Set Branch Protection

1. Go to **Settings** → **Branches**
2. Click **Add branch protection rule**
3. Configure:

```
Branch name pattern: main
✓ Require pull request reviews before merging
✓ Dismiss stale pull request approvals
✓ Require status checks to pass before merging
✓ Require up to date before merging
✓ Include administrators
```

### 6.2 Code Review Process

1. Create feature branch
2. Make changes
3. Push to GitHub
4. Create Pull Request
5. Request review
6. Merge after approval
7. Auto-deploys to production!

---

## 🔍 STEP 7: MONITORING & LOGGING

### 7.1 GitHub Issues Template

Create: `.github/ISSUE_TEMPLATE/bug_report.md`

```markdown
---
name: Bug Report
about: Report a bug
---

## Description
Clear description of the bug

## Steps to Reproduce
1. First step
2. Second step

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Screenshots
If applicable

## Environment
- OS: Windows/Mac/Linux
- Node version: 18.x
- Browser: Chrome/Safari/Firefox
```

### 7.2 Release Notes Template

Create: `CHANGELOG.md`

```markdown
# Changelog

All notable changes documented here.

## [1.0.0] - 2024-01-20

### Added
- Initial release
- Product catalog
- Admin dashboard
- CRM system

### Changed
- Nothing yet

### Fixed
- Initial setup issues

### Security
- SSH key protection
- Environment variable handling
```

---

## ✅ GITHUB CHECKLIST

- [ ] Repository created
- [ ] Code pushed to main
- [ ] .gitignore configured
- [ ] README.md written
- [ ] LICENSE added (MIT)
- [ ] Branch protection enabled
- [ ] GitHub Actions workflow set up
- [ ] SSH secrets added
- [ ] Collaborators invited (optional)
- [ ] Issue templates created
- [ ] README badge added

---

## 📈 GITHUB BEST PRACTICES

### Commit Early, Commit Often
```bash
git commit -m "wip: working on feature"  # Work in progress
git commit -m "feat: complete feature X"  # Finished
```

### Keep History Clean
```bash
# Don't commit large files
git lfs install  # For large files

# Don't commit secrets
# Use .env.example instead
```

### Code Quality
```bash
# Pre-commit hooks (optional)
npm install -D husky lint-staged

# Automatically format code before commit
npx husky install
```

---

## 🔗 USEFUL GITHUB LINKS

- [Your Repository](https://github.com/YOUR_USERNAME/interior-duct-ltd)
- [GitHub CLI](https://cli.github.com/) - Faster workflow
- [GitHub Copilot](https://github.com/features/copilot) - AI assistance
- [GitHub Pages](https://pages.github.com/) - Free hosting
- [GitHub Actions Marketplace](https://github.com/marketplace?type=actions)

---

## 🎉 DEPLOYMENT WORKFLOW

```
Local Development
    ↓
Push to GitHub
    ↓
GitHub Actions Tests
    ↓
Auto Deploy to Lightsail
    ↓
Live in Production!
```

---

## 📄 NEXT STEPS

1. ✅ Push code to GitHub
2. ✅ Set up GitHub Actions
3. ✅ Deploy to AWS Lightsail
4. Read: **AWS_DEPLOYMENT.md**
