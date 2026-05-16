import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createProduct,
  deleteProduct,
  getProductDetails,
  getProducts,
  updateProduct,
} from "@/api/functions/product.api";
import { QueryKeys } from "@/react-query/queryKeys";
import { showNotification } from "@/ui/AppSnackbar";

const getErrorMessage = (error: unknown, fallback: string) => {
  return error instanceof Error ? error.message : fallback;
};

export const useProducts = () => {
  return useQuery({
    queryKey: [QueryKeys.Products],
    queryFn: getProducts,
  });
};

export const useProductDetails = (id?: string) => {
  return useQuery({
    queryKey: [QueryKeys.ProductDetails, id],
    queryFn: () => getProductDetails(id as string),
    enabled: Boolean(id),
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.Products] });
      showNotification({
        severity: "success",
        message: data.message,
      });
    },
    onError: (error) => {
      showNotification({
        severity: "error",
        message: getErrorMessage(error, "Unable to delete product"),
      });
    },
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.Products] });
      showNotification({
        severity: "success",
        message: data.message,
      });
    },
    onError: (error) => {
      showNotification({
        severity: "error",
        message: getErrorMessage(error, "Unable to create product"),
      });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProduct,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.Products] });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.ProductDetails, variables.id],
      });
      showNotification({
        severity: "success",
        message: data.message,
      });
    },
    onError: (error) => {
      showNotification({
        severity: "error",
        message: getErrorMessage(error, "Unable to update product"),
      });
    },
  });
};
