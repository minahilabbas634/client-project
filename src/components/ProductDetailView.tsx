import React, { useState } from 'react';
import { Product, PageRoute } from '../types';
import {
  MessageCircle,
  ArrowLeft,
  Share2,
  Check,
  ShieldCheck,
  Ruler,
  Sparkles,
  Layers,
  ImageOff,
  ShoppingBag,
  Plus,
  Minus,
} from 'lucide-react';
import { buildWhatsAppInquiryUrl, getWhatsAppConfig } from '../data/config';
import { getRelatedProducts } from '../data/products';
import { ProductCard } from './ProductCard';
import { useCart } from '../context/CartContext';

interface ProductDetailViewProps {
  product: Product;
  onNavigate: (route: PageRoute) => void;
  onSelectProduct: (product: Product) => void;
  onOpenWhatsAppModal?: () => void;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  onNavigate,
  onSelectProduct,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const { addToCart, openCart } = useCart();
  const whatsAppConfig = getWhatsAppConfig();
  const relatedProducts = getRelatedProducts(product.id, 3);

  const activeImage = product.images[selectedImageIndex] || product.images[0] || '';

  const inquiryData = buildWhatsAppInquiryUrl(
    product.name,
    product.colours?.[0],
    product.price ? product.price * quantity : null,
    undefined,
    product.categoryLabel
  );

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2200);
  };

  const handleWhatsAppOrder = () => {
    const text = product.price !== null
      ? `Assalam-o-Alaikum Ittifaq Handicraft, I am interested in purchasing ${quantity}x "${product.name}" (Total: PKR ${(product.price * quantity).toLocaleString()}). Please confirm stock and delivery timeline.`
      : `Assalam-o-Alaikum Ittifaq Handicraft, I am inquiring about "${product.name}" (Quantity: ${quantity}). Please provide price and availability.`;
    window.open(`https://wa.me/923443015624?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  const handleShare = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2500);
      }
    } catch {
      // Ignore clipboard failure
    }
  };

  return (
    <div className="py-6 sm:py-10 md:py-14 bg-[#F6F0E7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb & Back */}
        <div className="flex items-center justify-between gap-4 mb-6 sm:mb-8 pb-3 sm:pb-4 border-b border-[#E2D6C6]">
          <button
            onClick={() => onNavigate({ name: 'shop' })}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#482020] hover:text-[#371818] cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Shawls</span>
          </button>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 text-xs text-[#73685E] hover:text-[#302923] p-1 cursor-pointer"
            title="Copy share link"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-700" />
                <span className="text-emerald-700 font-medium">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Shawl</span>
              </>
            )}
          </button>
        </div>

        {/* Product Detail Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 mb-16 items-start">
          
          {/* Left Column: Image Gallery with 4:5 Portrait Frame */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            
            <div className="relative aspect-[4/5] w-full bg-[#EFE5D8] border border-[#E2D6C6] rounded-xs overflow-hidden shadow-sm flex items-center justify-center">
              {!imageError && activeImage ? (
                <img
                  src={activeImage}
                  alt={`${product.name}`}
                  onError={() => setImageError(true)}
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-[#73685E]">
                  <ImageOff className="w-10 h-10 mb-2 opacity-50 text-[#482020]" />
                  <span className="text-sm font-medium">Authentic Shawl Image</span>
                </div>
              )}

              <div className="absolute top-3 left-3 text-[11px] font-medium text-[#482020] bg-[#FAF6F0]/95 backdrop-blur-xs px-3 py-1 border border-[#E2D6C6] rounded-xs shadow-2xs">
                {product.gender === 'women' ? "Women's Collection" : "Men's Collection"}
              </div>
            </div>

            {/* Thumbnail switcher if multiple images exist */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => {
                  const isSelected = selectedImageIndex === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedImageIndex(idx);
                        setImageError(false);
                      }}
                      className={`relative w-20 h-24 rounded-xs overflow-hidden border-2 cursor-pointer transition-all shrink-0 ${
                        isSelected
                          ? 'border-[#482020] ring-1 ring-[#482020]/20'
                          : 'border-[#E2D6C6] hover:border-[#DCC8A5] opacity-80 hover:opacity-100'
                      }`}
                      aria-label={`View photo ${idx + 1}`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover object-center"
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  );
                })}
              </div>
            )}

            <div className="p-3.5 bg-[#FAF6F0] border border-[#E2D6C6] rounded-xs text-xs text-[#73685E] flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-[#482020] shrink-0" />
              <span>
                Actual stock photograph of Ittifaq Handicraft inventory. Request real-time video or high-resolution close-ups directly on WhatsApp (03443015624).
              </span>
            </div>

          </div>

          {/* Right Column: Information & Actions */}
          <div className="lg:col-span-5 flex flex-col justify-start space-y-6 bg-[#FAF6F0] p-5 sm:p-7 md:p-8 border border-[#E2D6C6] rounded-xs shadow-2xs">
            
            {/* Category & Title */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-[#73685E] uppercase tracking-wider font-medium">
                <span>{product.gender === 'women' ? "Women's Shawl" : "Men's Shawl"}</span>
                <span aria-hidden="true">·</span>
                <span>{product.categoryLabel}</span>
              </div>

              <h1 className="font-editorial text-2xl sm:text-3xl md:text-4xl text-[#302923] font-medium leading-tight">
                {product.name}
              </h1>
            </div>

            {/* Price Presentation */}
            <div className="pb-4 border-b border-[#E2D6C6]">
              {product.price !== null ? (
                <div className="space-y-1">
                  <div className="flex items-baseline gap-3">
                    <span className="font-editorial text-3xl sm:text-4xl font-semibold text-[#482020] tabular-nums">
                      PKR {product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-[#73685E] line-through tabular-nums">
                        PKR {product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#73685E]">
                    Nationwide standard dispatch across Pakistan.
                  </p>
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="font-editorial text-2xl font-medium text-[#482020] italic">
                    Price on Request
                  </div>
                  <p className="text-xs text-[#73685E]">
                    Bespoke artisanal needlework. Add to bag or inquire on WhatsApp for exact pricing.
                  </p>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <h2 className="text-xs font-semibold tracking-wider uppercase text-[#73685E]">
                Shawl Overview
              </h2>
              <p className="text-xs sm:text-sm text-[#483E36] leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Verified Specifications */}
            <div className="space-y-2.5 text-xs pt-2 border-t border-[#E2D6C6]">
              <h2 className="font-semibold uppercase tracking-wider text-[#73685E]">
                Specifications &amp; Weave
              </h2>
              
              <div className="bg-[#F6F0E7] p-3.5 border border-[#E2D6C6] rounded-xs space-y-2 text-[#483E36]">
                {product.fabric && (
                  <div className="flex items-start gap-2">
                    <Layers className="w-3.5 h-3.5 text-[#482020] shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-medium text-[#302923]">Fabric:</strong>{' '}
                      <span>{product.fabric}</span>
                    </div>
                  </div>
                )}

                {product.colours && product.colours.length > 0 && (
                  <div className="flex items-start gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#482020] shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-medium text-[#302923]">Color / Pattern:</strong>{' '}
                      <span>{product.colours.join(', ')}</span>
                    </div>
                  </div>
                )}

                {product.dimensions && (
                  <div className="flex items-start gap-2">
                    <Ruler className="w-3.5 h-3.5 text-[#482020] shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-medium text-[#302923]">Dimensions:</strong>{' '}
                      <span>{product.dimensions}</span>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#482020] shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-medium text-[#302923]">Availability:</strong>{' '}
                    <span>{product.availability}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quantity Selector & Shopping Actions */}
            <div className="pt-2 space-y-3.5">
              
              {/* Quantity row */}
              <div className="flex items-center gap-4">
                <span className="text-xs font-semibold text-[#483E36]">Quantity:</span>
                <div className="inline-flex items-center border border-[#DCC8A5] rounded-xs bg-[#F6F0E7]">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="w-8 h-8 flex items-center justify-center text-[#482020] hover:bg-[#EAE0D1] disabled:opacity-40 transition-colors cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center text-xs font-bold text-[#302923]">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center text-[#482020] hover:bg-[#EAE0D1] transition-colors cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
                {product.price !== null && quantity > 1 && (
                  <span className="text-xs text-[#73685E]">
                    Subtotal: <strong className="text-[#482020]">PKR {(product.price * quantity).toLocaleString()}</strong>
                  </span>
                )}
              </div>

              {/* Action Buttons: Add to Bag + Direct WhatsApp */}
              <div className="flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={`w-full flex items-center justify-center gap-2 py-3.5 px-6 text-xs sm:text-sm font-semibold rounded-xs transition-all shadow-sm cursor-pointer ${
                    addedSuccess
                      ? 'bg-[#25D366] text-white'
                      : 'bg-[#482020] hover:bg-[#371818] text-white'
                  }`}
                >
                  {addedSuccess ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added {quantity} Shawl{quantity > 1 ? 's' : ''} to Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-[#DCC8A5]" />
                      <span>Add to Shopping Bag ({quantity})</span>
                    </>
                  )}
                </button>

                {addedSuccess && (
                  <button
                    type="button"
                    onClick={openCart}
                    className="w-full text-center text-xs text-[#482020] font-semibold underline underline-offset-2 py-1 cursor-pointer"
                  >
                    View Bag & Proceed to Checkout →
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleWhatsAppOrder}
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#075E54] border border-[#25D366]/30 text-xs sm:text-sm font-semibold rounded-xs transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>Direct Order via WhatsApp (03443015624)</span>
                </button>
              </div>

              {/* Dynamic message transparency */}
              <div className="p-3 bg-[#EFE5D8] border border-[#DCC8A5]/60 rounded-xs text-xs text-[#483E36] space-y-1">
                <span className="font-semibold text-[#482020] block text-[11px] uppercase tracking-wider">
                  Direct WhatsApp Handoff:
                </span>
                <p className="italic font-serif text-[12px] text-[#302923]">
                  "{inquiryData.encodedMessage}"
                </p>
                <span className="text-[10px] text-[#73685E] block pt-1">
                  Recipient: {whatsAppConfig.displayNumber} (Ittifaq Handicraft)
                </span>
              </div>
            </div>

          </div>

        </div>

        {/* Related Shawls Section */}
        {relatedProducts.length > 0 && (
          <div className="pt-10 sm:pt-14 border-t border-[#E2D6C6]">
            <div className="flex items-end justify-between mb-6 sm:mb-8">
              <div>
                <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#73685E] block">
                  More From Ittifaq Handicraft
                </span>
                <h2 className="font-editorial text-2xl sm:text-3xl text-[#302923] font-medium">
                  Related Shawls
                </h2>
              </div>
              <button
                onClick={() => onNavigate({ name: 'shop' })}
                className="text-xs font-semibold uppercase tracking-wider text-[#482020] hover:underline cursor-pointer"
              >
                Browse All Shawls
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard
                  key={rel.id}
                  product={rel}
                  onSelect={onSelectProduct}
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
