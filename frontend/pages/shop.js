import Head from 'next/head';
import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import ProductGrid from '../components/ProductGrid';
import Footer from '../components/Footer';

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState(1000000);
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'Living Room', 'Dining', 'Bedroom', 'Kitchen', 'Office'];

  useEffect(() => {
    fetch('http://localhost:5000/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setFiltered(data);
      })
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  useEffect(() => {
    let result = products;

    // Filter by category
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Filter by price
    result = result.filter(p => p.price <= priceRange);

    // Filter by search term
    if (searchTerm) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFiltered(result);
  }, [selectedCategory, priceRange, searchTerm, products]);

  return (
    <>
      <Head>
        <title>Shop - Interior Duct Ltd</title>
        <meta name="description" content="Browse our complete furniture collection" />
      </Head>

      <Navigation />

      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-gray-900">Our Furniture Collection</h1>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="bg-white p-6 rounded-lg shadow-md h-fit">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Filters</h3>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2 text-gray-700">Search</label>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-3 text-gray-700">Category</label>
                <div className="space-y-2">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`block w-full text-left px-4 py-2 rounded-lg transition ${
                        selectedCategory === cat
                          ? 'bg-amber-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-3 text-gray-700">Max Price</label>
                <input
                  type="range"
                  min="0"
                  max="1000000"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full"
                />
                <p className="text-sm text-gray-600 mt-2">₦{priceRange.toLocaleString()}</p>
              </div>

              {/* Wishlist & Cart */}
              <div className="pt-4 border-t border-gray-200">
                <button className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 mb-2">
                  View Wishlist
                </button>
                <button className="w-full bg-amber-500 text-white py-2 rounded-lg hover:bg-amber-600">
                  View Cart
                </button>
              </div>
            </div>

            {/* Products */}
            <div className="lg:col-span-3">
              {filtered.length > 0 ? (
                <>
                  <p className="text-gray-600 mb-6">Showing {filtered.length} products</p>
                  <ProductGrid products={filtered} />
                </>
              ) : (
                <div className="bg-white p-12 rounded-lg text-center">
                  <p className="text-gray-600 text-lg">No products found matching your criteria</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
