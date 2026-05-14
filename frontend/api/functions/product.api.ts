import axiosInstance from "@/api/axiosInstance/axiosInstance";
import { endpoints } from "@/api/axiosInstance/endpoints";
import type {
  ProductPayload,
  ProductsResponse,
} from "@/typescript/product.types";

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

export const createProduct = async (
  payload: ProductPayload
): Promise<void> => {
  try {
    await axiosInstance.post(endpoints.product.create, payload);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error("Unable to create product");
  }
};

export const deleteProduct = async (id: string): Promise<void> => {
  try {
    await axiosInstance.delete(endpoints.product.delete(id));
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error("Unable to delete product");
  }
};

export const updateProduct = async ({
  id,
  payload,
}: {
  id: string;
  payload: ProductPayload;
}): Promise<void> => {
  try {
    await axiosInstance.put(endpoints.product.update(id), payload);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error("Unable to update product");
  }
};
