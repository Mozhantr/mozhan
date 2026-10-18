import { Leaf, Flame, Sparkles, Feather } from 'lucide-react';
import heroCeramicsImg from '../assets/images/hero_artisan_ceramics_1792310805658.jpg';

export function ArtisanStory() {
  return (
    <section id="story" className="py-20 bg-[#F5EFE6] border-y border-[#EAE2D5] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Visual Side */}
          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-md border border-[#DDD3C4]">
              <img
                src={heroCeramicsImg}
                alt="کارگاه ساخت سفال و دستان استادکار"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Floating Editorial Quote */}
            <div className="mt-4 p-4 bg-[#FFFFFF] rounded-xl border border-[#E0D7C9] text-xs text-[#52463B] leading-relaxed">
              <p className="italic mb-2">
                «در عصری که همه چیز سریع، مصرفی و بی‌روح تولید می‌شود، ما تعمداً آهسته کار می‌کنیم تا روح دست و خاک در اثر جاودانه بماند.»
              </p>
              <span className="font-bold text-[#231F1C] block text-[11px]">— بیانیه هنری کارگاه دستانه</span>
            </div>
          </div>

          {/* Editorial Content */}
          <div className="lg:col-span-7">
            
            <div className="text-xs font-semibold text-[#8C7456] tracking-wider mb-2">
              فلسفه و اصالت
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#231F1C] mb-6 leading-tight [text-wrap:balance]">
              احیای صنایع دستی بومی ایران با زبانی مینیمال و کاربردی
            </h2>

            <p className="text-sm sm:text-base text-[#5E5246] leading-relaxed mb-6 font-light">
              کارگاه دستانه در سال ۱۳۹۸ با یک میز کوچک سفالگری و عشق به بافت‌های طبیعی آغاز به کار کرد. امروز شبکه‌ای از ۲۰ استادکار مستقل زن و مرد در شهرهای لالجین، تبریز، اصفهان، ساری و میبد گردهم آمده‌اند تا با حفظ تکنیک‌های چندصدساله، اشیایی خلق کنند که با معماری و زندگی مدرن امروز هماهنگ باشد.
            </p>

            {/* 4 Pillars of Slow Craft */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#E2D8C9]">
              
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-[#231F1C]">
                  <Leaf className="w-4 h-4 text-[#607D3B]" />
                  <span>مواد اولیه ارگانیک و پاک</span>
                </div>
                <p className="text-xs text-[#6B5E51] leading-relaxed">
                  چرم‌های دباغی گیاهی بدون کروم، لعاب‌های بدون سرب و چوب‌های خشک طبیعی درختان افتاده.
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-[#231F1C]">
                  <Flame className="w-4 h-4 text-[#B85C4B]" />
                  <span>پخت صبورانه و سنتی</span>
                </div>
                <p className="text-xs text-[#6B5E51] leading-relaxed">
                  ظروف سفالی دو بار در کوره‌های حرارت بالا پخته می‌شوند تا استحکام و پایداری مادام‌العمر داشته باشند.
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-[#231F1C]">
                  <Feather className="w-4 h-4 text-[#8C6B46]" />
                  <span>بدون کپی و قالب‌ریزی</span>
                </div>
                <p className="text-xs text-[#6B5E51] leading-relaxed">
                  رد انگشتان، اثر چکش و رگه‌های طبیعی چوب در هر قطعه منحصر است و هیچ دو اثر تکراری وجود ندارد.
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-[#231F1C]">
                  <Sparkles className="w-4 h-4 text-[#C19A6B]" />
                  <span>بسته‌بندی بدون پلاستیک</span>
                </div>
                <p className="text-xs text-[#6B5E51] leading-relaxed">
                  ارسال در جعبه‌های کرافت بازیافتی با پوشال چوبی طبیعی و کارت شناسنامه اثر با دست‌خط هنرمند.
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
