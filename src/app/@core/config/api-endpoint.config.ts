import { APP_CONFIG } from './app.config';
import { IAPIEndpoint } from '../interfaces';

export const API_BASE_URL = APP_CONFIG.apiBaseUrl;

export const API_ENDPOINT: IAPIEndpoint = {
  auth: {
    base: API_BASE_URL + '/' + 'auth',
    login: '/users/login',
    logout: '/auth/logout',
  },
  categories: {
    base: API_BASE_URL + '/' + 'productcate',
    list: '/productcate/',
    create: '/productcate/',
    update: '/productcate/',
    delete: '/productcate/',
    detail: '/productcate/',
  },
  product: {
    base: API_BASE_URL + '/' + 'product',
    list: '/product/',
    create: '/product/',
    update: '/product/',
    delete: '/product/',
    detail: '/product/',
  },
  order: {
    base: API_BASE_URL + '/' + 'orders',
    list: '/orders/',
    create: '/orders/',
    update: '/orders/',
    delete: '/orders/',
    detail: '/orders/',
  },
  users: {
    base: API_BASE_URL + '/' + 'users',
    list: '/users/',
    create: '/users/',
    update: '/users/',
    delete: '/users/',
    detail: '/users/',
  },
};
