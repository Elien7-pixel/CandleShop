import { useState } from 'react';
import ProductCard from './ProductCard';
import productsData from '../data/products.json';

export default function ProductGrid() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const { products, categories } = productsData;

  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 text-sm transition-colors ${
              selectedCategory === category
                ? 'bg-gold text-white'
                : 'bg-white text-text hover:bg-cream-dark'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-text-light">No products in this category.</p>
        </div>
      )}
    </div>
  );
}
