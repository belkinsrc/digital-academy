export interface ICommonComponentProps {
  extraClasses: {
    [key: string]: string;
  };
  extraAttrs: {
    [key: string]: string;
  };
  getCN: (
    block: string,
    elem?: string,
    mod?: { [key: string]: string }
  ) => string;
}

export interface IRoute {
  path: string;
  template: HTMLElement;
}

export interface IRouter {
  goTo: (path: string) => void;
  loadRoute: (path: string) => void;
  matchPathToRoute: (path: string) => IRoute;
}
