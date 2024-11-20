import { useEffect } from "react";
import axios from "axios";

const useAxiosSecure = () => {
  const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000', // Base URL for your API
  });

  useEffect(() => {
    // Add any interceptors if needed for other use cases
    const requestInterceptor = axiosSecure.interceptors.request.use((config) => {
      // You can add custom headers or modify the config here if required
      return config;
    });

    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      (error) => {
        // You can handle global errors here if necessary
        return Promise.reject(error);
      }
    );

    return () => {
      // Clean up interceptors when the component unmounts
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [axiosSecure]);

  return axiosSecure;
};

export default useAxiosSecure;
