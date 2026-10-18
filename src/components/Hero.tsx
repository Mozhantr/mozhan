import { ArrowLeft, Sparkles, ShieldCheck, HeartHandshake, PackageCheck } from 'lucide-react';
import heroCeramicsImg from '../assets/images/hero_artisan_ceramics_1792310805658.jpg';

interface HeroProps {
  onExploreClick: () => void;
  onCustomOrderClick: () => void;
}

export function Hero({ onExploreClick, onCustomOrderClick }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#FAF8F5] pt-8 pb-16 border-b border-[#EAE3D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 2-Column Balanced Split Screen */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Content Column (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Subtle natural kicker (no pill) */}
            <div className="flex items-center gap-2 text-xs font-medium text-[#8A6D4B] mb-4">
              <Sparkles className="w-4 h-4 text-[#C19A6B]" />
              <span>کارگاه مستقل دست‌ساخته‌های اصیل ایرانی</span>
              <span aria-hidden="true" className="text-[#D0C4B4]">·</span>
              <span>خاک، چرم، فلز و چوب</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#231F1C] leading-[1.3] tracking-tight mb-6 [text-wrap:balance]">
              جلوه‌ای از هنر دست و اصالت کهن در خانه و استایل شما
            </h1>

            {/* Editorial Body */}
            <p className="text-base sm:text-lg text-[#61564C] leading-relaxed mb-8 max-w-2xl font-light">
              هر قطعه در کارگاه دستانه نه یک محصول تیراژی کارخانه‌ای، بلکه حاصل روزها ممارست عاشقانه استادکاران است. قطعاتی منحصر‌به‌فرد با شناسنامه اصالت که با خاک پاک لالجین، چرم دباغی گیاهی تبریز و چوب‌های کهنسال فرم یافته‌اند.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button
                onClick={onExploreClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#2C2723] hover:bg-[#433B35] text-[#FAF8F5] rounded-xl text-sm font-semibold transition-all shadow-sm hover:shadow active:scale-[0.98] whitespace-nowrap shrink-0"
              >
                <span>مشاهده دست‌سازه‌های آماده ارسال</span>
                <ArrowLeft className="w-4 h-4 text-[#D8C7B5]" />
              </button>

              <button
                onClick={onCustomOrderClick}
                className="inline-flex items-center justify-center px-6 py-3.5 border border-[#C5B8A8] text-[#433B35] hover:bg-[#F2ECE2] rounded-xl text-sm font-semibold transition-all whitespace-nowrap shrink-0"
              >
                سفارش ساخت اختصاصی با ابعاد دلخواه
              </button>
            </div>

            {/* Quick Artisan Note */}
            <div className="text-xs text-[#7A6F62] flex items-center gap-3 border-t border-[#EAE3D9] pt-4">
              <span className="font-semibold text-[#38312A]">ظرفیت کارگاه:</span>
              <span>پذیرش ماهانه حداکثر ۶۰ قطعه جهت تضمین کیفیت ساخت دستی</span>
            </div>

          </div>

          {/* Media Showcase Column (5 cols) */}
          <div className="lg:col-span-5 relative flex items-center">
            <div className="w-full h-full min-h-[380px] sm:min-h-[460px] rounded-2xl overflow-hidden shadow-lg border border-[#E2D8CC] relative group">
              <img
                src={heroCeramicsImg}
                alt="استادکار در حال شکل‌دهی سفال با چرخ سنتی در کارگاه دستانه"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 ease-out"
              />
              
              {/* Subtle scrim with caption */}
              <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/85 via-black/40 to-transparent text-white">
                <p className="text-sm font-medium text-white/95">
                  چرخ‌کاری دستی ظروف رسی در آتلیه سفالگری دستانه
                </p>
                <div className="flex items-center gap-3 text-xs text-stone-300 mt-1">
                  <span>پخت کوره ۱۱۵۰ درجه</span>
                  <span aria-hidden="true">·</span>
                  <span>لعاب گیاهی بدون سرب</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 3-Column Trust Strip Below Hero */}
        <div className="mt-14 pt-10 border-t border-[#EAE3D9] grid grid-cols-1 sm:grid-cols-3 gap-6 text-[#433B35]">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#F2EBE0] text-[#7A4B29] rounded-xl shrink-0">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#231F1C] mb-1">۱۰۰٪ اثر دست‌ساز اصیل</h4>
              <p className="text-xs text-[#6B5F52] leading-relaxed">
                تولید بدون خطوط مونتاژ صنعتی؛ هر اثر توسط یک استادکار مشخص خلق می‌شود.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#F2EBE0] text-[#7A4B29] rounded-xl shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#231F1C] mb-1">شناسنامه مکتوب و ضمانت اصالت</h4>
              <p className="text-xs text-[#6B5F52] leading-relaxed">
                همراه با کارت فیزیکی مشخصات، تاریخ کوره، امضای هنرمند و شماره منحصر‌به‌فرد.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#F2EBE0] text-[#7A4B29] rounded-xl shrink-0">
              <PackageCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#231F1C] mb-1">بسته‌بندی ایمن و زیست‌سازگار</h4>
              <p className="text-xs text-[#6B5F52] leading-relaxed">
                جعبه‌های چوبی و مقوایی دست‌ساز، کاغذ کاهی ضدضربه و بدون ذره‌ای یونولیت یا پلاستیک.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
