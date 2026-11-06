import React from 'react';
import { MessageCircle, Search, CheckCircle2, Truck, ArrowUpRight } from 'lucide-react';

export const WhatsAppConversionSection: React.FC = () => {
  const whatsappUrl = "https://wa.me/923443015624?text=" + encodeURIComponent("Assalam-o-Alaikum! I am visiting the Ittifaq Handicraft website and would like to inquire about your shawls.");

  const steps = [
    {
      number: '01',
      icon: Search,
      title: 'Discover Your Shawl',
      desc: 'Browse through our catalogue of authentic Men\'s and Women\'s shawls, selecting your preferred style, weave, or border.',
    },
    {
      number: '02',
      icon: MessageCircle,
      title: 'One-Tap WhatsApp Order',
      desc: 'Tap the WhatsApp button on any shawl. Your message will be instantly prefilled with the exact piece name and availability request.',
    },
    {
      number: '03',
      icon: CheckCircle2,
      title: 'Personal Confirmation',
      desc: 'Our representative connects directly with you on WhatsApp (03443015624) to share close-up photos, price, and dispatch details.',
    },
    {
      number: '04',
      icon: Truck,
      title: 'Courier Delivery Across Pakistan',
      desc: 'Once confirmed, your selected shawl is carefully packaged and shipped to your doorstep anywhere in Pakistan.',
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-[#482020] text-[#FAF6F0] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12 md:mb-16">
          <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#DCC8A5] block">
            Direct &amp; Personal Shopping
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-medium [text-wrap:balance]">
            How WhatsApp Shopping Works
          </h2>
          <p className="text-sm sm:text-base text-[#EFE5D8]/80 leading-relaxed font-normal">
            Every inquiry at Ittifaq Handicraft is handled directly with personal care. Connect with us on WhatsApp at <strong>03443015624</strong>.
          </p>
        </div>

        {/* 4-Step Process Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="bg-[#371818]/90 border border-[#DCC8A5]/25 p-6 rounded-sm flex flex-col justify-between space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="font-editorial text-2xl text-[#DCC8A5] font-semibold">
                    {step.number}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#482020] border border-[#DCC8A5]/30 flex items-center justify-center text-[#DCC8A5]">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-editorial text-lg text-white font-semibold">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#EFE5D8]/80 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Callout */}
        <div className="bg-[#371818] border border-[#DCC8A5]/30 p-6 sm:p-8 rounded-sm flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
          <div className="text-center md:text-left space-y-1">
            <h4 className="font-editorial text-xl sm:text-2xl text-white font-medium">
              Have a Specific Shawl or Color in Mind?
            </h4>
            <p className="text-xs sm:text-sm text-[#EFE5D8]/75">
              Send us a WhatsApp message directly at <strong>03443015624</strong>.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#DCC8A5] text-[#302923] hover:bg-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors cursor-pointer shadow-sm"
            >
              <MessageCircle className="w-4 h-4 text-[#482020]" />
              <span>Chat on WhatsApp (03443015624)</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
