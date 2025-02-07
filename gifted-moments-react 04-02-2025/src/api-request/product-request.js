import axios from "axios";
import { handleAxiosError } from "../utils/helper-functions";

 const base_url = process.env.REACT_APP_API_BASE_URL;
//-const base_url = import.meta.env.VITE_APP_API_URL;


export async function createProduct(productData) {
  try {
    const response = await axios.post(`${base_url}/products`, productData);
    return {
      status: true,
      message: "Product created successfully",
      data: response.data.data,
    };
  } catch (error) {
    return handleAxiosError(error);
  }
}

export async function getAllProducts() {
  try {
    const response = await axios.get(`${base_url}/products`);
    return {
      status: true,
      message: "Products retrieved successfully",
      data: response.data.data,
    };
  } catch (error) {
    return handleAxiosError(error);
  }
}

export async function getProductsByOccasion(occasionId) {
  try {
    const response = await axios.get(
      `${base_url}/products/occasion/${occasionId}`
    );
    return {
      status: true,
      message: "Products by Occasion retrieved successfully",
      data: response.data.data,
    };
  } catch (error) {
    return handleAxiosError(error);
  }
}

export async function getProductsByCategory(categoryId) {
  try {
    const response = await axios.get(
      `${base_url}/products/category/${categoryId}`
    );
    return {
      status: true,
      message: "Products by Category retrieved successfully",
      data: response.data.data,
    };
  } catch (error) {
    return handleAxiosError(error);
  }
}

export async function getProductById(productId) {
  try {
    const response = await axios.get(`${base_url}/products/${productId}`);
    return {
      status: true,
      message: "Product retrieved successfully",
      data: response.data.data,
    };
  } catch (error) {
    return handleAxiosError(error);
  }
}

export async function deleteProductById(productId) {
  try {
    const response = await axios.delete(`${base_url}/products/${productId}`);
    return {
      status: true,
      message: "Product deleted successfully",
      data: response.data.data,
    };
  } catch (error) {
    return handleAxiosError(error);
  }
}

export async function updateProduct(productId, productData) {
  try {
    const response = await axios.put(
      `${base_url}/products/${productId}`,
      productData
    );
    return {
      status: true,
      message: "Product updated successfully",
      data: response.data.data,
    };
  } catch (error) {
    return handleAxiosError(error);
  }
}
