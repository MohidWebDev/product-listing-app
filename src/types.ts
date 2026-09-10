export type ProductCategory = 'Electronics' | 'Office Furniture' | 'Audio' | 'Accessories';

export const CATEGORIES: ProductCategory[] = [
  'Electronics',
  'Office Furniture',
  'Audio',
  'Accessories'
];

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  imageUrl?: string;
}
