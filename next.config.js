/** @type {import('next').NextConfig} */
const dns = require('node:dns');

const { i18n } = require('./next-i18next.config');

process.env.NEXT_TELEMETRY_DISABLED = 1;

const notVercel = process.env.VERCEL === undefined;
const isDevelopment = process.env.NODE_ENV === 'development';
const sourceMapsEnabled = notVercel && isDevelopment;

console.log('Using Node:', process.version);
console.log(
  'Building ENV:',
  process.env.NODE_ENV,
  process.env.NEXT_PUBLIC_VERCEL_URL
);
console.log('Source Maps Enabled:', sourceMapsEnabled);

if (process.env.NODE_ENV === "test") {
  dns.setDefaultResultOrder('ipv4first')
}

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  productionBrowserSourceMaps: sourceMapsEnabled,
  poweredByHeader: false,
  i18n: {
    ...i18n,
  },
};

module.exports = nextConfig;
