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
    icon: 'layout-outline',
    children: [
      {
        title: 'Thêm User',
        link: '/pages/user/adduser',
      },
      {
        title: 'Hiển thị danh sách',
        link: '/pages/user/listuser',
      },
    ],
  },
  {
    title: 'Product',
    icon: 'layout-outline',
    children: [
      {
        title: 'Thêm sản phẩm',
        link: '/pages/product/addproduct',
      },
      {
        title: 'Hiển thị danh sách',
        link: '/pages/product/listproduct',
      },
    ],
  },
  {
    title: 'Order',
    icon: 'layout-outline',
    children: [
      {
        title: 'Thêm đơn hàng',
        link: '/pages/order/addorder',
      },
      {
        title: 'Hiển thị danh sách',
        link: '/pages/order/listorder',
      },
    ],
  },
  {
    title: 'Categories',
    icon: 'layout-outline',
    children: [
      {
        title: 'Thêm loại',
        link: '/pages/categories/addCategory',
      },
      {
        title: 'Hiển thị danh sách',
        link: '/pages/categories/listCategory',
      },
    ],
  },
];
