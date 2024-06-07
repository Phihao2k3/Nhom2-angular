import { APP_CONFIG } from './app.config';
import { IAPIEndpoint } from '../interfaces';

export const API_BASE_URL = APP_CONFIG.apiBaseUrl;

export const API_ENDPOINT: IAPIEndpoint = {
  auth: {
    base: API_BASE_URL + '/' + 'auth',
    login: '/users/login',
    logout: '/auth/logout',
  },
  product: {
    base: API_BASE_URL + '/' + 'product',
    list: '/product/',
    create: '/product/',
    update: '/product/',
    delete: '/product/',
    detail: '/product/',
  },
};
