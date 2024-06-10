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
  order: {
    base: API_BASE_URL + '/' + 'orders',
    list: '/orders/',
    create: '/orders/',
    update: '/orders/',
    delete: '/orders/',
    detail: '/order_details/',
    doanhthu: '/orders/doanhthusanpham/',
  },
  users: {
    base: API_BASE_URL + '/' + ' users',
    list: '/users/',
    create: '/users/',
    update: '/users/',
    delete: '/users/',
    detail: '/users/',
  },
  storeinventory: {
    base: API_BASE_URL + '/' + ' store_inventory',
    list: '/store_inventory/',
    create: '/store_inventory/',
    update: '/store_inventory/',
    delete: '/store_inventory/',
    detail: '/store_inventory/',
  },
  stores: {
    base: API_BASE_URL + '/' + ' stores',
    list: '/stores/',
    create: '/stores/',
    update: '/stores/',
    delete: '/stores/',
    detail: '/stores/',
  },
};
