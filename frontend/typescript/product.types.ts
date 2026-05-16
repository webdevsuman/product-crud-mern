export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  inStock: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductsResponse {
  status: boolean;
  message: string;
  total: number;
  data: Product[];
}

export interface ProductDetailsResponse {
  status: boolean;
  message: string;
  data: Product;
}

export interface ProductMutationResponse {
  status: boolean;
  message: string;
  data?: Product;
}

export interface ProductPayload {
  name: string;
  description: string;
  price: number;
  category: string;
  inStock: boolean;
}
