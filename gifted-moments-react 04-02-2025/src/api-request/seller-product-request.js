import axios from 'axios';
import { handleAxiosError } from '../utils/helper-functions';

const base_url = process.env.REACT_APP_API_BASE_URL;
//- const base_url = import.meta.env.VITE_APP_API_URL;


export async function createSellerProduct(productData) {
  try {
    const response = await axios.post(`${base_url}/seller-products`, productData);
    return {
      status: true,
      message: "Seller product created successfully",
      data: response.data.data,
    };
  } catch (error) {
    return handleAxiosError(error);
  }
}

export async function getAllSellerProducts() {
  try {
    const response = await axios.get(`${base_url}/seller-products`);
    return {
      status: true,
      message: "Seller products retrieved successfully",
      data: response.data.data,
    };
  } catch (error) {
    return handleAxiosError(error);
  }
}

export async function getSellerProductById(productId) {
  try {
    const response = await axios.get(`${base_url}/seller-products/${productId}`);
    return {
      status: true,
      message: "Seller product retrieved successfully",
      data: response.data.data,
    };
  } catch (error) {
    return handleAxiosError(error);
  }
}

export async function getSellerProductBySellerId(sellerId) {
  try {
    const response = await axios.get(`${base_url}/seller-products/seller/${sellerId}`);
    return {
      status: true,
      message: "Seller products retrieved successfully for seller",
      data: response.data.data,
    };
  } catch (error) {
    return handleAxiosError(error);
  }
}
export async function getSellerProductByActive(active) {
  try {
    const response = await axios.get(`${base_url}/seller-products/active/${active}`);
    return {
      status: true,
      message: "Seller products retrieved successfully ",
      data: response.data.data,
    };
  } catch (error) {
    return handleAxiosError(error);
  }
}

export async function getSellerProductByCategoryId(categoryId) {
  try {
    const response = await axios.get(`${base_url}/seller-products/category/${categoryId}`);
    return {
      status: true,
      message: "Seller products retrieved successfully for category",
      data: response.data.data,
    };
  } catch (error) {
    return handleAxiosError(error);
  }
}

export async function updateSellerProductById(productId, updatedData) {
  try {
    const response = await axios.put(`${base_url}/seller-products/${productId}`, updatedData);
    return {
      status: true,
      message: "Seller product updated successfully",
      data: response.data.data,
    };
  } catch (error) {
    return handleAxiosError(error);
  }
}

export async function deleteSellerProductById(productId) {
  try {
    const response = await axios.delete(`${base_url}/seller-products/${productId}`);
    return {
      status: true,
      message: "Seller product deleted successfully",
      data: response.data.data,
    };
  } catch (error) {
    return handleAxiosError(error);
  }
}
