import { commonComponentProps } from "../../../shared/lib/index.js";

export const Slider = () => {
    const baseClass = "swiper"

    const getClassName = (elem = "", mod = {}) => {
        return commonComponentProps.getCN(baseClass, elem, mod);
    }

    return `
        <h3 class="${getClassName()}">Слайдер отключен, он не готов до конца</h3>
    `;
}