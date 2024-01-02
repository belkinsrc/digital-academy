import { getState } from "../../../shared/api/zustand.js";

import { CartProductsModel } from "../../../widgets/cartProducts/model/CartProductsModel.js";
import { CheckoutPanelModel } from "../../../widgets/checkoutPanel/model/CheckoutPanelModel.js";

export class DeleteFromCartFunctionality {

  static selectors = {
    cardsContainer: ".cart-products__container"
  }

  constructor() {
    this.cardsContainer = document.querySelector(DeleteFromCartFunctionality.selectors.cardsContainer);
  }

  run() {
    const { deleteProduct } = getState();

    if (!this.cardsContainer) return;

    this.cardsContainer.addEventListener("click", (event) => {
      const target = event.target;

      if (target && target.closest(".card__delete-from-cart")) {
        const idProduct = target.closest(".card__delete-from-cart")
          .getAttribute("data-delete-from-cart");
        deleteProduct(idProduct);

        new CartProductsModel().renderProductCards();
        new CheckoutPanelModel().renderOrderData();
      }
    })
  }
}