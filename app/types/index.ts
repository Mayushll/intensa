export interface Product {
  id: number;
  name: string;
  price: number;
  picture: string;
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
