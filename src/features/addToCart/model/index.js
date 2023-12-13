import { getState } from "../../../shared/api/zustand.js";

export class AddToCartFunctionality {

    static selectors = {
        addToCartButtons: "[data-add-to-cart]"
    }

    constructor() {
        this.addToCartButtons = document.querySelectorAll(AddToCartFunctionality.selectors.addToCartButtons);
    }

    run() {
        const { addProduct, productArray }  = { ...getState() };

        this.addToCartButtons.forEach((btn) => {
            const productId = btn.getAttribute("data-add-to-cart");

            btn.addEventListener("click", () => {
                if (productArray.includes(productId)) {
                    return;
                }
                addProduct(productId);
                markAsActive(btn);
            })
        })
    }
}

function markAsActive(btn) {
    btn.setAttribute("disabled", "");
    btn.classList.add("button_disabled");
    btn.textContent = "Уже в корзине";
}