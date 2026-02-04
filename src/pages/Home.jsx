import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import productsData from '../data/products.json';
import logo from '../assets/logo.svg';

export default function Home() {
  const featuredProducts = productsData.products.slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left animate-fade-in">
              <p className="text-gold uppercase tracking-widest text-sm mb-4">Handcrafted with love</p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold text-text leading-tight mb-6">
                Bring Warmth & Elegance to Your Home
              </h1>
              <p className="text-lg text-text-light mb-8 max-w-lg mx-auto lg:mx-0">
                Discover our collection of premium handcrafted candles, made with natural ingredients to create the perfect ambiance.
              </p>
              <Link to="/products" className="btn-gold inline-block">
                Shop Collection
              </Link>
            </div>

            <div className="flex justify-center animate-fade-in-delayed">
              <img
                src={logo}
                alt="J'aime la beauté"
                className="w-full max-w-sm lg:max-w-md logo-blend"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-display font-semibold text-center mb-10">
            Featured Candles
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map((product, index) => (
              <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/products" className="btn-outline inline-block">
              View All Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
