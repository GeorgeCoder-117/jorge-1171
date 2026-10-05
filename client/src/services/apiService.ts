const BASE_URL = '/api/v1';

interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  receivedData?: unknown;
//   error?: string;
}

const handleResponse = async <T>(response: Response): Promise<ApiResponse<T>> => {
  const data = (await response.json().catch(() => ({}))) as ApiResponse<T>;

  if (!response.ok) {
    throw new Error(data.message || 'Error en la petición HTTP');
  }

  return data;
};

// Cliente genérico para reutilizar la lógica de Fetch
export const apiClient = {
  getStatus: async <T>(): Promise<ApiResponse<T>> => {
    const res = await fetch(`${BASE_URL}/status`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    return handleResponse<T>(res);
  },

  postData: async <T, TBody = unknown>(data: TBody): Promise<ApiResponse<T>> => {
    console.log('Datos enviados al backend:', data);
    const res = await fetch(`${BASE_URL}/recharge`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse<T>(res);
  },
};
