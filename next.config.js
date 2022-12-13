/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')

module.exports = withPWA({
  reactStrictMode: true,
  swcMinify: true,
  env: {
    C_SPC_ID: '4xsr7uqyeyi2',
    C_MNG_TOKEN: 'CFPAT-n2ou0ArAoOZaiqPKj7oXLbI_k80-8Hq5t33ZPWp8YmI',
  },
  pwa: {
    dest: "public",
    customWorkerDir: 'serviceworker',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development'
  }
})