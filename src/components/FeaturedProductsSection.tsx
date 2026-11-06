import React, { useState } from 'react';
import { CategoryType, Product, PageRoute } from '../types';
import { ProductCard } from './ProductCard';
import { ArrowRight } from 'lucide-react';

interface FeaturedProductsSectionProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onNavigate: (route: PageRoute) => void;
  onOpenWhatsAppModal: () => void;
}

export const FeaturedProductsSection: React.FC<FeaturedProductsSectionProps> = ({
  products,
  onSelectProduct,
  onNavigate,
  onOpenWhatsAppModal,
}) => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');

  const filterCategories: { id: CategoryType; label: string }[] = [
    { id: 'all', label: 'All Shawls' },
    { id: 'traditional', label: 'Traditional & Embroidered' },
    { id: 'winter', label: 'Winter Shawls' },
    { id: 'fashion', label: 'Contemporary & Festive' },
  ];

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter((p) => p.category === activeCategory);

  return (
    <section className="py-14 md:py-20 bg-[#F6F0E7] border-b border-[#E2D6C6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Functional Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-[#E2D6C6]">
          <div className="space-y-1.5 max-w-xl">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#73685E] block">
              Curated Inventory
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#302923] font-medium">
              Featured Shawl Pieces
            </h2>
            <p className="text-sm text-[#483E36] font-normal">
              Browse our authentic inventory of Men's and Women's Pakistani shawls.
            </p>
          </div>

          {/* Functional interactive category tabs (functional buttons with handlers) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#EFE5D8] rounded-xs border border-[#E2D6C6] self-start md:self-auto">
            {filterCategories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-2 text-xs font-medium rounded-xs transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-[#482020] text-white shadow-xs'
                      : 'text-[#483E36] hover:text-[#302923] hover:bg-[#FAF6F0]/60'
                  }`}
                  aria-pressed={isActive}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Responsive Product Grid: 1-col mobile, 2-col tablet, 3-col desktop */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={onSelectProduct}
                onOpenWhatsAppModal={onOpenWhatsAppModal}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#FAF6F0] border border-[#E2D6C6] rounded-sm p-8">
            <p className="text-sm text-[#73685E]">
              No pieces found in this category right now.
            </p>
            <button
              onClick={() => setActiveCategory('all')}
              className="mt-3 text-xs font-medium text-[#482020] underline cursor-pointer"
            >
              Reset to All Shawls
            </button>
          </div>
        )}

        {/* View All Catalogue CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => onNavigate({ name: 'shop' })}
            className="inline-flex items-center gap-2 px-6 py-3 border border-[#482020] text-[#482020] hover:bg-[#482020] hover:text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-all cursor-pointer"
          >
            <span>View Complete Catalogue ({products.length} Shawls)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
