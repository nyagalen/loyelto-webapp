/**
 * API error with HTTP status code.
 * Used for typed error handling across the application.
 */
export interface ApiError extends Error {
  /** HTTP status code from the response */
  status: number;
  /** Optional error code from the API */
  code?: string;
}

/**
 * Creates a typed API error.
 * @param message - Error message
 * @param status - HTTP status code
 * @returns ApiError instance
 */
export function createApiError(message: string, status: number): ApiError {
  const error = new Error(message) as ApiError;
  error.status = status;
  return error;
}

/**
 * Type guard to check if an error is an ApiError.
 * @param error - Unknown error to check
 * @returns True if error is an ApiError
 */
export function isApiError(error: unknown): error is ApiError {
  return error instanceof Error && 'status' in error && typeof (error as ApiError).status === 'number';
}
