import { useState } from 'react';
import { X, Sparkles, CheckCircle2, Ruler, Palette, FileText, Phone, User } from 'lucide-react';
import { CustomInquiry } from '../types/store';
import { toPersianDigits, formatPrice } from '../utils/formatters';

interface CustomOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitInquiry: (inquiry: CustomInquiry) => void;
}

export function CustomOrderModal({ isOpen, onClose, onSubmitInquiry }: CustomOrderModalProps) {
  const [craftType, setCraftType] = useState('ceramics');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [dimensions, setDimensions] = useState('');
  const [materialPreference, setMaterialPreference] = useState('');
  const [notes, setNotes] = useState('');
  const [budgetTier, setBudgetTier] = useState<number>(1200000);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone || !notes) {
      alert('لطفاً نام، شماره تماس و توضیحات طرح مدنظرتان را وارد فرمایید.');
      return;
    }

    const inquiry: CustomInquiry = {
      id: `inq_${Date.now()}`,
      craftType,
      customerName,
      phone,
      dimensions,
      materialPreference,
      notes,
      estimatedBudget: budgetTier,
      date: new Date().toLocaleDateString('fa-IR'),
    };

    onSubmitInquiry(inquiry);
    setIsSubmitted(true);
  };

  const craftTypes = [
    { id: 'ceramics', label: 'سفال و سرامیک اختصاصی', desc: 'فرم‌های دفرمه، لعاب‌های سفارشی، ست‌های پذیرایی' },
    { id: 'leather', label: 'چرم طبیعی دست‌دوز سفارشی', desc: 'کیف‌های خاص، فولدر اداری با حک نام، بند ساعت' },
    { id: 'jewelry', label: 'زیورآلات برنج و سنگ معدنی', desc: 'طراحی مفهومی با سنگ‌های ماه تولد و خطاطی' },
    { id: 'woodwork', label: 'سازه و ظروف چوب کهنسال', desc: 'میزهای روستیک، تخته‌های سرو یکپارچه با گره خاص' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      
      <div
        className="relative bg-white rounded-2xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#EAE3D9] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-5 border-b border-[#EAE3D9] flex items-center justify-between bg-[#FAF8F5]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#7A4B29]" />
            <div>
              <h2 className="text-base font-bold text-[#231F1C]">سفارش ساخت اثر دست‌ساز اختصاصی</h2>
              <p className="text-[11px] text-[#786D61]">خلق اثر منحصر‌به‌فرد منطبق با سلیقه، ابعاد و نیاز شما</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#6E6153] hover:text-[#231F1C] hover:bg-[#F0E9DF] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-[#231F1C]">
              درخواست ساخت اثر شما دریافت شد
            </h3>
            <p className="text-xs text-[#6A5D50] leading-relaxed max-w-md mx-auto">
              استادکار مربوطه طی ۲۴ ساعت آینده جهت هماهنگی طرح اولیه، انتخاب مواد اولیه و برآورد دقیق زمان تحویل با شما از طریق تلفن یا پیام‌رسان تماس خواهد گرفت.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 bg-[#2C2723] hover:bg-[#433B35] text-white text-xs font-semibold rounded-xl"
            >
              متوجه شدم
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            
            {/* Step 1: Craft Type */}
            <div>
              <label className="block text-xs font-bold text-[#2C2723] mb-2">
                نوع هنر و متریال مدنظر:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {craftTypes.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setCraftType(c.id)}
                    className={`p-3 rounded-xl border text-right transition-colors ${
                      craftType === c.id
                        ? 'border-[#2C2723] bg-[#FAF8F5]'
                        : 'border-[#E2D8CB] bg-white hover:bg-[#FAF8F5]/50'
                    }`}
                  >
                    <div className="text-xs font-bold text-[#231F1C]">{c.label}</div>
                    <div className="text-[10px] text-[#7A6D5F] mt-0.5">{c.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Dimensions & Materials */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-[#4C4136] mb-1 flex items-center gap-1">
                  <Ruler className="w-3.5 h-3.5 text-[#8C7D6D]" />
                  <span>ابعاد تقریبی (اختیاری)</span>
                </label>
                <input
                  type="text"
                  placeholder="مثلاً ۳۰ در ۲۰ سانتی‌متر"
                  value={dimensions}
                  onChange={(e) => setDimensions(e.target.value)}
                  className="w-full bg-white border border-[#DDD3C6] rounded-lg px-3 py-2 text-xs text-[#2C2723] focus:outline-none focus:border-[#7A4B29]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#4C4136] mb-1 flex items-center gap-1">
                  <Palette className="w-3.5 h-3.5 text-[#8C7D6D]" />
                  <span>تم رنگی یا سنگ ترجیحی</span>
                </label>
                <input
                  type="text"
                  placeholder="مثلاً خاکی مات، سنگ عقیق یمنی، چرم قهوه‌ای سوخته"
                  value={materialPreference}
                  onChange={(e) => setMaterialPreference(e.target.value)}
                  className="w-full bg-white border border-[#DDD3C6] rounded-lg px-3 py-2 text-xs text-[#2C2723] focus:outline-none focus:border-[#7A4B29]"
                />
              </div>
            </div>

            {/* Step 3: Detailed Notes */}
            <div>
              <label className="block text-xs font-medium text-[#4C4136] mb-1 flex items-center gap-1">
                <FileText className="w-3.5 h-3.5 text-[#8C7D6D]" />
                <span>شرح ایده یا موارد حکاکی و سفارشی‌سازی <span className="text-rose-500">*</span></span>
              </label>
              <textarea
                required
                rows={3}
                placeholder="توضیح دهید اثر را برای چه کاربردی می‌خواهید؟ آیا نیاز به حک نام یا بیت شعر خاصی روی اثر دارید؟"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-white border border-[#DDD3C6] rounded-lg px-3 py-2 text-xs text-[#2C2723] focus:outline-none focus:border-[#7A4B29]"
              />
            </div>

            {/* Estimated Budget Selector */}
            <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-[#EAE3D9]">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-[#2C2723]">بودجه تخمینی پیشنهادی شما:</span>
                <span className="font-bold text-[#7A4B29] tabular-nums">{formatPrice(budgetTier)}</span>
              </div>
              <input
                type="range"
                min={500000}
                max={5000000}
                step={100000}
                value={budgetTier}
                onChange={(e) => setBudgetTier(Number(e.target.value))}
                className="w-full accent-[#2C2723] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#8C7E70] mt-1 tabular-nums">
                <span>۵۰۰,۰۰۰ ت</span>
                <span>۲,۵۰۰,۰۰۰ ت</span>
                <span>۵,۰۰۰,۰۰۰ ت</span>
              </div>
            </div>

            {/* Customer Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-[#4C4136] mb-1 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-[#8C7D6D]" />
                  <span>نام و نام خانوادگی <span className="text-rose-500">*</span></span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="نام شما"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-white border border-[#DDD3C6] rounded-lg px-3 py-2 text-xs text-[#2C2723] focus:outline-none focus:border-[#7A4B29]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#4C4136] mb-1 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-[#8C7D6D]" />
                  <span>شماره تماس (جهت هماهنگی طرح) <span className="text-rose-500">*</span></span>
                </label>
                <input
                  type="tel"
                  required
                  dir="ltr"
                  placeholder="09123456789"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-white border border-[#DDD3C6] rounded-lg px-3 py-2 text-xs text-[#2C2723] text-left focus:outline-none focus:border-[#7A4B29]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#2C2723] hover:bg-[#433B35] text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors shadow-sm"
            >
              ثبت درخواست ساخت اختصاصی در کارگاه
            </button>

          </form>
        )}

      </div>

    </div>
  );
}
