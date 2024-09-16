interface IAddToCart extends HTMLElement {
  active: boolean;
  label: string;
}

interface IAddToCartParams {
  label: string;
  active?: boolean;
  productId: string;
}

interface IAddToCartEventDetail {
  productId: string;
  component: IAddToCart;
}

export { IAddToCart, IAddToCartParams, IAddToCartEventDetail };
