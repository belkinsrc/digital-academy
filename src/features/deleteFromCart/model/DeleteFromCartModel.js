import { useCardStore } from "../../addToCart/model/AddToCartModel.js";

import { CartProductsModel } from "../../../widgets/cartProducts/model/CartProductsModel.js";

export class DeleteFromCartModel {
    instanceParent;

    constructor() {
        this.instanceParent = document.querySelector(".cart-products__container");

        if (this.instanceParent) {
            this.init();
        }
    }

    init() {
        const { getState } = useCardStore;
        const deleteFromCart = getState().deleteProduct;

        this.instanceParent.addEventListener("click", (event) => {
            const target = event.target;

            if (target && target.closest(".card__delete-from-cart")) {
                const idProduct = target.closest(".card__delete-from-cart")
                    .getAttribute("data-delete-from-cart")
                deleteFromCart(idProduct);

                new CartProductsModel();
            }
        })
    }
}