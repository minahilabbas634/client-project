import { useState, useEffect } from 'react';
import { PageRoute, Product, WhatsAppConfig } from './types';
import { SAMPLE_PRODUCTS, getProductBySlug } from './data/products';
import { getWhatsAppConfig } from './data/config';
import { CartProvider } from './context/CartContext';

import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CollectionDiscovery } from './components/CollectionDiscovery';
import { FeaturedProductsSection } from './components/FeaturedProductsSection';
import { ShopByCategorySection } from './components/ShopByCategorySection';
import { BrandStory } from './components/BrandStory';
import { WhatsAppConversionSection } from './components/WhatsAppConversionSection';
import { Footer } from './components/Footer';

import { ProductDetailView } from './components/ProductDetailView';
import { ShopView } from './components/ShopView';
import { AboutView } from './components/AboutView';
import { ContactView } from './components/ContactView';
import { WhatsAppConfigModal } from './components/WhatsAppConfigModal';
import { FloatingWhatsAppButton } from './components/FloatingWhatsAppButton';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { CartToast } from './components/CartToast';

function parseHashToRoute(): PageRoute {
  if (typeof window === 'undefined') return { name: 'home' };
  const hash = window.location.hash.replace(/^#\/?/, '');

  if (!hash || hash === '') return { name: 'home' };
  if (hash === 'shop') return { name: 'shop' };
  if (hash === 'womens') return { name: 'womens' };
  if (hash === 'mens') return { name: 'mens' };
  if (hash === 'traditional') return { name: 'traditional' };
  if (hash === 'winter') return { name: 'winter' };
  if (hash === 'fashion') return { name: 'fashion' };
  if (hash === 'about') return { name: 'about' };
  if (hash === 'contact') return { name: 'contact' };
  if (hash.startsWith('product/')) {
    const slug = hash.replace('product/', '');
    return { name: 'product-detail', slug };
  }

  return { name: 'home' };
}

function routeToHash(route: PageRoute): string {
  switch (route.name) {
    case 'home':
      return '#/';
    case 'shop':
      return '#/shop';
    case 'womens':
      return '#/womens';
    case 'mens':
      return '#/mens';
    case 'traditional':
      return '#/traditional';
    case 'winter':
      return '#/winter';
    case 'fashion':
      return '#/fashion';
    case 'about':
      return '#/about';
    case 'contact':
      return '#/contact';
    case 'product-detail':
      return `#/product/${route.slug}`;
    default:
      return '#/';
  }
}

function AppContent() {
  const [currentRoute, setCurrentRoute] = useState<PageRoute>(parseHashToRoute());
  const [whatsAppConfig, setWhatsAppConfig] = useState<WhatsAppConfig>(getWhatsAppConfig());
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [sampleInquiryMessage, setSampleInquiryMessage] = useState<string | undefined>();

  // Synchronize hash with currentRoute
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentRoute(parseHashToRoute());
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (route: PageRoute) => {
    setCurrentRoute(route);
    const newHash = routeToHash(route);
    if (window.location.hash !== newHash) {
      window.location.hash = newHash;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (product: Product) => {
    navigateTo({ name: 'product-detail', slug: product.slug });
  };

  const handleOpenWhatsAppModal = (customMessage?: string) => {
    if (customMessage) setSampleInquiryMessage(customMessage);
    setIsWhatsAppModalOpen(true);
  };

  // Render view depending on currentRoute
  const renderContent = () => {
    switch (currentRoute.name) {
      case 'home':
        return (
          <main>
            {/* Hero Section */}
            <HeroSection
              onNavigate={navigateTo}
              onOpenWhatsAppModal={() => handleOpenWhatsAppModal()}
            />

            {/* Collection discovery */}
            <CollectionDiscovery onNavigate={navigateTo} />

            {/* Featured products grid using the actual supplied shawl images */}
            <FeaturedProductsSection
              products={SAMPLE_PRODUCTS}
              onSelectProduct={handleSelectProduct}
              onNavigate={navigateTo}
              onOpenWhatsAppModal={() => handleOpenWhatsAppModal()}
            />

            {/* Shop-by-category section */}
            <ShopByCategorySection onNavigate={navigateTo} />

            {/* Heritage-inspired brand story */}
            <BrandStory onNavigate={navigateTo} />

            {/* WhatsApp conversion section */}
            <WhatsAppConversionSection />
          </main>
        );

      case 'shop':
        return (
          <main>
            <ShopView
              key="shop-all"
              products={SAMPLE_PRODUCTS}
              initialCategory="all"
              initialGender="all"
              onSelectProduct={handleSelectProduct}
              onNavigate={navigateTo}
              onOpenWhatsAppModal={() => handleOpenWhatsAppModal()}
            />
          </main>
        );

      case 'womens':
        return (
          <main>
            <ShopView
              key="shop-womens"
              products={SAMPLE_PRODUCTS}
              initialCategory="all"
              initialGender="women"
              onSelectProduct={handleSelectProduct}
              onNavigate={navigateTo}
              onOpenWhatsAppModal={() => handleOpenWhatsAppModal()}
            />
          </main>
        );

      case 'mens':
        return (
          <main>
            <ShopView
              key="shop-mens"
              products={SAMPLE_PRODUCTS}
              initialCategory="all"
              initialGender="men"
              onSelectProduct={handleSelectProduct}
              onNavigate={navigateTo}
              onOpenWhatsAppModal={() => handleOpenWhatsAppModal()}
            />
          </main>
        );

      case 'traditional':
        return (
          <main>
            <ShopView
              key="shop-traditional"
              products={SAMPLE_PRODUCTS}
              initialCategory="traditional"
              initialGender="all"
              onSelectProduct={handleSelectProduct}
              onNavigate={navigateTo}
              onOpenWhatsAppModal={() => handleOpenWhatsAppModal()}
            />
          </main>
        );

      case 'winter':
        return (
          <main>
            <ShopView
              key="shop-winter"
              products={SAMPLE_PRODUCTS}
              initialCategory="winter"
              initialGender="all"
              onSelectProduct={handleSelectProduct}
              onNavigate={navigateTo}
              onOpenWhatsAppModal={() => handleOpenWhatsAppModal()}
            />
          </main>
        );

      case 'fashion':
        return (
          <main>
            <ShopView
              key="shop-fashion"
              products={SAMPLE_PRODUCTS}
              initialCategory="fashion"
              initialGender="all"
              onSelectProduct={handleSelectProduct}
              onNavigate={navigateTo}
              onOpenWhatsAppModal={() => handleOpenWhatsAppModal()}
            />
          </main>
        );

      case 'product-detail': {
        const product = getProductBySlug(currentRoute.slug);
        if (!product) {
          return (
            <div className="py-20 text-center bg-[#F6F0E7]">
              <div className="max-w-md mx-auto p-8 bg-[#FAF6F0] border border-[#E2D6C6] rounded-xs space-y-4">
                <h1 className="font-editorial text-2xl text-[#302923]">Shawl Not Found</h1>
                <p className="text-xs text-[#73685E]">
                  The shawl you requested could not be located in our current catalogue.
                </p>
                <button
                  onClick={() => navigateTo({ name: 'shop' })}
                  className="px-4 py-2 bg-[#482020] text-white text-xs font-semibold rounded-xs cursor-pointer"
                >
                  Return to Catalogue
                </button>
              </div>
            </div>
          );
        }

        return (
          <main>
            <ProductDetailView
              product={product}
              onNavigate={navigateTo}
              onSelectProduct={handleSelectProduct}
              onOpenWhatsAppModal={() => handleOpenWhatsAppModal()}
            />
          </main>
        );
      }

      case 'about':
        return (
          <main>
            <AboutView
              onNavigate={navigateTo}
              onOpenWhatsAppModal={() => handleOpenWhatsAppModal()}
            />
          </main>
        );

      case 'contact':
        return (
          <main>
            <ContactView
              onNavigate={navigateTo}
              onOpenWhatsAppModal={() => handleOpenWhatsAppModal()}
            />
          </main>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F0E7] text-[#302923]">
      {/* Announcement bar */}
      <AnnouncementBar
        onOpenWhatsAppModal={() => handleOpenWhatsAppModal()}
      />

      {/* Main navigation with Live Cart Badge */}
      <Header
        currentRoute={currentRoute}
        onNavigate={navigateTo}
        onOpenWhatsAppModal={() => handleOpenWhatsAppModal()}
      />

      {/* Body Content */}
      <div className="flex-1">
        {renderContent()}
      </div>

      {/* Footer */}
      <Footer
        onNavigate={navigateTo}
        onOpenWhatsAppModal={() => handleOpenWhatsAppModal()}
      />

      {/* Floating WhatsApp Quick Action */}
      <FloatingWhatsAppButton />

      {/* Shopping Cart Slide-over Drawer */}
      <CartDrawer onNavigate={navigateTo} />

      {/* Checkout and WhatsApp Order Modal */}
      <CheckoutModal />

      {/* Cart Addition Toast Feedback */}
      <CartToast />

      {/* WhatsApp Configuration and Live Test Modal */}
      <WhatsAppConfigModal
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
        config={whatsAppConfig}
        onUpdateConfig={(newConfig) => setWhatsAppConfig(newConfig)}
        sampleMessage={sampleInquiryMessage}
      />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
