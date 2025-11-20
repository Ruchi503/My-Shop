import React, { useState, useEffect } from 'react';
import { Product, CartItem, ViewState, Review } from './types';
import { ProductCard } from './components/ProductCard';
import { Button } from './components/Button';
import { CartDrawer } from './components/CartDrawer';
import { ShopAssistant } from './components/ShopAssistant';
import { ProductModal } from './components/ProductModal';
import { fetchProducts } from './services/productService';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.HOME);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Load products on mount
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to load products", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
    if (selectedProduct) setSelectedProduct(null);
  };

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(0, item.quantity + delta) };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const handleAddReview = (productId: number, reviewData: Omit<Review, 'id' | 'date'>) => {
    const newReview: Review = {
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString().split('T')[0],
      ...reviewData
    };

    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        const updatedProduct = { ...p, reviews: [newReview, ...p.reviews] };
        if (selectedProduct?.id === productId) {
          setSelectedProduct(updatedProduct);
        }
        return updatedProduct;
      }
      return p;
    }));
  };

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];
  
  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
           <div className="w-12 h-12 border-4 border-pink-200 border-t-pink-400 rounded-full animate-spin"></div>
           <p className="text-stone-400 animate-pulse">Loading Mochi's Shop...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 font-sans">
      {/* Navigation */}
      <nav className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView(ViewState.HOME)}>
            <div className="w-8 h-8 bg-pink-200 rounded-full flex items-center justify-center">🌸</div>
            <span className="text-2xl font-bold text-stone-800 tracking-tight">Mochi & Co.</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => setView(ViewState.HOME)}
              className={`text-sm font-medium transition-colors ${view === ViewState.HOME ? 'text-stone-800' : 'text-stone-500 hover:text-stone-800'}`}
            >
              Home
            </button>
            <button 
              onClick={() => setView(ViewState.SHOP)}
              className={`text-sm font-medium transition-colors ${view === ViewState.SHOP ? 'text-stone-800' : 'text-stone-500 hover:text-stone-800'}`}
            >
              Shop
            </button>
            <button className="text-sm font-medium text-stone-500 hover:text-stone-800 transition-colors">
              About
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button 
              className="relative p-2 hover:bg-stone-100 rounded-full transition-colors"
              onClick={() => setIsCartOpen(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-stone-700">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              {cartItems.length > 0 && (
                <span className="absolute top-1 right-1 h-4 w-4 bg-pink-300 text-[10px] font-bold text-white flex items-center justify-center rounded-full">
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      <main>
        {view === ViewState.HOME && (
          <>
            {/* Hero Section */}
            <section className="relative py-20 lg:py-32 overflow-hidden">
              <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-pink-100 rounded-full blur-3xl opacity-50 pointer-events-none" />
              <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-green-100 rounded-full blur-3xl opacity-50 pointer-events-none" />
              
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
                <span className="inline-block px-4 py-1.5 rounded-full bg-white border border-stone-200 text-stone-500 text-xs font-semibold tracking-wide mb-6">
                  ✨ NEW COLLECTION ARRIVED
                </span>
                <h1 className="text-5xl md:text-7xl font-bold text-stone-800 mb-6 tracking-tight">
                  Make life <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300">softer.</span>
                </h1>
                <p className="text-lg md:text-xl text-stone-500 max-w-2xl mx-auto mb-10 leading-relaxed">
                  Curated stationery, home goods, and accessories designed to bring a little bit of joy and calm to your everyday routine.
                </p>
                <div className="flex justify-center gap-4">
                  <Button size="lg" onClick={() => setView(ViewState.SHOP)}>Shop Now</Button>
                  <Button size="lg" variant="outline">Our Story</Button>
                </div>
              </div>
            </section>

            {/* Featured Section */}
            <section className="py-20 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-12">
                  <div>
                    <h2 className="text-3xl font-bold text-stone-800 mb-2">Favorites</h2>
                    <p className="text-stone-500">Things our customers adore.</p>
                  </div>
                  <Button variant="outline" onClick={() => setView(ViewState.SHOP)}>View All</Button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {products.slice(0, 4).map(product => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      onAddToCart={addToCart}
                      onOpenDetails={setSelectedProduct}
                    />
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {view === ViewState.SHOP && (
          <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-stone-800 mb-4">Shop All</h1>
                <p className="text-stone-500">Find your new favorite thing.</p>
             </div>

             {/* Filters */}
             <div className="flex flex-wrap justify-center gap-3 mb-12">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === cat 
                        ? 'bg-stone-800 text-white shadow-md' 
                        : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
             </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
               {filteredProducts.map(product => (
                 <ProductCard 
                   key={product.id} 
                   product={product} 
                   onAddToCart={addToCart}
                   onOpenDetails={setSelectedProduct}
                 />
               ))}
             </div>

             {filteredProducts.length === 0 && (
               <div className="text-center py-20 text-stone-400">
                 No products found in this category.
               </div>
             )}
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-16 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
               <span className="text-2xl">🌸</span>
               <span className="text-xl font-bold text-stone-100">Mochi & Co.</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              We believe in the magic of small things. Everything in our shop is chosen with love and intended to make you smile.
            </p>
          </div>
          <div>
            <h4 className="text-stone-100 font-bold mb-6">Shop</h4>
            <ul className="space-y-3 text-sm">
              <li><button className="hover:text-white transition-colors">New Arrivals</button></li>
              <li><button className="hover:text-white transition-colors">Stationery</button></li>
              <li><button className="hover:text-white transition-colors">Home Decor</button></li>
              <li><button className="hover:text-white transition-colors">Gift Cards</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-stone-100 font-bold mb-6">Newsletter</h4>
            <p className="text-sm mb-4">Subscribe for 10% off your first order.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="email@example.com" 
                className="bg-stone-800 border-none rounded-full px-4 py-2 text-sm w-full focus:ring-2 focus:ring-pink-300 focus:outline-none"
              />
              <Button variant="secondary" size="sm">Join</Button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-stone-800 text-xs text-center">
          © 2024 Mochi & Co. All rights reserved. Designed with ❤️ and 🤖.
        </div>
      </footer>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems} 
        onUpdateQuantity={updateQuantity}
      />
      
      <ProductModal 
        product={selectedProduct} 
        isOpen={!!selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        onAddToCart={addToCart}
        onAddReview={handleAddReview}
      />
      
      <ShopAssistant />
    </div>
  );
};

export default App;