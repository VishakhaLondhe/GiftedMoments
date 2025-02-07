import axios from 'axios';
import { handleAxiosError } from '../utils/helper-functions';

const base_url = process.env.REACT_APP_API_BASE_URL;
//- const base_url = import.meta.env.VITE_APP_API_URL;


export async function getAllBasicData() {
  try {
    const response = await axios.get(`${base_url}/data`);
    return {
      status: true,
      message: "Brands retrieved successfully",
      data: response.data.data,
    };
  } catch (error) {
    return handleAxiosError(error);
  }
}
export async function getAllBrands() {
  try {
    const response = await axios.get(`${base_url}/data/brands`);
    return {
      status: true,
      message: "Brands retrieved successfully",
      data: response.data.data,
    };
  } catch (error) {
    return handleAxiosError(error);
  }
}

export async function getAllCategories() {
  try {
    const response = await axios.get(`${base_url}/data/categories`);
    return {
      status: true,
      message: "Categories retrieved successfully",
      data: response.data.data,
    };
  } catch (error) {
    return handleAxiosError(error);
  }
}

export async function getAllOccasions() {
  try {
    const response = await axios.get(`${base_url}/data/occasions`);
    return {
      status: true,
      message: "Occasions retrieved successfully",
      data: response.data.data,
    };
  } catch (error) {
    return handleAxiosError(error);
  }
}

export async function createBrand(brandData) {
  try {
    const response = await axios.post(`${base_url}/data/brands`, brandData);
    return {
      status: true,
      message: "Brand created successfully",
      data: response.data.data,
    };
  } catch (error) {
    return handleAxiosError(error);
  }
}

export async function createCategory(categoryData) {
  try {
    const response = await axios.post(`${base_url}/data/categories`, categoryData);
    return {
      status: true,
      message: "Category created successfully",
      data: response.data.data,
    };
  } catch (error) {
    return handleAxiosError(error);
  }
}

export async function createOccasion(occasionData) {
  try {
    const response = await axios.post(`${base_url}/data/occasions`, occasionData);
    return {
      status: true,
      message: "Occasion created successfully",
      data: response.data.data,
    };
  } catch (error) {
    return handleAxiosError(error);
  }
}

export async function updateBrand(brandId, brandData) {
  try {
    const response = await axios.put(`${base_url}/data/brands/${brandId}`, brandData);
    return {
      status: true,
      message: "Brand updated successfully",
      data: response.data.data,
    };
  } catch (error) {
    return handleAxiosError(error);
  }
}

export async function updateCategory(categoryId, categoryData) {
  try {
    const response = await axios.put(`${base_url}/data/categories/${categoryId}`, categoryData);
    return {
      status: true,
      message: "Category updated successfully",
      data: response.data.data,
    };
  } catch (error) {
    return handleAxiosError(error);
  }
}

export async function updateOccasion(occasionId, occasionData) {
  try {
    const response = await axios.put(`${base_url}/data/occasions/${occasionId}`, occasionData);
    return {
      status: true,
      message: "Occasion updated successfully",
      data: response.data.data,
    };
  } catch (error) {
    return handleAxiosError(error);
  }
}

export async function deleteBrand(brandId) {
  try {
    const response = await axios.delete(`${base_url}/data/brands/${brandId}`);
    return {
      status: true,
      message: "Brand deleted successfully",
      data: response.data.data,
    };
  } catch (error) {
    return handleAxiosError(error);
  }
}

export async function deleteCategory(categoryId) {
  try {
    const response = await axios.delete(`${base_url}/data/categories/${categoryId}`);
    return {
      status: true,
      message: "Category deleted successfully",
      data: response.data.data,
    };
  } catch (error) {
    return handleAxiosError(error);
  }
}

export async function deleteOccasion(occasionId) {
  try {
    const response = await axios.delete(`${base_url}/data/occasions/${occasionId}`);
    return {
      status: true,
      message: "Occasion deleted successfully",
      data: response.data.data,
    };
  } catch (error) {
    return handleAxiosError(error);
  }
}
