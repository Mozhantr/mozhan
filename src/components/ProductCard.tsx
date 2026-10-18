import { Heart, Plus, Eye, Check } from 'lucide-react';
import { Product } from '../types/store';
import { formatPrice, toPersianDigits } from '../utils/formatters';

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (productId: string) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  isAddedJustNow?: boolean;
}

export function ProductCard({
  product,
  isFavorite,
  onToggleFavorite,
  onSelectProduct,
  onAddToCart,
  isAddedJustNow = false,
}: ProductCardProps) {
  return (
    <div className="group relative bg-[#FFFFFF] rounded-2xl border border-[#ECE5DB] overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      
      {/* Product Image Frame (65-70% visual prominence) */}
      <div className="relative aspect-[4/3] bg-[#F7F3ED] overflow-hidden cursor-pointer" onClick={() => onSelectProduct(product)}>
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Wishlist Button (Interactive affordance) */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(product.id);
          }}
          className="absolute top-3 left-3 p-2 rounded-full bg-white/90 backdrop-blur-sm text-[#4A4036] hover:text-[#B85C4B] transition-colors shadow-sm"
          aria-label={isFavorite ? 'حذف از علاقه‌مندی‌ها' : 'افزودن به علاقه‌مندی‌ها'}
        >
          <Heart
            className={`w-4 h-4 transition-transform active:scale-125 ${
              isFavorite ? 'fill-[#B85C4B] text-[#B85C4B]' : 'text-[#5C5248]'
            }`}
          />
        </button>

        {/* Limited Run / Low Stock Quiet Text Tag (Single subtle tag, no pill badge sandwich) */}
        {product.isLimitedRun && (
          <div className="absolute top-3 right-3 bg-[#2C2723]/80 backdrop-blur-xs text-[#FAF8F5] text-[11px] font-medium px-2.5 py-1 rounded-md">
            نسخه محدود
          </div>
        )}

        {/* Quick View Hover Trigger */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:flex items-center justify-center">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelectProduct(product);
            }}
            className="w-full bg-[#FAF8F5]/95 hover:bg-white text-[#2C2723] text-xs font-semibold py-2 px-3 rounded-lg shadow-sm backdrop-blur-sm flex items-center justify-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>مشاهده جزئیات و شناسنامه اثر</span>
          </button>
        </div>
      </div>

      {/* Card Content & Metadata */}
      <div className="p-5 flex flex-col flex-grow justify-between">
        
        <div>
          {/* Unboxed Metadata (Zero-pill discipline) */}
          <div className="flex items-center gap-2 text-xs text-[#8C7E70] mb-1.5">
            <span>{product.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span>استاد {product.craftDetails.artisanName}</span>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => onSelectProduct(product)}
            className="text-base font-semibold text-[#2C2723] hover:text-[#7A4B29] transition-colors cursor-pointer line-clamp-1 mb-2"
          >
            {product.name}
          </h3>

          {/* Short description excerpt */}
          <p className="text-xs text-[#6A6055] line-clamp-2 leading-relaxed mb-4">
            {product.shortDescription}
          </p>
        </div>

        {/* Bottom Price & Purchase Row */}
        <div className="pt-3 border-t border-[#F2ECE2] flex items-center justify-between gap-3">
          
          {/* Price with tabular numerals */}
          <div className="flex flex-col">
            {product.originalPrice && (
              <span className="text-[11px] text-[#A39789] line-through tabular-nums">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            <span className="text-base font-bold text-[#2C2723] tabular-nums">
              {formatPrice(product.price)}
            </span>
          </div>

          {/* Add to Cart button */}
          <button
            type="button"
            onClick={() => onAddToCart(product)}
            disabled={!product.inStock}
            className={`px-3.5 py-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all whitespace-nowrap shrink-0 ${
              isAddedJustNow
                ? 'bg-emerald-700 text-white'
                : product.inStock
                ? 'bg-[#EFE8DE] hover:bg-[#2C2723] text-[#3D352E] hover:text-white'
                : 'bg-stone-100 text-stone-400 cursor-not-allowed'
            }`}
          >
            {isAddedJustNow ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>افزوده شد</span>
              </>
            ) : product.inStock ? (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>افزودن به سبد</span>
              </>
            ) : (
              <span>ناموجود</span>
            )}
          </button>

        </div>

      </div>

    </div>
  );
}
