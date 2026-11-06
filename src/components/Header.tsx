import React, { useState } from 'react';
import { BrandLogo } from './BrandLogo';
import { PageRoute, CategoryType, GenderType } from '../types';
import { MessageCircle, Menu, X, ArrowUpRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface HeaderProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
  onOpenWhatsAppModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRoute,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalCount, openCart } = useCart();

  const handleLinkClick = (route: PageRoute) => {
    onNavigate(route);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isCurrent = (name: string) => {
    if (currentRoute.name === name) return true;
    if (currentRoute.name === 'shop') {
      const cr = currentRoute as { name: 'shop'; category?: CategoryType; gender?: GenderType };
      if (name === 'womens' && cr.gender === 'women') return true;
      if (name === 'mens' && cr.gender === 'men') return true;
      if (name === 'traditional' && cr.category === 'traditional') return true;
      if (name === 'winter' && cr.category === 'winter') return true;
      if (name === 'shop' && !cr.category && !cr.gender) return true;
    }
    return false;
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F6F0E7]/95 backdrop-blur-md border-b border-[#E2D6C6] transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-2 sm:gap-6">
        
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => handleLinkClick({ name: 'home' })}
          className="text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#482020] rounded-xs cursor-pointer whitespace-nowrap shrink-0"
          aria-label="Ittifaq Handicraft - Return to Homepage"
        >
          <BrandLogo size="md" variant="burgundy" />
        </button>

        {/* Zone 2: Navigation Links (Desktop - 1024px+) */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-sm font-medium text-[#483E36]">
          <button
            onClick={() => handleLinkClick({ name: 'home' })}
            className={`transition-colors hover:text-[#482020] cursor-pointer whitespace-nowrap pb-0.5 border-b-2 ${
              isCurrent('home') ? 'border-[#482020] text-[#482020] font-semibold' : 'border-transparent'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => handleLinkClick({ name: 'shop' })}
            className={`transition-colors hover:text-[#482020] cursor-pointer whitespace-nowrap pb-0.5 border-b-2 ${
              isCurrent('shop') ? 'border-[#482020] text-[#482020] font-semibold' : 'border-transparent'
            }`}
          >
            Shop All
          </button>

          <button
            onClick={() => handleLinkClick({ name: 'womens' })}
            className={`transition-colors hover:text-[#482020] cursor-pointer whitespace-nowrap pb-0.5 border-b-2 ${
              isCurrent('womens') ? 'border-[#482020] text-[#482020] font-semibold' : 'border-transparent'
            }`}
          >
            Women's
          </button>

          <button
            onClick={() => handleLinkClick({ name: 'mens' })}
            className={`transition-colors hover:text-[#482020] cursor-pointer whitespace-nowrap pb-0.5 border-b-2 ${
              isCurrent('mens') ? 'border-[#482020] text-[#482020] font-semibold' : 'border-transparent'
            }`}
          >
            Men's
          </button>

          <button
            onClick={() => handleLinkClick({ name: 'traditional' })}
            className={`transition-colors hover:text-[#482020] cursor-pointer whitespace-nowrap pb-0.5 border-b-2 ${
              isCurrent('traditional') ? 'border-[#482020] text-[#482020] font-semibold' : 'border-transparent'
            }`}
          >
            Traditional
          </button>

          <button
            onClick={() => handleLinkClick({ name: 'winter' })}
            className={`transition-colors hover:text-[#482020] cursor-pointer whitespace-nowrap pb-0.5 border-b-2 ${
              isCurrent('winter') ? 'border-[#482020] text-[#482020] font-semibold' : 'border-transparent'
            }`}
          >
            Winter
          </button>

          <button
            onClick={() => handleLinkClick({ name: 'about' })}
            className={`transition-colors hover:text-[#482020] cursor-pointer whitespace-nowrap pb-0.5 border-b-2 ${
              isCurrent('about') ? 'border-[#482020] text-[#482020] font-semibold' : 'border-transparent'
            }`}
          >
            About
          </button>

          <button
            onClick={() => handleLinkClick({ name: 'contact' })}
            className={`transition-colors hover:text-[#482020] cursor-pointer whitespace-nowrap pb-0.5 border-b-2 ${
              isCurrent('contact') ? 'border-[#482020] text-[#482020] font-semibold' : 'border-transparent'
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Zone 3: Actions - WhatsApp CTA, Cart Button (always visible!), and Hamburger */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          
          {/* WhatsApp Action Button */}
          <a
            href="https://wa.me/923443015624"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 text-[11px] sm:text-xs font-semibold text-white bg-[#482020] hover:bg-[#371818] rounded-xs transition-colors cursor-pointer whitespace-nowrap shadow-2xs"
            title="Chat on WhatsApp: 03443015624"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#DCC8A5]" />
            <span className="hidden md:inline">WhatsApp:</span>
            <span>03443015624</span>
            <ArrowUpRight className="w-3 h-3 opacity-70 hidden sm:inline" />
          </a>

          {/* Quick WhatsApp icon for small mobile */}
          <a
            href="https://wa.me/923443015624"
            target="_blank"
            rel="noopener noreferrer"
            className="sm:hidden p-2 text-[#482020] hover:bg-[#EAE0D1] rounded-xs transition-colors cursor-pointer"
            aria-label="Direct WhatsApp Chat"
            title="WhatsApp: 03443015624"
          >
            <MessageCircle className="w-5 h-5 text-[#482020]" />
          </a>

          {/* Shopping Cart Button (Mandatory - NEVER hidden on mobile) */}
          <button
            type="button"
            onClick={openCart}
            className="relative p-2 text-[#482020] hover:bg-[#EAE0D1] rounded-xs transition-colors cursor-pointer flex items-center justify-center"
            aria-label={`Shopping bag with ${totalCount} items`}
            title="View Shopping Bag"
          >
            <ShoppingBag className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
            {totalCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-4.5 h-4.5 px-1 bg-[#482020] text-[#DCC8A5] text-[10px] font-bold rounded-full flex items-center justify-center border border-[#FAF6F0] shadow-xs">
                {totalCount}
              </span>
            )}
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#482020] hover:bg-[#EAE0D1] rounded-xs transition-colors cursor-pointer"
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E2D6C6] bg-[#F6F0E7] px-4 pt-4 pb-6 space-y-3 shadow-lg animate-fadeIn">
          <div className="flex flex-col space-y-1">
            <button
              onClick={() => handleLinkClick({ name: 'home' })}
              className={`text-left px-3.5 py-2.5 text-sm font-medium rounded-xs cursor-pointer ${
                isCurrent('home') ? 'bg-[#EFE5D8] text-[#482020] font-semibold' : 'text-[#302923] hover:bg-[#FAF6F0]'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleLinkClick({ name: 'shop' })}
              className={`text-left px-3.5 py-2.5 text-sm font-medium rounded-xs cursor-pointer ${
                isCurrent('shop') ? 'bg-[#EFE5D8] text-[#482020] font-semibold' : 'text-[#302923] hover:bg-[#FAF6F0]'
              }`}
            >
              Shop All Shawls
            </button>
            <button
              onClick={() => handleLinkClick({ name: 'womens' })}
              className={`text-left px-3.5 py-2.5 text-sm font-medium rounded-xs cursor-pointer ${
                isCurrent('womens') ? 'bg-[#EFE5D8] text-[#482020] font-semibold' : 'text-[#302923] hover:bg-[#FAF6F0]'
              }`}
            >
              Women's Shawls
            </button>
            <button
              onClick={() => handleLinkClick({ name: 'mens' })}
              className={`text-left px-3.5 py-2.5 text-sm font-medium rounded-xs cursor-pointer ${
                isCurrent('mens') ? 'bg-[#EFE5D8] text-[#482020] font-semibold' : 'text-[#302923] hover:bg-[#FAF6F0]'
              }`}
            >
              Men's Shawls
            </button>
            <button
              onClick={() => handleLinkClick({ name: 'traditional' })}
              className={`text-left px-3.5 py-2.5 text-sm font-medium rounded-xs cursor-pointer ${
                isCurrent('traditional') ? 'bg-[#EFE5D8] text-[#482020] font-semibold' : 'text-[#302923] hover:bg-[#FAF6F0]'
              }`}
            >
              Traditional & Embroidered
            </button>
            <button
              onClick={() => handleLinkClick({ name: 'winter' })}
              className={`text-left px-3.5 py-2.5 text-sm font-medium rounded-xs cursor-pointer ${
                isCurrent('winter') ? 'bg-[#EFE5D8] text-[#482020] font-semibold' : 'text-[#302923] hover:bg-[#FAF6F0]'
              }`}
            >
              Winter Shawls
            </button>
            <button
              onClick={() => handleLinkClick({ name: 'about' })}
              className={`text-left px-3.5 py-2.5 text-sm font-medium rounded-xs cursor-pointer ${
                isCurrent('about') ? 'bg-[#EFE5D8] text-[#482020] font-semibold' : 'text-[#302923] hover:bg-[#FAF6F0]'
              }`}
            >
              About the Brand
            </button>
            <button
              onClick={() => handleLinkClick({ name: 'contact' })}
              className={`text-left px-3.5 py-2.5 text-sm font-medium rounded-xs cursor-pointer ${
                isCurrent('contact') ? 'bg-[#EFE5D8] text-[#482020] font-semibold' : 'text-[#302923] hover:bg-[#FAF6F0]'
              }`}
            >
              Contact & Inquiries
            </button>
          </div>

          {/* Quick Cart access inside mobile drawer */}
          <div className="pt-3 border-t border-[#E2D6C6] space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openCart();
              }}
              className="w-full flex items-center justify-between py-2.5 px-3 bg-[#EFE5D8] text-[#482020] text-xs font-semibold rounded-xs hover:bg-[#EAE0D1] cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-[#482020]" />
                <span>View Shopping Bag</span>
              </div>
              <span className="px-2 py-0.5 bg-[#482020] text-[#DCC8A5] rounded-full text-[10px]">
                {totalCount} item{totalCount === 1 ? '' : 's'}
              </span>
            </button>

            <a
              href="https://wa.me/923443015624"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#482020] text-white text-xs font-medium rounded-xs hover:bg-[#371818] cursor-pointer shadow-xs"
            >
              <MessageCircle className="w-4 h-4 text-[#DCC8A5]" />
              <span>Direct WhatsApp Inquiry (03443015624)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
