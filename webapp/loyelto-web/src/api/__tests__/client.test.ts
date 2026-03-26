import { describe, it, expect, vi, beforeEach } from 'vitest';
import { apiClient, apiGet, apiPost, isApiError } from '../client';
import { createApiError } from '../../types/api.types';

// Mock fetch
const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

// Mock ENV
vi.mock('../../config/env', () => ({
  ENV: {
    API_BASE_URL: 'https://api.test.example.com',
  },
}));

describe('apiClient', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should make GET request with correct headers', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ data: 'test' }),
    });

    await apiGet('/test', 'token123');

    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.test.example.com/test',
      expect.objectContaining({
        method: 'GET',
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
          Authorization: 'Bearer token123',
        }),
      })
    );
  });

  it('should make POST request with body', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    });

    await apiPost('/test', { name: 'test' }, 'token123');

    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.test.example.com/test',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
          Authorization: 'Bearer token123',
        }),
        body: JSON.stringify({ name: 'test' }),
      })
    );
  });

  it('should make request without token', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ data: 'test' }),
    });

    await apiGet('/test');

    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.test.example.com/test',
      expect.objectContaining({
        headers: expect.not.objectContaining({
          Authorization: expect.anything(),
        }),
      })
    );
  });

  it('should throw ApiError on non-ok response', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    });

    await expect(apiClient('/test')).rejects.toMatchObject({
      message: 'Not Found',
      status: 404,
    });
  });

  it('should return parsed JSON response', async () => {
    const mockData = { id: 1, name: 'test' };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    const result = await apiGet('/test');

    expect(result).toEqual(mockData);
  });

  it('should handle custom headers', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({}),
    });

    await apiClient('/test', {
      headers: {
        'X-Custom-Header': 'custom-value',
      },
    });

    expect(mockFetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
          'X-Custom-Header': 'custom-value',
        }),
      })
    );
  });
});

describe('isApiError', () => {
  it('should return true for ApiError', () => {
    const error = createApiError('test error', 404);
    expect(isApiError(error)).toBe(true);
  });

  it('should return false for regular Error', () => {
    const error = new Error('test');
    expect(isApiError(error)).toBe(false);
  });

  it('should return false for non-error objects', () => {
    expect(isApiError({ status: 404 })).toBe(false);
    expect(isApiError('string')).toBe(false);
    expect(isApiError(null)).toBe(false);
    expect(isApiError(undefined)).toBe(false);
  });
});
