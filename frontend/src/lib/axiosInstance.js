import axios from "axios";
import toast from "react-hot-toast";

const api = axios.create({
  baseURL: "/api",
  timeout: 10000,
});

// RESPONSE INTERCEPTOR (UNWRAP)
api.interceptors.response.use(
  (response) => {
    // If backend use payload
    if (response.data?.payload) {
      return response.data.payload;
    }
    return response.data;
  },
  (error) => {
    const status = error.response?.status;
    const message =
      error.response?.data?.payload?.message ||
      error.response?.data?.message ||
      "Something went wrong";

    // Global error handling
    if (status === 429) {
      toast.error("Too many requests, slow down 🚦");
    } else if (status === 401) {
      toast.error("Unauthorized, please login");
    } else if (status >= 500) {
      toast.error("Server error");
    } else {
      toast.error(message);
    }

    return Promise.reject(error);
  }
);

export default api;
