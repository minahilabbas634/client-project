import React from 'react';
import { BrandLogo } from './BrandLogo';
import { PageRoute } from '../types';
import { MessageCircle, ExternalLink, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigate: (route: PageRoute) => void;
  onOpenWhatsAppModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenWhatsAppModal: _onOpenWhatsAppModal,
}) => {
  const handleLink = (route: PageRoute) => {
    onNavigate(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#302923] text-[#FAF6F0] border-t border-[#482020] pt-14 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#FAF6F0]/10">
          
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-4">
            <BrandLogo size="md" variant="light" />
            <p className="text-xs sm:text-sm text-[#EFE5D8]/80 leading-relaxed max-w-sm font-normal">
              A Pakistani shawl house presenting authentic embroidered, winter wool, and festive pieces for men and women. Inquiries and custom orders directly assisted via WhatsApp.
            </p>
            <div className="pt-2">
              <span className="text-[11px] text-[#DCC8A5] tracking-wider uppercase font-medium block">
                Direct WhatsApp Channel:
              </span>
              <a
                href="https://wa.me/923443015624"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-white hover:text-[#DCC8A5] transition-colors mt-1 font-medium"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#DCC8A5]" />
                <span>0344 3015624 (+92 344 3015624)</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            </div>
          </div>

          {/* Collections Navigation */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-editorial text-base uppercase tracking-wider text-[#DCC8A5] font-semibold">
              Collections
            </h4>
            <ul className="space-y-2 text-xs text-[#EFE5D8]/80">
              <li>
                <button
                  onClick={() => handleLink({ name: 'shop' })}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  All Shawls
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink({ name: 'womens' })}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Women's Embroidered Shawls
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink({ name: 'mens' })}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Men's Winter Shawls &amp; Doshalas
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink({ name: 'traditional' })}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Traditional Needlework Shawls
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink({ name: 'winter' })}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Winter Twill &amp; Heavyweight Weaves
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink({ name: 'fashion' })}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contemporary &amp; Festive Shawls
                </button>
              </li>
            </ul>
          </div>

          {/* Brand & Ordering Info */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-editorial text-base uppercase tracking-wider text-[#DCC8A5] font-semibold">
              Information
            </h4>
            <ul className="space-y-2 text-xs text-[#EFE5D8]/80">
              <li>
                <button
                  onClick={() => handleLink({ name: 'about' })}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About the Brand
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink({ name: 'contact' })}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact &amp; Assistance
                </button>
              </li>
              <li>
                <a
                  href="https://wa.me/923443015624"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp Ordering
                </a>
              </li>
            </ul>
          </div>

          {/* Business & Social Channels */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-editorial text-base uppercase tracking-wider text-[#DCC8A5] font-semibold">
              Location &amp; Delivery
            </h4>
            <div className="space-y-2.5 text-xs text-[#EFE5D8]/80">
              <div className="p-2.5 bg-[#FAF6F0]/5 border border-[#FAF6F0]/10 rounded-xs space-y-1">
                <span className="font-medium text-white block">Pakistan Delivery</span>
                <p className="text-[11px] text-[#EFE5D8]/70">
                  Fast courier dispatch to Karachi, Lahore, Islamabad, Peshawar, Quetta, and nationwide.
                </p>
              </div>

              <div className="p-2.5 bg-[#FAF6F0]/5 border border-[#FAF6F0]/10 rounded-xs space-y-1">
                <span className="font-medium text-white block">Direct Inquiries</span>
                <p className="text-[11px] text-[#EFE5D8]/70">
                  WhatsApp: 03443015624
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Prototype Transparency Disclosure & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#EFE5D8]/60">
          <div className="flex items-center gap-2 text-left">
            <ShieldCheck className="w-4 h-4 text-[#DCC8A5] shrink-0" />
            <span>
              <strong>Ittifaq Handicraft:</strong> Client presentation demo. Inquiries and orders handled via WhatsApp (03443015624).
            </span>
          </div>
          <div className="text-center md:text-right shrink-0">
            © {new Date().getFullYear()} Ittifaq Handicraft. All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
};
