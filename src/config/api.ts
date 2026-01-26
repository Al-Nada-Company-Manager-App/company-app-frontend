// API and image URL configuration

export const API_BASE_URL = "http://localhost:4000";

/**
 * Get the URL for an uploaded image from the backend
 * @param type - The type of image: 'employees', 'customers', 'suppliers', 'products'
 * @param filename - The filename of the image (e.g., "1.jpg")
 * @returns Full URL to the image on the backend server
 */
export const getImageUrl = (
  type: "employees" | "customers" | "suppliers" | "products",
  filename: string | null | undefined,
): string => {
  if (!filename) {
    return `/Images/${type}/placeholder.jpg`;
  }

  // If it's already a full URL or data URL, return as-is
  if (filename.startsWith("http") || filename.startsWith("data:")) {
    return filename;
  }

  // Return the backend API URL for the image
  return `${API_BASE_URL}/images/${type}/${filename}`;
};

/**
 * Get placeholder image URL for a given type
 */
export const getPlaceholderUrl = (
  type: "employees" | "customers" | "suppliers" | "products",
): string => {
  return `/Images/${type}/placeholder.jpg`;
};
