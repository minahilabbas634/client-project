import React from 'react';
import { PageRoute } from '../types';
import { ArrowRight, Sparkles } from 'lucide-react';

interface ShopByCategorySectionProps {
  onNavigate: (route: PageRoute) => void;
}

export const ShopByCategorySection: React.FC<ShopByCategorySectionProps> = ({ onNavigate }) => {
  const categories = [
    {
      id: 'traditional',
      route: { name: 'traditional' } as PageRoute,
      title: 'Traditional & Embroidered',
      count: '3 Shawls',
      image: '/assets/aistudio/Embroidered_Ivory_Shawl_with_Floral_Border_d80124fa.png',
      tag: 'Handicraft & Needlework',
      description: 'Intricate botanical tulip borders, vibrant geometric magenta patterns, and traditional border bands.',
    },
    {
      id: 'winter',
      route: { name: 'winter' } as PageRoute,
      title: 'Winter Shawls & Doshalas',
      count: '2 Shawls',
      image: '/assets/aistudio/Black_Shawls_with_Embroidered_Borders_bfff21eb.png',
      tag: 'Heavyweight Warmth',
      description: 'Heavyweight pure wool and twill weaves with classic tribal selvedge borders, tailored for winter weather.',
    },
    {
      id: 'fashion',
      route: { name: 'fashion' } as PageRoute,
      title: 'Contemporary & Festive',
      count: '1 Shawl',
      image: '/assets/aistudio/Embroidered_Black_Draped_Shawl_d6f0af87.png',
      tag: 'Evening & Ceremonial',
      description: 'Draped black shawl adorned with silver-white floral booti motifs along diagonal vines for weddings and formal galas.',
    },
  ];

  return (
    <section className="py-14 md:py-20 bg-[#FAF6F0] border-b border-[#E2D6C6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2 max-w-xl">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#73685E] block">
              Curated Craftsmanship
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#302923] font-medium [text-wrap:balance]">
              Shop by Shawl Category
            </h2>
            <p className="text-sm text-[#483E36] font-normal">
              Explore our three core categories supported by our actual authentic Pakistani inventory.
            </p>
          </div>

          <button
            onClick={() => onNavigate({ name: 'shop' })}
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#482020] hover:text-[#371818] cursor-pointer self-start md:self-auto group"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* 3 Supported Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onNavigate(cat.route)}
              className="group flex flex-col bg-[#F6F0E7] border border-[#E2D6C6] rounded-sm overflow-hidden cursor-pointer transition-all hover:border-[#DCC8A5] hover:shadow-xs"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onNavigate(cat.route);
                }
              }}
            >
              {/* 4:5 Portrait Image Display */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#EFE5D8]">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-103"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-[#FAF6F0]/95 backdrop-blur-xs px-2.5 py-1 text-[11px] font-medium text-[#482020] border border-[#E2D6C6] rounded-xs shadow-2xs">
                  {cat.tag}
                </div>
                <div className="absolute top-3 right-3 bg-[#302923]/80 backdrop-blur-xs px-2 py-0.5 text-[10px] text-white rounded-xs">
                  {cat.count}
                </div>
              </div>

              {/* Category Details */}
              <div className="p-5 flex flex-col justify-between flex-1 space-y-3 bg-[#FAF6F0]">
                <div className="space-y-1.5">
                  <h3 className="font-editorial text-xl font-medium text-[#302923] group-hover:text-[#482020] transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-[#483E36] leading-relaxed line-clamp-2">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E2D6C6] flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#482020]">
                  <span>Explore Shawls</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
