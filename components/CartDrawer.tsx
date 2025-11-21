import React from 'react';
import { CartItem } from '../types';
import { Button } from './Button';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: number, delta: number) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onUpdateQuantity, onCheckout }) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full p-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-stone-800">Your Bag 🛍️</h2>
            <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-full transition-colors text-stone-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-grow overflow-y-auto space-y-6 pr-2">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-stone-400 space-y-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-16 h-16 text-pink-200">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                <p>Your bag is empty.</p>
                <Button variant="outline" size="sm" onClick={onClose}>Continue Shopping</Button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl bg-stone-50" />
                  <div className="flex-grow">
                    <h3 className="font-semibold text-stone-800">{item.name}</h3>
                    <p className="text-stone-500 text-sm">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center bg-stone-50 rounded-full p-1">
                    <button 
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white shadow-sm text-stone-600 transition-all"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-sm font-medium text-stone-800">{item.quantity}</span>
                    <button 
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white shadow-sm text-stone-600 transition-all"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t border-stone-100 pt-6 mt-4">
              <div className="flex justify-between items-center mb-6">
                <span className="text-stone-500">Subtotal</span>
                <span className="text-xl font-bold text-stone-800">${total.toFixed(2)}</span>
              </div>
              <Button 
                className="w-full" 
                size="lg" 
                onClick={() => {
                  onClose();
                  onCheckout();
                }}
              >
                Checkout
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};