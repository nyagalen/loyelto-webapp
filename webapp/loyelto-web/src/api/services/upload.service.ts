import { ENV } from '../../config/env';

/**
 * Upload service for file uploads.
 */
export const uploadService = {
  /**
   * Uploads business logo.
   * @param file - Logo file
   * @param token - Auth token
   * @returns Upload response with URL
   */
  uploadBusinessLogo: async (file: File, token: string): Promise<{ url: string }> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${ENV.API_BASE_URL}/api/v1/uploads/business/logo`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    return response.json();
  },
};
