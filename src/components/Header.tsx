import { useState } from 'react';
import { ShoppingBag, Heart, Search, Menu, X, Compass } from 'lucide-react';
import { toPersianDigits } from '../utils/formatters';

interface HeaderProps {
  cartCount: number;
  favoritesCount: number;
  onOpenCart: () => void;
  onOpenTracker: () => void;
  onOpenCustomOrder: () => void;
  onSearchChange: (query: string) => void;
  searchQuery: string;
}

export function Header({
  cartCount,
  favoritesCount,
  onOpenCart,
  onOpenTracker,
  onOpenCustomOrder,
  onSearchChange,
  searchQuery,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#EAE3D9] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar 3-Zone Contract */}
        <div className="flex items-center justify-between gap-8 h-20">
          
          {/* Zone 1: Brand Wordmark (Single Text Element) */}
          <a
            href="/"
            className="text-2xl font-bold tracking-tight text-[#231F1C] hover:text-[#7A4B29] transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
          >
            <span>کارگاه دستانه</span>
            <span className="text-xs font-normal text-[#9B8F80] font-serif-display border-r border-[#D9D0C3] pr-2 mr-1">
              Dastaneh Atelier
            </span>
          </a>

          {/* Zone 2: 4-5 Clean Single-Line Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#5A5046]">
            <a
              href="#catalog"
              className="hover:text-[#231F1C] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 decoration-[#BFA68A]"
            >
              دست‌سازه‌ها
            </a>
            <a
              href="#story"
              className="hover:text-[#231F1C] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 decoration-[#BFA68A]"
            >
              داستان کارگاه
            </a>
            <button
              onClick={onOpenCustomOrder}
              className="hover:text-[#231F1C] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 decoration-[#BFA68A]"
            >
              سفارش اختصاصی
            </button>
            <button
              onClick={onOpenTracker}
              className="hover:text-[#231F1C] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 decoration-[#BFA68A] flex items-center gap-1.5"
            >
              <Compass className="w-4 h-4 text-[#8C7662]" />
              <span>پیگیری سفارش</span>
            </button>
            <a
              href="#reviews"
              className="hover:text-[#231F1C] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 decoration-[#BFA68A]"
            >
              دیدگاه هنردوستان
            </a>
          </nav>

          {/* Zone 3: Primary Actions (Search, Wishlist, Cart) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Search Toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-[#5A5046] hover:text-[#231F1C] hover:bg-[#F2ECE2] rounded-lg transition-colors"
              aria-label="جستجو در دست‌سازه‌ها"
              title="جستجو"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Favorites Icon */}
            {favoritesCount > 0 && (
              <a
                href="#catalog"
                className="relative p-2 text-[#5A5046] hover:text-[#231F1C] hover:bg-[#F2ECE2] rounded-lg transition-colors"
                title="علاقه‌مندی‌ها"
              >
                <Heart className="w-5 h-5 fill-[#B85C4B] text-[#B85C4B]" />
                <span className="absolute -top-1 -right-1 bg-[#B85C4B] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center tabular-nums">
                  {toPersianDigits(favoritesCount)}
                </span>
              </a>
            )}

            {/* Primary Action: Shopping Cart Drawer Trigger */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-2 bg-[#2C2723] hover:bg-[#433B35] text-[#FAF8F5] px-4 py-2.5 rounded-lg text-sm font-medium transition-all shadow-sm whitespace-nowrap"
              aria-label="سبد خرید"
            >
              <ShoppingBag className="w-4 h-4 text-[#D8C7B5]" />
              <span className="hidden sm:inline">سبد خرید</span>
              {cartCount > 0 && (
                <span className="bg-[#B85C4B] text-white text-xs font-bold px-1.5 py-0.5 rounded-md min-w-[20px] text-center tabular-nums">
                  {toPersianDigits(cartCount)}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#5A5046] hover:text-[#231F1C] hover:bg-[#F2ECE2] rounded-lg"
              aria-label="منو"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Collapsible Search Input */}
        {searchOpen && (
          <div className="pb-4 pt-1 border-t border-[#EAE3D9]">
            <div className="relative max-w-xl mx-auto">
              <input
                type="text"
                placeholder="جستجو در بین آثار سفالی، چرم دست‌دوز، سنگ فیروزه یا نام هنرمند..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                autoFocus
                className="w-full bg-[#FFFFFF] border border-[#DDD4C7] rounded-lg px-4 py-2.5 pr-10 text-sm text-[#2C2723] placeholder-[#9D9387] focus:outline-none focus:border-[#7A4B29] focus:ring-1 focus:ring-[#7A4B29]"
              />
              <Search className="w-4 h-4 text-[#9D9387] absolute right-3.5 top-3.5" />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute left-3 top-3 text-xs text-[#9D9387] hover:text-[#2C2723]"
                >
                  پاک کردن
                </button>
              )}
            </div>
          </div>
        )}

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#EAE3D9] flex flex-col gap-3 text-sm">
            <a
              href="#catalog"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 text-[#433B35] font-medium hover:bg-[#F2ECE2] rounded"
            >
              دست‌سازه‌ها و گالری آثار
            </a>
            <a
              href="#story"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 text-[#433B35] font-medium hover:bg-[#F2ECE2] rounded"
            >
              داستان کارگاه و هنرمندان
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCustomOrder();
              }}
              className="text-right px-2 py-1.5 text-[#433B35] font-medium hover:bg-[#F2ECE2] rounded"
            >
              ثبت سفارش اختصاصی و سفارشی‌سازی
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTracker();
              }}
              className="text-right px-2 py-1.5 text-[#433B35] font-medium hover:bg-[#F2ECE2] rounded flex items-center justify-between"
            >
              <span>پیگیری وضعیت مرسوله پستی</span>
              <Compass className="w-4 h-4 text-[#8C7662]" />
            </button>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 text-[#433B35] font-medium hover:bg-[#F2ECE2] rounded"
            >
              نظرات و تجربیات خریداران
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
