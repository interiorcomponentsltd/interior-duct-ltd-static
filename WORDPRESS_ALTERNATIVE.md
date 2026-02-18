# 🔄 WORDPRESS ALTERNATIVE GUIDE

**Convert Interior Duct Ltd to a WordPress-based platform with WooCommerce**

---

## 🤔 WHY WORDPRESS?

| Feature | Next.js | WordPress |
|---------|---------|-----------|
| **Learning Curve** | Higher | Lower |
| **Content Management** | Code-based | Visual editor |
| **Plugins** | Manual integration | Thousands available |
| **Scalability** | Highly scalable | Good for most needs |
| **Cost** | Cheapest ($5/mo) | $5-15/mo |
| **Customization** | Full control | Themes + plugins |
| **Speed** | Faster | Good with caching |
| **SEO** | Manual setup | Built-in via plugins |
| **Best For** | Custom experiences | Traditional eCommerce |

**Choose WordPress if:**
- You prefer visual editors over code
- You need quick setup
- Your team isn't technical
- You want more plugin ecosystem
- You need multi-vendor support (Dokan)

**Choose Next.js if:**
- You need high performance
- You have a developer team
- You want full customization
- You prefer modern JavaScript
- You need headless CMS

---

## 🎯 MIGRATION PLAN

### Phase 1: Migration from Next.js

```
Existing: Next.js + Express + JSON
     ↓
New: WordPress + WooCommerce + MySQL
     ↓
Result: Same functionality, different platform
```

### Phase 2: WordPress Setup (AWS Lightsail)

1. SSH to Lightsail instance
2. Install WordPress
3. Install WooCommerce
4. Import products
5. Migrate leads

### Phase 3: Customization

1. Child theme for branding
2. Custom product fields
3. Payment gateway setup
4. Email notifications

---

## 📦 STEP 1: INSTALL WORDPRESS ON LIGHTSAIL

### 1.1 Create Lightsail Instance (WordPress)

1. Go to [AWS Lightsail](https://lightsail.aws.amazon.com)
2. Click **Create Instance**
3. Select:
   - **Platform**: Linux
   - **Blueprint**: WordPress Powered by Bitnami
   - **Plan**: $5/month
   - **Name**: `interior-duct-wordpress`

### 1.2 Get WordPress Credentials

```bash
# Connect via SSH
ssh -i lightsail.pem bitnami@YOUR_IP

# Get admin password
cat bitnami_credentials.txt

# You'll see:
# Username: user
# Password: XXXXXXXXXXXXXX
# Database: bitnami_wordpress
```

### 1.3 Access WordPress Admin

Visit: `http://YOUR_IP/wp-admin`

Login with credentials from step 1.2

---

## 🛒 STEP 2: INSTALL WOOCOMMERCE

### 2.1 Install WooCommerce Plugin

1. Go to **Plugins** → **Add New**
2. Search: "WooCommerce"
3. Click **Install Now**
4. Click **Activate**

### 2.2 Run Setup Wizard

1. Click **Let's go** on WooCommerce setup
2. Configure:
   - **Store location**: Your country
   - **Industry**: Furniture retail
   - **Product type**: Physical products
   - **Number of products**: 50-100
   - **Sales channels**: Website only
   - **Currently selling**: No
   - **Shipping**: Yes, we ship

### 2.3 Install Essential Plugins

Go to **Plugins** → **Add New** and install:

```
1. WooCommerce Product Bundles
2. WooCommerce PDF Invoice
3. Product Variations Swatches
4. YITH WooCommerce Compare
5. WooCommerce Points and Rewards
```

---

## 🏬 STEP 3: MULTI-VENDOR WITH DOKAN

### 3.1 Install Dokan

**If multiple vendors (showrooms) needed:**

1. Go to **Plugins** → **Add New**
2. Search: "Dokan"
3. Install & Activate "Dokan Multivendor Marketplace"
4. Go to **Dokan** → **Settings**

### 3.2 Configure Dokan

```
Vendor Settings:
├── Vendor Registration: Enabled
├── Commission: 20% (customizable)
├── Payout Method: Bank Transfer
├── Seller Dashboard: Enabled
└── Product Review: Enabled

Frontend:
├── Show Vendor Info: Yes
├── Vendor Contact Form: Yes
├── Vendor Rating System: Yes
└── Store Rating: Yes
```

### 3.3 Create Sample Vendors

**WP Admin → Dokan → Vendors**

```
Vendor 1:
- Name: IDL Living Room
- Email: living@interiorduct.com
- Commission: 20%
- Status: Approved

Vendor 2:
- Name: IDL Dining
- Email: dining@interiorduct.com
- Commission: 20%
- Status: Approved

Vendor 3:
- Name: IDL Office
- Email: office@interiorduct.com
- Commission: 20%
- Status: Approved
```

---

## 📦 STEP 4: IMPORT PRODUCTS

### 4.1 Export from Next.js

Create script to export products from db.json:

```bash
# On your local machine with the Next.js project:
node -e "
const fs = require('fs');
const db = JSON.parse(fs.readFileSync('backend/db.json', 'utf-8'));
const csv = 'Post Title,Post Type,Post Status,Tax:Product Category,Attribute:Color,Price,Regular Price,Stock Quantity,Product Short Description,Product Description\n' +
  db.products.map(p => \`\"\${p.name}\",simple,publish,\${p.category},,\${p.price},\${p.price},100,\${p.description},\${p.description}\`).join('\n');
fs.writeFileSync('products.csv', csv);
console.log('✅ products.csv created');
"
```

### 4.2 Import via Plugin

1. Install: **WP All Import** plugin
2. Go to **Plugins** → **WP All Import** → **New Import**
3. Upload `products.csv`
4. Map fields to WooCommerce

**Field Mapping:**
```
CSV Column          → WooCommerce Field
Post Title          → Product Name
Price               → Product Price
Product Category    → Category
Product Description → Full Description
Stock Quantity      → Stock
```

### 4.3 Bulk Upload Images

1. Install: **Media Library Assistant** plugin
2. Upload images to **Media Library**
3. Attach to products via import

---

## 🎨 STEP 5: CUSTOMIZE WORDPRESS THEME

### 5.1 Install Theme

**Best themes for furniture:**

1. **Neve** (Free + Pro)
   - Modern design
   - WooCommerce optimized
   - Fast & responsive

2. **Astra** (Free + Pro)
   - Highly customizable
   - Great for eCommerce
   - Excellent support

3. **OceanWP** (Free)
   - Furniture-friendly
   - Speed optimized

**Install Neve:**

1. Go to **Appearance** → **Themes** → **Add New**
2. Search: "Neve"
3. Click **Install**
4. Click **Activate**

### 5.2 Customize Logo & Colors

1. Go to **Appearance** → **Customize**
2. **Logo & Identity**:
   - Upload logo: `IDL_LOGO.png`
   - Site title: "Interior Duct Ltd"
   - Tagline: "Premium Furniture"

3. **Colors**:
   - Primary: #1F2937 (gray-900)
   - Secondary: #F59E0B (amber-500)
   - Accent: #FFFFFF

4. **Fonts**:
   - Body: Open Sans
   - Headings: Playfair Display

### 5.3 Create Child Theme

Create customization without losing updates:

```bash
# via FTP or SSH
mkdir -p wp-content/themes/neve-child

# Create style.css
cat > wp-content/themes/neve-child/style.css << 'EOF'
/*
Theme Name: Interior Duct Ltd
Template: neve
Version: 1.0
*/

@import url("../neve/style.css");

/* Custom styles */
:root {
    --primary-color: #1F2937;
    --secondary-color: #F59E0B;
}
EOF

# Create functions.php
cat > wp-content/themes/neve-child/functions.php << 'EOF'
<?php
add_action( 'wp_enqueue_scripts', 'neve_child_enqueue' );
function neve_child_enqueue() {
    wp_enqueue_style( 'neve-child-style', get_stylesheet_uri() );
}
?>
EOF
```

---

## 💬 STEP 6: ADD CHAT & FORMS

### 6.1 Install Tidio Chat

**Free live chat + chatbot:**

1. Go to **Plugins** → **Add New**
2. Search: "Tidio Live Chat"
3. Install & Activate
4. Sign up for free account
5. Connect to WordPress

### 6.2 Install WPForms

**Contact forms and lead capture:**

1. Install: **WPForms Lite** (free) or **Pro** ($99/year)
2. Create form:
   - Name
   - Email
   - Phone
   - Product Interest
   - Message
3. Add to contact page
4. Leads auto-saved to **Leads** post type

### 6.3 Configure Forms

**Create custom post type for leads:**

Add to `functions.php`:

```php
<?php
function register_leads_cpt() {
    register_post_type('lead', array(
        'labels' => array('name' => 'Leads'),
        'public' => false,
        'show_in_menu' => true,
        'supports' => array('title', 'editor', 'custom-fields')
    ));
}
add_action('init', 'register_leads_cpt');
?>
```

---

## 📊 STEP 7: ANALYTICS & SEO

### 7.1 Google Analytics

1. Install: **MonsterInsights**
2. Connect Google Analytics account
3. Track:
   - Product views
   - Add to cart
   - Purchases
   - User behavior

### 7.2 SEO Optimization

1. Install: **Yoast SEO** (free)
2. Configure:
   - Focus keyword per product
   - Meta description
   - Readability
   - Links

3. Set up sitemaps:
   - Product sitemap
   - Category sitemap
   - Post sitemap

### 7.3 Schema Markup

Automatically added by plugins for:
- Products
- Reviews
- Organization
- FAQs

---

## 💳 STEP 8: PAYMENT GATEWAY

### 8.1 Install Stripe

**Best for furniture (accepts payments, handles disputes)**

1. Go to **WooCommerce** → **Settings** → **Payments**
2. Click **Set up** on Stripe
3. Sign up for free Stripe account
4. Connect to WordPress
5. Configure:
   - Test vs Live keys
   - Currency: USD
   - Payment methods: Card + Apple Pay

### 8.2 Install PayPal

For customers who prefer PayPal:

1. Go to **Payments** → **PayPal**
2. Click **Set up**
3. Connect PayPal Business account
4. Enable both Stripe + PayPal

### Alternative Gateways

```
Square       - Good for brick & mortar
Razorpay     - For India
Mollie       - For Europe
```

---

## 📧 STEP 9: EMAIL AUTOMATION

### 9.1 Install MailerLite

**Email marketing + automation:**

1. Install: **MailerLite for WordPress**
2. Create account (free up to 1000 subscribers)
3. Set up sequences:
   - Welcome email
   - Abandoned cart email
   - New product notification
   - Review request

### 9.2 Automated Emails

**WooCommerce emails:**

```
Order Confirmation    → Automatic
New Order            → Admin email
Processing Order     → Customer
Order Shipped        → Customer
Order Delivered      → Customer
Low Stock Alert      → Admin
Back in Stock        → Customers
```

---

## 🔒 STEP 10: SECURITY & PERFORMANCE

### 10.1 Security Plugins

Install these:

1. **Wordfence Security** (free)
   - Firewall
   - Malware scanning
   - Login protection

2. **Two Factor Authentication**
   - Protects admin login

3. **Backup & Restore**
   - Daily automatic backups
   - Easy restore

### 10.2 Performance

1. Install: **WP Rocket** ($39/year) or **Autoptimize** (free)
   - Caching
   - Image optimization
   - CSS/JS minification

2. Enable GZIP compression

3. Use CDN:
   - Cloudflare (free)
   - AWS CloudFront ($0.085/GB)

### 10.3 Monitoring

```bash
# SSH to Lightsail
# Check WordPress health
wp site health check

# Check plugin updates
wp plugin list

# Check theme updates
wp theme list
```

---

## 📊 WORDPRESS VS NEXT.JS COMPARISON

| Feature | WordPress | Next.js |
|---------|-----------|---------|
| **Products** | 8+ catalog | ✅ Imported |
| **Shopping Cart** | ✅ Built-in | ✅ Custom |
| **Admin Dashboard** | ✅ Rich UI | ✅ Custom |
| **CRM/Leads** | ✅ Built-in | ✅ Custom |
| **Chat** | ✅ Tidio | ✅ Custom |
| **File Upload** | ✅ Media library | ✅ Multer |
| **Multi-vendor** | ✅ Dokan | ❌ Need custom |
| **SEO** | ✅ Yoast | Manual |
| **Performance** | Good with caching | Excellent |
| **Setup Time** | 2-4 hours | 10-20 hours |
| **Cost** | $5-15/mo | $5-10/mo |

---

## 🔄 MIGRATION CHECKLIST

### From Next.js to WordPress

- [ ] Create WordPress on Lightsail
- [ ] Install WooCommerce
- [ ] Install Dokan (multi-vendor)
- [ ] Install essential plugins
- [ ] Export products from db.json
- [ ] Import products to WooCommerce
- [ ] Upload product images
- [ ] Configure payment (Stripe)
- [ ] Set up shipping
- [ ] Import leads data
- [ ] Configure email
- [ ] Set up theme (Neve)
- [ ] Add forms (WPForms)
- [ ] Add chat (Tidio)
- [ ] Configure SEO (Yoast)
- [ ] Set up backups
- [ ] Test all features
- [ ] Point domain to WordPress
- [ ] Delete old Next.js instance (keep backup)

---

## 📈 MIGRATION COST

| Item | Monthly | Yearly |
|------|---------|--------|
| Lightsail | $5 | $60 |
| Domain | - | $12 |
| Email (optional) | $6 | $72 |
| Plugins/Themes | $10-50 | $120-600 |
| **Total** | $21-61 | $252-744 |

---

## 🆘 WORDPRESS TROUBLESHOOTING

### White Screen of Death
```bash
ssh -i lightsail.pem bitnami@YOUR_IP

# Enable debug
wp config set WP_DEBUG true --allow-root
wp config set WP_DEBUG_LOG true --allow-root
wp config set WP_DEBUG_DISPLAY false --allow-root

# Check logs
tail -f wp-content/debug.log
```

### Database Connection Error
```bash
# Reset database
wp db reset --yes --allow-root

# Import backup
wp db import backup.sql --allow-root
```

### Plugin Conflicts
```bash
# Disable all plugins
wp plugin deactivate --all --allow-root

# Check which one causes issue
wp plugin activate [plugin-name] --allow-root
```

---

## 📚 WORDPRESS RESOURCES

- [WordPress.org](https://wordpress.org)
- [WooCommerce Docs](https://docs.woocommerce.com)
- [Dokan Documentation](https://wedevs.com/dokan/)
- [WordPress Tutorials](https://wordpress.org/support/article/new-to-wordpress/)

---

## 🎯 DECISION GUIDE

**Choose WordPress if:**
- ✅ Non-technical team will manage site
- ✅ You need quick deployment
- ✅ You want multiple vendors (Dokan)
- ✅ You prefer plugin ecosystem
- ✅ Budget is tight ($5-15/mo)

**Choose Next.js if:**
- ✅ You have developer team
- ✅ You need custom features
- ✅ Performance is critical
- ✅ You want full control
- ✅ You're building a SPA/mobile app too

---

## ✅ SUMMARY

| Phase | Platform | Time | Cost |
|-------|----------|------|------|
| Phase 1 (Current) | Next.js + Express | ✅ Done | $5/mo |
| Phase 2 (Optional) | WordPress + WooCommerce | 2-4 hrs | $5-15/mo |
| Phase 3 | Hybrid (Next.js + WP + API) | Custom | Custom |

---

## 🚀 NEXT STEPS

1. **Keep Next.js** - It's working great ($5/mo)
2. **Try WordPress** - Test on separate instance ($5/mo extra)
3. **Decide** - Which platform your team prefers
4. **Migrate** - Or run both side-by-side

---

**Both are valid choices! Pick what works best for your team.** ✨
