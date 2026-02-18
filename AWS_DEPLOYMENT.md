# 🚀 AWS LIGHTSAIL DEPLOYMENT GUIDE

**Deploy Interior Duct Ltd to production for $5/month**

---

## 💰 PRICING BREAKDOWN

| Component | Cost | Notes |
|-----------|------|-------|
| **Lightsail Instance** | $5/month | 1GB RAM, 1 vCPU, 40GB SSD |
| **Domain (Route 53)** | $12/year | Optional, register externally first |
| **Data Transfer** | Free | 1TB/month included |
| **Backups** | $3-5/month | Optional automated snapshots |
| **Total Minimum** | **$5/month** | **$60/year** |

---

## 📋 PREREQUISITES

- ✅ AWS Account (free tier eligible)
- ✅ Local Next.js + Express project working
- ✅ Git repository on GitHub
- ✅ Domain name (optional, can use IP)
- ✅ SSH client (Windows: PuTTY or built-in)

---

## 🎯 STEP 1: PREPARE YOUR PROJECT

### 1.1 Update `package.json`

Ensure your `package.json` has these scripts:

```json
{
  "scripts": {
    "dev": "concurrently \"next dev\" \"npm run dev:backend\"",
    "dev:backend": "node backend/server.js",
    "build": "next build",
    "start": "NODE_ENV=production node backend/server.js & next start",
    "build:backend": "echo 'Backend ready'"
  }
}
```

### 1.2 Create `ecosystem.config.js` (PM2 Configuration)

This manages your processes on the server:

```javascript
module.exports = {
  apps: [
    {
      name: "IDL-Backend",
      script: "./backend/server.js",
      instances: 1,
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
        PORT: 5000,
      },
    },
    {
      name: "IDL-Frontend",
      script: "npm",
      args: "run start",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
};
```

### 1.3 Create `.env.production`

```env
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://yourdomain.com
DATABASE_PATH=./backend/db.json
LEADS_PATH=./backend/leads.json
UPLOAD_DIR=./backend/uploads
```

### 1.4 Create `.github/workflows/deploy.yml` (Optional CI/CD)

```yaml
name: Deploy to Lightsail

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Lightsail
        run: |
          mkdir -p ~/.ssh
          echo "${{ secrets.LIGHTSAIL_SSH_KEY }}" > ~/.ssh/lightsail.pem
          chmod 600 ~/.ssh/lightsail.pem
          ssh -i ~/.ssh/lightsail.pem ec2-user@${{ secrets.LIGHTSAIL_IP }} 'cd /home/ec2-user/interior-duct-ltd && git pull origin main && npm install && npm run build && pm2 restart all'
```

### 1.5 Create `Dockerfile` (Optional for containerization)

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000 5000

CMD ["pm2-runtime", "start", "ecosystem.config.js"]
```

---

## 🌐 STEP 2: CREATE LIGHTSAIL INSTANCE

### 2.1 Go to AWS Lightsail Console

1. Go to [AWS Lightsail](https://lightsail.aws.amazon.com)
2. Click **Create Instance**

### 2.2 Configure Instance

| Setting | Value |
|---------|-------|
| **Location** | Choose nearest region |
| **Image** | Ubuntu 22.04 LTS |
| **Plan** | $5/month (1GB RAM) |
| **Instance Name** | `interior-duct-prod` |

### 2.3 Create Static IP

1. In Lightsail console, go to **Networking**
2. Click **Create static IP**
3. Attach to your instance
4. Note the IP address (e.g., `1.2.3.4`)

### 2.4 Configure Firewall

1. Click **Networking** tab
2. Add firewall rules:

| Protocol | Port | Source |
|----------|------|--------|
| HTTP | 80 | 0.0.0.0/0 |
| HTTPS | 443 | 0.0.0.0/0 |
| Custom | 3000 | 0.0.0.0/0 |
| Custom | 5000 | 0.0.0.0/0 |
| SSH | 22 | Your IP |

---

## 🔐 STEP 3: CONNECT TO INSTANCE

### 3.1 Download SSH Key

1. In Lightsail, click **Account**
2. Go to **SSH keys**
3. Download the default key (save as `lightsail.pem`)

### 3.2 Connect via SSH

**On Windows (PowerShell):**

```powershell
# Set permissions
icacls "C:\path\to\lightsail.pem" /grant:r "$env:username`:`(f`)"

# Connect
ssh -i "C:\path\to\lightsail.pem" ubuntu@YOUR_STATIC_IP
```

**On Mac/Linux:**

```bash
chmod 600 lightsail.pem
ssh -i lightsail.pem ubuntu@YOUR_STATIC_IP
```

---

## 📦 STEP 4: INSTALL DEPENDENCIES

Once connected via SSH, run:

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2 (process manager)
sudo npm install -g pm2

# Install Git
sudo apt install -y git

# Install Nginx (reverse proxy)
sudo apt install -y nginx

# Install SSL Certificate (Let's Encrypt)
sudo apt install -y certbot python3-certbot-nginx

# Verify installations
node --version
npm --version
pm2 --version
```

---

## 🚀 STEP 5: DEPLOY APPLICATION

### 5.1 Clone Repository

```bash
# From /home/ubuntu
cd ~
git clone https://github.com/YOUR_USERNAME/interior-duct-ltd.git
cd interior-duct-ltd
```

### 5.2 Install Dependencies

```bash
npm install
npm run build
```

### 5.3 Copy Environment Files

```bash
cp .env.example .env.production
nano .env.production  # Edit as needed
```

### 5.4 Create Uploads Directory

```bash
mkdir -p backend/uploads
chmod 755 backend/uploads
```

### 5.5 Start Application with PM2

```bash
# Start both processes
pm2 start ecosystem.config.js

# Save PM2 configuration to restart on reboot
pm2 save
sudo env PATH=$PATH:/usr/local/bin pm2 startup ubuntu -u ubuntu --hp /home/ubuntu
```

### 5.6 Verify Running

```bash
pm2 status
pm2 logs

# Test backend
curl http://localhost:5000/health
```

---

## 🔌 STEP 6: CONFIGURE NGINX REVERSE PROXY

### 6.1 Create Nginx Config

```bash
sudo nano /etc/nginx/sites-available/interior-duct-ltd
```

### 6.2 Paste This Configuration

**For IP-only access (no SSL yet):**

```nginx
upstream frontend {
    server localhost:3000;
}

upstream backend {
    server localhost:5000;
}

server {
    listen 80;
    server_name YOUR_STATIC_IP;

    client_max_body_size 5M;

    # Frontend
    location / {
        proxy_pass http://frontend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend API
    location /api/ {
        proxy_pass http://backend/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # File uploads
    location /uploads/ {
        proxy_pass http://backend/uploads/;
        expires 30d;
    }
}
```

**For domain with SSL:**

```nginx
upstream frontend {
    server localhost:3000;
}

upstream backend {
    server localhost:5000;
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$server_name$request_uri;
}

# HTTPS Server
server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    client_max_body_size 5M;

    location / {
        proxy_pass http://frontend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api/ {
        proxy_pass http://backend/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /uploads/ {
        proxy_pass http://backend/uploads/;
        expires 30d;
    }
}
```

### 6.3 Enable Site

```bash
sudo ln -s /etc/nginx/sites-available/interior-duct-ltd /etc/nginx/sites-enabled/

# Test Nginx configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

---

## 🔐 STEP 7: INSTALL SSL CERTIFICATE (Let's Encrypt)

**Only if using a domain:**

```bash
# Request certificate
sudo certbot certonly --nginx -d yourdomain.com -d www.yourdomain.com

# Verify certificate was created
sudo ls -la /etc/letsencrypt/live/yourdomain.com/

# Set auto-renewal
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer

# Test renewal
sudo certbot renew --dry-run
```

---

## 🌍 STEP 8: CONFIGURE DOMAIN (OPTIONAL)

### Using Route 53 (AWS):

1. Go to [Route 53 Console](https://console.aws.amazon.com/route53)
2. Click **Create hosted zone**
3. Enter your domain name
4. Create records:

| Type | Name | Value |
|------|------|-------|
| A | yourdomain.com | YOUR_STATIC_IP |
| A | www.yourdomain.com | YOUR_STATIC_IP |
| CNAME | api.yourdomain.com | yourdomain.com |

### Using External DNS (GoDaddy, Namecheap, etc.):

1. Go to your domain registrar
2. Update nameservers OR create A records
3. Point to your Lightsail static IP

**Wait 24-48 hours for DNS propagation**

---

## 📊 STEP 9: MONITORING & MAINTENANCE

### Check Application Status

```bash
# Monitor logs
pm2 logs

# Monitor resources
pm2 monit

# Check specific process
pm2 logs IDL-Backend
pm2 logs IDL-Frontend
```

### Update Application

```bash
cd ~/interior-duct-ltd
git pull origin main
npm install
npm run build
pm2 restart all
```

### Backup Database

```bash
# Create backup
cp backend/db.json backend/db.json.backup.$(date +%Y%m%d)

# Download backup to local machine
scp -i lightsail.pem ubuntu@YOUR_IP:~/interior-duct-ltd/backend/db.json ./backup/
```

### View Application

```bash
# Frontend: http://YOUR_STATIC_IP
# Admin Dashboard: http://YOUR_STATIC_IP/admin
# API Health: curl http://YOUR_STATIC_IP:5000/health
```

---

## 🔧 STEP 10: SCALE UP (WHEN NEEDED)

### Upgrade Instance

1. In Lightsail, click your instance
2. Click **Change plan**
3. Select larger plan ($10, $20, etc.)

### Add Database (PostgreSQL)

```bash
# Create Lightsail database
# Then update backend to use connection string instead of JSON
```

### Add CDN (CloudFront)

1. Go to CloudFront
2. Create distribution
3. Point to your Lightsail instance

---

## 📈 COST ESTIMATION

### Year 1

| Item | Cost |
|------|------|
| Lightsail ($5/month) | $60 |
| Domain | $12 |
| **Total** | **$72** |

### Year 2+ (if scaling)

| Scenario | Cost |
|----------|------|
| Same setup | $72/year |
| Lightsail $10/month | $132/year |
| + RDS PostgreSQL | $180/year |
| + CloudFront CDN | $200+/year |

---

## ✅ DEPLOYMENT CHECKLIST

- [ ] Static IP assigned
- [ ] Firewall rules configured
- [ ] SSH key downloaded
- [ ] Node.js installed
- [ ] Git repository cloned
- [ ] Dependencies installed
- [ ] Environment variables set
- [ ] PM2 running both processes
- [ ] Nginx configured
- [ ] SSL certificate (if domain)
- [ ] DNS pointing to IP
- [ ] Backend responding at /health
- [ ] Frontend loading at IP/domain
- [ ] Admin dashboard accessible
- [ ] File uploads working
- [ ] Leads being saved

---

## 🆘 TROUBLESHOOTING

### Port 80/443 Already in Use
```bash
sudo systemctl status nginx
sudo systemctl restart nginx
```

### PM2 Not Starting
```bash
pm2 delete all
pm2 start ecosystem.config.js
pm2 save
```

### Database File Permissions
```bash
sudo chown -R ubuntu:ubuntu ~/interior-duct-ltd
chmod 755 backend/uploads
```

### Nginx Not Proxying Correctly
```bash
sudo nginx -t
sudo systemctl restart nginx
sudo tail -f /var/log/nginx/error.log
```

### Domain Not Resolving
```bash
# Check DNS
nslookup yourdomain.com
# Wait 24-48 hours for propagation
```

---

## 🎉 SUCCESS!

Your website is now live and accessible worldwide for **$5/month**!

**Monitor from anywhere:**
```bash
ssh -i lightsail.pem ubuntu@YOUR_IP
pm2 status
pm2 logs
```

---

## 📄 NEXT STEPS

1. ✅ Set up backups
2. ✅ Configure email alerts
3. ✅ Add analytics (Google Analytics)
4. ✅ Set up daily database backups
5. Read: **WORDPRESS_ALTERNATIVE.md** for CMS option
