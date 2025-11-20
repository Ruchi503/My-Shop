import { Product } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Cloud Pillow",
    price: 24.00,
    category: "Home",
    image: "https://picsum.photos/400/400?random=1",
    description: "Softer than a daydream. This plush cloud pillow is perfect for naps.",
    reviews: [
      { id: '1', author: 'Sophie', rating: 5, comment: 'Literally like sleeping on a cloud!', date: '2023-10-12' },
      { id: '2', author: 'Kai', rating: 4, comment: 'Super cute, but smaller than expected.', date: '2023-11-05' }
    ]
  },
  {
    id: 2,
    name: "Peach Tea Set",
    price: 45.00,
    category: "Kitchen",
    image: "https://picsum.photos/400/400?random=2",
    description: "Ceramic tea set painted with delicate peaches. Serves two.",
    reviews: []
  },
  {
    id: 3,
    name: "Pastel Planner",
    price: 18.00,
    category: "Stationery",
    image: "https://picsum.photos/400/400?random=3",
    description: "Get organized with this cute weekly planner. Includes stickers!",
    reviews: [
      { id: '3', author: 'Emma', rating: 5, comment: 'The stickers are adorable!', date: '2023-09-20' }
    ]
  },
  {
    id: 4,
    name: "Succulent Pot",
    price: 12.00,
    category: "Home",
    image: "https://picsum.photos/400/400?random=4",
    description: "A happy little face on a ceramic pot. Plant not included.",
    reviews: []
  },
  {
    id: 5,
    name: "Berry Tote Bag",
    price: 22.00,
    category: "Accessories",
    image: "https://picsum.photos/400/400?random=5",
    description: "Canvas tote featuring a strawberry embroidery. Very sturdy.",
    reviews: []
  },
  {
    id: 6,
    name: "Moon Lamp",
    price: 35.00,
    category: "Lighting",
    image: "https://picsum.photos/400/400?random=6",
    description: "Glows with a warm amber light. USB rechargeable.",
    reviews: [
      { id: '4', author: 'Luna', rating: 5, comment: 'Sets the perfect cozy mood.', date: '2023-12-01' }
    ]
  },
  {
    id: 7,
    name: "Fuzzy Socks",
    price: 14.00,
    category: "Accessories",
    image: "https://picsum.photos/400/400?random=7",
    description: "Keep your toes warm with these ultra-soft pastel socks.",
    reviews: []
  },
  {
    id: 8,
    name: "Glass Water Bottle",
    price: 28.00,
    category: "Kitchen",
    image: "https://picsum.photos/400/400?random=8",
    description: "Eco-friendly glass bottle with a silicone protective sleeve.",
    reviews: []
  }
];

export const SYSTEM_INSTRUCTION = `You are Mochi, a friendly, bubbly, and "kawaii" shop assistant for a store called "Mochi & Co." 
We sell cute, minimalistic items like home goods, stationery, and accessories. 
Your tone should be warm, helpful, and concise. Use emojis occasionally. 
If a user asks for product recommendations, suggest items based on the general vibe of "cute", "cozy", and "minimalist". 
You do not have real-time inventory access, so just speak generally about the types of items we carry (plushies, cute cups, stationery).
Keep responses under 3 sentences unless asked for a story.`;