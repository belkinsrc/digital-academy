import { commonComponentProps } from "../../../shared/lib/index.js";

export const AddToCart = (props) => {
    const {
        getCN,
        extraClasses = {}
    } = { ...commonComponentProps };

    const {
        idProduct,
        label = "В корзину",
        active = false
    } = { ...props };

    const baseClass = "add-to-cart";

    const getClassName = (elem = "", mod = {}) => {
        return getCN(baseClass, elem, mod);
    }

    return `
        <button class="${getClassName()} 
                       ${extraClasses.button}
                       ${active ? "button_disabled" : ""}" 
                       data-add-to-cart="${idProduct}">
            ${label}
        </button>
    `;
}