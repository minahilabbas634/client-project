import React, { useState } from 'react';
import { Product } from '../types';
import { MessageCircle, ShoppingBag, Eye, ImageOff, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { buildWhatsAppInquiryUrl } from '../data/config';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onOpenWhatsAppModal?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
}) => {
  const [imageError, setImageError] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  const handleWhatsAppQuickInquire = (e: React.MouseEvent) => {
    e.stopPropagation();
    const inquiry = buildWhatsAppInquiryUrl(
      product.name,
      product.colours?.[0],
      product.price,
      undefined,
      product.categoryLabel
    );
    window.open(inquiry.url, '_blank', 'noopener,noreferrer');
  };

  const handleViewDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(product);
  };

  return (
    <article
      onClick={() => onSelect(product)}
      className="group flex flex-col bg-[#FAF6F0] border border-[#E2D6C6] rounded-xs overflow-hidden cursor-pointer transition-all hover:border-[#DCC8A5] hover:shadow-md"
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(product);
        }
      }}
      aria-label={`View details for ${product.name}`}
    >
      {/* 4:5 Portrait Image Container */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#EFE5D8]">
        {!imageError && product.images[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-103"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 text-[#73685E] bg-[#EFE5D8]">
            <ImageOff className="w-8 h-8 mb-2 opacity-50 text-[#482020]" />
            <span className="text-xs text-center font-medium">Authentic Shawl Image</span>
          </div>
        )}

        {/* Quiet unboxed audience & category indicator */}
        <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-[11px] font-medium text-[#482020] bg-[#FAF6F0]/95 backdrop-blur-xs px-2 py-0.5 sm:px-2.5 sm:py-1 border border-[#E2D6C6]/90 rounded-xs shadow-2xs">
          <span>{product.gender === 'women' ? "Women's" : product.gender === 'men' ? "Men's" : 'Unisex'}</span>
          <span aria-hidden="true" className="text-[#73685E]">·</span>
          <span className="text-[#73685E] font-normal truncate max-w-[90px] sm:max-w-none">{product.categoryLabel}</span>
        </div>

        {/* Quick WhatsApp icon floating on image */}
        <button
          type="button"
          onClick={handleWhatsAppQuickInquire}
          className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#FAF6F0]/95 hover:bg-white text-[#25D366] border border-[#E2D6C6] flex items-center justify-center shadow-xs transition-transform hover:scale-110 cursor-pointer"
          title="Direct WhatsApp Inquiry (03443015624)"
          aria-label={`Ask about ${product.name} on WhatsApp`}
        >
          <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#25D366]" />
        </button>
      </div>

      {/* Product Content & Typography */}
      <div className="p-3 sm:p-4.5 flex flex-col justify-between flex-1 space-y-2.5 sm:space-y-3 bg-[#FAF6F0]">
        <div className="space-y-1">
          <h3 className="font-editorial text-base sm:text-lg font-medium text-[#302923] group-hover:text-[#482020] transition-colors leading-snug line-clamp-2">
            {product.name}
          </h3>

          <p className="text-[11px] text-[#73685E] truncate">
            {product.fabric || (product.colours && product.colours[0]) || 'Handcrafted Drape'}
          </p>
        </div>

        {/* Pricing */}
        <div className="pt-2 border-t border-[#E2D6C6]/80 flex items-baseline justify-between">
          <div>
            {product.price !== null ? (
              <span className="text-xs sm:text-sm font-bold text-[#482020] tabular-nums">
                PKR {product.price.toLocaleString()}
              </span>
            ) : (
              <span className="text-[11px] sm:text-xs font-semibold text-[#482020] italic">
                Price on request
              </span>
            )}
          </div>
          <span className="text-[10px] text-[#73685E]">
            {product.availability}
          </span>
        </div>

        {/* Action Buttons: Add to Bag + View Details */}
        <div className="grid grid-cols-2 gap-1.5 sm:gap-2 pt-1">
          <button
            type="button"
            onClick={handleAddToCart}
            className={`flex items-center justify-center gap-1 sm:gap-1.5 py-2 px-2 text-[11px] font-semibold rounded-xs transition-colors cursor-pointer ${
              justAdded
                ? 'bg-[#25D366] text-white'
                : 'bg-[#482020] hover:bg-[#371818] text-white shadow-xs'
            }`}
            aria-label={`Add ${product.name} to bag`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span className="truncate">Added!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 text-[#DCC8A5] shrink-0" />
                <span className="truncate">Add to Bag</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleViewDetails}
            className="flex items-center justify-center gap-1 sm:gap-1.5 py-2 px-2 text-[11px] font-medium text-[#302923] bg-[#EFE5D8] hover:bg-[#E2D6C6] border border-[#E2D6C6] rounded-xs transition-colors cursor-pointer"
            aria-label={`View details of ${product.name}`}
          >
            <Eye className="w-3.5 h-3.5 text-[#482020] shrink-0" />
            <span className="truncate">Details</span>
          </button>
        </div>
      </div>
    </article>
  );
};
