import { Product, PrintifyProduct, Review } from '../types';
import { MOCK_PRODUCTS } from '../constants';

// In a real app, this would be your backend endpoint
// const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

/**
 * Simulates fetching from Printify via your own backend.
 * In production: return axios.get(`${API_URL}/products`);
 */
export const fetchProducts = async (): Promise<Product[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  // This mimics the raw data structure you'd get from Printify's GET /shops/{shop_id}/products.json
  // We use the MOCK data here, but structurally this prepares you for the API.
  return MOCK_PRODUCTS;
};

/**
 * Adapter function: Converts raw Printify API response to your App's Product interface.
 * You would use this if you were fetching raw data directly.
 */
export const mapPrintifyToAppProduct = (p: PrintifyProduct): Product => {
  // Calculate lowest price from variants (Printify sends price in cents)
  const priceInCents = p.variants.length > 0 ? Math.min(...p.variants.map(v => v.price)) : 0;
  
  // Find default image
  const defaultImg = p.images.find(i => i.is_default) || p.images[0];

  return {
    id: parseInt(p.id, 10) || Math.floor(Math.random() * 10000), // Handle ID mapping
    printifyId: p.id,
    name: p.title,
    price: priceInCents / 100,
    category: p.tags.length > 0 ? capitalize(p.tags[0]) : 'Misc',
    image: defaultImg ? defaultImg.src : '',
    description: p.description.replace(/<[^>]*>?/gm, ''), // Strip HTML from Printify description
    reviews: [] // Printify doesn't store reviews, you store these in your own DB
  };
};

export const submitOrderToBackend = async (cartItems: Product[], shippingDetails: any) => {
  console.log("Sending order to backend for processing with Printify...", {
    items: cartItems,
    shipping: shippingDetails
  });
  
  return { success: true, orderId: "ORDER-" + Math.random().toString(36).substr(2, 9) };
};

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);