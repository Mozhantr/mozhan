import { useState, useMemo } from 'react';
import { Product } from '../types/store';
import { CATEGORIES } from '../data/products';
import { ProductCard } from './ProductCard';
import { toPersianDigits } from '../utils/formatters';
import { SlidersHorizontal, PackageOpen } from 'lucide-react';

interface ProductCatalogProps {
  products: Product[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onSelectProduct: (p: Product) => void;
  onAddToCart: (p: Product) => void;
  justAddedId: string | null;
  searchQuery: string;
  onClearSearch: () => void;
}

export function ProductCatalog({
  products,
  favorites,
  onToggleFavorite,
  onSelectProduct,
  onAddToCart,
  justAddedId,
  searchQuery,
  onClearSearch,
}: ProductCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);

  // Filter and Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategory !== 'all' && p.category !== selectedCategory) {
          return false;
        }
        // In-stock filter
        if (inStockOnly && (!p.inStock || p.stockCount <= 0)) {
          return false;
        }
        // Search query filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchName = p.name.toLowerCase().includes(q);
          const matchDesc = p.shortDescription.toLowerCase().includes(q);
          const matchArtisan = p.craftDetails.artisanName.toLowerCase().includes(q);
          const matchTag = p.tags.some((t) => t.toLowerCase().includes(q));
          return matchName || matchDesc || matchArtisan || matchTag;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        // Default: featured first
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [products, selectedCategory, inStockOnly, searchQuery, sortBy]);

  return (
    <section id="catalog" className="py-16 bg-[#FAF8F5] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-semibold text-[#8C7456] tracking-wider mb-1">
              مجموعه آثار اختصاصی
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#231F1C] tracking-tight">
              دست‌سازه‌های آماده تحویل کارگاه
            </h2>
          </div>

          <div className="text-xs text-[#786D61] tabular-nums">
            نمایش {toPersianDigits(filteredProducts.length)} اثر دست‌ساز
          </div>
        </div>

        {/* Filters and Controls Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#EAE3D9]">
          
          {/* Segmented Category Buttons (Functional filter buttons, not static badges) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-[#2C2723] text-white shadow-xs'
                      : 'bg-[#F2ECE2] text-[#554B41] hover:bg-[#EAE3D7] hover:text-[#231F1C]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Secondary Controls: In-Stock Toggle & Sort Dropdown */}
          <div className="flex items-center gap-4 self-end lg:self-auto">
            {/* In-Stock Only Toggle */}
            <label className="flex items-center gap-2 text-xs text-[#554B41] cursor-pointer select-none">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-4 h-4 rounded text-[#7A4B29] border-[#C8BEB0] focus:ring-0 focus:ring-offset-0 cursor-pointer accent-[#2C2723]"
              />
              <span>فقط موجود در کارگاه</span>
            </label>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 text-xs text-[#554B41]">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#8C7E70]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#FFFFFF] border border-[#DDD3C6] rounded-lg px-2.5 py-1.5 text-xs text-[#2C2723] focus:outline-none focus:border-[#7A4B29]"
              >
                <option value="featured">پیشنهاد کارگاه (منتخب)</option>
                <option value="price-asc">قیمت: کم به زیاد</option>
                <option value="price-desc">قیمت: زیاد به کم</option>
                <option value="rating">بیشترین رضایت خریداران</option>
              </select>
            </div>
          </div>

        </div>

        {/* Active Search Query Notice */}
        {searchQuery && (
          <div className="mb-6 p-3 bg-[#F2ECE2] rounded-xl flex items-center justify-between text-xs text-[#554B41]">
            <span>
              نتایج جستجو برای: <strong className="text-[#231F1C]">«{searchQuery}»</strong> ({toPersianDigits(filteredProducts.length)} مورد یافت شد)
            </span>
            <button
              onClick={onClearSearch}
              className="text-[#8C5D3B] hover:underline font-medium"
            >
              پاک کردن فیلتر جستجو
            </button>
          </div>
        )}

        {/* Product Grid (3-column desktop layout as per ecommerce reference) */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isFavorite={favorites.includes(product.id)}
                onToggleFavorite={onToggleFavorite}
                onSelectProduct={onSelectProduct}
                onAddToCart={onAddToCart}
                isAddedJustNow={justAddedId === product.id}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="py-16 text-center max-w-md mx-auto">
            <PackageOpen className="w-12 h-12 text-[#BFAFA0] mx-auto mb-4" />
            <h3 className="text-base font-bold text-[#2C2723] mb-1">
              اثری با مشخصات مدنظر شما یافت نشد
            </h3>
            <p className="text-xs text-[#6E6459] mb-6">
              می‌توانید فیلترها را تغییر دهید یا از بخش «سفارش اختصاصی» درخواست ساخت اثر با ابعاد و مشخصات دلخواه خود را ثبت کنید.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setInStockOnly(false);
                onClearSearch();
              }}
              className="px-4 py-2 bg-[#2C2723] text-white rounded-lg text-xs font-medium hover:bg-[#433B35]"
            >
              مشاهده تمامی آثار کارگاه
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
