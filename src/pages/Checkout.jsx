import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CheckoutForm from '../components/CheckoutForm';
import { CURRENCY } from '../config/contact';

export default function Checkout() {
  const { items, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="py-16 lg:py-24">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h1 className="text-2xl font-display font-semibold mb-4">
            Your cart is empty
          </h1>
          <p className="text-text-light mb-8">
            Add some candles to your cart before checking out.
          </p>
          <Link to="/" className="btn-gold inline-block">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 lg:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-display font-semibold mb-8 text-center">
          Checkout
        </h1>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="order-2 lg:order-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold font-display mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-text truncate">
                        {item.name}
                      </h4>
                      <p className="text-sm text-text-light">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        {CURRENCY.symbol}
                        {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-cream-dark pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium">Total</span>
                  <span className="text-2xl font-semibold text-gold">
                    {CURRENCY.symbol}{total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold font-display mb-6">
                Your Details
              </h2>
              <CheckoutForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
