import Head from 'next/head';
import { useState, useEffect } from 'react';
import HeroSlider from '../components/HeroSlider';
import ProductGrid from '../components/ProductGrid';
import QuotesTicker from '../components/QuotesTicker';
import ChatWidget from '../components/ChatWidget';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/products')
      .then(res => res.json())
      .then(data => setProducts(data.slice(0, 6)))
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  return (
    <>
      <Head>
        <title>Interior Duct Ltd - Premium Furniture Manufacturing Nigeria</title>
        <meta name="description" content="Custom interior furniture manufacturing, commercial projects, and professional designs for Nigeria" />
        <meta name="keywords" content="furniture, interior design, Nigeria, custom interiors, commercial furniture" />
      </Head>

      <Navigation />

      <HeroSlider />

      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <QuotesTicker />
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">Featured Collections</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Discover our premium furniture collections crafted with precision and quality
          </p>
          <ProductGrid products={products} />
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Why Choose Interior Duct Ltd?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">🏭</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Expert Manufacturing</h3>
              <p className="text-gray-600">Decades of experience in furniture craftsmanship and quality control</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🎨</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Custom Designs</h3>
              <p className="text-gray-600">Bespoke furniture tailored to your specific needs and preferences</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Fast Delivery</h3>
              <p className="text-gray-600">Reliable and timely delivery across Nigeria</p>
            </div>
          </div>
        </div>
      </section>

      <ChatWidget />
      <Footer />
    </>
  );
}
