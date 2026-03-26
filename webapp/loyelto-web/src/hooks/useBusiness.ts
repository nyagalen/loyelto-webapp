import { useQuery } from '@tanstack/react-query';
import { businessService, isApiError } from '../api';

/**
 * Hook for fetching business data by email.
 *
 * @param email - Business email address
 * @param token - Auth token
 * @param enabled - Whether to enable the query
 * @returns Business data and loading state
 */
export function useBusiness(email: string | undefined, token: string | undefined, enabled = true) {
  const {
    data: business,
    error,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['business', email],
    queryFn: () => businessService.getByEmail(email!, token!),
    enabled: enabled && !!email && !!token,
    retry: (failureCount, error) => {
      if (isApiError(error) && error.status === 404) {
        return false;
      }
      return failureCount < 3;
    },
  });

  const notFound = isApiError(error) && error.status === 404;

  return {
    business,
    error,
    isLoading,
    isFetching,
    notFound,
    exists: !!business && !notFound,
  };
}
