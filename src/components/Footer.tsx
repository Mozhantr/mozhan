import { MapPin, Phone, Mail, Instagram, Send, ShieldCheck, RefreshCw, PackageCheck } from 'lucide-react';
import { toPersianDigits } from '../utils/formatters';

interface FooterProps {
  onOpenCustomOrder: () => void;
  onOpenTracker: () => void;
}

export function Footer({ onOpenCustomOrder, onOpenTracker }: FooterProps) {
  return (
    <footer className="bg-[#241F1C] text-[#DDD3C7] pt-16 pb-12 border-t border-[#3B342F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#3B342F]">
          
          {/* Brand & Studio Mission (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <span>کارگاه دست‌سازه‌های دستانه</span>
            </div>
            <p className="text-xs text-[#B5A797] leading-relaxed">
              آتلیه و پلتفرم تخصصی معرفی و عرضه بی‌واسطه آثار فاخر سرامیک، چرم دست‌دوز، چوب کهنسال و زیورآلات مفهومی با دست‌رنج استادکاران مستقل سراسر ایران.
            </p>
            <div className="pt-2 text-xs text-[#8C7D6D] flex flex-col gap-1.5">
              <span>نشانی آتلیه مرکزی: تهران، خیابان کریمخان زند، کوچه آبان جنوبی، پلاک ۱۴</span>
              <span>ساعات بازدید حضوری از کارگاه: روزهای فرد ۱۰:۰۰ الی ۱۸:۰۰</span>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              دسترسی سریع به بخش‌ها
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#catalog" className="text-[#B5A797] hover:text-white transition-colors">
                  گالری و کاتالوگ دست‌سازه‌ها
                </a>
              </li>
              <li>
                <a href="#story" className="text-[#B5A797] hover:text-white transition-colors">
                  فلسفه کارگاه و استادکاران
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenCustomOrder}
                  className="text-[#B5A797] hover:text-white transition-colors text-right"
                >
                  سفارش اثر اختصاصی و هدیه سازمانی
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTracker}
                  className="text-[#B5A797] hover:text-white transition-colors text-right"
                >
                  سامانه رهگیری مرسولات پستی
                </button>
              </li>
              <li>
                <a href="#reviews" className="text-[#B5A797] hover:text-white transition-colors">
                  نظرات و تصاویر خریداران
                </a>
              </li>
            </ul>
          </div>

          {/* Guarantees & Trust (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              تعهدات و ضمانت دستانه
            </h4>
            <div className="space-y-2 text-xs text-[#B5A797]">
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>صدور شناسنامه اصالت به همراه امضای استادکار</span>
              </div>
              <div className="flex items-start gap-2">
                <RefreshCw className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>ضمانت ۷ روزه بازگشت بی‌قیدوشرط کالا در صورت عدم رضایت</span>
              </div>
              <div className="flex items-start gap-2">
                <PackageCheck className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>بسته‌بندی تخصصی ضدضربه با مواد بازیافتی دوستدار زمین</span>
              </div>
            </div>
          </div>

          {/* Direct Contact (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              ارتباط با آتلیه
            </h4>
            <div className="space-y-2.5 text-xs text-[#B5A797]">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span dir="ltr" className="tabular-nums">۰۲۱-۸۸۹۲۱۴۳۰</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>studio@dastaneh.ir</span>
              </div>
              <div className="flex items-center gap-2 pt-2">
                <span className="text-[11px] text-[#A69786]">پاسخگویی پشتیبانی: شنبه تا چهارشنبه ۹ تا ۱۷</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Quiet Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#7A6D5E] gap-4">
          <p>© {toPersianDigits(1403)} تمامی حقوق مادی و معنوی متعلق به کارگاه دست‌سازه‌های دستانه است.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>حفظ حریم خصوصی</span>
            <span aria-hidden="true">·</span>
            <span>شرایط ضمانت و مرجوعی</span>
            <span aria-hidden="true">·</span>
            <span>عضو اتحادیه صنایع دستی ایران</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
