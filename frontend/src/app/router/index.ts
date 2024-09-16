import { IRoute } from '@/shared/config';
import { Router } from './router';

const routes: IRoute[] = [
  {
    path: '/',
    template: document.createElement('main-page'),
  },
  {
    path: '/catalog',
    template: document.createElement('catalog-page'),
  },
  {
    path: '/cart',
    template: document.createElement('cart-page'),
  },
  {
    path: '/thanks',
    template: document.createElement('thanks-page'),
  },
];

function initRouter(routes: IRoute[]) {
  const router = new Router(routes);

  document.addEventListener('route-navigate', (event) => {
    const customEvent = event as CustomEvent<string>;
    const path = customEvent.detail;
    router.goTo(path);
  });

  window.addEventListener('popstate', () => {
    const { pathname: path } = new URL(window.location.href);
    router.loadRoute(path);
  });
}

export { initRouter, routes };
