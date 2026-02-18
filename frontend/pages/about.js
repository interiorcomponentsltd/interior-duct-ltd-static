import Head from 'next/head';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function About() {
  const team = [
    {
      name: 'Benedict Onaiwu',
      role: 'CEO & Founder',
      bio: 'Visionary leader with 15+ years of experience in furniture manufacturing and design',
      image: '👔'
    },
    {
      name: 'Bartholomew Shekari',
      role: 'Chief Technology Officer',
      bio: 'Tech innovator driving digital transformation and modernization initiatives',
      image: '💻'
    },
    {
      name: 'Gift I. Ehirobo',
      role: 'Sales Executive',
      bio: 'Results-driven professional ensuring customer satisfaction and market growth',
      image: '🤝'
    }
  ];

  return (
    <>
      <Head>
        <title>About Us - Interior Duct Ltd</title>
        <meta name="description" content="Learn about Interior Duct Ltd's mission, team, and expertise in furniture manufacturing" />
      </Head>

      <Navigation />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-4">About Interior Duct Ltd</h1>
            <p className="text-xl text-gray-300">Crafting Premium Furniture Since Our Inception</p>
          </div>
        </div>

        {/* Company Overview */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6 text-gray-900">Our Story</h2>
                <p className="text-lg text-gray-600 mb-4">
                  Interior Duct Ltd is a leading furniture manufacturing company based in Nigeria, specializing in custom interior designs and commercial furniture solutions. With a commitment to quality, innovation, and customer satisfaction, we've established ourselves as a trusted partner for residential and commercial projects across Nigeria.
                </p>
                <p className="text-lg text-gray-600 mb-4">
                  Our state-of-the-art manufacturing facilities and skilled craftsmen ensure that every piece of furniture meets the highest standards of quality and design. We combine traditional craftsmanship with modern technology to deliver exceptional furniture solutions.
                </p>
              </div>
              <div className="bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg p-8 text-white text-center">
                <div className="text-6xl mb-4">🏭</div>
                <h3 className="text-3xl font-bold mb-2">Premium Quality</h3>
                <p className="text-lg">Handcrafted furniture with attention to every detail</p>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center text-gray-900">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-8 rounded-lg text-center">
                <div className="text-5xl mb-4">🎨</div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">Custom Interior Design</h3>
                <p className="text-gray-600">
                  Tailored interior solutions designed specifically for your space and preferences. Our design team works closely with clients to create stunning and functional interiors.
                </p>
              </div>
              <div className="bg-gray-50 p-8 rounded-lg text-center">
                <div className="text-5xl mb-4">🏢</div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">Commercial Projects</h3>
                <p className="text-gray-600">
                  From hotels and offices to retail spaces, we provide comprehensive furniture solutions for large-scale commercial projects with professional project management.
                </p>
              </div>
              <div className="bg-gray-50 p-8 rounded-lg text-center">
                <div className="text-5xl mb-4">🛋️</div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">Bespoke Furniture</h3>
                <p className="text-gray-600">
                  Unique, one-of-a-kind furniture pieces crafted to your exact specifications. We bring your vision to life with superior materials and expert craftsmanship.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center text-gray-900">Our Leadership Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, idx) => (
                <div key={idx} className="bg-white rounded-lg shadow-md overflow-hidden text-center">
                  <div className="bg-gradient-to-r from-amber-400 to-amber-600 py-12">
                    <div className="text-6xl">{member.image}</div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900">{member.name}</h3>
                    <p className="text-amber-600 font-semibold mb-3">{member.role}</p>
                    <p className="text-gray-600">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-4 bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-5xl font-bold mb-2">500+</div>
                <p className="text-gray-300">Satisfied Clients</p>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">1000+</div>
                <p className="text-gray-300">Projects Completed</p>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">15+</div>
                <p className="text-gray-300">Years of Experience</p>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">100%</div>
                <p className="text-gray-300">Quality Guarantee</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">Ready to Transform Your Space?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Contact us today to discuss your furniture and interior design needs
            </p>
            <div className="flex justify-center gap-4">
              <a href="/contact" className="bg-amber-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-600 transition">
                Get in Touch
              </a>
              <a href="/shop" className="bg-gray-200 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 transition">
                View Collection
              </a>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
