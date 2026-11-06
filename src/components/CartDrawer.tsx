import React from 'react';
import { useCart } from '../context/CartContext';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, MessageCircle } from 'lucide-react';
import { PageRoute } from '../types';

interface CartDrawerProps {
  onNavigate: (route: PageRoute) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onNavigate }) => {
  const {
    items,
    totalCount,
    pricedTotal,
    hasUnpricedItems,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    openCheckout,
  } = useCart();

  if (!isCartOpen) return null;

  const handleProductClick = (slug: string) => {
    closeCart();
    onNavigate({ name: 'product-detail', slug });
  };

  const handleBrowseCollections = () => {
    closeCart();
    onNavigate({ name: 'shop' });
  };

  const handleProceedToCheckout = () => {
    openCheckout();
  };

  // Direct quick WhatsApp inquiry for full cart
  const handleDirectWhatsAppOrder = () => {
    const lines: string[] = [
      `Assalam-o-Alaikum Ittifaq Handicraft, I would like to order the following shawls from your website:`,
      '',
    ];

    items.forEach((item, idx) => {
      const priceText = item.price !== null ? `PKR ${item.price.toLocaleString()}` : `Price on request`;
      const subtotalText = item.price !== null ? `PKR ${(item.price * item.quantity).toLocaleString()}` : `Price on request`;
      lines.push(`${idx + 1}. *${item.name}*`);
      lines.push(`   - Quantity: ${item.quantity}`);
      lines.push(`   - Unit Price: ${priceText}`);
      lines.push(`   - Subtotal: ${subtotalText}`);
      lines.push(`   - Style/Variant: ${item.variant || 'Standard'}`);
      lines.push('');
    });

    if (pricedTotal > 0) {
      lines.push(`*Estimated Subtotal:* PKR ${pricedTotal.toLocaleString()}`);
    }
    if (hasUnpricedItems) {
      lines.push(`*(Note: Cart contains unpriced bespoke items. Please confirm total with custom pricing.)*`);
    }

    lines.push('');
    lines.push(`Please confirm availability, total payment, and delivery timeline to my address. Thank you.`);

    const encoded = encodeURIComponent(lines.join('\n'));
    window.open(`https://wa.me/923443015624?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#302923]/60 backdrop-blur-xs transition-opacity animate-fadeIn"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md sm:max-w-lg bg-[#FAF6F0] shadow-2xl flex flex-col border-l border-[#E2D6C6]">
          
          {/* Header */}
          <div className="px-5 py-4 border-b border-[#E2D6C6] bg-[#F6F0E7] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#482020] text-[#DCC8A5] flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-editorial text-lg font-medium text-[#302923]">Shopping Cart</h2>
                <p className="text-[11px] text-[#73685E]">
                  {totalCount === 0
                    ? 'Your bag is empty'
                    : `${totalCount} item${totalCount === 1 ? '' : 's'} selected`}
                </p>
              </div>
            </div>

            <button
              onClick={closeCart}
              className="p-2 text-[#73685E] hover:text-[#482020] hover:bg-[#EFE5D8] rounded-full transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Content */}
          {items.length === 0 ? (
            <div className="flex-1 px-6 py-12 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#EFE5D8] text-[#73685E] flex items-center justify-center mb-4">
                <ShoppingBag className="w-8 h-8 stroke-1" />
              </div>
              <h3 className="font-editorial text-xl text-[#302923] mb-2">Your Bag is Empty</h3>
              <p className="text-xs text-[#73685E] max-w-xs mb-6 leading-relaxed">
                Discover our curated collection of authentic Pakistani men’s and women’s shawls, winter weaves, and traditional embroidery.
              </p>
              <button
                onClick={handleBrowseCollections}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#482020] hover:bg-[#371818] text-white text-xs font-semibold rounded-xs transition-colors cursor-pointer shadow-sm"
              >
                <span>Explore Shawl Catalogue</span>
                <ArrowRight className="w-4 h-4 text-[#DCC8A5]" />
              </button>
            </div>
          ) : (
            <>
              {/* Item List */}
              <div className="flex-1 overflow-y-auto px-5 py-4 divide-y divide-[#EADFCF]">
                {items.map((item) => {
                  const lineTotal =
                    item.price !== null
                      ? (item.price * item.quantity).toLocaleString()
                      : null;

                  return (
                    <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex gap-4">
                      {/* Thumbnail Container (4:5 Aspect) */}
                      <div
                        onClick={() => handleProductClick(item.slug)}
                        className="w-20 h-25 sm:w-22 sm:h-28 aspect-[4/5] bg-[#EFE5D8] rounded-xs overflow-hidden shrink-0 border border-[#DCC8A5]/40 cursor-pointer relative group"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <button
                              onClick={() => handleProductClick(item.slug)}
                              className="text-left font-editorial text-sm font-medium text-[#302923] hover:text-[#482020] transition-colors line-clamp-2 leading-snug cursor-pointer"
                            >
                              {item.name}
                            </button>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-[#968A7E] hover:text-[#B43434] p-1 transition-colors cursor-pointer shrink-0"
                              title="Remove item"
                              aria-label={`Remove ${item.name} from cart`}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <p className="text-[11px] text-[#73685E] mt-0.5 truncate">
                            {item.categoryLabel}
                          </p>
                          {item.variant && (
                            <p className="text-[10px] text-[#968A7E] mt-0.5 truncate">
                              Style: {item.variant}
                            </p>
                          )}
                        </div>

                        {/* Price & Quantity Controls */}
                        <div className="pt-2 flex items-center justify-between gap-2">
                          {/* Quantity selector */}
                          <div className="inline-flex items-center border border-[#DCC8A5] rounded-xs bg-[#F6F0E7]">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-7 h-7 flex items-center justify-center text-[#482020] hover:bg-[#EAE0D1] transition-colors cursor-pointer"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center text-xs font-semibold text-[#302923]">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-7 h-7 flex items-center justify-center text-[#482020] hover:bg-[#EAE0D1] transition-colors cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          {/* Line price / subtotal */}
                          <div className="text-right">
                            {lineTotal !== null ? (
                              <div>
                                <span className="text-xs font-bold text-[#482020]">
                                  PKR {lineTotal}
                                </span>
                                {item.quantity > 1 && (
                                  <div className="text-[10px] text-[#73685E]">
                                    (PKR {item.price?.toLocaleString()} each)
                                  </div>
                                )}
                              </div>
                            ) : (
                              <span className="text-[11px] font-medium text-[#73685E] italic bg-[#EFE5D8] px-2 py-0.5 rounded-xs">
                                Price on request
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Order Summary Footer */}
              <div className="px-5 py-4 border-t border-[#E2D6C6] bg-[#F6F0E7] space-y-3">
                {/* Unpriced items notice */}
                {hasUnpricedItems && (
                  <div className="p-2.5 bg-[#FAF6F0] border border-[#DCC8A5]/60 rounded-xs text-[11px] text-[#483E36] leading-relaxed">
                    <span className="font-semibold text-[#482020]">Bespoke Items Note:</span>{' '}
                    Your cart includes handmade items with price on request. Final price will be confirmed directly on WhatsApp prior to order dispatch.
                  </div>
                )}

                {/* Totals */}
                <div className="space-y-1.5 text-xs text-[#483E36]">
                  <div className="flex justify-between">
                    <span>Total Selected Shawls</span>
                    <span className="font-medium text-[#302923]">{totalCount} item{totalCount === 1 ? '' : 's'}</span>
                  </div>

                  <div className="flex justify-between items-baseline pt-1 border-t border-[#E2D6C6]">
                    <span className="font-editorial text-sm font-semibold text-[#302923]">
                      Estimated Subtotal
                    </span>
                    <span className="font-bold text-base text-[#482020]">
                      {pricedTotal > 0
                        ? `PKR ${pricedTotal.toLocaleString()}`
                        : hasUnpricedItems
                        ? 'Price on Request'
                        : 'PKR 0'}
                    </span>
                  </div>
                  <div className="flex justify-between text-[10px] text-[#73685E]">
                    <span>Nationwide Delivery</span>
                    <span>Calculated at WhatsApp checkout</span>
                  </div>
                </div>

                {/* Primary Action Buttons */}
                <div className="pt-2 space-y-2">
                  <button
                    onClick={handleProceedToCheckout}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#482020] hover:bg-[#371818] text-white text-xs font-semibold rounded-xs transition-colors cursor-pointer shadow-sm"
                  >
                    <span>Proceed to Delivery & Checkout</span>
                    <ArrowRight className="w-4 h-4 text-[#DCC8A5]" />
                  </button>

                  <button
                    onClick={handleDirectWhatsAppOrder}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#075E54] border border-[#25D366]/30 text-xs font-semibold rounded-xs transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-[#25D366]" />
                    <span>Quick Order on WhatsApp (03443015624)</span>
                  </button>
                </div>

                {/* Drawer Footer Utility */}
                <div className="flex items-center justify-between pt-1 text-[11px] text-[#73685E]">
                  <button
                    onClick={handleBrowseCollections}
                    className="hover:text-[#482020] underline underline-offset-2 cursor-pointer"
                  >
                    Continue Shopping
                  </button>
                  <button
                    onClick={clearCart}
                    className="hover:text-[#B43434] transition-colors cursor-pointer"
                  >
                    Clear Bag
                  </button>
                </div>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
};
