import React, { useState } from 'react';
import { Product, Review } from '../types';
import { Button } from './Button';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onAddReview: (productId: number, review: Omit<Review, 'id' | 'date'>) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ 
  product, 
  isOpen, 
  onClose, 
  onAddToCart,
  onAddReview 
}) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [author, setAuthor] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);

  if (!isOpen || !product) return null;

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim() || !author.trim()) return;
    
    onAddReview(product.id, {
      author,
      rating,
      comment
    });

    // Reset form
    setComment('');
    setAuthor('');
    setRating(5);
    setShowReviewForm(false);
  };

  const averageRating = product.reviews.length > 0
    ? product.reviews.reduce((acc, rev) => acc + rev.rating, 0) / product.reviews.length
    : 0;

  return (
    <>
      <div 
        className="fixed inset-0 bg-stone-900/20 backdrop-blur-sm z-40 transition-opacity"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row pointer-events-auto animate-in zoom-in-95 duration-200">
          
          {/* Image Section */}
          <div className="w-full md:w-1/2 bg-stone-50 relative h-64 md:h-auto">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
            <button 
              onClick={onClose}
              className="absolute top-4 left-4 md:hidden bg-white/80 p-2 rounded-full text-stone-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content Section */}
          <div className="w-full md:w-1/2 flex flex-col h-full max-h-[90vh]">
            <div className="p-8 overflow-y-auto custom-scrollbar">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold tracking-wider text-stone-400 uppercase bg-stone-100 px-2 py-1 rounded-md">
                  {product.category}
                </span>
                <button 
                  onClick={onClose}
                  className="hidden md:block text-stone-400 hover:text-stone-600 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <h2 className="text-3xl font-bold text-stone-800 mb-2">{product.name}</h2>
              
              <div className="flex items-center gap-4 mb-6">
                <span className="text-2xl font-medium text-stone-800">${product.price.toFixed(2)}</span>
                {product.reviews.length > 0 && (
                   <div className="flex items-center text-amber-400 gap-1 text-sm">
                     <span className="text-lg">★</span>
                     <span className="text-stone-500 font-medium underline decoration-stone-200 underline-offset-4">
                       {averageRating.toFixed(1)} ({product.reviews.length} reviews)
                     </span>
                   </div>
                )}
              </div>

              <p className="text-stone-600 leading-relaxed mb-8">
                {product.description}
              </p>

              <Button onClick={() => onAddToCart(product)} className="w-full mb-10">
                Add to Cart
              </Button>

              <hr className="border-stone-100 mb-8" />

              {/* Reviews Section */}
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-stone-800">Reviews</h3>
                  <button 
                    onClick={() => setShowReviewForm(!showReviewForm)}
                    className="text-sm font-semibold text-pink-400 hover:text-pink-500 transition-colors"
                  >
                    {showReviewForm ? 'Cancel' : 'Write a Review'}
                  </button>
                </div>

                {/* Review Form */}
                {showReviewForm && (
                  <form onSubmit={handleSubmitReview} className="bg-stone-50 p-6 rounded-2xl mb-8 animate-in slide-in-from-top-2">
                    <div className="mb-4">
                      <label className="block text-xs font-bold text-stone-500 uppercase mb-2">Rating</label>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            className={`text-2xl transition-colors ${rating >= star ? 'text-amber-400' : 'text-stone-200'}`}
                          >
                            ★
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-xs font-bold text-stone-500 uppercase mb-2">Name</label>
                      <input 
                        type="text" 
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className="w-full bg-white border border-stone-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-100"
                        placeholder="Your name"
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-xs font-bold text-stone-500 uppercase mb-2">Review</label>
                      <textarea 
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full bg-white border border-stone-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-100 min-h-[100px]"
                        placeholder="What did you think?"
                        required
                      />
                    </div>

                    <Button type="submit" size="sm" className="w-full">Submit Review</Button>
                  </form>
                )}

                {/* Reviews List */}
                <div className="space-y-6">
                  {product.reviews.length === 0 ? (
                    <div className="text-center py-8 bg-stone-50 rounded-2xl text-stone-500 text-sm">
                      No reviews yet. Be the first to share your thoughts! ☁️
                    </div>
                  ) : (
                    product.reviews.map((review) => (
                      <div key={review.id} className="border-b border-stone-100 last:border-0 pb-6 last:pb-0">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <span className="font-bold text-stone-800 block">{review.author}</span>
                            <span className="text-xs text-stone-400">{review.date}</span>
                          </div>
                          <div className="flex text-amber-400 text-sm">
                            {[...Array(5)].map((_, i) => (
                              <span key={i}>{i < review.rating ? '★' : <span className="text-stone-200">★</span>}</span>
                            ))}
                          </div>
                        </div>
                        <p className="text-stone-600 text-sm leading-relaxed">{review.comment}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};