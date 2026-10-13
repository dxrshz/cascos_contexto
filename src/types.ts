export type HelmetTypeId = 'urbano' | 'integral' | 'modular' | 'multiproposito';

export interface Product {
  id: string;
  name: string;
  type: HelmetTypeId;
  color: string;
  price: number;
  oldPrice?: number;
  sizes: string[];
  rating: number;
  count: number;
  badge?: string;
  weight: string;
  shell: string;
  cert: string;
  image?: string;
  desc: string;
  features: string[];
}

export interface HelmetTypeInfo {
  label: string;
  short: string;
  blurb: string;
  tags: string;
}

export interface ColorInfo {
  name: string;
  hex: string;
  accent: string;
}

export interface AspectInfo {
  key: 'comodidad' | 'durabilidad' | 'estilo';
  label: string;
}

export interface Review {
  id: string;
  name: string;
  city?: string;
  productId: string;
  date: string;
  overall: number;
  comodidad?: number;
  durabilidad?: number;
  estilo?: number;
  tags?: string[];
  text?: string;
  mine?: boolean;
}

export interface FilterState {
  q: string;
  types: Set<HelmetTypeId>;
  colors: Set<string>;
  sizes: Set<string>;
  min: number;
  max: number;
  sort: 'destacados' | 'precio-asc' | 'precio-desc' | 'valorados';
}
