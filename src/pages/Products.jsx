import ProductGrid from '../components/ProductGrid';

export default function Products() {
  return (
    <div className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-display font-semibold text-center mb-10">
          Our Collection
        </h1>
        <ProductGrid />
      </div>
    </div>
  );
}
