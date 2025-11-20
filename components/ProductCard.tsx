import React from 'react';
import { Product } from '../types';
import { Button } from './Button';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onOpenDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onOpenDetails }) => {
  const averageRating = product.reviews.length > 0
    ? product.reviews.reduce((acc, rev) => acc + rev.rating, 0) / product.reviews.length
    : 0;

  return (
    <div className="group flex flex-col bg-white rounded-3xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-50 h-full">
      <div 
        className="relative overflow-hidden rounded-2xl aspect-square mb-4 bg-stone-100 cursor-pointer"
        onClick={() => onOpenDetails(product)}
      >
        <img 
          src={product.image} 
          alt={product.name} 
          className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-stone-600 shadow-sm">
          ${product.price.toFixed(2)}
        </div>
        
        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="bg-white/90 text-stone-800 px-4 py-2 rounded-full text-sm font-medium shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            Quick View
          </span>
        </div>
      </div>
      
      <div className="flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1">
          <div className="text-xs text-stone-400 uppercase tracking-wider">{product.category}</div>
          {product.reviews.length > 0 && (
            <div className="flex items-center gap-1 text-xs text-amber-400">
              <span>★</span>
              <span className="text-stone-400 font-medium">{averageRating.toFixed(1)}</span>
            </div>
          )}
        </div>
        
        <h3 
          className="text-lg font-bold text-stone-800 mb-2 cursor-pointer hover:text-pink-400 transition-colors"
          onClick={() => onOpenDetails(product)}
        >
          {product.name}
        </h3>
        <p className="text-stone-500 text-sm leading-relaxed mb-4 line-clamp-2 flex-grow">{product.description}</p>
        
        <Button 
          onClick={() => onAddToCart(product)}
          variant="secondary" 
          className="w-full"
        >
          Add to Cart ✨
        </Button>
      </div>
    </div>
  );
};