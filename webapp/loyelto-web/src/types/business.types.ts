/**
 * Business entity from the API.
 */
export interface Business {
  id: string;
  name: string;
  email: string;
  description?: string;
  logoUrl?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Wallet balance response from the API.
 */
export interface WalletBalance {
  balance: number;
  currency: string;
}

/**
 * Customer statistics response from the API.
 */
export interface CustomerStats {
  totalCustomers: number;
  activeCustomers: number;
  newCustomersThisMonth?: number;
}

/**
 * Business creation request payload.
 */
export interface CreateBusinessRequest {
  name: string;
  email: string;
  description?: string;
  country: string;
  city: string;
  loyaltyRate: number;
}

/**
 * Handshake response from auth API.
 */
export interface HandshakeResponse {
  success: boolean;
  userId?: string;
}
