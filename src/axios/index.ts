import { ErrorResponse, SuccessPaginationResponse, SuccessResponse } from '@/interface';
import axios, { AxiosError, RawAxiosRequestHeaders } from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});

export default axiosInstance;

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    let newError: ErrorResponse = {
      success: false,
      message: 'Terjadi kesalahan yang tidak diketahui',
      data: null,
    };

    if (error instanceof AxiosError) {
      if (error.response) {
        // Server merespons dengan status code di luar range 2xx
        newError = {
          success: false,
          message: error.response.data?.message || 'Terjadi kesalahan pada server',
          data: error.response.data?.data || null,
        };
      } else if (error.request) {
        // Request dibuat tapi tidak ada response
        newError = {
          success: false,
          message: 'Tidak ada response dari server',
          data: null,
        };
      } else {
        // Ada error saat setup request
        newError = {
          success: false,
          message: error.message || 'Terjadi kesalahan saat mengirim request',
          data: null,
        };
      }
    }

    return Promise.reject(newError);
  }
);

export const admin = {
  header: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')?.replace('"', '')}`,
  } as RawAxiosRequestHeaders,
  get: (url: string) => axiosInstance.get(`/admin${url}`, { headers: admin.header }),
  post: <T>(url: string, data?: any, headers?: RawAxiosRequestHeaders) =>
    axiosInstance.post<SuccessResponse<T>>(`/admin${url}`, data, {
      headers: { ...admin.header, ...headers },
    }),
  put: <T>(url: string, data?: any) =>
    axiosInstance.put<SuccessResponse<T>>(`/admin${url}`, data, { headers: admin.header }),
  delete: <T>(url: string) =>
    axiosInstance.delete<SuccessResponse<T>>(`/admin${url}`, { headers: admin.header }),
};

export const publicApi = {
  get: (url: string) => axiosInstance.get(`/public${url}`),
  getPagination: <T, R>(url: string, params?: T) =>
    axiosInstance.get<SuccessPaginationResponse<R>>(`/public${url}`, { params }),
  post: (url: string, data?: any) => axiosInstance.post(`/public${url}`, data),
};
