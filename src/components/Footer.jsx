import { SHOP_INFO, CONTACT } from '../config/contact';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-cream-dark mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <h3 className="text-lg font-display font-semibold text-gold mb-1">
              {SHOP_INFO.name}
            </h3>
            <p className="text-sm text-text-light">{SHOP_INFO.address}</p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-text mb-2">Contact Us</h4>
            <div className="space-y-1 text-sm">
              <p>
                <a
                  href={`https://wa.me/${CONTACT.whatsapp.replace(/\+/g, '')}`}
                  className="text-text-light hover:text-gold transition-colors"
                >
                  WhatsApp: {CONTACT.whatsapp}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-text-light hover:text-gold transition-colors"
                >
                  {CONTACT.email}
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-cream-dark mt-8 pt-6 text-center text-xs text-text-light">
          {new Date().getFullYear()} {SHOP_INFO.name}
        </div>
      </div>
    </footer>
  );
}
