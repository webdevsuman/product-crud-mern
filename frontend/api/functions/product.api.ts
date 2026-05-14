import axiosInstance from "@/api/axiosInstance/axiosInstance";
import { endpoints } from "@/api/axiosInstance/endpoints";
import type { ProductsResponse } from "@/typescript/product.types";

export const getProducts = async (): Promise<ProductsResponse> => {
  try {
    const response = await axiosInstance.get<ProductsResponse>(
      endpoints.product.getAll
    );

    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error("Unable to fetch products");
  }
};
