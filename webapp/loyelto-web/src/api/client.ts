import { ENV } from '../config/env';
import { ApiError, createApiError, isApiError } from '../types/api.types';

/**
 * Options for API client requests.
 */
interface ApiClientOptions extends Omit<RequestInit, 'body'> {
  /** Bearer token for authorization */
  token?: string;
  /** Request body (will be JSON stringified) */
  body?: unknown;
}

/**
 * Centralized API client for making authenticated requests.
 * Handles authorization headers, JSON parsing, and error handling.
 *
 * @param endpoint - API endpoint path (e.g., '/api/v1/businesses')
 * @param options - Request options including token and body
 * @returns Parsed JSON response
 * @throws {ApiError} When the request fails
 */
export async function apiClient<T>(endpoint: string, options?: ApiClientOptions): Promise<T> {
  const { token, body, headers, ...fetchOptions } = options ?? {};

  const requestInit: RequestInit = {
    ...fetchOptions,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(headers && typeof headers === 'object' ? headers : {}),
    },
  };

  if (body) {
    requestInit.body = JSON.stringify(body);
  }

  const response = await fetch(`${ENV.API_BASE_URL}${endpoint}`, requestInit);

  if (!response.ok) {
    throw createApiError(response.statusText || 'Request failed', response.status);
  }

  return response.json();
}

/**
 * GET request helper.
 */
export function apiGet<T>(endpoint: string, token?: string): Promise<T> {
  return apiClient<T>(endpoint, { method: 'GET', token });
}

/**
 * POST request helper.
 */
export function apiPost<T>(endpoint: string, body: unknown, token?: string): Promise<T> {
  return apiClient<T>(endpoint, { method: 'POST', body, token });
}

export { isApiError };
export type { ApiError };
