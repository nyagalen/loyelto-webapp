export const ENV = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
  EMAILJS_PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  EMAILJS_SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  PRIVY_APP_ID: import.meta.env.VITE_PRIVY_APP_ID,
} as const;
