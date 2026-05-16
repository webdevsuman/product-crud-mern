import axiosInstance from "@/api/axiosInstance/axiosInstance";
import axios from "axios";
import { endpoints } from "@/api/axiosInstance/endpoints";
import type {
  ProductDetailsResponse,
  ProductMutationResponse,
  ProductPayload,
  ProductsResponse,
} from "@/typescript/product.types";

const getApiErrorMessage = (error: unknown, fallback: string) => {
  if (axios.isAxiosError<{ message?: string }>(error)) {
    return error.response?.data?.message ?? error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
};

export const getProducts = async (): Promise<ProductsResponse> => {
  try {
    const response = await axiosInstance.get<ProductsResponse>(
      endpoints.product.getAll
    );

    return response.data;
  } catch (error) {
    throw new Error(getApiErrorMessage(error, "Unable to fetch products"));
  }
};

export const getProductDetails = async (
  id: string
): Promise<ProductDetailsResponse> => {
  try {
    const response = await axiosInstance.get<ProductDetailsResponse>(
      `${endpoints.product.details}/${id}`
    );

    return response.data;
  } catch (error) {
    throw new Error(
      getApiErrorMessage(error, "Unable to fetch product details")
    );
  }
};

export const createProduct = async (
  payload: ProductPayload
): Promise<ProductMutationResponse> => {
  try {
    const response = await axiosInstance.post<ProductMutationResponse>(
      endpoints.product.create,
      payload
    );

    return response.data;
  } catch (error) {
    throw new Error(getApiErrorMessage(error, "Unable to create product"));
  }
};

export const deleteProduct = async (
  id: string
): Promise<ProductMutationResponse> => {
  try {
    const response = await axiosInstance.delete<ProductMutationResponse>(
      `${endpoints.product.delete}/${id}`
    );

    return response.data;
  } catch (error) {
    throw new Error(getApiErrorMessage(error, "Unable to delete product"));
  }
};

export const updateProduct = async ({
  id,
  payload,
}: {
  id: string;
  payload: ProductPayload;
}): Promise<ProductMutationResponse> => {
  try {
    const response = await axiosInstance.put<ProductMutationResponse>(
      `${endpoints.product.update}/${id}`,
      payload
    );

    return response.data;
  } catch (error) {
    throw new Error(getApiErrorMessage(error, "Unable to update product"));
  }
};
