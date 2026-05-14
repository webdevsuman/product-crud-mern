import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/api/functions/product.api";
import { QueryKeys } from "@/react-query/queryKeys";

export const useProducts = () => {
  return useQuery({
    queryKey: [QueryKeys.Products],
    queryFn: getProducts,
  });
};
