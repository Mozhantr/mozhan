import { useState } from 'react';
import { X, Sparkles } from 'lucide-react';

export function AnnouncementBar() {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="bg-[#2C2723] text-[#F4EDE4] text-xs py-2 px-4 border-b border-[#3D3732] flex items-center justify-between">
      <div className="mx-auto flex items-center gap-2 font-medium tracking-wide">
        <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
        <span>ارسال رایگان به سراسر کشور برای خریدهای بالای ۱،۵۰۰،۰۰۰ تومان</span>
        <span className="text-[#8E8377] hidden sm:inline">|</span>
        <span className="hidden sm:inline text-[#DDD3C7]">بسته‌بندی هدیه دست‌ساز کارگاهی با کارت شناسنامه اثر</span>
      </div>
      <button
        onClick={() => setIsOpen(false)}
        className="text-[#B5A899] hover:text-white transition-colors p-0.5 rounded"
        aria-label="بستن پیام"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
