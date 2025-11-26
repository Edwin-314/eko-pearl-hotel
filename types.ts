export interface Room {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  size: string;
  amenities: string[];
}

export interface DiningItem {
  id: string;
  name: string;
  description: string;
  category: 'Starter' | 'Main' | 'Dessert' | 'Drink';
  price: string;
}

export enum ViewState {
  HOME = 'HOME',
  ROOMS = 'ROOMS',
  DINING = 'DINING',
  AMENITIES = 'AMENITIES',
  CONTACT = 'CONTACT',
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface WeatherData {
  month: string;
  temp: number;
  occupancy: number;
}