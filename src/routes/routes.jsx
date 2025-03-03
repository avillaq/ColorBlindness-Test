import { Home } from '../pages/Home';
import { Tests } from '../pages/Tests';
import { NotFound } from '../pages/NotFound';

export const routes = [
  {
    path: '/',
    element: Home,
  },
  {
    path: '*',
    element: NotFound,
  },
  {
    path: '/tests',
    element: Tests,
  }
];