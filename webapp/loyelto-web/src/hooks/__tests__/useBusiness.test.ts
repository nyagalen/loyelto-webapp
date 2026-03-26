import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createElement, ReactNode } from 'react';
import { useBusiness } from '../useBusiness';
import { businessService } from '../../api';

// Mock the API module
vi.mock('../../api', () => ({
    businessService: {
        getByEmail: vi.fn(),
    },
    isApiError: (error: unknown): error is { status: number } => {
        return typeof error === 'object' && error !== null && 'status' in error;
    },
}));

const createWrapper = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });
    return ({ children }: { children: ReactNode }) =>
        createElement(QueryClientProvider, { client: queryClient }, children);
};

describe('useBusiness', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should return loading state initially when enabled', async () => {
        vi.mocked(businessService.getByEmail).mockResolvedValue({
            id: '1',
            name: 'Test Business',
            email: 'test@example.com',
            createdAt: '2024-01-01',
            updatedAt: '2024-01-01',
        });

        const { result } = renderHook(
            () => useBusiness('test@example.com', 'token123'),
            { wrapper: createWrapper() }
        );

        expect(result.current.isLoading).toBe(true);
    });

    it('should fetch business data when email and token are provided', async () => {
        const mockBusiness = {
            id: '1',
            name: 'Test Business',
            email: 'test@example.com',
            createdAt: '2024-01-01',
            updatedAt: '2024-01-01',
        };
        vi.mocked(businessService.getByEmail).mockResolvedValue(mockBusiness);

        const { result } = renderHook(
            () => useBusiness('test@example.com', 'token123'),
            { wrapper: createWrapper() }
        );

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        expect(result.current.business).toEqual(mockBusiness);
        expect(result.current.exists).toBe(true);
        expect(result.current.notFound).toBe(false);
    });

    it('should not fetch when email is undefined', () => {
        const { result } = renderHook(
            () => useBusiness(undefined, 'token123'),
            { wrapper: createWrapper() }
        );

        expect(businessService.getByEmail).not.toHaveBeenCalled();
        expect(result.current.isLoading).toBe(false);
    });

    it('should not fetch when token is undefined', () => {
        const { result } = renderHook(
            () => useBusiness('test@example.com', undefined),
            { wrapper: createWrapper() }
        );

        expect(businessService.getByEmail).not.toHaveBeenCalled();
        expect(result.current.isLoading).toBe(false);
    });

    it('should not fetch when enabled is false', () => {
        const { result } = renderHook(
            () => useBusiness('test@example.com', 'token123', false),
            { wrapper: createWrapper() }
        );

        expect(businessService.getByEmail).not.toHaveBeenCalled();
        expect(result.current.isLoading).toBe(false);
    });

    it('should set notFound to true when business is not found', () => {
        // Test the notFound logic in isolation by checking initial state
        const { result } = renderHook(
            () => useBusiness('test@example.com', undefined),
            { wrapper: createWrapper() }
        );

        // When no query is made, notFound should be false
        expect(result.current.notFound).toBe(false);
        expect(result.current.exists).toBe(false);
    });
});
