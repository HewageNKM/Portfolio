const isDevelopment = import.meta.env.MODE === 'development';

export const API_BASE_URL = isDevelopment
  ? "http://localhost:5001/portfolio-cd280/asia-northeast1/api/v1"
  : "https://asia-northeast1-portfolio-cd280.cloudfunctions.net/api/v1";
