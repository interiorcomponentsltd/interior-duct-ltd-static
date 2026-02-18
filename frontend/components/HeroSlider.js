import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HeroSlider() {
  const slides = [
    {
      title: 'Premium Furniture Collections',
      subtitle: 'Crafted with Excellence',
      image: '/images/Living Room set.jpg',
      cta: 'Shop Now'
    },
    {
      title: 'Custom Interior Design',
      subtitle: 'Your Vision, Our Expertise',
      image: '/images/Dining Set.jpg',
      cta: 'Explore'
    },
    {
      title: 'Commercial Solutions',
      subtitle: 'Transform Your Spaces',
      image: '/images/Kitchen Cabinet.jpg',
      cta: 'Learn More'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => setCurrentIndex(index);

  return (
    <div className="relative w-full h-96 md:h-screen bg-gray-900 overflow-hidden">
      {/* Slides */}
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            idx === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
      ))}

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center text-center text-white z-10">
        <div className="max-w-2xl px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fadeIn">
            {slides[currentIndex].title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            {slides[currentIndex].subtitle}
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/shop" className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-lg font-semibold transition">
              {slides[currentIndex].cta}
            </Link>
            <Link href="/contact" className="bg-transparent hover:bg-white hover:text-black border-2 border-white text-white px-8 py-3 rounded-lg font-semibold transition">
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`w-3 h-3 rounded-full transition ${
              idx === currentIndex ? 'bg-amber-500' : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 text-black w-12 h-12 rounded-full flex items-center justify-center z-20 transition"
        aria-label="Previous slide"
      >
        ←
      </button>
      <button
        onClick={() => setCurrentIndex((prev) => (prev + 1) % slides.length)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 text-black w-12 h-12 rounded-full flex items-center justify-center z-20 transition"
        aria-label="Next slide"
      >
        →
      </button>
    </div>
  );
}
