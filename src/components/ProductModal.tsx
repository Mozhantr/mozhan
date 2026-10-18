import { useState } from 'react';
import { X, Heart, ShieldCheck, Clock, MapPin, Sparkles, Gift, Check, ArrowRight } from 'lucide-react';
import { Product } from '../types/store';
import { formatPrice, toPersianDigits } from '../utils/formatters';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, giftWrap: boolean) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export function ProductModal({
  product,
  onClose,
  onAddToCart,
  isFavorite,
  onToggleFavorite,
}: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [giftWrap, setGiftWrap] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'care' | 'inbox'>('details');
  const [isSuccessFeedback, setIsSuccessFeedback] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity, giftWrap);
    setIsSuccessFeedback(true);
    setTimeout(() => {
      setIsSuccessFeedback(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
      {/* Modal Container */}
      <div
        className="relative bg-[#FFFFFF] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#EAE3D9] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-10 p-2 text-[#685D52] hover:text-[#231F1C] bg-[#FAF8F5] hover:bg-[#F2ECE2] rounded-full transition-colors border border-[#E2D8CC]"
          aria-label="بستن"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 2-Column Split: Image / Visual Showcase on Right (RTL), Purchase Module on Left */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Gallery / Image Side */}
          <div className="relative bg-[#FAF6F0] p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-l border-[#EAE3D9]">
            
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm border border-[#E2D7C8] mb-4">
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />

              <button
                type="button"
                onClick={() => onToggleFavorite(product.id)}
                className="absolute top-3 right-3 p-2.5 rounded-full bg-white/90 backdrop-blur-sm text-[#4A4036] hover:text-[#B85C4B] transition-colors shadow-sm"
              >
                <Heart
                  className={`w-4 h-4 ${
                    isFavorite ? 'fill-[#B85C4B] text-[#B85C4B]' : 'text-[#5C5248]'
                  }`}
                />
              </button>
            </div>

            {/* Artisan Certificate Box */}
            <div className="bg-[#FFFFFF] p-4 rounded-xl border border-[#EAE3D9] text-xs">
              <div className="flex items-center gap-2 text-[#7A4B29] font-semibold mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span>شناسنامه اصالت اثر و امضای استادکار</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[#5E5347]">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#A39688]" />
                  <span>خاستگاه: {product.craftDetails.city}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#A39688]" />
                  <span className="tabular-nums">{toPersianDigits(product.craftDetails.craftingHours)} ساعت کار دست</span>
                </div>
              </div>
              <p className="mt-2 text-[11px] text-[#827568] border-t border-[#F2ECE2] pt-2">
                خالق اثر: {product.craftDetails.artisanName} ({product.craftDetails.artisanTitle})
              </p>
            </div>

          </div>

          {/* Purchase Module Side */}
          <div className="p-6 sm:p-8 flex flex-col justify-between">
            
            <div>
              {/* Category & Status */}
              <div className="flex items-center justify-between text-xs text-[#8C7D6E] mb-2">
                <span>{product.categoryLabel}</span>
                {product.inStock ? (
                  <span className="text-emerald-800 font-medium tabular-nums">
                    تنها {toPersianDigits(product.stockCount)} عدد آماده در کارگاه
                  </span>
                ) : (
                  <span className="text-rose-700 font-medium">سفارش در نوبت ساخت</span>
                )}
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-bold text-[#231F1C] mb-3 leading-snug">
                {product.name}
              </h2>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6 pb-4 border-b border-[#F2ECE2]">
                <span className="text-2xl font-black text-[#231F1C] tabular-nums">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-[#A19588] line-through tabular-nums">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#5C5145] leading-relaxed mb-6 font-light">
                {product.fullDescription}
              </p>

              {/* Specs Tabs */}
              <div className="mb-6">
                <div className="flex items-center gap-2 border-b border-[#EAE3D9] mb-3 pb-1">
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`text-xs font-semibold pb-1.5 transition-colors ${
                      activeTab === 'details'
                        ? 'text-[#231F1C] border-b-2 border-[#231F1C]'
                        : 'text-[#8C7E70] hover:text-[#231F1C]'
                    }`}
                  >
                    مشخصات و ابعاد
                  </button>
                  <button
                    onClick={() => setActiveTab('care')}
                    className={`text-xs font-semibold pb-1.5 transition-colors ${
                      activeTab === 'care'
                        ? 'text-[#231F1C] border-b-2 border-[#231F1C]'
                        : 'text-[#8C7E70] hover:text-[#231F1C]'
                    }`}
                  >
                    راهنمای مراقبت
                  </button>
                  <button
                    onClick={() => setActiveTab('inbox')}
                    className={`text-xs font-semibold pb-1.5 transition-colors ${
                      activeTab === 'inbox'
                        ? 'text-[#231F1C] border-b-2 border-[#231F1C]'
                        : 'text-[#8C7E70] hover:text-[#231F1C]'
                    }`}
                  >
                    محتویات جعبه
                  </button>
                </div>

                <div className="text-xs text-[#5C5145] space-y-1.5 bg-[#FAF7F2] p-3 rounded-lg">
                  {activeTab === 'details' && (
                    <>
                      <div><strong>ابعاد:</strong> {product.craftDetails.dimensions}</div>
                      <div><strong>وزن:</strong> {product.craftDetails.weight}</div>
                      <div><strong>مواد اولیه:</strong> {product.craftDetails.materials.join('، ')}</div>
                    </>
                  )}
                  {activeTab === 'care' && (
                    <p className="leading-relaxed">{product.craftDetails.careInstructions}</p>
                  )}
                  {activeTab === 'inbox' && (
                    <ul className="list-disc list-inside space-y-1">
                      {product.craftDetails.inBox.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Gift Wrap Option */}
              <label className="flex items-center gap-2.5 p-3 rounded-xl border border-[#E6DDD0] bg-[#FAF8F5] mb-6 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={giftWrap}
                  onChange={(e) => setGiftWrap(e.target.checked)}
                  className="w-4 h-4 rounded text-[#2C2723] focus:ring-0 cursor-pointer accent-[#2C2723]"
                />
                <Gift className="w-4 h-4 text-[#7A4B29]" />
                <div className="text-xs">
                  <span className="font-semibold text-[#2C2723]">بسته‌بندی هدیه فاخر کارگاهی</span>
                  <span className="text-[#877A6D] mr-1">(جعبه دست‌ساز، روبان کتان و کارت تبریک بدون هزینه اضافی)</span>
                </div>
              </label>

            </div>

            {/* Sticky Actions Bar at Bottom of Modal */}
            <div className="pt-4 border-t border-[#EAE3D9] flex items-center gap-3">
              {/* Quantity Stepper */}
              <div className="flex items-center border border-[#DDD3C6] rounded-xl overflow-hidden bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 text-sm text-[#4E443B] hover:bg-[#F2ECE2] transition-colors"
                >
                  -
                </button>
                <span className="px-3 py-2 text-xs font-bold text-[#231F1C] tabular-nums min-w-[28px] text-center">
                  {toPersianDigits(quantity)}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(product.stockCount || 5, q + 1))}
                  className="px-3 py-2 text-sm text-[#4E443B] hover:bg-[#F2ECE2] transition-colors"
                >
                  +
                </button>
              </div>

              {/* Add to Cart CTA */}
              <button
                type="button"
                onClick={handleAdd}
                disabled={!product.inStock}
                className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-sm ${
                  isSuccessFeedback
                    ? 'bg-emerald-700 text-white'
                    : product.inStock
                    ? 'bg-[#2C2723] hover:bg-[#433B35] text-[#FAF8F5]'
                    : 'bg-stone-200 text-stone-500 cursor-not-allowed'
                }`}
              >
                {isSuccessFeedback ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>به سبد خرید شما افزوده شد</span>
                  </>
                ) : product.inStock ? (
                  <>
                    <span>افزودن به سبد خرید</span>
                    <span className="tabular-nums font-bold">({formatPrice(product.price * quantity)})</span>
                  </>
                ) : (
                  <span>ناموجود در انبار کارگاه</span>
                )}
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
