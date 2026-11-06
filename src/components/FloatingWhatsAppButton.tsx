import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { buildWhatsAppInquiryUrl } from '../data/config';
import { useCart } from '../context/CartContext';

export const FloatingWhatsAppButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const { isCartOpen, isCheckoutOpen } = useCart();
  const inquiry = buildWhatsAppInquiryUrl();

  // Hide when cart drawer or checkout modal is active to prevent obstruction
  if (isCartOpen || isCheckoutOpen) return null;

  return (
    <aside
      aria-label="WhatsApp quick contact"
      className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-40 flex items-center gap-2 select-none"
    >
      {/* Optional Dismissible Quick Hint */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-[#FAF6F0] text-[#302923] text-xs py-2 px-3.5 border border-[#DCC8A5] rounded-xs shadow-md animate-fadeIn">
          <span>Inquire &amp; Order on WhatsApp (03443015624)</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-[#73685E] hover:text-[#302923] p-0.5 cursor-pointer"
            aria-label="Dismiss message"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={inquiry.url}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        className="group flex items-center gap-2 p-3 sm:px-4 sm:py-3 bg-[#482020] hover:bg-[#371818] text-white rounded-full sm:rounded-xs shadow-lg border border-[#DCC8A5]/40 transition-all hover:scale-103 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DCC8A5]"
        aria-label="Chat with Ittifaq Handicraft on WhatsApp at 03443015624"
        title="Chat on WhatsApp: 03443015624"
      >
        <MessageCircle className="w-5 h-5 text-[#DCC8A5]" />
        <span className="hidden sm:inline font-sans font-medium text-xs tracking-wider uppercase">
          WhatsApp (03443015624)
        </span>
      </a>
    </aside>
  );
};
