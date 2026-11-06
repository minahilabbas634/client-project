import React from 'react';
import { PageRoute } from '../types';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { buildWhatsAppInquiryUrl } from '../data/config';

interface HeroSectionProps {
  onNavigate: (route: PageRoute) => void;
  onOpenWhatsAppModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigate,
  onOpenWhatsAppModal: _onOpenWhatsAppModal,
}) => {
  const inquiryData = buildWhatsAppInquiryUrl();

  const handleWhatsAppClick = () => {
    window.open(inquiryData.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="relative overflow-hidden border-b border-[#E2D6C6] bg-[#F6F0E7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6 lg:pr-4">
            
            <div className="space-y-3">
              <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#73685E] block">
                Ittifaq Handicraft · Pakistani Shawl House
              </span>

              <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#302923] font-medium leading-[1.08] tracking-tight [text-wrap:balance]">
                A Timeless Layer of Elegance
              </h1>
            </div>

            <p className="text-base sm:text-lg text-[#483E36] leading-relaxed max-w-xl font-normal">
              Discover authentic men's and women's shawls for every style, season, and occasion. Hand-embroidery, rich winter twills, and traditional drapes crafted for timeless warmth.
            </p>

            {/* Clear Collection Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate({ name: 'womens' })}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-[#482020] text-white hover:bg-[#371818] text-xs font-semibold uppercase tracking-wider rounded-xs transition-all shadow-sm cursor-pointer whitespace-nowrap shrink-0 group"
              >
                <span>Women's Shawls</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 text-[#DCC8A5]" />
              </button>

              <button
                onClick={() => onNavigate({ name: 'mens' })}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-[#EFE5D8] text-[#302923] hover:bg-[#E2D6C6] border border-[#E2D6C6] text-xs font-semibold uppercase tracking-wider rounded-xs transition-all cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>Men's Shawls</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#482020]" />
              </button>

              <button
                onClick={handleWhatsAppClick}
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 bg-[#FAF6F0] text-[#482020] hover:bg-[#FAF6F0]/80 border border-[#DCC8A5] text-xs font-semibold uppercase tracking-wider rounded-xs transition-all cursor-pointer whitespace-nowrap shrink-0"
                title="Order on WhatsApp: 03443015624"
              >
                <MessageCircle className="w-4 h-4 text-[#482020]" />
                <span>WhatsApp Order</span>
              </button>
            </div>

            {/* Quick trust strip */}
            <div className="pt-6 border-t border-[#E2D6C6]/80 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-[#73685E]">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#482020]"></span>
                <span>Authentic Inventory Photography</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#482020]"></span>
                <span>Direct WhatsApp Inquiries (03443015624)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#482020]"></span>
                <span>Nationwide Pakistan Delivery</span>
              </div>
            </div>

          </div>

          {/* Right Column: Authentic Shawl Photography Display */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] max-h-[560px] mx-auto w-full overflow-hidden rounded-sm bg-[#EFE5D8] border border-[#E2D6C6] shadow-md flex items-center justify-center">
              <img
                src="/assets/aistudio/Embroidered_Ivory_Shawl_with_Floral_Border_d80124fa.png"
                alt="Ittifaq Handicraft authentic draped ivory shawl with tulip floral embroidery"
                className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
                referrerPolicy="no-referrer"
                loading="eager"
              />
              {/* Subtle caption overlay with mobile-friendly wrapping */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#302923]/90 via-[#302923]/40 to-transparent p-3 sm:p-5 flex flex-col sm:flex-row sm:items-end justify-between gap-2 text-[#FAF6F0]">
                <div className="min-w-0">
                  <span className="text-[10px] tracking-[0.2em] uppercase font-medium text-[#DCC8A5] block">
                    Featured Drape
                  </span>
                  <span className="font-editorial text-sm sm:text-lg italic font-normal line-clamp-1">
                    Ivory Floral Embroidered Shawl with Tulip Border
                  </span>
                </div>
                <button
                  onClick={() => onNavigate({ name: 'product-detail', slug: 'ivory-floral-embroidered-shawl-tulip-border' })}
                  className="self-start sm:self-auto text-[11px] sm:text-xs bg-[#FAF6F0] text-[#302923] hover:bg-[#DCC8A5] px-2.5 py-1 rounded-xs font-semibold cursor-pointer shrink-0"
                >
                  View Shawl
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
