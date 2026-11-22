import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Public defaults for Claver so a deploy works without a .env file.
// A value from .env files or the hosting provider still wins.
const defaults: Record<string, string> = {
  VITE_GOVERNMENT_NAME: 'Claver',
  VITE_GOVERNMENT_TYPE: 'Municipality',
  VITE_PROVINCE: 'Surigao del Norte',
  VITE_REGION: 'Caraga',
  VITE_SITE_DESCRIPTION:
    'Community-run portal for Claver, Surigao del Norte. Find municipal officials, offices, services, and public information.',
  VITE_SITE_KEYWORDS:
    'claver, surigao del norte, local government, municipal hall, services',
};

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  for (const [key, value] of Object.entries(defaults)) {
    if (!env[key]) process.env[key] = value;
  }
  return {
    base: process.env.BASE_PATH || '/',
    plugins: [react(), tailwindcss()],
    assetsInclude: ['**/*.md'],
  };
});
