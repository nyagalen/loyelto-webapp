import { apiPost } from '../client';
import { HandshakeResponse } from '../../types/business.types';

/**
 * Authentication service for Privy integration.
 */
export const authService = {
  /**
   * Performs handshake with backend after Privy authentication.
   * @param token - Privy access token
   * @returns Handshake response
   */
  handshake: (token: string): Promise<HandshakeResponse> => {
    return apiPost<HandshakeResponse>('/api/v1/auth/handshake', {}, token);
  },
};
