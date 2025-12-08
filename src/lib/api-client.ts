import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import toast from "react-hot-toast";

// Create Axios instance
export const apiClient: AxiosInstance = axios.create({
  baseURL: "/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    let message = "An unexpected error occurred";

    if (error.response) {
      // Server responded with a status code outside 2xx range
      const data = error.response.data as any;
      message = data.error || data.message || error.message;
    } else if (error.request) {
      // Request was made but no response received
      message = "Network error. Please check your connection.";
    } else {
      // Something triggered an error in setting up the request
      message = error.message;
    }

    // Display error toast
    toast.error(message);

    return Promise.reject(error);
  }
);
