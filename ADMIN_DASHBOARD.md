# ENHANCED ADMIN DASHBOARD

## 🎨 Creating a Production-Ready Admin Dashboard

This replaces the basic `/admin` page with a full-featured dashboard for managing products, leads, quotes, and files.

---

## 📁 ADMIN FOLDER STRUCTURE

Create this structure under `frontend/pages/admin/`:

```
frontend/pages/admin/
├── index.js           ← Dashboard home (stats, recent leads)
├── products.js        ← Product management + upload
├── leads.js           ← CRM leads management
├── quotes.js          ← Quote editor
├── settings.js        ← Admin settings
└── components/
    ├── AdminNav.js    ← Sidebar navigation
    ├── StatCard.js    ← Dashboard stats
    ├── UploadForm.js  ← File upload component
    └── LeadsTable.js  ← Leads data table
```

---

## 📌 FILE 1: `frontend/pages/admin/index.js`

**Dashboard Home with Stats & Recent Activity**

```jsx
import { useState, useEffect } from "react";
import Link from "next/link";
import AdminNav from "./components/AdminNav";
import StatCard from "./components/StatCard";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    leads: 0,
    quotes: 0,
    recentLeads: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [productsRes, leadsRes, quotesRes] = await Promise.all([
          fetch("http://localhost:5000/products"),
          fetch("http://localhost:5000/leads"),
          fetch("http://localhost:5000/quotes"),
        ]);

        const products = await productsRes.json();
        const leads = await leadsRes.json();
        const quotes = await quotesRes.json();

        setStats({
          products: products.length,
          leads: leads.length,
          quotes: quotes.length,
          recentLeads: leads.slice(-5).reverse(),
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminNav />
      
      <div className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600 mb-8">Welcome back! Here's what's happening.</p>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard
              title="Products"
              value={stats.products}
              icon="📦"
              href="/admin/products"
            />
            <StatCard
              title="New Leads"
              value={stats.leads}
              icon="📧"
              href="/admin/leads"
            />
            <StatCard
              title="Quotes"
              value={stats.quotes}
              icon="📋"
              href="/admin/quotes"
            />
          </div>

          {/* Recent Leads */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Leads</h2>
            {stats.recentLeads.length === 0 ? (
              <p className="text-gray-500">No leads yet</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                        Interest
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {stats.recentLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {lead.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {lead.email}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {lead.productInterest}
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 text-sm font-medium rounded-full bg-amber-100 text-amber-800">
                            {lead.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <Link href="/admin/leads">
              <a className="text-amber-600 hover:text-amber-700 mt-4 inline-block font-semibold">
                View all leads →
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## 📌 FILE 2: `frontend/pages/admin/components/AdminNav.js`

**Sidebar Navigation Component**

```jsx
import Link from "next/link";
import { useRouter } from "next/router";

export default function AdminNav() {
  const router = useRouter();

  const isActive = (href) => router.pathname === href ? "bg-amber-600 text-white" : "";

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: "📊" },
    { href: "/admin/products", label: "Products", icon: "📦" },
    { href: "/admin/leads", label: "Leads", icon: "📧" },
    { href: "/admin/quotes", label: "Quotes", icon: "📋" },
    { href: "/admin/settings", label: "Settings", icon: "⚙️" },
  ];

  return (
    <div className="w-64 bg-gray-900 text-white h-screen flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold">IDL Admin</h1>
        <p className="text-gray-400 text-sm">Interior Duct Ltd</p>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <a className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition ${isActive(item.href)}`}>
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </a>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-700">
        <button className="w-full text-left px-4 py-2 hover:bg-gray-800 rounded text-sm">
          👤 Logout
        </button>
      </div>
    </div>
  );
}
```

---

## 📌 FILE 3: `frontend/pages/admin/components/StatCard.js`

```jsx
import Link from "next/link";

export default function StatCard({ title, value, icon, href }) {
  return (
    <Link href={href}>
      <a className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm font-medium">{title}</p>
            <p className="text-4xl font-bold text-gray-900 mt-2">{value}</p>
          </div>
          <div className="text-4xl opacity-50">{icon}</div>
        </div>
      </a>
    </Link>
  );
}
```

---

## 📌 FILE 4: `frontend/pages/admin/products.js`

**Product Management with Upload**

```jsx
import { useState, useEffect } from "react";
import AdminNav from "./components/AdminNav";
import UploadForm from "./components/UploadForm";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "Living",
    price: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/products");
      setProducts(await res.json());
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleFileUpload = (imageUrl) => {
    setFormData({ ...formData, image: imageUrl });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const endpoint = editingId
        ? `http://localhost:5000/products/${editingId}`
        : "http://localhost:5000/products";

      const method = editingId ? "PUT" : "POST";
      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        fetchProducts();
        setFormData({
          name: "",
          category: "Living",
          price: "",
          description: "",
          image: "",
        });
        setEditingId(null);
        setShowForm(false);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;

    try {
      await fetch(`http://localhost:5000/products/${id}`, {
        method: "DELETE",
      });
      fetchProducts();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminNav />

      <div className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900">Products</h1>
            <button
              onClick={() => {
                setShowForm(!showForm);
                setEditingId(null);
              }}
              className="bg-amber-500 text-white px-6 py-2 rounded-lg hover:bg-amber-600"
            >
              {showForm ? "Cancel" : "+ Add Product"}
            </button>
          </div>

          {showForm && (
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg mb-8 shadow">
              <h2 className="text-2xl font-bold mb-6">
                {editingId ? "Edit Product" : "Create Product"}
              </h2>

              {/* File Upload */}
              <UploadForm onUpload={handleFileUpload} />

              {formData.image && (
                <div className="mb-6">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                  >
                    <option>Living</option>
                    <option>Dining</option>
                    <option>Bedroom</option>
                    <option>Office</option>
                    <option>Outdoor</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-amber-500 text-white py-2 rounded-lg hover:bg-amber-600"
              >
                {editingId ? "Update Product" : "Create Product"}
              </button>
            </form>
          )}

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow p-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded mb-4"
                />
                <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{product.category}</p>
                <p className="text-amber-600 font-bold text-lg mb-4">
                  ${product.price}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setFormData(product);
                      setEditingId(product.id);
                      setShowForm(true);
                    }}
                    className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## 📌 FILE 5: `frontend/pages/admin/components/UploadForm.js`

**Reusable File Upload Component**

```jsx
import { useState } from "react";

export default function UploadForm({ onUpload }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setError("Only JPEG, PNG, and WebP images allowed");
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setError("File must be under 5MB");
      return;
    }

    setError("");
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        onUpload(data.imageUrl);
      } else {
        setError("Upload failed");
      }
    } catch (error) {
      setError("Upload error: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-900 mb-2">
        Product Image
      </label>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-amber-500 transition">
        <input
          type="file"
          onChange={handleFileSelect}
          disabled={uploading}
          accept="image/*"
          className="hidden"
          id="file-upload"
        />
        <label htmlFor="file-upload" className="cursor-pointer block">
          <div className="text-3xl mb-2">📁</div>
          <p className="text-gray-700 font-medium">
            {uploading ? "Uploading..." : "Click to upload image"}
          </p>
          <p className="text-gray-500 text-sm">JPEG, PNG, or WebP (max 5MB)</p>
        </label>
      </div>
      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
    </div>
  );
}
```

---

## 📌 FILE 6: `frontend/pages/admin/leads.js`

**CRM Leads Management**

```jsx
import { useState, useEffect } from "react";
import AdminNav from "./components/AdminNav";

export default function AdminLeads() {
  const [leads, setLeads] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    fetchLeads();
    const interval = setInterval(fetchLeads, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await fetch("http://localhost:5000/leads");
      setLeads(await res.json());
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const updateLeadStatus = async (id, status) => {
    try {
      await fetch(`http://localhost:5000/leads/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      fetchLeads();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const deleteLead = async (id) => {
    if (!confirm("Delete this lead?")) return;
    try {
      await fetch(`http://localhost:5000/leads/${id}`, { method: "DELETE" });
      fetchLeads();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const filteredLeads =
    filterStatus === "all"
      ? leads
      : leads.filter((l) => l.status === filterStatus);

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminNav />

      <div className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Leads ({leads.length})</h1>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b flex gap-2">
              {["all", "new", "contacted", "converted"].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-2 rounded capitalize font-medium ${
                    filterStatus === status
                      ? "bg-amber-500 text-white"
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            {filteredLeads.length === 0 ? (
              <p className="p-6 text-gray-500">No leads found</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">
                        Phone
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">
                        Interest
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {filteredLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium">{lead.name}</td>
                        <td className="px-6 py-4 text-blue-600">
                          <a href={`mailto:${lead.email}`}>{lead.email}</a>
                        </td>
                        <td className="px-6 py-4">{lead.phone || "—"}</td>
                        <td className="px-6 py-4">{lead.productInterest}</td>
                        <td className="px-6 py-4">
                          <select
                            value={lead.status}
                            onChange={(e) =>
                              updateLeadStatus(lead.id, e.target.value)
                            }
                            className="px-3 py-1 border rounded font-medium"
                          >
                            <option>new</option>
                            <option>contacted</option>
                            <option>converted</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {new Date(lead.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => deleteLead(lead.id)}
                            className="text-red-600 hover:text-red-800 font-medium"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## 📌 FILE 7: `frontend/pages/admin/quotes.js`

**Quote Management**

```jsx
import { useState, useEffect } from "react";
import AdminNav from "./components/AdminNav";

export default function AdminQuotes() {
  const [quotes, setQuotes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    items: "Product 1, Product 2",
    totalPrice: "",
    status: "pending",
  });

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const res = await fetch("http://localhost:5000/quotes");
      setQuotes(await res.json());
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        fetchQuotes();
        setFormData({
          clientName: "",
          clientEmail: "",
          items: "",
          totalPrice: "",
          status: "pending",
        });
        setShowForm(false);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const deleteQuote = async (id) => {
    if (!confirm("Delete quote?")) return;
    try {
      await fetch(`http://localhost:5000/quotes/${id}`, { method: "DELETE" });
      fetchQuotes();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminNav />

      <div className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900">Quotes</h1>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-amber-500 text-white px-6 py-2 rounded-lg hover:bg-amber-600"
            >
              {showForm ? "Cancel" : "+ Create Quote"}
            </button>
          </div>

          {showForm && (
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg mb-8 shadow">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Client Name
                  </label>
                  <input
                    type="text"
                    value={formData.clientName}
                    onChange={(e) =>
                      setFormData({ ...formData, clientName: e.target.value })
                    }
                    required
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.clientEmail}
                    onChange={(e) =>
                      setFormData({ ...formData, clientEmail: e.target.value })
                    }
                    required
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Items
                </label>
                <textarea
                  value={formData.items}
                  onChange={(e) =>
                    setFormData({ ...formData, items: e.target.value })
                  }
                  rows="3"
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Total Price
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.totalPrice}
                    onChange={(e) =>
                      setFormData({ ...formData, totalPrice: e.target.value })
                    }
                    required
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg"
                  >
                    <option>pending</option>
                    <option>sent</option>
                    <option>accepted</option>
                    <option>rejected</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-amber-500 text-white py-2 rounded-lg hover:bg-amber-600"
              >
                Create Quote
              </button>
            </form>
          )}

          <div className="grid gap-6">
            {quotes.map((quote) => (
              <div key={quote.id} className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg">{quote.clientName}</h3>
                    <p className="text-gray-600 text-sm">{quote.clientEmail}</p>
                  </div>
                  <span className={`px-3 py-1 rounded text-sm font-medium ${
                    quote.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : quote.status === "accepted"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}>
                    {quote.status}
                  </span>
                </div>
                <p className="text-gray-700 mb-4">{quote.items}</p>
                <div className="flex justify-between items-center">
                  <p className="text-2xl font-bold text-amber-600">
                    ${quote.totalPrice}
                  </p>
                  <button
                    onClick={() => deleteQuote(quote.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## 📌 FILE 8: `frontend/pages/admin/settings.js`

**Settings Page**

```jsx
import AdminNav from "./components/AdminNav";

export default function AdminSettings() {
  return (
    <div className="flex h-screen bg-gray-100">
      <AdminNav />
      <div className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Settings</h1>

          <div className="bg-white rounded-lg shadow p-6 space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Business Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Business Name"
                  defaultValue="Interior Duct Ltd"
                  className="px-4 py-2 border rounded-lg"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="px-4 py-2 border rounded-lg"
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  className="px-4 py-2 border rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Address"
                  className="px-4 py-2 border rounded-lg"
                />
              </div>
            </div>

            <div className="border-t pt-6">
              <h2 className="text-2xl font-bold mb-4">API Settings</h2>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Backend URL
                </label>
                <input
                  type="text"
                  defaultValue="http://localhost:5000"
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
            </div>

            <button className="w-full bg-amber-500 text-white py-3 rounded-lg hover:bg-amber-600 font-semibold">
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## ✅ SETUP COMPLETE

Run these commands:

```bash
# Start backend (in new terminal)
npm run dev:backend

# Start frontend (in new terminal)
npm run dev
```

Then visit: **http://localhost:3000/admin**

---

## 🎯 ADMIN FEATURES READY

✅ Dashboard with stats  
✅ Product management with file upload  
✅ CRM leads tracking  
✅ Quote management  
✅ Settings page  
✅ Sidebar navigation  
✅ Responsive design  

---

## 📄 NEXT: AWS Deployment Guide

Read: **AWS_DEPLOYMENT.md**
