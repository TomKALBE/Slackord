import * as dotenv from 'dotenv';

dotenv.config();

const APP_ENV = process.env.NODE_ENV || 'production';

export default {
    PORT: process.env.PORT || '5000',
    API_URL: process.env.API_URL,
    inProduction: () => APP_ENV === 'production',
    inDevelopment: () => APP_ENV === 'development'
}
