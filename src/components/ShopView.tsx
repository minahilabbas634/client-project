import React, { useState, useEffect } from 'react';
import { Product, PageRoute, CategoryType, GenderType } from '../types';
import { ProductCard } from './ProductCard';
import { Filter, SlidersHorizontal, ArrowRight } from 'lucide-react';

interface ShopViewProps {
  products: Product[];
  initialCategory?: CategoryType;
  initialGender?: GenderType | 'all';
  onSelectProduct: (product: Product) => void;
  onNavigate: (route: PageRoute) => void;
  onOpenWhatsAppModal: () => void;
}

export const ShopView: React.FC<ShopViewProps> = ({
  products,
  initialCategory = 'all',
  initialGender = 'all',
  onSelectProduct,
  onNavigate,
  onOpenWhatsAppModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>(initialCategory);
  const [selectedGender, setSelectedGender] = useState<GenderType | 'all'>(initialGender || 'all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  // Synchronize internal filter state when navigation route changes props
  useEffect(() => {
    setSelectedCategory(initialCategory || 'all');
  }, [initialCategory]);

  useEffect(() => {
    setSelectedGender(initialGender || 'all');
  }, [initialGender]);

  const categories: { id: CategoryType; label: string }[] = [
    { id: 'all', label: 'All Styles' },
    { id: 'traditional', label: 'Traditional & Embroidered' },
    { id: 'winter', label: 'Winter Shawls' },
    { id: 'fashion', label: 'Contemporary & Festive' },
  ];

  const genders: { id: GenderType | 'all'; label: string }[] = [
    { id: 'all', label: 'All Shawls' },
    { id: 'women', label: "Women's" },
    { id: 'men', label: "Men's" },
  ];

  // Dynamic Page Title & Description based on active selection
  const getHeaderInfo = () => {
    if (selectedGender === 'women' && selectedCategory === 'all') {
      return {
        tag: "Women's Collection",
        title: "Women's Shawls",
        desc: "Graceful floral embroidery, botanical tulip borders, vibrant magenta patterns, and festive evening drapes.",
      };
    }
    if (selectedGender === 'men' && selectedCategory === 'all') {
      return {
        tag: "Men's Collection",
        title: "Men's Shawls & Doshalas",
        desc: "Distinguished pure wool doshalas, textured twill weaves, and traditional selvedge borders tailored for men.",
      };
    }
    if (selectedCategory === 'traditional') {
      return {
        tag: "Heritage Craft",
        title: "Traditional & Embroidered Shawls",
        desc: "Heritage needlework, intricate botanical tulip borders, and authentic multi-color geometric patterns.",
      };
    }
    if (selectedCategory === 'winter') {
      return {
        tag: "Seasonal Warmth",
        title: "Winter Shawls & Heavyweight Weaves",
        desc: "Rich winter twills, heavyweight pure wools, and tailored doshalas crafted for winter temperatures.",
      };
    }
    if (selectedCategory === 'fashion') {
      return {
        tag: "Ceremonial Wear",
        title: "Contemporary & Festive Shawls",
        desc: "Silver floral booti motifs and elegant draped textiles for festive celebrations and evening gatherings.",
      };
    }
    return {
      tag: "Ittifaq Handicraft",
      title: "Complete Shawl Catalogue",
      desc: "Browse our authentic collection of Men's and Women's Pakistani shawls. Each card connects directly to our team on WhatsApp (03443015624) for price, availability, and ordering.",
    };
  };

  const headerInfo = getHeaderInfo();

  // Filter products by category (single or multiple) and audience/gender
  const filteredProducts = products.filter((p) => {
    // Check category match
    const matchCategory =
      selectedCategory === 'all' ||
      p.category === selectedCategory ||
      (p.categories && p.categories.includes(selectedCategory));

    // Check audience / gender match
    const targetGender = p.audience || p.gender;
    const matchGender =
      selectedGender === 'all' ||
      targetGender === selectedGender ||
      targetGender === 'unisex';

    return matchCategory && matchGender;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') {
      const priceA = a.price ?? 999999;
      const priceB = b.price ?? 999999;
      return priceA - priceB;
    }
    if (sortBy === 'price-desc') {
      const priceA = a.price ?? -1;
      const priceB = b.price ?? -1;
      return priceB - priceA;
    }
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  return (
    <div className="py-8 sm:py-12 md:py-16 bg-[#F6F0E7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dynamic Page Header */}
        <div className="max-w-2xl mb-8 sm:mb-10 space-y-2">
          <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#73685E] block">
            {headerInfo.tag}
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-[#302923] font-medium leading-tight">
            {headerInfo.title}
          </h1>
          <p className="text-xs sm:text-sm text-[#483E36] font-normal leading-relaxed">
            {headerInfo.desc}
          </p>
        </div>

        {/* Filter and Control Bar */}
        <div className="bg-[#FAF6F0] p-4 sm:p-5 border border-[#E2D6C6] rounded-xs mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Category Segmented Control */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#73685E] mr-1 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5 text-[#482020]" />
                <span>Style:</span>
              </span>
              {categories.map((c) => {
                const isSelected = selectedCategory === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCategory(c.id)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-xs transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      isSelected
                        ? 'bg-[#482020] text-white shadow-xs'
                        : 'bg-[#EFE5D8] text-[#302923] hover:bg-[#E2D6C6]'
                    }`}
                  >
                    {c.label}
                  </button>
                );
              })}
            </div>

            {/* Gender/Audience and Sort Controls */}
            <div className="flex flex-wrap items-center gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-[#E2D6C6]">
              {/* Audience filter */}
              <div className="flex items-center gap-1">
                <span className="text-xs font-medium text-[#73685E] mr-1">Audience:</span>
                {genders.map((g) => {
                  const isSelected = selectedGender === g.id;
                  return (
                    <button
                      key={g.id}
                      onClick={() => setSelectedGender(g.id)}
                      className={`px-2.5 py-1 text-xs font-medium rounded-xs transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-[#482020] text-white shadow-xs'
                          : 'text-[#483E36] hover:bg-[#EFE5D8]'
                      }`}
                    >
                      {g.label}
                    </button>
                  );
                })}
              </div>

              {/* Sort Selector */}
              <div className="flex items-center gap-1.5 ml-auto sm:ml-0">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#73685E]" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="text-xs bg-[#EFE5D8] border border-[#E2D6C6] text-[#302923] py-1 px-2 rounded-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#482020] cursor-pointer"
                  aria-label="Sort products"
                >
                  <option value="featured">Sort: Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>

            </div>

          </div>

          {/* Active Filter Summary */}
          <div className="text-xs text-[#73685E] flex items-center justify-between border-t border-[#E2D6C6]/60 pt-3">
            <span>
              Showing <strong>{sortedProducts.length}</strong> of {products.length} shawls
              {selectedGender !== 'all' && (
                <span className="ml-1 text-[#482020] font-medium">
                  ({selectedGender === 'women' ? "Women's" : "Men's"})
                </span>
              )}
              {selectedCategory !== 'all' && (
                <span className="ml-1 text-[#482020] font-medium">
                  · {categories.find((c) => c.id === selectedCategory)?.label}
                </span>
              )}
            </span>
            {(selectedCategory !== 'all' || selectedGender !== 'all') && (
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedGender('all');
                }}
                className="text-xs text-[#482020] hover:underline cursor-pointer"
              >
                Reset filters
              </button>
            )}
          </div>
        </div>

        {/* Product Grid */}
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {sortedProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onSelect={onSelectProduct}
                onOpenWhatsAppModal={onOpenWhatsAppModal}
              />
            ))}
          </div>
        ) : (
          <div className="bg-[#FAF6F0] border border-[#E2D6C6] rounded-xs p-10 sm:p-14 text-center space-y-4">
            <h3 className="font-editorial text-2xl text-[#302923]">No matching shawls found</h3>
            <p className="text-xs sm:text-sm text-[#73685E] max-w-md mx-auto leading-relaxed">
              We couldn't find pieces matching that combination of style and drape. Reset your filters to browse the complete catalogue, or contact us directly on WhatsApp for custom requests.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedGender('all');
                  onNavigate({ name: 'shop' });
                }}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#482020] text-white text-xs font-semibold rounded-xs cursor-pointer hover:bg-[#371818] transition-colors shadow-xs"
              >
                <span>Shop All Shawls</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#DCC8A5]" />
              </button>
              <a
                href="https://wa.me/923443015624"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 border border-[#DCC8A5] text-[#482020] hover:bg-[#EFE5D8] text-xs font-semibold rounded-xs cursor-pointer transition-colors"
              >
                Inquire on WhatsApp (03443015624)
              </a>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
