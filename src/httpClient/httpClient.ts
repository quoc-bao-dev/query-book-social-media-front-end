import { HttpError } from '@/types/common';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface HttpClient {
  get<T = any>(url: string, headers?: HeadersInit): Promise<T>;
  post<T = any>(url: string, data?: any, headers?: HeadersInit): Promise<T>;
  patch<T = any>(url: string, data?: any, headers?: HeadersInit): Promise<T>;
  delete<T = any>(url: string, headers?: HeadersInit): Promise<T>;
}

const httpClient: HttpClient = {
  async get<T>(url: string, headers: HeadersInit = {}): Promise<T> {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`GET request failed: ${response.statusText}`);
    }

    return response.json();
  },

  async post<T>(
    url: string,
    data: unknown,
    headers: HeadersInit = {},
  ): Promise<T> {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw (await response.json()) as HttpError;
    }

    return response.json();
  },

  async patch<T>(
    url: string,
    data: unknown,
    headers: HeadersInit = {},
  ): Promise<T> {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`PATCH request failed: ${response.statusText}`);
    }

    return response.json();
  },

  async delete<T>(url: string, headers: HeadersInit = {}): Promise<T> {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`DELETE request failed: ${response.statusText}`);
    }

    return response.json();
  },
};

export default httpClient;
