# J'aime la beauté - Candle Shop

## Project Overview
E-commerce website for a candle shop. No payment gateway - orders are submitted via WhatsApp or Email (FormSubmit.co).

## Tech Stack
- React (Vite)
- Tailwind CSS v4
- React Router DOM

## Key Files

### Configuration
- `src/config/contact.js` - WhatsApp number, email, shop info (update for production)
- `src/data/products.json` - Product catalog (client edits this to add/update products)

### Components
- `src/components/Header.jsx` - Navigation with cart icon
- `src/components/Footer.jsx` - Contact info and location
- `src/components/Cart.jsx` - Slide-out cart drawer
- `src/components/CartItem.jsx` - Individual cart item with quantity controls
- `src/components/ProductCard.jsx` - Product display with add/quantity controls
- `src/components/ProductGrid.jsx` - Product grid with category filtering
- `src/components/CheckoutForm.jsx` - Customer details form with WhatsApp/Email submission
- `src/components/ScrollToTop.jsx` - Scrolls to top on route change

### Pages
- `src/pages/Home.jsx` - Hero section with logo + featured products
- `src/pages/Products.jsx` - Full product catalog with filters
- `src/pages/Checkout.jsx` - Order summary and checkout form

### Styling
- `src/index.css` - Tailwind config, custom colors, animations

## Color Palette
- Gold (primary): `#C5A052`
- Gold light: `#E8D5A3`
- Gold dark: `#A88B3D`
- Cream (background): `#FDF8F3`
- Cream dark: `#F5E6D3`
- Text: `#4A4A4A`
- Text light: `#6B6B6B`

## Commands
```bash
npm install    # Install dependencies
npm run dev    # Start dev server
npm run build  # Build for production
```

## Adding Products
Edit `src/data/products.json`:
```json
{
  "id": "unique-id",
  "name": "Product Name",
  "description": "Description",
  "price": 199,
  "category": "Scented",
  "image": "https://image-url.com/photo.jpg",
  "inStock": true
}
```

Categories: `Scented`, `Decorative`, `Gift Sets`, `Seasonal`

## Order Flow
1. Customer adds items to cart
2. Proceeds to checkout
3. Fills in details (name, email, phone, address)
4. Chooses WhatsApp or Email
5. WhatsApp: Opens WhatsApp with pre-filled order
6. Email: Sends via FormSubmit.co (first submission requires email confirmation)
