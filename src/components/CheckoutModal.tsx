import { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Truck, CreditCard, Gift, ArrowRight, Copy, Check } from 'lucide-react';
import { CartItem, Order, OrderCustomerInfo } from '../types/store';
import { PROVINCES_IRAN } from '../data/products';
import { formatPrice, generateTrackingNumber, toPersianDigits } from '../utils/formatters';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
  discountAmount: number;
  couponCode?: string;
  onOrderCompleted: (order: Order) => void;
}

export function CheckoutModal({
  isOpen,
  onClose,
  items,
  subtotal,
  discountAmount,
  couponCode,
  onOrderCompleted,
}: CheckoutModalProps) {
  // Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedProvince, setSelectedProvince] = useState(PROVINCES_IRAN[0].name);
  const [city, setCity] = useState(PROVINCES_IRAN[0].cities[0]);
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [giftPackaging, setGiftPackaging] = useState(true);
  const [giftNote, setGiftNote] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<'express' | 'tipax' | 'courier'>('express');
  const [paymentMethod, setPaymentMethod] = useState<'online' | 'card_to_card'>('online');

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  if (!isOpen) return null;

  const currentProvinceObj = PROVINCES_IRAN.find((p) => p.name === selectedProvince);
  const shippingCost = subtotal >= 1500000 ? 0 : deliveryMethod === 'tipax' ? 75000 : 45000;
  const finalTotal = subtotal - discountAmount + shippingCost;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !address || !postalCode) {
      alert('لطفاً تمامی مشخصات گیرنده و نشانی پستی را به دقت تکمیل فرمایید.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const orderNumber = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;
      const trackingNumber = generateTrackingNumber();
      const newOrder: Order = {
        id: `ord_${Date.now()}`,
        orderNumber,
        date: new Date().toLocaleDateString('fa-IR'),
        customerInfo: {
          fullName,
          phone,
          province: selectedProvince,
          city,
          address,
          postalCode,
          giftPackaging,
          giftNote,
          deliveryMethod,
          paymentMethod,
        },
        items: [...items],
        subtotal,
        discountAmount,
        shippingCost,
        total: finalTotal,
        couponCode,
        status: 'crafting',
        trackingNumber,
      };

      setConfirmedOrder(newOrder);
      onOrderCompleted(newOrder);
      setIsSubmitting(false);
    }, 1200);
  };

  const copyTracking = () => {
    if (!confirmedOrder) return;
    navigator.clipboard.writeText(confirmedOrder.trackingNumber);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      
      <div
        className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#EAE3D9] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-5 border-b border-[#EAE3D9] flex items-center justify-between bg-[#FAF8F5]">
          <div>
            <h2 className="text-base font-bold text-[#231F1C]">
              {confirmedOrder ? 'سفارش شما با موفقیت در کارگاه ثبت شد' : 'ثبت و تکمیل نهایی سفارش'}
            </h2>
            <p className="text-xs text-[#7A6E61]">
              {confirmedOrder
                ? 'شناسنامه و بسته‌بندی ایمن آثار شما در حال آماده‌سازی است'
                : 'آثار دست‌ساز با بسته‌بندی محافظتی ایمن و بیمه ارسال می‌شوند'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#6E6153] hover:text-[#231F1C] hover:bg-[#F0E9DF] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Confirmed Order State */}
        {confirmedOrder ? (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="text-xl font-bold text-[#231F1C] mb-1">
                سپاس از اعتماد شما به دستان هنرمندان ما
              </h3>
              <p className="text-xs text-[#6A5E52] max-w-md mx-auto leading-relaxed">
                سفارش شما با کد پیگیری زیر در مرحله نهایی آماده‌سازی و بسته‌بندی کارگاهی قرار گرفت.
              </p>
            </div>

            {/* Tracking Code Banner */}
            <div className="bg-[#FAF6F0] border border-[#E6DDD0] p-4 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs text-[#8C7D6D] block">کد رهگیری اختصاصی مرسوله:</span>
                <span className="text-lg font-mono font-bold text-[#2C2723] tracking-wider">
                  {confirmedOrder.trackingNumber}
                </span>
              </div>
              <button
                type="button"
                onClick={copyTracking}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#DDD3C6] hover:bg-[#F2ECE2] rounded-lg text-xs font-medium text-[#2C2723] transition-colors"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? 'کپی شد' : 'کپی کد'}</span>
              </button>
            </div>

            {/* Order Summary Receipt */}
            <div className="border border-[#ECE4D8] rounded-xl p-4 text-xs space-y-2.5 bg-[#FFFFFF]">
              <div className="flex justify-between text-[#6D6154]">
                <span>شماره فاکتور:</span>
                <span className="font-semibold text-[#2C2723]">{confirmedOrder.orderNumber}</span>
              </div>
              <div className="flex justify-between text-[#6D6154]">
                <span>تحویل‌گیرنده:</span>
                <span className="font-semibold text-[#2C2723]">{confirmedOrder.customerInfo.fullName}</span>
              </div>
              <div className="flex justify-between text-[#6D6154]">
                <span>مقصد ارسال:</span>
                <span className="font-semibold text-[#2C2723]">
                  {confirmedOrder.customerInfo.province}، {confirmedOrder.customerInfo.city}
                </span>
              </div>
              <div className="flex justify-between text-[#6D6154]">
                <span>مبلغ پرداخت شده:</span>
                <span className="font-bold text-[#2C2723] tabular-nums text-sm">
                  {formatPrice(confirmedOrder.total)}
                </span>
              </div>
              {confirmedOrder.customerInfo.giftNote && (
                <div className="border-t border-[#F2ECE2] pt-2 text-[#7A4B29]">
                  <span className="font-semibold block mb-0.5">متن کارت تبریک دست‌نویس:</span>
                  <p className="italic">«{confirmedOrder.customerInfo.giftNote}»</p>
                </div>
              )}
            </div>

            {/* Actions */}
            <button
              onClick={onClose}
              className="w-full py-3 bg-[#2C2723] hover:bg-[#433B35] text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors"
            >
              بازگشت به فروشگاه و مشاهده سایر آثار
            </button>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            
            {/* Step 1: Customer Details */}
            <div>
              <h3 className="text-xs font-bold text-[#231F1C] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <span>۱. مشخصات و نشانی گیرنده</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-3.5">
                <div>
                  <label className="block text-xs font-medium text-[#4C4237] mb-1">
                    نام و نام خانوادگی <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: مریم سعادتی"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-white border border-[#DDD4C7] rounded-lg px-3 py-2 text-xs text-[#2C2723] focus:outline-none focus:border-[#7A4B29]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#4C4237] mb-1">
                    شماره تلفن همراه (جهت پیامک رهگیری) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    dir="ltr"
                    placeholder="09123456789"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-white border border-[#DDD4C7] rounded-lg px-3 py-2 text-xs text-[#2C2723] text-left focus:outline-none focus:border-[#7A4B29]"
                  />
                </div>
              </div>

              {/* Province & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-3.5">
                <div>
                  <label className="block text-xs font-medium text-[#4C4237] mb-1">
                    استان مقصد <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={selectedProvince}
                    onChange={(e) => {
                      setSelectedProvince(e.target.value);
                      const p = PROVINCES_IRAN.find((item) => item.name === e.target.value);
                      if (p && p.cities.length > 0) setCity(p.cities[0]);
                    }}
                    className="w-full bg-white border border-[#DDD4C7] rounded-lg px-3 py-2 text-xs text-[#2C2723] focus:outline-none focus:border-[#7A4B29]"
                  >
                    {PROVINCES_IRAN.map((p) => (
                      <option key={p.name} value={p.name}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#4C4237] mb-1">
                    شهر <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-white border border-[#DDD4C7] rounded-lg px-3 py-2 text-xs text-[#2C2723] focus:outline-none focus:border-[#7A4B29]"
                  >
                    {currentProvinceObj?.cities.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Address */}
              <div className="mb-3.5">
                <label className="block text-xs font-medium text-[#4C4237] mb-1">
                  نشانی دقیق پستی (خیابان، کوچه، پلاک، واحد) <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="خیابان ولیعصر، بعد از پارک ساعی، کوچه..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-white border border-[#DDD4C7] rounded-lg px-3 py-2 text-xs text-[#2C2723] focus:outline-none focus:border-[#7A4B29]"
                />
              </div>

              {/* Postal Code */}
              <div>
                <label className="block text-xs font-medium text-[#4C4237] mb-1">
                  کد پستی ۱۰ رقمی <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  maxLength={10}
                  dir="ltr"
                  placeholder="1234567890"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="w-full sm:w-1/2 bg-white border border-[#DDD4C7] rounded-lg px-3 py-2 text-xs text-[#2C2723] text-left focus:outline-none focus:border-[#7A4B29]"
                />
              </div>
            </div>

            {/* Step 2: Shipping & Gift Notes */}
            <div className="border-t border-[#EAE3D9] pt-5">
              <h3 className="text-xs font-bold text-[#231F1C] uppercase tracking-wider mb-3">
                ۲. روش ارسال و بسته‌بندی هدیه
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <label
                  className={`p-3 rounded-xl border cursor-pointer flex items-start gap-2.5 transition-colors ${
                    deliveryMethod === 'express'
                      ? 'border-[#2C2723] bg-[#FAF8F5]'
                      : 'border-[#E0D5C7] bg-white'
                  }`}
                >
                  <input
                    type="radio"
                    name="delivery"
                    checked={deliveryMethod === 'express'}
                    onChange={() => setDeliveryMethod('express')}
                    className="mt-0.5 accent-[#2C2723]"
                  />
                  <div>
                    <div className="text-xs font-bold text-[#2C2723]">پست پیشتاز سفارشی</div>
                    <div className="text-[11px] text-[#7A6E61]">تحویل ۲ الی ۴ روز کاری (ایمن در برابر ضربه)</div>
                  </div>
                </label>

                <label
                  className={`p-3 rounded-xl border cursor-pointer flex items-start gap-2.5 transition-colors ${
                    deliveryMethod === 'tipax'
                      ? 'border-[#2C2723] bg-[#FAF8F5]'
                      : 'border-[#E0D5C7] bg-white'
                  }`}
                >
                  <input
                    type="radio"
                    name="delivery"
                    checked={deliveryMethod === 'tipax'}
                    onChange={() => setDeliveryMethod('tipax')}
                    className="mt-0.5 accent-[#2C2723]"
                  />
                  <div>
                    <div className="text-xs font-bold text-[#2C2723]">تیپاکس اکسپرس</div>
                    <div className="text-[11px] text-[#7A6E61]">تحویل سریع ۲۴ الی ۴۸ ساعته درب منزل</div>
                  </div>
                </label>
              </div>

              {/* Gift Card Note */}
              <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-[#EAE3D9]">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-[#2C2723] mb-2 select-none">
                  <input
                    type="checkbox"
                    checked={giftPackaging}
                    onChange={(e) => setGiftPackaging(e.target.checked)}
                    className="w-4 h-4 rounded accent-[#2C2723]"
                  />
                  <Gift className="w-4 h-4 text-[#7A4B29]" />
                  <span>این سفارش یک هدیه است (بسته‌بندی ویژه کارگاه + کارت تبریک دست‌نویس)</span>
                </label>

                {giftPackaging && (
                  <textarea
                    rows={2}
                    placeholder="متن دلخواه شما برای نوشتن روی کارت شناسنامه اثر (اختیاری)..."
                    value={giftNote}
                    onChange={(e) => setGiftNote(e.target.value)}
                    className="w-full bg-white border border-[#DDD4C7] rounded-lg px-3 py-2 text-xs text-[#2C2723] focus:outline-none focus:border-[#7A4B29]"
                  />
                )}
              </div>
            </div>

            {/* Step 3: Payment Gateway */}
            <div className="border-t border-[#EAE3D9] pt-5">
              <h3 className="text-xs font-bold text-[#231F1C] uppercase tracking-wider mb-3">
                ۳. شیوه پرداخت
              </h3>

              <div className="space-y-2">
                <label
                  className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between transition-colors ${
                    paymentMethod === 'online'
                      ? 'border-[#2C2723] bg-[#FAF8F5]'
                      : 'border-[#E0D5C7] bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'online'}
                      onChange={() => setPaymentMethod('online')}
                      className="accent-[#2C2723]"
                    />
                    <div>
                      <div className="text-xs font-bold text-[#2C2723]">درگاه پرداخت اینترنتی شاپرک (کلیه کارت‌های شتاب)</div>
                      <div className="text-[11px] text-[#7A6E61]">پرداخت امن و آنی با رمز دوم پویا</div>
                    </div>
                  </div>
                  <CreditCard className="w-4 h-4 text-[#7A4B29]" />
                </label>

                <label
                  className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between transition-colors ${
                    paymentMethod === 'card_to_card'
                      ? 'border-[#2C2723] bg-[#FAF8F5]'
                      : 'border-[#E0D5C7] bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'card_to_card'}
                      onChange={() => setPaymentMethod('card_to_card')}
                      className="accent-[#2C2723]"
                    />
                    <div>
                      <div className="text-xs font-bold text-[#2C2723]">کارت به کارت شتابی</div>
                      <div className="text-[11px] text-[#7A6E61]">انتقال وجه و ارسال فیش در پیام‌رسان</div>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Price Review & Submit */}
            <div className="border-t border-[#EAE3D9] pt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs text-[#7A6E61] block">مبلغ نهایی قابل پرداخت:</span>
                <span className="text-xl font-bold text-[#2C2723] tabular-nums">
                  {formatPrice(finalTotal)}
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-7 py-3.5 bg-[#2C2723] hover:bg-[#433B35] text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-75"
              >
                {isSubmitting ? (
                  <span>در حال ثبت در سامانه کارگاه...</span>
                ) : (
                  <>
                    <span>تأیید و پرداخت نهایی</span>
                    <ArrowRight className="w-4 h-4 rotate-180" />
                  </>
                )}
              </button>
            </div>

          </form>
        )}

      </div>

    </div>
  );
}
