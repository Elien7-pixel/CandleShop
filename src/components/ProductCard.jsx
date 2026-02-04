import { useCart } from '../context/CartContext';
import { CURRENCY } from '../config/contact';

export default function ProductCard({ product }) {
  const { items, addItem, updateQuantity } = useCart();

  const cartItem = items.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = () => {
    addItem(product);
  };

  return (
    <div className="card overflow-hidden group">
      <div className="aspect-square overflow-hidden bg-cream-dark">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-3 sm:p-5">
        <p className="text-xs text-text-light uppercase tracking-wide">
          {product.category}
        </p>
        <h3 className="text-sm sm:text-lg font-medium text-text mt-1 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-xs sm:text-sm text-text-light mt-1 sm:mt-2 line-clamp-2 hidden sm:block">
          {product.description}
        </p>

        <div className="mt-3 sm:mt-4">
          <span className="text-base sm:text-lg font-semibold text-gold block mb-2">
            {CURRENCY.symbol}{product.price.toFixed(2)}
          </span>

          {quantity > 0 ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(product.id, quantity - 1)}
                className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded border border-cream-dark hover:bg-cream transition-colors text-sm"
              >
                -
              </button>
              <span className="w-5 sm:w-6 text-center text-sm font-medium">{quantity}</span>
              <button
                onClick={() => updateQuantity(product.id, quantity + 1)}
                className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded border border-cream-dark hover:bg-cream transition-colors text-sm"
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-colors ${
                product.inStock
                  ? 'bg-gold text-white hover:bg-gold-dark'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              {product.inStock ? 'Add' : 'Sold Out'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
