import { IRoute, IRouter } from '@/shared/config';

class Router implements IRouter {
  private readonly routes: IRoute[];

  constructor(routes: IRoute[]) {
    this.routes = routes;
    this.loadInitialRoute();
  }

  public matchPathToRoute(path: string) {
    const route = this.routes.find((route) => {
      return path === route.path;
    });

    if (route) {
      return route;
    } else {
      return null;
    }
  }

  public goTo(path: string) {
    window.history.pushState({ path }, '', path);
    this.loadRoute(path);
  }

  public loadRoute(path: string) {
    let content = document.createElement('not-found-page');
    const matchedRoute = this.matchPathToRoute(path);

    if (matchedRoute) {
      content = matchedRoute.template;
    }
    const app = document.querySelector('my-app');
    app.innerHTML = '';
    content.slot = 'page';
    app.appendChild(content);
  }

  private loadInitialRoute() {
    const { pathname: path } = new URL(window.location.href);
    this.loadRoute(path);
  }
}

export { Router };
