import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock import.meta.env
vi.stubGlobal('import.meta', {
  env: {
    DEV: true,
    VITE_API_BASE_URL: 'https://api.test.example.com',
    VITE_EMAILJS_PUBLIC_KEY: 'test-key',
    VITE_EMAILJS_SERVICE_ID: 'test-service',
    VITE_EMAILJS_TEMPLATE_ID: 'test-template',
  },
});
