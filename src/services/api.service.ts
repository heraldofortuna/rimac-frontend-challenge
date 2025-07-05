import axios, { type AxiosInstance, type AxiosRequestConfig, AxiosError, type AxiosResponse } from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const createApiService = () => {
  // Crear instancia de Axios
  const instance: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });

  // Configurar interceptores
  const setupInterceptors = () => {
    instance.interceptors.request.use(
      (config: import('axios').InternalAxiosRequestConfig) => {
        // Aquí puedes añadir lógica común para todas las requests
        // Ej: añadir token de autenticación
        // config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
      (error: AxiosError) => Promise.reject(error)
    );

    instance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        handleError(error);
        return Promise.reject(error);
      }
    );
  };

  // Manejo centralizado de errores
  const handleError = (error: AxiosError) => {
    if (error.response) {
      console.error('Error response:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Request error:', error.message);
    }
  };

  // Métodos públicos
  const get = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await instance.get<T>(url, config);
    return response.data;
  };

  // Inicializar
  setupInterceptors();

  // Retornar métodos públicos
  return {
    get,
    // Puedes añadir más métodos aquí (post, put, delete, etc.)
  };
};

// Exportar una instancia única del servicio (singleton)
export const apiService = createApiService();