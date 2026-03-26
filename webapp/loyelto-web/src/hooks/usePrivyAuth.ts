import { useQuery } from '@tanstack/react-query';
import { usePrivy } from '@privy-io/react-auth';
import { authService } from '../api';

/**
 * Hook for managing Privy authentication and backend handshake.
 *
 * Handles token retrieval and automatic handshake with backend.
 *
 * @returns Authentication state and token
 */
export function usePrivyAuth() {
  const { getAccessToken, user, authenticated, ready } = usePrivy();

  const { data: token, isLoading: isTokenLoading } = useQuery({
    queryKey: ['privy-token'],
    queryFn: () => getAccessToken(),
    enabled: authenticated && ready,
    staleTime: 1000 * 60 * 4, // 4 minutes (tokens expire in 5)
  });

  const {
    isLoading: isHandshakeLoading,
    isSuccess: isHandshakeSuccessful,
  } = useQuery({
    queryKey: ['privy-handshake', token],
    queryFn: () => authService.handshake(token!),
    enabled: !!token,
  });

  return {
    user,
    token,
    authenticated,
    ready,
    isHandshakeSuccessful,
    isLoading: isTokenLoading || isHandshakeLoading,
    email: user?.email?.address,
  };
}
