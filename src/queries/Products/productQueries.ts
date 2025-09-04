import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { productsApi } from "./productApi";
import { useThemedMessage } from "@src/hooks/useThemedMessage";


export const productKeys = {
  all: ["products"] as const,
  lists: () => [...productKeys.all, "list"] as const,
  list: (filters: string) => [...productKeys.lists(), { filters }] as const,
  details: () => [...productKeys.all, "detail"] as const,
  detail: (id: number) => [...productKeys.details(), id] as const,
};

// Get all products
export const useGetAllProducts = () => {
  return useQuery({
    queryKey: productKeys.lists(),
    queryFn: productsApi.getAllProducts,
  });
};

// Get product by ID
export const useGetProductById = (id: number) => {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => productsApi.getProductById(id),
    enabled: !!id,
  });
};

// Create product
export const useCreateProduct = (isDark: boolean = false) => {
  const queryClient = useQueryClient();
  const { showSuccessMessage, showErrorMessage } = useThemedMessage(isDark);

  return useMutation({
    mutationFn: productsApi.createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
      showSuccessMessage("Product created successfully!", "✅");
    },
    onError: (error) => {
      console.error("Error creating product:", error);
      showErrorMessage("Failed to create product.");
    },
  });
};

// Update product
export const useUpdateProduct = (isDark: boolean = false) => {
  const queryClient = useQueryClient();
  const { showSuccessMessage, showErrorMessage } = useThemedMessage(isDark);

  return useMutation({
    mutationFn: productsApi.updateProduct,
    onSuccess: (updatedProduct) => {
      queryClient.setQueryData(
        productKeys.detail(updatedProduct.p_id),
        updatedProduct
      );
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
      showSuccessMessage("Product updated successfully!", "✅");
    },
    onError: (error) => {
      console.error("Error updating product:", error);
      showErrorMessage("Failed to update product.");
    },
  });
};

// Delete product
export const useDeleteProduct = (isDark: boolean = false) => {
  const queryClient = useQueryClient();
  const { showSuccessMessage, showErrorMessage } = useThemedMessage(isDark);

  return useMutation({
    mutationFn: productsApi.deleteProduct,
    onSuccess: (_, deletedId) => {
      queryClient.removeQueries({ queryKey: productKeys.detail(deletedId) });
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
      showSuccessMessage("Product deleted successfully!", "🗑️");
    },
    onError: (error) => {
      console.error("Error deleting product:", error);
      showErrorMessage("Failed to delete product.");
    },
  });
};

// Update product photo
export const useUpdateProductPhoto = (isDark: boolean = false) => {
  const queryClient = useQueryClient();
  const { showSuccessMessage, showErrorMessage } = useThemedMessage(isDark);

  return useMutation({
    mutationFn: ({ id, file }: { id: number; file: File }) =>
      productsApi.updateProductPhoto(id, file),
    onSuccess: () => {
    //   queryClient.setQueryData(
    //     productKeys.detail(updatedProduct.p_id),
    //     updatedProduct
    //   );
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
      showSuccessMessage("Product photo updated successfully!", "🖼️");
    },
    onError: (error) => {
      console.error("Error updating product photo:", error);
      showErrorMessage("Failed to update product photo.");
    },
  });
};
