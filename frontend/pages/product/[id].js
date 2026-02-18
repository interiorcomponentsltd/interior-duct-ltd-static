import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import ChatWidget from '../../components/ChatWidget';
import ProductCard from '../../components/ProductCard';

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:5000/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        // Fetch related products
        return fetch('http://localhost:5000/products');
      })
      .then(res => res.json())
      .then(data => {
        const related = data
          .filter(p => p.category === product?.category && p.id !== id)
          .slice(0, 4);
        setRelatedProducts(related);
      })
      .catch(err => console.error('Error fetching product:', err));
  }, [id]);

  if (!product) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-gray-600 text-lg">Loading...</p>
        </div>
        <Footer />
      </>
    );
  }

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${quantity} item(s) added to cart!`);
  };

  const addToWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    if (!wishlist.find(item => item.id === product.id)) {
      wishlist.push(product);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      alert('Added to wishlist!');
    } else {
      alert('Already in wishlist!');
    }
  };

  return (
    <>
      <Head>
        <title>{product.name} - Interior Duct Ltd</title>
        <meta name="description" content={product.description} />
      </Head>

      <Navigation />

      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm text-gray-600 mb-8">
            <a href="/" className="hover:text-amber-500">Home</a>
            <span className="mx-2">/</span>
            <a href="/shop" className="hover:text-amber-500">Shop</a>
            <span className="mx-2">/</span>
            <span>{product.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white p-8 rounded-lg shadow-md">
            {/* Image Gallery */}
            <div>
              <div className="bg-gray-100 rounded-lg overflow-hidden mb-4">
                <img
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  className="w-full h-96 object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`border-2 rounded-lg overflow-hidden ${
                      currentImageIndex === idx ? 'border-amber-500' : 'border-gray-300'
                    }`}
                  >
                    <img src={img} alt={`View ${idx + 1}`} className="w-full h-20 object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-4xl font-bold mb-2 text-gray-900">{product.name}</h1>
              <div className="flex items-center mb-6">
                <div className="text-yellow-500 text-lg">★★★★★</div>
                <span className="ml-2 text-gray-600">({product.reviews} reviews)</span>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                <p className="text-4xl font-bold text-amber-600">₦{product.price.toLocaleString()}</p>
              </div>

              <p className="text-gray-600 mb-6">{product.description}</p>

              {/* Product Details */}
              <div className="grid grid-cols-2 gap-4 mb-6 bg-gray-50 p-4 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600">Material</p>
                  <p className="font-semibold text-gray-900">{product.material}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Color</p>
                  <p className="font-semibold text-gray-900">{product.color}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Category</p>
                  <p className="font-semibold text-gray-900">{product.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Availability</p>
                  <p className="font-semibold text-green-600">{product.inStock ? 'In Stock' : 'Out of Stock'}</p>
                </div>
              </div>

              {/* Quantity & Action Buttons */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2 text-gray-700">Quantity</label>
                <div className="flex items-center border border-gray-300 rounded-lg w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    readOnly
                    className="w-16 text-center border-l border-r border-gray-300"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <button
                  onClick={addToCart}
                  className="bg-amber-500 text-white py-3 rounded-lg font-semibold hover:bg-amber-600 transition"
                >
                  Add to Cart
                </button>
                <button
                  onClick={addToWishlist}
                  className="bg-gray-200 text-gray-900 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
                >
                  ❤️ Wishlist
                </button>
              </div>

              <button className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition">
                Ask AI Assistant
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-8 bg-white rounded-lg shadow-md overflow-hidden">
            <div className="flex border-b border-gray-200">
              {['description', 'specifications', 'reviews'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-4 px-6 font-semibold transition ${
                    activeTab === tab
                      ? 'text-amber-500 border-b-2 border-amber-500'
                      : 'text-gray-600'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
            <div className="p-8">
              {activeTab === 'description' && (
                <div className="prose max-w-none">
                  <p>{product.description}</p>
                  <p>Premium quality furniture crafted with attention to detail and durability.</p>
                </div>
              )}
              {activeTab === 'specifications' && (
                <table className="w-full">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 font-semibold">Material</td>
                      <td>{product.material}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-semibold">Color</td>
                      <td>{product.color}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-semibold">Category</td>
                      <td>{product.category}</td>
                    </tr>
                  </tbody>
                </table>
              )}
              {activeTab === 'reviews' && (
                <div>
                  <p className="text-gray-600">No reviews yet. Be the first to review this product!</p>
                </div>
              )}
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-12">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Related Products</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map(prod => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <ChatWidget />
      <Footer />
    </>
  );
}
