import React, { useState } from 'react';
import { Button } from './Button';
import { CartItem, ShippingDetails } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onSubmitOrder: (details: ShippingDetails) => Promise<void>;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, cartItems, onSubmitOrder }) => {
  const [step, setStep] = useState<'details' | 'success'>('details');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<ShippingDetails>({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'US'
  });

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSubmitOrder(formData);
      setStep('success');
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-stone-900/30 backdrop-blur-sm transition-opacity"
        onClick={step === 'success' ? onClose : undefined}
      />

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-zoom-in">
        
        {step === 'details' ? (
          <div className="flex flex-col md:flex-row h-full max-h-[90vh]">
            {/* Order Summary Sidebar */}
            <div className="hidden md:block w-1/3 bg-stone-50 p-8 border-r border-stone-100 overflow-y-auto">
              <h3 className="font-bold text-stone-800 mb-6">Your Bag</h3>
              <div className="space-y-4 mb-6">
                {cartItems.map(item => (
                  <div key={item.id} className="flex gap-3">
                    <div className="relative">
                      <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-stone-800 text-white text-[10px] flex items-center justify-center rounded-full">
                        {item.quantity}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-stone-800">{item.name}</p>
                      <p className="text-xs text-stone-500">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-stone-200 pt-4">
                <div className="flex justify-between items-center text-lg font-bold text-stone-800">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Form Section */}
            <div className="flex-1 p-8 overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-stone-800">Shipping</h2>
                <button onClick={onClose} className="text-stone-400 hover:text-stone-600">
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-500 uppercase mb-1">First Name</label>
                    <input 
                      required name="firstName" value={formData.firstName} onChange={handleChange}
                      className="w-full bg-stone-50 border-transparent focus:bg-white focus:border-pink-200 rounded-xl px-4 py-2 transition-all outline-none border-2" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-500 uppercase mb-1">Last Name</label>
                    <input 
                      required name="lastName" value={formData.lastName} onChange={handleChange}
                      className="w-full bg-stone-50 border-transparent focus:bg-white focus:border-pink-200 rounded-xl px-4 py-2 transition-all outline-none border-2" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-500 uppercase mb-1">Email</label>
                  <input 
                    required type="email" name="email" value={formData.email} onChange={handleChange}
                    className="w-full bg-stone-50 border-transparent focus:bg-white focus:border-pink-200 rounded-xl px-4 py-2 transition-all outline-none border-2" 
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-500 uppercase mb-1">Address</label>
                  <input 
                    required name="address" value={formData.address} onChange={handleChange}
                    className="w-full bg-stone-50 border-transparent focus:bg-white focus:border-pink-200 rounded-xl px-4 py-2 transition-all outline-none border-2" 
                    placeholder="123 Mochi Lane"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-500 uppercase mb-1">City</label>
                    <input 
                      required name="city" value={formData.city} onChange={handleChange}
                      className="w-full bg-stone-50 border-transparent focus:bg-white focus:border-pink-200 rounded-xl px-4 py-2 transition-all outline-none border-2" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-500 uppercase mb-1">Postal Code</label>
                    <input 
                      required name="zip" value={formData.zip} onChange={handleChange}
                      className="w-full bg-stone-50 border-transparent focus:bg-white focus:border-pink-200 rounded-xl px-4 py-2 transition-all outline-none border-2" 
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                    {isLoading ? 'Processing...' : `Pay $${total.toFixed(2)}`}
                  </Button>
                  <p className="text-center text-xs text-stone-400 mt-3">
                    Payments are processed securely. <br/>
                    (This is a demo, no real charge will be made)
                  </p>
                </div>
              </form>
            </div>
          </div>
        ) : (
          // Success Step
          <div className="p-12 flex flex-col items-center justify-center text-center space-y-6">
            <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center text-3xl animate-bounce">
              ✓
            </div>
            <div>
              <h2 className="text-3xl font-bold text-stone-800 mb-2">Order Confirmed!</h2>
              <p className="text-stone-500 max-w-md mx-auto">
                Thank you, {formData.firstName}! We've sent your details to Printify. 
                You will receive an email confirmation shortly.
              </p>
            </div>
            <Button onClick={onClose}>Continue Shopping</Button>
          </div>
        )}
      </div>
    </div>
  );
};