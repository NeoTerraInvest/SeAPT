import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api',
  /* when useing the api, timeout: 1000 is retry to get the data. 
  so occuring the error. and deep inside the infinite loop.
  */
  //   timeout: 5000,
  headers: {
    'X-API-KEY': import.meta.env.VITE_API_KEY,
    'Content-Type': 'application/json',
  },
});

// request interceptors
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    console.log('🟢request config:', config);
    return config;
  },
  (error: AxiosError) => {
    console.error('🔴request error:', error);
    return Promise.reject(error);
  },
);

// response interceptors
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log('🟢response:', response);
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      // HTTP status code error (400, 401, 403, 404, 500, etc.)
      // server received the request but responded with an error status code
      console.error('🔴server response error:', error.response.status);
      console.error('🔴error data:', error.response.data);
    } else if (error.request) {
      // network error (server connection failed, CORS error, etc.)
      // request was sent but the server did not respond
      console.error('🔴network error:', error.request);
    } else {
      // request configuration error (invalid URL, invalid parameters, etc.)
      // error occurred before sending the request
      console.error('🔴error:', error.message);
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
