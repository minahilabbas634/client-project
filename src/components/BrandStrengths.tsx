import React from 'react';
import { MessageSquareText, Layers, ShieldCheck, Sparkles } from 'lucide-react';

export const BrandStrengths: React.FC = () => {
  const strengths = [
    {
      icon: MessageSquareText,
      title: 'Direct WhatsApp Consult',
      description: 'Request real photos, video close-ups of the embroidery or weave, and measurement clarifications directly from our team before deciding.',
    },
    {
      icon: Layers,
      title: "Men's & Women's Cuts",
      description: 'Dedicated selections for both men and women, featuring full-cut doshalas, formal wraps, and delicately embroidered ceremonial shawls.',
    },
    {
      icon: Sparkles,
      title: 'Handicraft & Winter Focus',
      description: 'Curating traditional needlework patterns, seasonal winter wools, and festive trims suited for Pakistani climate and occasions.',
    },
    {
      icon: ShieldCheck,
      title: 'Transparent Ordering',
      description: 'No hidden checkout fees or automated confusion. We confirm item availability, dispatch address, and delivery timelines directly in chat.',
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-[#F6F0E7] border-b border-[#E2D6C6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#73685E] block mb-1.5">
            Confirmed Strengths
          </span>
          <h2 className="font-editorial text-2xl sm:text-3xl text-[#302923] font-medium">
            How We Serve Our Customers
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {strengths.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-[#FAF6F0] p-6 border border-[#E2D6C6] rounded-sm space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="w-9 h-9 rounded-xs bg-[#EFE5D8] flex items-center justify-center text-[#482020]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-editorial text-lg text-[#302923] font-semibold">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#483E36] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
