import Head from 'next/head';
import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [activeTab, setActiveTab] = useState('products');
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: 'Living Room',
    description: '',
    material: '',
    color: '',
    images: []
  });
  const [newQuote, setNewQuote] = useState({
    text: '',
    author: ''
  });

  useEffect(() => {
    fetchProducts();
    fetchQuotes();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchQuotes = async () => {
    try {
      const response = await fetch('http://localhost:5000/quotes');
      const data = await response.json();
      setQuotes(data);
    } catch (error) {
      console.error('Error fetching quotes:', error);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newProduct,
          price: Number(newProduct.price),
          images: ['/images/placeholder.jpg']
        })
      });
      if (response.ok) {
        alert('Product added successfully!');
        setNewProduct({
          name: '',
          price: '',
          category: 'Living Room',
          description: '',
          material: '',
          color: '',
          images: []
        });
        fetchProducts();
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await fetch(`http://localhost:5000/products/${productId}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          alert('Product deleted successfully!');
          fetchProducts();
        }
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleAddQuote = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newQuote)
      });
      if (response.ok) {
        alert('Quote added successfully!');
        setNewQuote({ text: '', author: '' });
        fetchQuotes();
      }
    } catch (error) {
      console.error('Error adding quote:', error);
    }
  };

  return (
    <>
      <Head>
        <title>Admin CMS - Interior Duct Ltd</title>
        <meta name="description" content="Admin panel for managing products and content" />
      </Head>

      <Navigation />

      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-gray-900">Admin Dashboard</h1>

          {/* Tabs */}
          <div className="flex gap-4 mb-8 border-b border-gray-300">
            <button
              onClick={() => setActiveTab('products')}
              className={`py-2 px-4 font-semibold transition ${
                activeTab === 'products'
                  ? 'text-amber-500 border-b-2 border-amber-500'
                  : 'text-gray-600'
              }`}
            >
              Manage Products
            </button>
            <button
              onClick={() => setActiveTab('quotes')}
              className={`py-2 px-4 font-semibold transition ${
                activeTab === 'quotes'
                  ? 'text-amber-500 border-b-2 border-amber-500'
                  : 'text-gray-600'
              }`}
            >
              Manage Quotes
            </button>
          </div>

          {/* Products Tab */}
          {activeTab === 'products' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Add Product Form */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Add New Product</h2>
                <form onSubmit={handleAddProduct}>
                  <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Product Name</label>
                    <input
                      type="text"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Price</label>
                    <input
                      type="number"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Category</label>
                    <select
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option>Living Room</option>
                      <option>Dining</option>
                      <option>Bedroom</option>
                      <option>Kitchen</option>
                      <option>Office</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Material</label>
                    <input
                      type="text"
                      value={newProduct.material}
                      onChange={(e) => setNewProduct({ ...newProduct, material: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Color</label>
                    <input
                      type="text"
                      value={newProduct.color}
                      onChange={(e) => setNewProduct({ ...newProduct, color: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Description</label>
                    <textarea
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-amber-500 text-white py-2 rounded-lg font-semibold hover:bg-amber-600 transition"
                  >
                    Add Product
                  </button>
                </form>
              </div>

              {/* Products List */}
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Current Products ({products.length})</h2>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {products.map((product) => (
                    <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{product.name}</h3>
                          <p className="text-sm text-gray-600">₦{product.price.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">{product.category}</p>
                        </div>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-500 hover:text-red-700 font-semibold text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Quotes Tab */}
          {activeTab === 'quotes' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Add Quote Form */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Add New Quote</h2>
                <form onSubmit={handleAddQuote}>
                  <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Quote Text</label>
                    <textarea
                      value={newQuote.text}
                      onChange={(e) => setNewQuote({ ...newQuote, text: e.target.value })}
                      required
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="Enter the quote..."
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Author</label>
                    <input
                      type="text"
                      value={newQuote.author}
                      onChange={(e) => setNewQuote({ ...newQuote, author: e.target.value })}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="Author/Source"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-amber-500 text-white py-2 rounded-lg font-semibold hover:bg-amber-600 transition"
                  >
                    Add Quote
                  </button>
                </form>
              </div>

              {/* Quotes List */}
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Current Quotes ({quotes.length})</h2>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {quotes.map((quote) => (
                    <div key={quote.id} className="bg-white p-4 rounded-lg shadow-md">
                      <blockquote className="italic text-gray-900 mb-2">"{quote.text}"</blockquote>
                      <p className="text-sm text-gray-600">— {quote.author}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
