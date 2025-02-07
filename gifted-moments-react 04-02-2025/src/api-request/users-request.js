import axios from 'axios';
import { handleAxiosError } from '../utils/helper-functions';

const base_url = process.env.REACT_APP_API_BASE_URL;
//- const base_url = import.meta.env.VITE_APP_API_URL;


// API Methods

// 1. Create User/Seller
export async function createUserSeller(userDetails) {
  try {
    const response = await axios.post(`${base_url}/users`, userDetails);
    return { status: true, message: 'User created successfully', data: response.data.data };
  } catch (error) {
    console.error('Error creating user/seller:', error);
    return handleAxiosError(error);
  }
}

// 2. Get Users
export async function getUsers() {
  try {
    const response = await axios.get(`${base_url}/users`);
    return { status: true, message: 'Fetched users list successfully', data: response.data.data };
  } catch (error) {
    console.error('Error fetching users:', error);
    return handleAxiosError(error);
  }
}

// 3. Delete User
export async function deleteUser(userId) {
  try {
    const response = await axios.delete(`${base_url}/users/${userId}`);
    return { status: true, message: 'User deleted successfully', data: response.data.data };
  } catch (error) {
    console.error('Error deleting user:', error);
    return handleAxiosError(error);
  }
}

// 4. Update User
export async function updateUser(userId, userDetails) {
  try {
    const response = await axios.put(`${base_url}/users/${userId}`, userDetails);
    return { status: true, message: 'User updated successfully', data: response.data.data };
  } catch (error) {
    console.error('Error updating user:', error);
    return handleAxiosError(error);
  }
}

// 5. Get User By Id
export async function getUserById(userId) {
  try {
    const response = await axios.get(`${base_url}/users/${userId}`);
    return { status: true, message: 'Fetched user details successfully', data: response.data.data };
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    return handleAxiosError(error);
  }
}
