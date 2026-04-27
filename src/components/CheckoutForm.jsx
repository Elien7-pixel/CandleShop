import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { CONTACT, CURRENCY, SHOP_INFO } from '../config/contact';

export default function CheckoutForm() {
  const { items, total, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formatOrderMessage = () => {
    const orderItems = items
      .map(
        (item) =>
          `- ${item.name} x${item.quantity} @ ${CURRENCY.symbol}${item.price.toFixed(2)} = ${CURRENCY.symbol}${(item.price * item.quantity).toFixed(2)}`
      )
      .join('\n');

    return `
New Order from ${SHOP_INFO.name}

Customer Details:
Name: ${formData.name}
Phone: ${formData.phone}
Address: ${formData.address}

Order Items:
${orderItems}

Total: ${CURRENCY.symbol}${total.toFixed(2)}
    `.trim();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = formatOrderMessage();
    const whatsappNumber = CONTACT.whatsapp.replace(/\D/g, '');
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    setSubmitSuccess(true);
    clearCart();
  };

  const isFormValid = formData.name && formData.phone && formData.address;

  if (submitSuccess) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold font-display mb-4">
          Order Submitted
        </h2>
        <p className="text-text-light mb-6">
          Your order has been sent via WhatsApp. We will get back to you shortly.
        </p>
        <a href="/" className="btn-gold inline-block">
          Continue Shopping
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="input-field"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium mb-2">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="input-field"
        />
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium mb-2">
          Delivery Address
        </label>
        <textarea
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          rows={3}
          className="input-field resize-none"
        />
      </div>

      <div className="border-t border-cream-dark pt-6">
        <button
          type="submit"
          disabled={!isFormValid}
          className={`w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-lg font-medium transition-colors ${
            isFormValid
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
            aria-hidden="true"
          >
            <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.81 11.81 0 0 1 8.413 3.488 11.82 11.82 0 0 1 3.48 8.414c-.003 6.554-5.338 11.89-11.893 11.89a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.978-1.607zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.711.307 1.265.49 1.697.628.713.226 1.362.194 1.875.118.572-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413z" />
          </svg>
          Send Order via WhatsApp
        </button>
      </div>
    </form>
  );
}
