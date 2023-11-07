import { commonComponentProps } from "../../../shared/lib/index.js";

export const AddToCart = (idProduct) => {
    const { getCN, extraClasses } = { ...commonComponentProps };

    const baseClass = "add-to-cart";

    const getClassName = (elem = "", mod = {}) => {
        return getCN(baseClass, elem, mod);
    }

    return `
        <button class="${getClassName()} 
                       ${getCN(extraClasses.button)}" 
                       data-add-to-cart="${idProduct}">
            В корзину
        </button>
    `;
}