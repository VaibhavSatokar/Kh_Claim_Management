
import axios, { AxiosInstance } from "axios";

const BaseURL = process.env.REACT_APP_API_ENDPOINT;

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: BaseURL,
  headers: {
    // Add any headers you want to include in your requests
    'Authorization': '', // Replace 'YOUR_ACCESS_TOKEN' with the actual token value
  },
});

// Function to set the 'Authorization' header with the provided token
export const setAuthToken = (token : string | null) => {
  axiosInstance.defaults.headers['Authorization'] = token ? `${token}` : '';
};