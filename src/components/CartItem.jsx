import { useCart } from '../context/CartContext';
import { CURRENCY } from '../config/contact';

export default function CartItem({ item }) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex gap-4 p-3 bg-cream rounded-lg">
      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-text truncate">{item.name}</h4>
        <p className="text-sm text-gold font-medium">
          {CURRENCY.symbol}{item.price.toFixed(2)}
        </p>

        <div className="flex items-center gap-3 mt-2">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="w-7 h-7 flex items-center justify-center rounded border border-cream-dark hover:bg-white transition-colors text-sm"
          >
            -
          </button>
          <span className="w-6 text-center text-sm">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="w-7 h-7 flex items-center justify-center rounded border border-cream-dark hover:bg-white transition-colors text-sm"
          >
            +
          </button>
        </div>
      </div>

      <button
        onClick={() => removeItem(item.id)}
        className="text-xs text-text-light hover:text-red-500 transition-colors self-start"
      >
        Remove
      </button>
    </div>
  );
}
