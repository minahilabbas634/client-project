import React from 'react';
import { PageRoute } from '../types';
import { ArrowRight } from 'lucide-react';

interface CollectionDiscoveryProps {
  onNavigate: (route: PageRoute) => void;
}

export const CollectionDiscovery: React.FC<CollectionDiscoveryProps> = ({ onNavigate }) => {
  return (
    <section className="py-14 md:py-20 bg-[#FAF6F0] border-b border-[#E2D6C6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#73685E] block mb-2">
            Signature Curation
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl text-[#302923] font-medium [text-wrap:balance]">
            Men's &amp; Women's Shawl Collections
          </h2>
          <p className="text-sm text-[#483E36] mt-2 font-normal">
            Tailored specifically for traditional South Asian attire, combining authentic needlework borders with winter warmth.
          </p>
        </div>

        {/* Two distinct editorial panels with 4:5 real photography */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          
          {/* Panel 1: Women's Shawls */}
          <div 
            onClick={() => onNavigate({ name: 'womens' })}
            className="group relative bg-[#F6F0E7] border border-[#E2D6C6] rounded-sm overflow-hidden flex flex-col justify-between cursor-pointer transition-all hover:border-[#DCC8A5] shadow-xs"
          >
            <div className="aspect-[4/5] w-full overflow-hidden bg-[#EFE5D8] relative">
              <img
                src="/assets/aistudio/Magenta_Embroidered_Black_Draped_Textile_6d21603b.png"
                alt="Ittifaq Handicraft women's embroidered black shawl with magenta geometric needlework"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-103"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#302923]/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
            </div>

            <div className="p-6 md:p-8 flex flex-col justify-between flex-1 bg-[#FAF6F0]">
              <div className="space-y-2">
                <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#73685E]">
                  Embroidered, Floral &amp; Festive
                </span>
                <h3 className="font-editorial text-2xl sm:text-3xl text-[#302923] font-medium group-hover:text-[#482020] transition-colors">
                  Women's Shawls
                </h3>
                <p className="text-xs sm:text-sm text-[#483E36] line-clamp-2 leading-relaxed">
                  Botanical tulip borders, all-over magenta diamond patterns, and delicate silver-white floral booti motifs designed for festive gatherings.
                </p>
              </div>

              <div className="pt-5 mt-4 border-t border-[#E2D6C6] flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#482020]">
                <span>Explore Women's Collection (3 Styles)</span>
                <span className="p-1.5 rounded-full bg-[#EFE5D8] group-hover:bg-[#482020] group-hover:text-white transition-colors">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>

          {/* Panel 2: Men's Shawls */}
          <div 
            onClick={() => onNavigate({ name: 'mens' })}
            className="group relative bg-[#F6F0E7] border border-[#E2D6C6] rounded-sm overflow-hidden flex flex-col justify-between cursor-pointer transition-all hover:border-[#DCC8A5] shadow-xs"
          >
            <div className="aspect-[4/5] w-full overflow-hidden bg-[#EFE5D8] relative">
              <img
                src="/assets/aistudio/Black_Shawls_with_Embroidered_Borders_bfff21eb.png"
                alt="Ittifaq Handicraft men's black winter shawls with traditional embroidered borders"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-103"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#302923]/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
            </div>

            <div className="p-6 md:p-8 flex flex-col justify-between flex-1 bg-[#FAF6F0]">
              <div className="space-y-2">
                <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#73685E]">
                  Winter Twill &amp; Heavyweight Wools
                </span>
                <h3 className="font-editorial text-2xl sm:text-3xl text-[#302923] font-medium group-hover:text-[#482020] transition-colors">
                  Men's Shawls &amp; Doshalas
                </h3>
                <p className="text-xs sm:text-sm text-[#483E36] line-clamp-2 leading-relaxed">
                  Classic black winter doshalas with multi-tone borders, heather grey twill wraps, and warm ivory geometric shawls for distinguished winter wear.
                </p>
              </div>

              <div className="pt-5 mt-4 border-t border-[#E2D6C6] flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#482020]">
                <span>Explore Men's Collection (3 Styles)</span>
                <span className="p-1.5 rounded-full bg-[#EFE5D8] group-hover:bg-[#482020] group-hover:text-white transition-colors">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
