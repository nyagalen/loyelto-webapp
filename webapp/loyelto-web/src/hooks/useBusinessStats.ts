import { useQueries } from '@tanstack/react-query';
import { businessService } from '../api';
import { WalletBalance, CustomerStats } from '../types/business.types';

/**
 * Hook for fetching business statistics (wallet balance and customer stats).
 *
 * @param token - Auth token
 * @param enabled - Whether to enable queries
 * @returns Combined stats data
 */
export function useBusinessStats(token: string | undefined, enabled = true) {
  const results = useQueries({
    queries: [
      {
        queryKey: ['wallet-balance'],
        queryFn: () => businessService.getWalletBalance(token!),
        enabled: enabled && !!token,
      },
      {
        queryKey: ['customer-stats'],
        queryFn: () => businessService.getCustomerStats(token!),
        enabled: enabled && !!token,
      },
    ],
  });

  const [balanceQuery, statsQuery] = results;

  return {
    walletBalance: balanceQuery.data as WalletBalance | undefined,
    customerStats: statsQuery.data as CustomerStats | undefined,
    isLoading: balanceQuery.isLoading || statsQuery.isLoading,
    error: balanceQuery.error || statsQuery.error,
  };
}
