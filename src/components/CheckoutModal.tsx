import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { CheckoutFormData } from '../types';
import { X, MessageCircle, ArrowLeft, CheckCircle, ShieldCheck, Truck } from 'lucide-react';

interface CheckoutModalProps {
  onOrderCompleted?: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ onOrderCompleted }) => {
  const {
    items,
    totalCount,
    pricedTotal,
    hasUnpricedItems,
    isCheckoutOpen,
    closeCheckout,
    openCart,
    clearCart,
  } = useCart();

  const [formData, setFormData] = useState<CheckoutFormData>({
    customerName: '',
    phone: '',
    city: 'Lahore',
    address: '',
    notes: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [orderSent, setOrderSent] = useState(false);

  if (!isCheckoutOpen) return null;

  const validate = (): boolean => {
    const errors: Record<string, string> = {};
    if (!formData.customerName.trim()) {
      errors.customerName = 'Please enter your full name.';
    }
    if (!formData.phone.trim()) {
      errors.phone = 'Please provide your mobile or WhatsApp number.';
    } else if (formData.phone.replace(/[^0-9]/g, '').length < 10) {
      errors.phone = 'Please enter a valid phone number (e.g. 0300 1234567).';
    }
    if (!formData.city.trim()) {
      errors.city = 'Please specify your city.';
    }
    if (!formData.address.trim()) {
      errors.address = 'Please enter your complete delivery address.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCompleteOrderOnWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Build the URL-encoded WhatsApp message
    const messageLines: string[] = [
      `*NEW SHAWL ORDER — ITTIFAQ HANDICRAFT*`,
      `---------------------------------------`,
      `*CUSTOMER DETAILS:*`,
      `• Name: ${formData.customerName.trim()}`,
      `• Phone/WhatsApp: ${formData.phone.trim()}`,
      `• City: ${formData.city.trim()}`,
      `• Delivery Address: ${formData.address.trim()}`,
    ];

    if (formData.notes && formData.notes.trim()) {
      messageLines.push(`• Special Notes: ${formData.notes.trim()}`);
    }

    messageLines.push(`---------------------------------------`);
    messageLines.push(`*ORDER ITEMS (${totalCount} item${totalCount === 1 ? '' : 's'}):*`);

    items.forEach((item, index) => {
      const unit = item.price !== null ? `PKR ${item.price.toLocaleString()}` : 'Price on request';
      const subtotal = item.price !== null ? `PKR ${(item.price * item.quantity).toLocaleString()}` : 'Price on request';
      messageLines.push(`${index + 1}. *${item.name}*`);
      messageLines.push(`   - Qty: ${item.quantity}`);
      messageLines.push(`   - Unit Price: ${unit}`);
      messageLines.push(`   - Line Total: ${subtotal}`);
      if (item.variant) {
        messageLines.push(`   - Style/Variant: ${item.variant}`);
      }
    });

    messageLines.push(`---------------------------------------`);
    if (pricedTotal > 0) {
      messageLines.push(`*Estimated Order Subtotal:* PKR ${pricedTotal.toLocaleString()}`);
    }
    if (hasUnpricedItems) {
      messageLines.push(`*(Contains bespoke unpriced items — kindly quote final total with delivery)*`);
    }
    messageLines.push(`• Nationwide Delivery: Across Pakistan`);
    messageLines.push(`---------------------------------------`);
    messageLines.push(`Assalam-o-Alaikum! I have placed this order on your website. Please confirm availability, delivery timeline, and payment procedure. JazakAllah.`);

    const encodedText = encodeURIComponent(messageLines.join('\n'));
    const whatsappUrl = `https://wa.me/923443015624?text=${encodedText}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setOrderSent(true);

    if (onOrderCompleted) {
      onOrderCompleted();
    }
  };

  const handleFinishAndClear = () => {
    clearCart();
    setOrderSent(false);
    closeCheckout();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#302923]/70 backdrop-blur-xs transition-opacity"
        onClick={closeCheckout}
      />

      <div className="min-h-full flex items-center justify-center p-3 sm:p-6 relative">
        <div className="w-full max-w-2xl bg-[#FAF6F0] rounded-sm shadow-2xl border border-[#DCC8A5] overflow-hidden my-6">
          
          {/* Header */}
          <div className="px-5 py-4 bg-[#F6F0E7] border-b border-[#E2D6C6] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  closeCheckout();
                  openCart();
                }}
                className="p-1.5 text-[#73685E] hover:text-[#482020] hover:bg-[#EAE0D1] rounded-xs transition-colors cursor-pointer"
                title="Back to Bag"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <h2 className="font-editorial text-lg text-[#302923]">Order Checkout & Delivery</h2>
                <p className="text-[11px] text-[#73685E]">
                  Direct WhatsApp Handoff to Ittifaq Handicraft (03443015624)
                </p>
              </div>
            </div>

            <button
              onClick={closeCheckout}
              className="p-2 text-[#73685E] hover:text-[#482020] rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {orderSent ? (
            /* Post-dispatch confirmation inside modal */
            <div className="p-6 sm:p-8 text-center space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#25D366]/15 text-[#075E54] flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-[#25D366]" />
              </div>
              <h3 className="font-editorial text-xl sm:text-2xl text-[#302923]">
                Order Dispatched to WhatsApp!
              </h3>
              <p className="text-xs text-[#5C5046] max-w-md mx-auto leading-relaxed">
                Your order details and delivery information have been prepared and sent to Ittifaq Handicraft on WhatsApp at <strong className="text-[#482020]">03443015624</strong>. Our team will confirm stock availability and dispatch time immediately.
              </p>

              <div className="p-4 bg-[#F6F0E7] border border-[#E2D6C6] rounded-xs max-w-md mx-auto text-left text-xs space-y-1.5">
                <div className="font-semibold text-[#482020] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#482020]" />
                  What Happens Next?
                </div>
                <p className="text-[11px] text-[#73685E]">
                  1. Our artisan representative reviews your order on WhatsApp.
                </p>
                <p className="text-[11px] text-[#73685E]">
                  2. We confirm parcel delivery address and tracking details.
                </p>
                <p className="text-[11px] text-[#73685E]">
                  3. Safe cash-on-delivery or direct bank transfer confirmation.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  type="button"
                  onClick={handleFinishAndClear}
                  className="px-6 py-2.5 bg-[#482020] hover:bg-[#371818] text-white text-xs font-semibold rounded-xs transition-colors cursor-pointer"
                >
                  Done & Clear Cart
                </button>
                <button
                  type="button"
                  onClick={() => setOrderSent(false)}
                  className="px-6 py-2.5 border border-[#DCC8A5] text-[#483E36] hover:bg-[#EFE5D8] text-xs font-medium rounded-xs transition-colors cursor-pointer"
                >
                  Review Order Form Again
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleCompleteOrderOnWhatsApp} className="p-5 sm:p-6 space-y-6">
              
              {/* Top Banner Notice */}
              <div className="p-3 bg-[#EFE5D8]/80 border border-[#DCC8A5] rounded-xs flex items-start gap-2.5 text-xs text-[#483E36]">
                <Truck className="w-4 h-4 text-[#482020] shrink-0 mt-0.5" />
                <div className="text-[11px] leading-relaxed">
                  <strong>Cash on Delivery & Secure Transfer across Pakistan.</strong> Fill your delivery details below. Clicking <em>“Complete Order on WhatsApp”</em> will send your order directly to our official business WhatsApp (<strong>03443015624</strong>).
                </div>
              </div>

              {/* Order Summary Snapshot */}
              <div className="bg-[#F6F0E7] p-4 rounded-xs border border-[#E2D6C6] space-y-3">
                <div className="flex justify-between items-center text-xs font-semibold text-[#302923] border-b border-[#E2D6C6] pb-2">
                  <span>Selected Shawls ({totalCount})</span>
                  <span>Line Total</span>
                </div>

                <div className="max-h-40 overflow-y-auto divide-y divide-[#EADFCF] pr-1">
                  {items.map((item) => (
                    <div key={item.id} className="py-2 first:pt-0 flex items-center justify-between text-xs">
                      <div className="min-w-0 pr-2">
                        <p className="font-medium text-[#302923] truncate">{item.name}</p>
                        <p className="text-[10px] text-[#73685E]">
                          Qty: {item.quantity} {item.variant ? `• ${item.variant}` : ''}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        {item.price !== null ? (
                          <span className="font-bold text-[#482020]">
                            PKR {(item.price * item.quantity).toLocaleString()}
                          </span>
                        ) : (
                          <span className="text-[10px] italic text-[#73685E]">Price on request</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#E2D6C6] pt-2 flex justify-between items-baseline">
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
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <h3 className="font-editorial text-sm font-semibold text-[#302923] border-b border-[#E2D6C6] pb-1">
                  Delivery Details (Pakistan)
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-medium text-[#483E36] mb-1">
                      Full Name <span className="text-[#B43434]">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      placeholder="e.g. Tariq Mehmood"
                      className={`w-full px-3 py-2 text-xs bg-white border ${
                        formErrors.customerName ? 'border-[#B43434]' : 'border-[#DCC8A5]'
                      } rounded-xs text-[#302923] focus:outline-none focus:ring-1 focus:ring-[#482020]`}
                    />
                    {formErrors.customerName && (
                      <p className="text-[10px] text-[#B43434] mt-0.5">{formErrors.customerName}</p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-xs font-medium text-[#483E36] mb-1">
                      WhatsApp / Phone Number <span className="text-[#B43434]">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 0300 1234567"
                      className={`w-full px-3 py-2 text-xs bg-white border ${
                        formErrors.phone ? 'border-[#B43434]' : 'border-[#DCC8A5]'
                      } rounded-xs text-[#302923] focus:outline-none focus:ring-1 focus:ring-[#482020]`}
                    />
                    {formErrors.phone && (
                      <p className="text-[10px] text-[#B43434] mt-0.5">{formErrors.phone}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* City */}
                  <div>
                    <label className="block text-xs font-medium text-[#483E36] mb-1">
                      City <span className="text-[#B43434]">*</span>
                    </label>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-white border border-[#DCC8A5] rounded-xs text-[#302923] focus:outline-none focus:ring-1 focus:ring-[#482020]"
                    >
                      <option value="Lahore">Lahore</option>
                      <option value="Karachi">Karachi</option>
                      <option value="Islamabad">Islamabad</option>
                      <option value="Rawalpindi">Rawalpindi</option>
                      <option value="Peshawar">Peshawar</option>
                      <option value="Faisalabad">Faisalabad</option>
                      <option value="Multan">Multan</option>
                      <option value="Quetta">Quetta</option>
                      <option value="Sialkot">Sialkot</option>
                      <option value="Gujranwala">Gujranwala</option>
                      <option value="Hyderabad">Hyderabad</option>
                      <option value="Abbottabad">Abbottabad</option>
                      <option value="Other">Other City (specify in address)</option>
                    </select>
                  </div>

                  {/* Complete Delivery Address */}
                  <div>
                    <label className="block text-xs font-medium text-[#483E36] mb-1">
                      Delivery Street Address <span className="text-[#B43434]">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="House/Plot #, Street, Area, Sector"
                      className={`w-full px-3 py-2 text-xs bg-white border ${
                        formErrors.address ? 'border-[#B43434]' : 'border-[#DCC8A5]'
                      } rounded-xs text-[#302923] focus:outline-none focus:ring-1 focus:ring-[#482020]`}
                    />
                    {formErrors.address && (
                      <p className="text-[10px] text-[#B43434] mt-0.5">{formErrors.address}</p>
                    )}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-xs font-medium text-[#483E36] mb-1">
                    Special Instructions / Notes <span className="text-[#73685E]">(Optional)</span>
                  </label>
                  <textarea
                    rows={2}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="e.g., Preferred delivery timing, gift packaging, urgent dispatch..."
                    className="w-full px-3 py-2 text-xs bg-white border border-[#DCC8A5] rounded-xs text-[#302923] focus:outline-none focus:ring-1 focus:ring-[#482020]"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 border-t border-[#E2D6C6] flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => {
                    closeCheckout();
                    openCart();
                  }}
                  className="text-xs text-[#73685E] hover:text-[#482020] underline underline-offset-2 cursor-pointer order-2 sm:order-1"
                >
                  Return to Shopping Bag
                </button>

                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#482020] hover:bg-[#371818] text-white text-xs font-semibold rounded-xs shadow-md transition-colors cursor-pointer order-1 sm:order-2"
                >
                  <MessageCircle className="w-4 h-4 text-[#DCC8A5]" />
                  <span>Complete Order on WhatsApp</span>
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};
