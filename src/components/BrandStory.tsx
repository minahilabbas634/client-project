import React from 'react';
import { PageRoute } from '../types';
import { ArrowRight, MessageCircle } from 'lucide-react';

interface BrandStoryProps {
  onNavigate: (route: PageRoute) => void;
}

export const BrandStory: React.FC<BrandStoryProps> = ({ onNavigate }) => {
  return (
    <section className="py-14 md:py-20 bg-[#FAF6F0] border-b border-[#E2D6C6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Authentic Shawl Textile Detail */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative aspect-[4/5] max-h-[500px] w-full overflow-hidden rounded-sm bg-[#EFE5D8] border border-[#E2D6C6] shadow-xs">
              <img
                src="/assets/aistudio/Ivory_Woven_Throw_with_Embroidered_Trim_d5885064.png"
                alt="Ittifaq Handicraft fine woven ivory shawl with embroidered trim and fringe detail"
                className="w-full h-full object-cover object-center"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#302923]/80 via-transparent to-transparent p-5 text-[#FAF6F0] text-xs">
                <span className="font-editorial italic text-base text-[#DCC8A5] block">
                  Authentic Weaving &amp; Needlework Trims
                </span>
                <span className="text-[11px] text-[#FAF6F0]/80">
                  Actual Ittifaq Handicraft inventory photography
                </span>
              </div>
            </div>
          </div>

          {/* Story Prose */}
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
            <div className="space-y-2">
              <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#73685E] block">
                Heritage &amp; Identity
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl text-[#302923] font-medium leading-tight">
                The Art of the Pakistani Shawl
              </h2>
            </div>

            {/* Honest heritage-inspired prose without invented historical claims */}
            <div className="space-y-3.5 text-sm sm:text-base text-[#483E36] leading-relaxed font-normal">
              <p>
                In Pakistan, a shawl carries a quiet sense of grace and stature. It is chosen with care for cold winter mornings, formal evening gatherings, and celebratory family weddings.
              </p>
              <p>
                <strong>Ittifaq Handicraft</strong> brings together a focused selection of authentic men's and women's shawls. From geometric border needlework on heavy winter wool to delicate botanical motifs on draped festive wraps, each piece reflects genuine textile aesthetics.
              </p>
              <p>
                We believe in straightforward, personal service. Rather than navigating complex checkout barriers, our customers connect directly with us on WhatsApp to inspect close-up photos, verify live stock, and receive prompt delivery anywhere in Pakistan.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onNavigate({ name: 'about' })}
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#482020] hover:text-[#371818] cursor-pointer group"
              >
                <span>Read More About Our Story</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>

              <a
                href="https://wa.me/923443015624"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#482020] hover:underline"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Chat on WhatsApp (03443015624)</span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
