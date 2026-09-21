export type ActiveScreen = 'home' | 'menu' | 'booking' | 'gallery' | 'about' | 'contact';

export type CuisineType = 'all' | 'indian' | 'chinese' | 'continental' | 'beverages' | 'desserts';

export interface MenuItem {
  id: string;
  name: string;
  category: CuisineType;
  subcategory: string;
  price: number;
  description: string;
  isVeg: boolean;
  isBestseller?: boolean;
  isChefSpecial?: boolean;
  spicyLevel?: 1 | 2 | 3;
  image: string;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  specialInstructions?: string;
}

export interface BookingRequest {
  fullName: string;
  phone: string;
  email: string;
  date: string;
  timeSlot: string;
  guests: number;
  eventType: string;
  seatingArea: string;
  specialNotes?: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  tag?: string;
}

export interface GalleryPhoto {
  id: string;
  url: string;
  title: string;
  category: 'food' | 'beverage' | 'ambiance' | 'events';
}
