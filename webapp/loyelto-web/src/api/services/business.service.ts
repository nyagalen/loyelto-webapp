import { apiGet, apiPost } from '../client';
import { Business, WalletBalance, CustomerStats, CreateBusinessRequest } from '../../types/business.types';

/**
 * Business API service.
 */
export const businessService = {
  /**
   * Gets business by email address.
   * @param email - Business email
   * @param token - Auth token
   * @returns Business entity
   */
  getByEmail: (email: string, token: string): Promise<Business> => {
    return apiGet<Business>(`/api/v1/businesses/by-email/${email}`, token);
  },

  /**
   * Gets wallet balance for authenticated business.
   * @param token - Auth token
   * @returns Wallet balance
   */
  getWalletBalance: (token: string): Promise<WalletBalance> => {
    return apiGet<WalletBalance>('/api/v1/businesses/me/wallet-balance', token);
  },

  /**
   * Gets customer statistics for authenticated business.
   * @param token - Auth token
   * @returns Customer stats
   */
  getCustomerStats: (token: string): Promise<CustomerStats> => {
    return apiGet<CustomerStats>('/api/v1/businesses/me/customer-stats', token);
  },

  /**
   * Creates a new business.
   * @param data - Business creation data
   * @param token - Auth token
   * @returns Created business
   */
  create: (data: CreateBusinessRequest, token: string): Promise<Business> => {
    return apiPost<Business>('/api/v1/businesses/', data, token);
  },
};
