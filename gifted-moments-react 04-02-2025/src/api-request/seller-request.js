import axios from "axios";
import { handleAxiosError } from "../utils/helper-functions";

const base_url = process.env.REACT_APP_API_BASE_URL;
//- const base_url = import.meta.env.VITE_APP_API_URL;


// Function to get all sellers
export async function getAllSellers() {
  try {
    const response = await axios.get(`${base_url}/seller`);
    return {
      status: true,
      message: "Sellers retrieved successfully",
      data: response.data.data,
    };
  } catch (error) {
    return handleAxiosError(error);
  }
}

// Function to get a seller by ID
export async function getSellerById(sellerId) {
  try {
    const response = await axios.get(`${base_url}/seller/${sellerId}`);
    return {
      status: true,
      message: "Seller retrieved successfully",
      data: response.data.data,
    };
  } catch (error) {
    return handleAxiosError(error);
  }
}

// Function to update seller by ID
export async function updateSellerById(sellerId, sellerData) {
  try {
    const response = await axios.put(
      `${base_url}/seller/${sellerId}`,
      sellerData
    );
    return {
      status: true,
      message: "Seller updated successfully",
      data: response.data.data,
    };
  } catch (error) {
    return handleAxiosError(error);
  }
}

// Function to delete seller by ID
export async function deleteSellerById(sellerId) {
  try {
    const response = await axios.delete(`${base_url}/seller/${sellerId}`);
    return {
      status: true,
      message: "Seller deleted successfully",
      data: response.data.data,
    };
  } catch (error) {
    return handleAxiosError(error);
  }
}
