import { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowLeft, Gift, Tag, Check, Sparkles } from 'lucide-react';
import { CartItem } from '../types/store';
import { formatPrice, toPersianDigits, FREE_SHIPPING_THRESHOLD } from '../utils/formatters';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
  couponCode: string;
  appliedDiscountPercent: number;
  onApplyCoupon: (code: string) => boolean;
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  couponCode,
  appliedDiscountPercent,
  onApplyCoupon,
}: CartDrawerProps) {
  const [couponInput, setCouponInput] = useState(couponCode);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * appliedDiscountPercent) / 100);
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const shippingCost = items.length === 0 ? 0 : isFreeShipping ? 0 : 45000;
  const finalTotal = subtotal - discountAmount + shippingCost;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const success = onApplyCoupon(couponInput.trim().toUpperCase());
    if (success) {
      setCouponSuccess('کد تخفیف با موفقیت اعمال گردید!');
      setCouponError('');
    } else {
      setCouponError('کد تخفیف معتبر نیست (کد DASTANEH یا NOROOZ را امتحان کنید)');
      setCouponSuccess('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end">
      
      {/* Drawer Panel */}
      <div
        className="w-full max-w-md bg-[#FFFFFF] h-full shadow-2xl flex flex-col border-r border-[#EAE3D9] animate-in slide-in-from-left duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#EAE3D9] flex items-center justify-between bg-[#FAF8F5]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#2C2723]" />
            <h2 className="text-base font-bold text-[#2C2723]">سبد خرید شما</h2>
            <span className="text-xs text-[#827466] tabular-nums">
              ({toPersianDigits(items.length)} اثر دست‌ساز)
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#6E6153] hover:text-[#231F1C] hover:bg-[#F0E9DF] rounded-lg transition-colors"
            aria-label="بستن سبد"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-[#F6F1EA] px-5 py-3 border-b border-[#E8DEC0]/40 text-xs">
          {isFreeShipping ? (
            <div className="flex items-center gap-2 text-emerald-800 font-semibold">
              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>تبریک! سفارش شما شامل ارسال رایگان کارگاهی است.</span>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between text-[#5C5044] mb-1.5">
                <span>فقط {formatPrice(remainingForFreeShipping)} تا ارسال رایگان</span>
                <span className="font-bold tabular-nums">
                  {Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%
                </span>
              </div>
              <div className="w-full bg-[#E5DCD0] h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#7A4B29] h-full transition-all duration-300 rounded-full"
                  style={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Itemized Cart List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag className="w-12 h-12 text-[#C4B7A9] mx-auto mb-3" />
              <p className="text-sm font-semibold text-[#2C2723] mb-1">
                سبد خرید شما خالی است
              </p>
              <p className="text-xs text-[#7D7062] mb-6">
                آثار هنرمندان ما را مرور کنید و اثر دلخواهتان را به سبد بیفزایید.
              </p>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-[#2C2723] text-white text-xs font-medium rounded-lg hover:bg-[#433B35]"
              >
                مشاهده دست‌سازه‌ها
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                className="flex items-start gap-3 p-3 rounded-xl border border-[#ECE4D8] bg-[#FAF8F5]/60 hover:bg-[#FAF8F5] transition-colors"
              >
                {/* Thumbnail */}
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  referrerPolicy="no-referrer"
                  className="w-18 h-18 rounded-lg object-cover border border-[#E0D5C7] shrink-0"
                />

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-[#2C2723] truncate mb-0.5">
                    {item.product.name}
                  </h4>
                  <div className="text-[11px] text-[#85776A] mb-2">
                    استاد {item.product.craftDetails.artisanName}
                  </div>

                  {item.giftWrap && (
                    <div className="flex items-center gap-1 text-[11px] text-[#7A4B29] mb-2 font-medium">
                      <Gift className="w-3 h-3" />
                      <span>با بسته‌بندی کادویی اختصاصی</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between gap-2">
                    {/* Stepper */}
                    <div className="flex items-center border border-[#DDD3C6] rounded-md bg-white">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="px-2 py-0.5 text-xs text-[#4E443B] hover:bg-[#F2ECE2]"
                      >
                        -
                      </button>
                      <span className="px-2 py-0.5 text-xs font-semibold tabular-nums min-w-[20px] text-center">
                        {toPersianDigits(item.quantity)}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="px-2 py-0.5 text-xs text-[#4E443B] hover:bg-[#F2ECE2]"
                      >
                        +
                      </button>
                    </div>

                    {/* Price */}
                    <span className="text-xs font-bold text-[#2C2723] tabular-nums">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>

                {/* Remove */}
                <button
                  type="button"
                  onClick={() => onRemoveItem(item.product.id)}
                  className="p-1 text-[#A89A8C] hover:text-[#B85C4B] transition-colors"
                  aria-label="حذف اثر"
                  title="حذف"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer & Calculations (Only if items exist) */}
        {items.length > 0 && (
          <div className="p-5 border-t border-[#EAE3D9] bg-[#FAF8F5] space-y-4">
            
            {/* Coupon Code Input */}
            <form onSubmit={handleApplyCoupon} className="space-y-1">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="کد تخفیف (مثال: DASTANEH)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="w-full bg-white border border-[#DDD3C6] rounded-lg px-3 py-1.5 pr-8 text-xs text-[#2C2723] uppercase placeholder:normal-case placeholder-[#9E9182] focus:outline-none focus:border-[#7A4B29]"
                  />
                  <Tag className="w-3.5 h-3.5 text-[#9E9182] absolute right-2.5 top-2.5" />
                </div>
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-[#433B35] hover:bg-[#2C2723] text-white text-xs font-medium rounded-lg transition-colors whitespace-nowrap"
                >
                  اعمال کد
                </button>
              </div>
              {couponError && <p className="text-[11px] text-rose-600">{couponError}</p>}
              {couponSuccess && <p className="text-[11px] text-emerald-700">{couponSuccess}</p>}
            </form>

            {/* Price Breakdown */}
            <div className="space-y-1.5 text-xs text-[#5C5145] border-t border-[#EAE3D9] pt-3">
              <div className="flex justify-between">
                <span>مجموع ارزش دست‌سازه‌ها:</span>
                <span className="tabular-nums font-semibold">{formatPrice(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>تخفیف همراهی ({toPersianDigits(appliedDiscountPercent)}٪):</span>
                  <span className="tabular-nums">- {formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>هزینه بسته‌بندی و ارسال:</span>
                <span className="tabular-nums font-semibold">
                  {isFreeShipping ? 'رایگان (هدیه کارگاه)' : formatPrice(shippingCost)}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#231F1C] border-t border-[#EAE3D9] pt-2">
                <span>مبلغ نهایی پرداخت:</span>
                <span className="tabular-nums text-base">{formatPrice(finalTotal)}</span>
              </div>
            </div>

            {/* Primary Action Button */}
            <button
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full py-3.5 px-4 bg-[#2C2723] hover:bg-[#433B35] text-[#FAF8F5] rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-sm active:scale-[0.99]"
            >
              <span>ادامه جهت ثبت آدرس و تکمیل خرید</span>
              <ArrowLeft className="w-4 h-4 text-[#D8C7B5]" />
            </button>

            <p className="text-[11px] text-center text-[#8C7D6D]">
              ضمانت سلامت فیزیکی اثر در هنگام تحویل و بازگشت ۷ روزه کالا
            </p>

          </div>
        )}

      </div>

    </div>
  );
}
