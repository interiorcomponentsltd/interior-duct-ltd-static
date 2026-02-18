import { useState, useEffect } from 'react';

export default function QuotesTicker() {
  const [quotes, setQuotes] = useState([]);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    fetch('http://localhost:5000/quotes')
      .then(res => res.json())
      .then(data => setQuotes(data))
      .catch(err => console.error('Error fetching quotes:', err));
  }, []);

  useEffect(() => {
    if (quotes.length === 0) return;

    const interval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [quotes.length]);

  if (quotes.length === 0) {
    return null;
  }

  const currentQuote = quotes[currentQuoteIndex];

  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500 rounded-lg p-8 text-center">
      <blockquote className="text-2xl font-semibold text-gray-900 mb-4 italic">
        "{currentQuote.text}"
      </blockquote>
      <p className="text-amber-600 font-semibold">— {currentQuote.author}</p>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-6">
        {quotes.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentQuoteIndex(idx)}
            className={`w-2 h-2 rounded-full transition ${
              idx === currentQuoteIndex ? 'bg-amber-500 w-8' : 'bg-gray-300'
            }`}
            aria-label={`Go to quote ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
