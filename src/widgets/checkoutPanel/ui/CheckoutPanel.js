import { commonComponentProps } from "../../../shared/lib/index.js";

export const CheckoutPanel = (props) => {
    const { getCN, extraClasses } = { ...commonComponentProps, ...props };

    const baseClass = "checkout-panel";

    const getClassName = (elem = "", mod = {}) => {
        return getCN(baseClass, elem, mod);
    }

    return `
        <section class="${getClassName()}">
            <form action="#" method="post" class="${getClassName("form")}">
                <h3 class="${getClassName("title")}">
                    Итого
                </h3>
                <div class="${getClassName("order-section")}">
                    <p class="${getClassName("product-count")}">
                        3 товара
                    </p>
                    <p class="${extraClasses.totalPrice}">
                        24 000 ₽
                    </p>
                </div>
                <div class="${getClassName("promo-code-section")}">
                    <label class="${getClassName("promo-code-label")}">
                        Промокод
                    </label>
                    <input type="text" placeholder="Введите промокод" class="${getClassName("promo-code-input")}">
                </div>
                <hr class="${getClassName("decor-line")}">
                <div class="${getClassName("total-section")}">
                    <p class="${getClassName("total-amount")}">
                        Итоговая сумма
                    </p>
                    <p class="${extraClasses.totalPrice}">
                        24 000 ₽
                    </p>
                </div>
                <button type="submit" class="${getClassName("button")} ${extraClasses.button}">
                    Оформить заказ
                </button>
            </form>
        </section>          
    `;
}