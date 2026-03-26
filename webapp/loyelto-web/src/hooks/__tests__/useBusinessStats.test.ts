import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createElement, ReactNode } from 'react';
import { useBusinessStats } from '../useBusinessStats';
import { businessService } from '../../api';

// Mock the API module
vi.mock('../../api', () => ({
    businessService: {
        getWalletBalance: vi.fn(),
        getCustomerStats: vi.fn(),
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

describe('useBusinessStats', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should return loading state initially when enabled', async () => {
        vi.mocked(businessService.getWalletBalance).mockResolvedValue({ balance: 1000, currency: 'EUR' });
        vi.mocked(businessService.getCustomerStats).mockResolvedValue({ totalCustomers: 50, activeCustomers: 30 });

        const { result } = renderHook(
            () => useBusinessStats('token123'),
            { wrapper: createWrapper() }
        );

        expect(result.current.isLoading).toBe(true);
    });

    it('should fetch both wallet balance and customer stats', async () => {
        const mockBalance = { balance: 1000, currency: 'EUR' };
        const mockStats = { totalCustomers: 50, activeCustomers: 30 };

        vi.mocked(businessService.getWalletBalance).mockResolvedValue(mockBalance);
        vi.mocked(businessService.getCustomerStats).mockResolvedValue(mockStats);

        const { result } = renderHook(
            () => useBusinessStats('token123'),
            { wrapper: createWrapper() }
        );

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        expect(result.current.walletBalance).toEqual(mockBalance);
        expect(result.current.customerStats).toEqual(mockStats);
    });

    it('should not fetch when token is undefined', () => {
        const { result } = renderHook(
            () => useBusinessStats(undefined),
            { wrapper: createWrapper() }
        );

        expect(businessService.getWalletBalance).not.toHaveBeenCalled();
        expect(businessService.getCustomerStats).not.toHaveBeenCalled();
        expect(result.current.isLoading).toBe(false);
    });

    it('should not fetch when enabled is false', () => {
        const { result } = renderHook(
            () => useBusinessStats('token123', false),
            { wrapper: createWrapper() }
        );

        expect(businessService.getWalletBalance).not.toHaveBeenCalled();
        expect(businessService.getCustomerStats).not.toHaveBeenCalled();
        expect(result.current.isLoading).toBe(false);
    });

    it('should return undefined values when not enabled', () => {
        const { result } = renderHook(
            () => useBusinessStats('token123', false),
            { wrapper: createWrapper() }
        );

        expect(result.current.walletBalance).toBeUndefined();
        expect(result.current.customerStats).toBeUndefined();
        expect(result.current.error).toBeNull();
    });
});
