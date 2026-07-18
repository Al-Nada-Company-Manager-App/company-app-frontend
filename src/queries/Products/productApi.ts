import { fetchWithAuth } from "@src/utils/apiClient";
import type {
  Product,
  CreateProductInput,
  UpdateProductInput,
  ProductQueryParams,
  PaginatedProductResponse,
} from "@src/types/Products/product";

const PRODUCTS_URL = `/products`;

export const productsApi = {
  // Get all products
  getAllProducts: async (params: ProductQueryParams = {}): Promise<PaginatedProductResponse> => {
    const searchParams = new URLSearchParams();
    if (params.page) searchParams.set("page", String(params.page));
    if (params.limit) searchParams.set("limit", String(params.limit));
    if (params.search) searchParams.set("search", params.search);
    if (params.category) searchParams.set("category", params.category);
    if (params.status) searchParams.set("status", params.status);

    const queryString = searchParams.toString();
    const url = queryString ? `${PRODUCTS_URL}?${queryString}` : PRODUCTS_URL;

    const response = await fetchWithAuth(url);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return response.json();
  },

  // Get product by ID
  getProductById: async (id: number): Promise<Product> => {
    const response = await fetchWithAuth(`${PRODUCTS_URL}/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch product with ID: ${id}`);
    }
    return response.json();
  },

  // Create new product
  createProduct: async (productData: CreateProductInput): Promise<Product> => {
    const response = await fetchWithAuth(`${PRODUCTS_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    });
    if (!response.ok) {
      throw new Error("Failed to create product");
    }
    return response.json();
  },

  // Update product
  updateProduct: async (updateData: UpdateProductInput): Promise<Product> => {
    const response = await fetchWithAuth(`${PRODUCTS_URL}/${updateData.p_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData),
    });
    if (!response.ok) {
      throw new Error(`Failed to update product with ID: ${updateData.p_id}`);
    }
    return response.json();
  },

  // Delete product
  deleteProduct: async (id: number): Promise<void> => {
    const response = await fetchWithAuth(`${PRODUCTS_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Failed to delete product with ID: ${id}`);
    }
  },

  // Update product photo
  updateProductPhoto: async (id: number, file: File): Promise<Product> => {
    const formData = new FormData();
    formData.append("photo", file);

    const response = await fetchWithAuth(`${PRODUCTS_URL}/${id}/photo`, {
      method: "PATCH",
      body: formData,
    });
    if (!response.ok) {
      throw new Error("Failed to update product photo");
    }
    return response.json();
  },
};
