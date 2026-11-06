import React from 'react';
import { PageRoute } from '../types';
import { BrandLogo } from './BrandLogo';
import { MessageCircle, ShieldCheck, Heart, Sparkles, Layers } from 'lucide-react';
import { buildWhatsAppInquiryUrl } from '../data/config';

interface AboutViewProps {
  onNavigate: (route: PageRoute) => void;
  onOpenWhatsAppModal: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({
  onNavigate,
  onOpenWhatsAppModal: _onOpenWhatsAppModal,
}) => {
  const inquiryData = buildWhatsAppInquiryUrl();

  const handleInquire = () => {
    window.open(inquiryData.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="py-12 md:py-20 bg-[#F6F0E7]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Editorial Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center mb-2">
            <BrandLogo size="lg" variant="burgundy" />
          </div>
          <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#73685E] block">
            About Ittifaq Handicraft
          </span>
          <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#302923] font-medium leading-tight">
            Curated Shawl Elegance in Pakistan
          </h1>
          <p className="text-base sm:text-lg text-[#483E36] max-w-2xl mx-auto leading-relaxed font-normal">
            A boutique house dedicated to bringing authentic winter and ceremonial shawls to men and women through transparent, direct communication.
          </p>
        </div>

        {/* Authentic Inventory Photography Showcase */}
        <div className="relative aspect-16/9 w-full rounded-sm overflow-hidden bg-[#EFE5D8] border border-[#E2D6C6]">
          <img
            src="/assets/aistudio/Grey_Woven_Shawl_with_Geometric_Trim_13037005.png"
            alt="Ittifaq Handicraft twill woven shawl with geometric border"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#302923]/70 via-transparent to-transparent flex items-end p-6">
            <p className="text-xs text-[#FAF6F0] italic font-editorial text-base">
              "Honoring the texture, borders, and quiet dignity of Pakistani shawls."
            </p>
          </div>
        </div>

        {/* Narrative Section */}
        <div className="bg-[#FAF6F0] p-6 sm:p-10 border border-[#E2D6C6] rounded-sm space-y-6">
          <h2 className="font-editorial text-2xl sm:text-3xl text-[#302923] font-medium">
            Our Business Approach
          </h2>
          
          <div className="space-y-4 text-sm sm:text-base text-[#483E36] leading-relaxed">
            <p>
              <strong>Ittifaq Handicraft</strong> connects discerning customers across Pakistan with authentic shawls suited for everyday winter warmth and festive wedding gatherings. Our inventory includes geometric border doshalas for men and intricate embroidered floral and motif wraps for women.
            </p>
            <p>
              We believe in honest, personal interactions. Rather than automated checkouts, we consult directly with you on WhatsApp (<strong>03443015624</strong>). You can request live unedited photos, verify fabric feel, check exact measurements, and confirm safe delivery to your city.
            </p>
          </div>

          <div className="p-4 bg-[#F6F0E7] border border-[#DCC8A5] rounded-xs space-y-2 text-xs text-[#73685E]">
            <div className="flex items-center gap-1.5 font-semibold text-[#482020]">
              <ShieldCheck className="w-4 h-4" />
              <span>Direct Shopping Process:</span>
            </div>
            <p>
              This website serves as our direct digital catalogue. Every shawl links directly to our verified business WhatsApp for ordering and inquiries with transparent personal assistance.
            </p>
          </div>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#FAF6F0] p-6 border border-[#E2D6C6] rounded-sm space-y-2.5">
            <Heart className="w-5 h-5 text-[#482020]" />
            <h3 className="font-editorial text-xl font-semibold text-[#302923]">Personal Consultation</h3>
            <p className="text-xs text-[#483E36] leading-relaxed">
              Every inquiry is answered directly by our representative via WhatsApp at 03443015624.
            </p>
          </div>

          <div className="bg-[#FAF6F0] p-6 border border-[#E2D6C6] rounded-sm space-y-2.5">
            <Layers className="w-5 h-5 text-[#482020]" />
            <h3 className="font-editorial text-xl font-semibold text-[#302923]">Men &amp; Women</h3>
            <p className="text-xs text-[#483E36] leading-relaxed">
              Balanced collections ranging from structured masculine winter doshalas to delicate embroidered feminine wraps.
            </p>
          </div>

          <div className="bg-[#FAF6F0] p-6 border border-[#E2D6C6] rounded-sm space-y-2.5">
            <Sparkles className="w-5 h-5 text-[#482020]" />
            <h3 className="font-editorial text-xl font-semibold text-[#302923]">Authentic Images</h3>
            <p className="text-xs text-[#483E36] leading-relaxed">
              Every photograph shown on this website is of actual Ittifaq Handicraft shawl stock.
            </p>
          </div>
        </div>

        {/* Direct Action Banner */}
        <div className="bg-[#482020] text-white p-8 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-editorial text-2xl font-medium">Ready to Explore the Shawls?</h3>
            <p className="text-xs text-[#EFE5D8]/80">Browse the latest catalogue or chat with our team on WhatsApp.</p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate({ name: 'shop' })}
              className="px-5 py-2.5 bg-white text-[#482020] text-xs font-semibold rounded-xs hover:bg-[#FAF6F0] cursor-pointer"
            >
              Browse Catalogue
            </button>
            <button
              onClick={handleInquire}
              className="px-5 py-2.5 bg-[#DCC8A5] text-[#302923] text-xs font-semibold rounded-xs hover:bg-white cursor-pointer inline-flex items-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#482020]" />
              <span>WhatsApp (03443015624)</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
