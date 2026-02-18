import { useState } from 'react';
import Link from 'next/link';

export default function ProductCard({ product }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  let imageRotationInterval = null;

  const handleMouseEnter = () => {
    setIsHovering(true);
    if (product.images.length > 1) {
      let index = 0;
      imageRotationInterval = setInterval(() => {
        index = (index + 1) % product.images.length;
        setCurrentImageIndex(index);
      }, 300);
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setCurrentImageIndex(0);
    if (imageRotationInterval) {
      clearInterval(imageRotationInterval);
    }
  };

  const addToCart = (e) => {
    e.preventDefault();
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Added to cart!');
  };

  const addToWishlist = (e) => {
    e.preventDefault();
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
    <Link href={`/product/${product.id}`}>
      <div
        className="bg-white rounded-lg shadow-md overflow-hidden product-card cursor-pointer group"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Image Container */}
        <div className="relative bg-gray-100 overflow-hidden h-64 md:h-72">
          <img
            src={product.images[currentImageIndex]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          />
          {product.images.length > 1 && (
            <div className="absolute top-2 right-2 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              {currentImageIndex + 1}/{product.images.length}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>

          <div className="flex items-center mb-2">
            <div className="text-yellow-500">★★★★★</div>
            <span className="ml-2 text-sm text-gray-600">({product.reviews})</span>
          </div>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

          <div className="flex items-center justify-between mb-4">
            <div className="text-2xl font-bold text-amber-600">₦{(product.price / 1000).toFixed(0)}K</div>
            <span className={`text-xs font-semibold px-2 py-1 rounded ${
              product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          {/* Category Tag */}
          <div className="mb-4">
            <span className="text-xs bg-gray-200 text-gray-700 px-3 py-1 rounded-full">
              {product.category}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={addToCart}
              className="bg-amber-500 text-white py-2 rounded-lg font-semibold hover:bg-amber-600 transition text-sm"
            >
              🛒 Add
            </button>
            <button
              onClick={addToWishlist}
              className="bg-gray-200 text-gray-900 py-2 rounded-lg font-semibold hover:bg-gray-300 transition text-sm"
            >
              ❤️ Save
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
