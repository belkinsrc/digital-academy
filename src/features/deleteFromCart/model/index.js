import { getState } from "../../../shared/api/zustand.js";

import { CartProductsModel } from "../../../widgets/cartProducts/model/CartProductsModel.js";
import { CheckoutPanelModel } from "../../../widgets/checkoutPanel/model/CheckoutPanelModel.js";

export const runDeleteFromCartFunctionality = () => {
    const { deleteProduct } = { ...getState() };

    const cardsContainer = document.querySelector(".cart-products__container");

    if (!cardsContainer) return;

    cardsContainer.addEventListener("click", (event) => {
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