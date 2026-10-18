import { useState, useEffect } from 'react';
import { Product, CartItem, Order, CustomInquiry } from './types/store';
import { INITIAL_PRODUCTS } from './data/products';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { CustomOrderModal } from './components/CustomOrderModal';
import { ArtisanStory } from './components/ArtisanStory';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';

export default function App() {
  // Products
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);

  // Cart State (Persisted in localStorage)
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('dastaneh_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Favorites / Wishlist (Persisted)
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('dastaneh_favs');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Recent Orders (Persisted)
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('dastaneh_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Custom Inquiries (Persisted)
  const [inquiries, setInquiries] = useState<CustomInquiry[]>(() => {
    try {
      const saved = localStorage.getItem('dastaneh_inquiries');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modals and Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [isCustomOrderOpen, setIsCustomOrderOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Search Query
  const [searchQuery, setSearchQuery] = useState('');

  // Added-to-cart flash state for UI micro-feedback
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  // Discount Coupons
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscountPercent, setAppliedDiscountPercent] = useState(0);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('dastaneh_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('dastaneh_favs', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('dastaneh_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('dastaneh_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  // Cart Handlers
  const handleAddToCart = (product: Product, quantity = 1, giftWrap = false) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        if (giftWrap) updated[existingIndex].giftWrap = true;
        return updated;
      }
      return [...prev, { product, quantity, giftWrap }];
    });

    setJustAddedId(product.id);
    setTimeout(() => {
      setJustAddedId((curr) => (curr === product.id ? null : curr));
    }, 2000);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Favorites Handlers
  const handleToggleFavorite = (productId: string) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  // Coupon Code Verification
  const handleApplyCoupon = (code: string): boolean => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'DASTANEH') {
      setCouponCode(cleanCode);
      setAppliedDiscountPercent(10);
      return true;
    }
    if (cleanCode === 'NOROOZ' || cleanCode === 'BAHAR') {
      setCouponCode(cleanCode);
      setAppliedDiscountPercent(15);
      return true;
    }
    return false;
  };

  // Order Completed
  const handleOrderCompleted = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    setCartItems([]); // Clear cart
  };

  // Custom Inquiry Submitted
  const handleCustomInquirySubmitted = (newInquiry: CustomInquiry) => {
    setInquiries((prev) => [newInquiry, ...prev]);
  };

  const cartTotalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const discountAmount = Math.round((cartSubtotal * appliedDiscountPercent) / 100);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2C2723] flex flex-col font-sans">
      
      {/* Top Announcement Bar */}
      <AnnouncementBar />

      {/* Main One-Row 3-Zone Header */}
      <Header
        cartCount={cartTotalCount}
        favoritesCount={favorites.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenTracker={() => setIsTrackerOpen(true)}
        onOpenCustomOrder={() => setIsCustomOrderOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* Campaign Hero Section */}
        <Hero
          onExploreClick={() => {
            const el = document.getElementById('catalog');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onCustomOrderClick={() => setIsCustomOrderOpen(true)}
        />

        {/* Featured Handcrafted Catalog */}
        <ProductCatalog
          products={products}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          onSelectProduct={(p) => setSelectedProduct(p)}
          onAddToCart={(p) => handleAddToCart(p, 1)}
          justAddedId={justAddedId}
          searchQuery={searchQuery}
          onClearSearch={() => setSearchQuery('')}
        />

        {/* Philosophy & Atelier Craftsmanship Story */}
        <ArtisanStory />

        {/* Verified Community Feedback */}
        <ReviewsSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenCustomOrder={() => setIsCustomOrderOpen(true)}
        onOpenTracker={() => setIsTrackerOpen(true)}
      />

      {/* Product Detail Modal (PDP) */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        isFavorite={selectedProduct ? favorites.includes(selectedProduct.id) : false}
        onToggleFavorite={handleToggleFavorite}
      />

      {/* Slide-Over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        couponCode={couponCode}
        appliedDiscountPercent={appliedDiscountPercent}
        onApplyCoupon={handleApplyCoupon}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        subtotal={cartSubtotal}
        discountAmount={discountAmount}
        couponCode={couponCode}
        onOrderCompleted={handleOrderCompleted}
      />

      {/* Order Tracker Modal */}
      <OrderTrackerModal
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
        recentOrders={orders}
      />

      {/* Custom Order Request Modal */}
      <CustomOrderModal
        isOpen={isCustomOrderOpen}
        onClose={() => setIsCustomOrderOpen(false)}
        onSubmitInquiry={handleCustomInquirySubmitted}
      />

    </div>
  );
}
