
export const BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://soora-sigma.vercel.app/api/'  // Production API URL
  : 'http://localhost:3000/api/';          // Development API URL
