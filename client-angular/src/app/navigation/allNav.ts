import { NavType } from '@app/models'
import {
  faCartShopping,
  faCodePullRequest,
  faComment,
  faComments,
  faCreditCard,
  faDashboard,
  faList,
  faPlus,
  faTag,
  faUser,
  faUserMinus,
  faUsersLine,
} from '@fortawesome/free-solid-svg-icons'

export const allNav: NavType[] = [
  {
    id: 1,
    title: 'Dashboard',
    icon: faDashboard,
    role: 'admin',
    path: '/admin/dashboard',
  },
  {
    id: 2,
    title: 'Orders',
    icon: faCartShopping,
    role: 'admin',
    path: '/admin/dashboard/orders',
  },
  {
    id: 3,
    title: 'Category',
    icon: faList,
    role: 'admin',
    path: '/admin/dashboard/category',
  },
  {
    id: 4,
    title: 'Sellers',
    icon: faUsersLine,
    role: 'admin',
    path: '/admin/dashboard/sellers',
  },
  {
    id: 5,
    title: 'Payment Request',
    icon: faCreditCard,
    role: 'admin',
    path: '/admin/dashboard/payment-request',
  },
  {
    id: 6,
    title: 'Deactive Sellers',
    icon: faUserMinus,
    role: 'admin',
    path: '/admin/dashboard/deactive-sellers',
  },
  {
    id: 7,
    title: 'Seller Request',
    icon: faCodePullRequest,
    role: 'admin',
    path: '/admin/dashboard/sellers-request',
  },
  {
    id: 8,
    title: 'Live Chat',
    icon: faComment,
    role: 'admin',
    path: '/admin/dashboard/chat-sellers',
  },
  {
    id: 9,
    title: 'Dashboard',
    icon: faDashboard,
    role: 'seller',
    path: '/seller/dashboard',
  },
  {
    id: 10,
    title: 'Add Product',
    icon: faPlus,
    role: 'seller',
    path: '/seller/dashboard/add-product',
  },
  {
    id: 11,
    title: 'All Product',
    icon: faList,
    role: 'seller',
    path: '/seller/dashboard/products',
  },
  {
    id: 12,
    title: 'Discount Product',
    icon: faTag,
    role: 'seller',
    path: '/seller/dashboard/discount-product',
  },
  {
    id: 13,
    title: 'Orders',
    icon: faCartShopping,
    role: 'seller',
    path: '/seller/dashboard/orders',
  },
  {
    id: 14,
    title: 'Payments',
    icon: faDashboard,
    role: 'seller',
    path: '/seller/dashboard/payments',
  },
  {
    id: 15,
    title: 'Chat-Customer',
    icon: faComment,
    role: 'seller',
    path: '/seller/dashboard/chat-customer',
  },
  {
    id: 16,
    title: 'Chat-Support',
    icon: faComments,
    role: 'seller',
    path: '/seller/dashboard/chat-support',
  },
  {
    id: 17,
    title: 'Profile',
    icon: faUser,
    role: 'seller',
    path: '/seller/dashboard/profile',
  },
];

export const getNav = (role: string) => {
  const finalNavs = [];

  for (const nav of allNav) {
    if (role === nav.role) {
      finalNavs.push(nav);
    }
  }

  return finalNavs;
};
