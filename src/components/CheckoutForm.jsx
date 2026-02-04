import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { CONTACT, CURRENCY, SHOP_INFO } from '../config/contact';

export default function CheckoutForm() {
  const { items, total, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitMethod, setSubmitMethod] = useState(null);

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
Email: ${formData.email}
Phone: ${formData.phone}
Address: ${formData.address}

Order Items:
${orderItems}

Total: ${CURRENCY.symbol}${total.toFixed(2)}
    `.trim();
  };

  const handleWhatsApp = () => {
    const message = formatOrderMessage();
    const whatsappNumber = CONTACT.whatsapp.replace(/\+/g, '');
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    setSubmitMethod('whatsapp');
    setSubmitSuccess(true);
    clearCart();
  };

  const handleEmail = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const orderItemsHtml = items
      .map(
        (item) =>
          `${item.name} x${item.quantity} @ ${CURRENCY.symbol}${item.price.toFixed(2)} = ${CURRENCY.symbol}${(item.price * item.quantity).toFixed(2)}`
      )
      .join('\n');

    try {
      const response = await fetch(CONTACT.formSubmitUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: `New Order from ${SHOP_INFO.name}`,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          order_items: orderItemsHtml,
          total: `${CURRENCY.symbol}${total.toFixed(2)}`,
        }),
      });

      if (response.ok) {
        setSubmitMethod('email');
        setSubmitSuccess(true);
        clearCart();
      } else {
        alert('Failed to send order. Please try WhatsApp instead.');
      }
    } catch (error) {
      console.error('Email submission error:', error);
      alert('Failed to send order. Please try WhatsApp instead.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    formData.name && formData.email && formData.phone && formData.address;

  if (submitSuccess) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold font-display mb-4">
          Order Submitted
        </h2>
        <p className="text-text-light mb-6">
          {submitMethod === 'whatsapp'
            ? 'Your order has been sent via WhatsApp. We will get back to you shortly.'
            : 'Your order has been emailed to us. We will get back to you shortly.'}
        </p>
        <a href="/" className="btn-gold inline-block">
          Continue Shopping
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleEmail} className="space-y-6">
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
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
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
        <p className="text-sm text-text-light mb-4 text-center">
          Choose how to submit your order
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={handleWhatsApp}
            disabled={!isFormValid}
            className={`px-6 py-4 rounded-lg font-medium transition-colors ${
              isFormValid
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            WhatsApp
          </button>

          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className={`px-6 py-4 rounded-lg font-medium transition-colors ${
              isFormValid && !isSubmitting
                ? 'bg-gold text-white hover:bg-gold-dark'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? 'Sending...' : 'Email'}
          </button>
        </div>
      </div>
    </form>
  );
}
