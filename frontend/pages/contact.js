import Head from 'next/head';
import { useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send to a backend service
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <>
      <Head>
        <title>Contact Us - Interior Duct Ltd</title>
        <meta name="description" content="Get in touch with Interior Duct Ltd for inquiries and custom furniture solutions" />
      </Head>

      <Navigation />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-gray-300">We'd love to hear from you. Get in touch with our team.</p>
          </div>
        </div>

        <div className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div>
                <h2 className="text-3xl font-bold mb-8 text-gray-900">Get in Touch</h2>

                <div className="bg-white p-8 rounded-lg shadow-md mb-6">
                  <div className="flex items-start mb-8">
                    <div className="text-3xl mr-4">📍</div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Location</h3>
                      <p className="text-gray-600">Nigeria</p>
                      <p className="text-gray-600">Interior Duct Ltd Headquarters</p>
                    </div>
                  </div>

                  <div className="flex items-start mb-8">
                    <div className="text-3xl mr-4">📞</div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Phone</h3>
                      <p className="text-gray-600">+234 (0) XXX XXX XXXX</p>
                      <p className="text-gray-600">Available Monday - Friday, 9AM - 5PM WAT</p>
                    </div>
                  </div>

                  <div className="flex items-start mb-8">
                    <div className="text-3xl mr-4">📧</div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Email</h3>
                      <p className="text-gray-600">info@interiorductltd.com</p>
                      <p className="text-gray-600">sales@interiorductltd.com</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="text-3xl mr-4">💼</div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Business Hours</h3>
                      <p className="text-gray-600">Monday - Friday: 9:00 AM - 5:00 PM</p>
                      <p className="text-gray-600">Saturday: 10:00 AM - 2:00 PM</p>
                      <p className="text-gray-600">Sunday: Closed</p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="bg-white p-8 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Follow Us</h3>
                  <div className="flex gap-4">
                    <a href="#" className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition">
                      f
                    </a>
                    <a href="#" className="bg-pink-600 text-white p-3 rounded-lg hover:bg-pink-700 transition">
                      📷
                    </a>
                    <a href="#" className="bg-blue-400 text-white p-3 rounded-lg hover:bg-blue-500 transition">
                      𝕏
                    </a>
                    <a href="#" className="bg-red-600 text-white p-3 rounded-lg hover:bg-red-700 transition">
                      ▶️
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-3xl font-bold mb-8 text-gray-900">Send us a Message</h2>

                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="Your Name"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="+234 (0) XXX XXX XXXX"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Subject</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="">Select a subject</option>
                      <option value="custom_order">Custom Order</option>
                      <option value="wholesale">Wholesale Inquiry</option>
                      <option value="partnership">Partnership Opportunity</option>
                      <option value="support">Support</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-amber-500 text-white py-3 rounded-lg font-semibold hover:bg-amber-600 transition"
                  >
                    Send Message
                  </button>
                </form>

                <p className="text-sm text-gray-600 mt-4 text-center">
                  We'll get back to you within 24 business hours.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">Our Location</h2>
            <div className="bg-gray-200 rounded-lg overflow-hidden h-96 flex items-center justify-center">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.1234567890!2d3.3667!3d6.5333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sNigeria!5e0!3m2!1sen!2sng!4v123456"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
