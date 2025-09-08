import type {
  Product,
  CreateProductInput,
  UpdateProductInput,
} from "@src/types/Products/product";

const API_BASE_URL = "http://localhost:4000";

// Product API functions
export const productsApi = {
  // Get all products
  getAllProducts: async (): Promise<Product[]> => {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return response.json();
  },

  // Get product by ID
  getProductById: async (id: number): Promise<Product> => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch product with ID: ${id}`);
    }
    return response.json();
  },

  // Create new product
  createProduct: async (productData: CreateProductInput): Promise<Product> => {
    const response = await fetch(`${API_BASE_URL}/products`, {
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
    const response = await fetch(
      `${API_BASE_URL}/products/${updateData.p_id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      }
    );
    if (!response.ok) {
      throw new Error(`Failed to update product with ID: ${updateData.p_id}`);
    }
    return response.json();
  },

  // Delete product
  deleteProduct: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Failed to delete product with ID: ${id}`);
    }
  },

  // Update product photo
  // Update product photo
  updateProductPhoto: async (id: number, file: File): Promise<Product> => {
    const formData = new FormData();
    formData.append("photo", file);

    const response = await fetch(`${API_BASE_URL}/products/${id}/photo`, {
      method: "PATCH", 
      body: formData,
    });
    if (!response.ok) {
      throw new Error("Failed to update product photo");
    }
    return response.json();
  },
};
