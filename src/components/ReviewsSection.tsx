import { Star, ShieldCheck, Heart } from 'lucide-react';
import { REVIEWS_DATA } from '../data/products';
import { toPersianDigits } from '../utils/formatters';

export function ReviewsSection() {
  return (
    <section id="reviews" className="py-20 bg-[#FAF8F5] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Adjacency Proof */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs font-semibold text-[#8C7456] tracking-wider mb-2">
            تجربه خریداران و همراهان
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#231F1C] tracking-tight mb-3">
            حس حضور هنر دست در خانه‌های شما
          </h2>
          <div className="flex items-center justify-center gap-2 text-xs text-[#6B5E51]">
            <div className="flex items-center text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-500" />
              ))}
            </div>
            <span className="font-bold text-[#231F1C] tabular-nums">۴.۹۳ از ۵</span>
            <span aria-hidden="true" className="text-[#DDD3C7]">·</span>
            <span>بیش از ۱،۴۲۰ سفارش دست‌ساز موفق</span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {REVIEWS_DATA.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#ECE4D8] flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow"
            >
              <div>
                {/* Rating Stars & Date */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                    ))}
                  </div>
                  <span className="text-xs text-[#A19588]">{rev.date}</span>
                </div>

                {/* Comment Text */}
                <p className="text-xs sm:text-sm text-[#4E4338] leading-relaxed mb-6 font-light">
                  «{rev.comment}»
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-[#F2ECE2] flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#231F1C]">{rev.author}</h4>
                  <div className="text-[11px] text-[#8C7E70]">
                    {rev.city} · خرید {rev.productName}
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[11px] text-emerald-800 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>خریدار تاییدشده</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
