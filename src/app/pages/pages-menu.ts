import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    group: true,
  },
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/dashboard',
  },
  {
    title: 'User',
    icon: 'person-outline',
    children: [
      {
        title: 'Thêm người dùng',
        link: '/pages/user/adduser',
      },
      {
        title: 'Hiển thị danh sách',
        icon: 'people-outline',
        link: '/pages/user/listuser',
      },
      
    ],
  },
  {
    title: 'Product',
    icon: 'cube-outline',
    children: [
      {
        title: 'Thêm sản phẩm',
        icon: 'cube-outline',
        link: '/pages/product/addproduct',
      },
      {
        title: 'Hiển thị danh sách',
        icon: 'list-outline',
        link: '/pages/product/listproduct',
      },
    ],
  },
  {
    title: 'Order',
    icon: 'shopping-cart-outline',
    children: [
      {
        title: 'Thêm đơn hàng',
        icon: 'plus-circle-outline',
        link: '/pages/order/addorder',
      },
      {
        title: 'Hiển thị danh sách',
        icon: 'list-outline',
        link: '/pages/order/listorder',
      },
    ],
  },
  {
    title: 'Categories',
    icon: 'layers-outline',
    children: [
      {
        title: 'Thêm loại',
        icon: 'plus-circle-outline',
        link: '/pages/categories/addCategory',
      },
      {
        title: 'Hiển thị danh sách',
        icon: 'list-outline',
        link: '/pages/categories/listCategory',
      },
    ],
  },
  {
    title: 'Store Inventory',
    icon: 'layout-outline',
    children: [
      {
        title: 'Thêm kho hàng',
        link: '/pages/store-inventory/store-inventory-add',
      },
      {
        title: 'Hiển thị danh sách',
        link: '/pages/store-inventory/store-inventory-list',
      },
    ],
  },

  {
    title: 'Employees',
    icon: 'people-outline',
    children: [
      {
        title: 'Thêm loại người ',
        icon: 'person-add-outline',
        link: '/pages/employees/addEmployees',
      },
      {
        title: 'Hiển thị danh sách',
        icon: 'people-outline',
        link: '/pages/employees/listEmployees',
      },
    ],
  },
  {
    title: 'Stores',
    icon: 'layout-outline',
    children: [
      {
        title: 'Thêm cửa hàng',
        link: '/pages/store/addstore',
      },
      {
        title: 'Hiển thị danh sách',
        link: '/pages/store/liststore',
      },
    ],
  },
];
