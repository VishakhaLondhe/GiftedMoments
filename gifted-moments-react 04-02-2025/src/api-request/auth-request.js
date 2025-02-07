import axios from "axios";
import { handleAxiosError } from "../utils/helper-functions";

const base_url = process.env.REACT_APP_API_BASE_URL;
//- const base_url = import.meta.env.VITE_APP_API_URL;


export async function loginUser(emailId, password) {
  try {
    const response = await axios.post(`${base_url}/auth/login`, {
      emailId: emailId,
      password: password,
    });
    return {
      status: true,
      message: "Login successful",
      data: response.data.data,
    };
  } catch (error) {
    console.error("Error logging in:", error);
    return handleAxiosError(error);
  }
}
