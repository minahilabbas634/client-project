import React from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingBag, ArrowRight, X } from 'lucide-react';

export const CartToast: React.FC = () => {
  const { toastMessage, dismissToast, openCart } = useCart();

  if (!toastMessage) return null;

  return (
    <aside
      role="status"
      aria-live="polite"
      className="fixed bottom-20 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-sm sm:max-w-md bg-[#302923] text-white p-3.5 rounded-xs shadow-2xl border border-[#DCC8A5]/40 flex items-center justify-between gap-3 animate-slideUp"
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="w-7 h-7 rounded-full bg-[#482020] text-[#DCC8A5] flex items-center justify-center shrink-0">
          <ShoppingBag className="w-3.5 h-3.5" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold text-[#F6F0E7] truncate">{toastMessage.title}</p>
          {toastMessage.subtitle && (
            <p className="text-[11px] text-[#DCC8A5] truncate">{toastMessage.subtitle}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={() => {
            dismissToast();
            openCart();
          }}
          className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-[#482020] hover:bg-[#5a2a2a] text-[#F6F0E7] text-[11px] font-semibold rounded-xs border border-[#DCC8A5]/30 transition-colors cursor-pointer"
        >
          <span>View Bag</span>
          <ArrowRight className="w-3 h-3 text-[#DCC8A5]" />
        </button>
        <button
          onClick={dismissToast}
          className="p-1 text-[#DCC8A5]/70 hover:text-white transition-colors cursor-pointer"
          aria-label="Dismiss toast"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
};
