import { getState } from "../../../shared/api/zustand.js";

export const runAddToCartFunctionality = () => {
    const { addProduct, productArray }  = { ...getState() };

    const addToCartButtons = document.querySelectorAll("[data-add-to-cart]");

    addToCartButtons.forEach((btn) => {
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

function markAsActive(btn) {
    btn.setAttribute("disabled", "");
    btn.classList.add("button_disabled");
    btn.textContent = "Уже в корзине";
}