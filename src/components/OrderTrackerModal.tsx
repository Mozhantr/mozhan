import { useState } from 'react';
import { X, Search, Compass, Package, Truck, CheckCircle2, Clock, MapPin } from 'lucide-react';
import { Order } from '../types/store';
import { formatPrice, toPersianDigits } from '../utils/formatters';

interface OrderTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  recentOrders: Order[];
}

export function OrderTrackerModal({ isOpen, onClose, recentOrders }: OrderTrackerModalProps) {
  const [trackingInput, setTrackingInput] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(
    recentOrders.length > 0 ? recentOrders[0] : null
  );
  const [notFound, setNotFound] = useState(false);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingInput.trim()) return;

    const query = trackingInput.trim().toUpperCase();
    const found = recentOrders.find(
      (o) => o.trackingNumber.toUpperCase() === query || o.orderNumber.toUpperCase() === query
    );

    if (found) {
      setSearchedOrder(found);
      setNotFound(false);
    } else {
      // Mock lookup for demo if user types any code
      if (query.startsWith('DST-') || query.length >= 6) {
        const demoOrder: Order = {
          id: 'demo-order',
          orderNumber: 'ORD-94821',
          date: '۱۴۰۳/۰۸/۲۴',
          customerInfo: {
            fullName: 'سفارش ثبت شده',
            phone: '۰۹۱۲***۴۵۶۷',
            province: 'تهران',
            city: 'تهران',
            address: 'تحویل درب منزل با بسته‌بندی ایمن کارگاهی',
            postalCode: '۱۹۸۷۶۵۴۳۲۱',
            giftPackaging: true,
            giftNote: 'همراه با کارت اصالت و شناسنامه',
            deliveryMethod: 'express',
            paymentMethod: 'online',
          },
          items: [],
          subtotal: 1670000,
          discountAmount: 0,
          shippingCost: 0,
          total: 1670000,
          status: 'gift_wrap',
          trackingNumber: query,
        };
        setSearchedOrder(demoOrder);
        setNotFound(false);
      } else {
        setNotFound(true);
      }
    }
  };

  const getStatusStepIndex = (status: Order['status']) => {
    switch (status) {
      case 'crafting':
        return 0;
      case 'gift_wrap':
        return 1;
      case 'shipped':
        return 2;
      case 'delivered':
        return 3;
      default:
        return 1;
    }
  };

  const currentStep = searchedOrder ? getStatusStepIndex(searchedOrder.status) : 1;

  const steps = [
    { label: 'آماده‌سازی اثر در کارگاه', desc: 'بررسی کنترل کیفیت و شناسنامه' },
    { label: 'بسته‌بندی هدیه و ضدضربه', desc: 'جعبه کارگاهی و کاغذ محافظ' },
    { label: 'تحویل به پست / تیپاکس', desc: 'صدور بارنامه رسمی پستی' },
    { label: 'تحویل به خریدار گرامی', desc: 'تکمیل چرخه سفر اثر هنری' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      
      <div
        className="relative bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#EAE3D9] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-5 border-b border-[#EAE3D9] flex items-center justify-between bg-[#FAF8F5]">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-[#7A4B29]" />
            <h2 className="text-base font-bold text-[#231F1C]">رهگیری وضعیت مرسوله کارگاهی</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#6E6153] hover:text-[#231F1C] hover:bg-[#F0E9DF] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          
          {/* Tracking Search Input */}
          <form onSubmit={handleSearch} className="space-y-1">
            <label className="block text-xs font-medium text-[#4D4238] mb-1">
              کد پیگیری اختصاصی دستانه (مانند DST-123456) یا شماره سفارش:
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="مثال: DST-849201"
                  dir="ltr"
                  value={trackingInput}
                  onChange={(e) => {
                    setTrackingInput(e.target.value);
                    setNotFound(false);
                  }}
                  className="w-full bg-white border border-[#DDD3C6] rounded-lg px-3 py-2 text-xs font-mono uppercase text-[#2C2723] focus:outline-none focus:border-[#7A4B29]"
                />
                <Search className="w-4 h-4 text-[#A89C8F] absolute right-3 top-2.5" />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-[#2C2723] hover:bg-[#433B35] text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap"
              >
                استعلام وضعیت
              </button>
            </div>
            {notFound && (
              <p className="text-xs text-rose-600 mt-1">
                سفارشی با این کد یافت نشد. لطفاً کد دریافتی را مجدداً بررسی نمایید.
              </p>
            )}
          </form>

          {/* Quick Click from Recent Orders */}
          {recentOrders.length > 0 && !searchedOrder && (
            <div className="text-xs">
              <span className="text-[#87786B] block mb-2">سفارش‌های اخیر شما در این دستگاه:</span>
              <div className="space-y-1.5">
                {recentOrders.map((ord) => (
                  <button
                    key={ord.id}
                    onClick={() => setSearchedOrder(ord)}
                    className="w-full text-right p-2.5 rounded-lg border border-[#EAE3D9] hover:bg-[#FAF8F5] flex items-center justify-between text-xs"
                  >
                    <span className="font-semibold text-[#2C2723]">{ord.customerInfo.fullName}</span>
                    <span className="font-mono text-[#7A4B29]">{ord.trackingNumber}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Detailed Order Status Display */}
          {searchedOrder && (
            <div className="space-y-5 border-t border-[#EAE3D9] pt-5">
              
              <div className="flex items-center justify-between bg-[#FAF8F5] p-3.5 rounded-xl border border-[#ECE4D8]">
                <div>
                  <span className="text-[11px] text-[#8C7D6E] block">کد رهگیری:</span>
                  <span className="text-sm font-mono font-bold text-[#2C2723]">
                    {searchedOrder.trackingNumber}
                  </span>
                </div>
                <div className="text-left">
                  <span className="text-[11px] text-[#8C7D6E] block">تاریخ ثبت:</span>
                  <span className="text-xs font-semibold text-[#2C2723] tabular-nums">
                    {searchedOrder.date}
                  </span>
                </div>
              </div>

              {/* Step Progress Tracker */}
              <div className="space-y-4 py-2">
                {steps.map((step, idx) => {
                  const isDone = idx <= currentStep;
                  const isCurrent = idx === currentStep;
                  return (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="relative flex flex-col items-center">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                            isDone
                              ? 'bg-[#2C2723] text-white shadow-xs'
                              : 'bg-[#ECE4D8] text-[#8C7E70]'
                          }`}
                        >
                          {isDone ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : toPersianDigits(idx + 1)}
                        </div>
                        {idx < steps.length - 1 && (
                          <div
                            className={`w-0.5 h-7 my-0.5 ${
                              idx < currentStep ? 'bg-[#2C2723]' : 'bg-[#E2D8CB]'
                            }`}
                          />
                        )}
                      </div>

                      <div className="pt-0.5">
                        <h4
                          className={`text-xs font-bold ${
                            isCurrent ? 'text-[#7A4B29]' : isDone ? 'text-[#2C2723]' : 'text-[#8C7E70]'
                          }`}
                        >
                          {step.label}
                          {isCurrent && <span className="mr-2 text-[10px] text-amber-700 font-normal">(مرحله کنونی)</span>}
                        </h4>
                        <p className="text-[11px] text-[#7A6D5E] mt-0.5">{step.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Destination & Recipient Info */}
              <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-[#ECE4D8] text-xs space-y-1.5 text-[#5C5043]">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#A39688]" />
                  <span>
                    مقصد: {searchedOrder.customerInfo.province}، {searchedOrder.customerInfo.city}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#A39688]" />
                  <span>روش تحویل: {searchedOrder.customerInfo.deliveryMethod === 'tipax' ? 'تیپاکس اکسپرس' : 'پست پیشتاز سفارشی'}</span>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}
