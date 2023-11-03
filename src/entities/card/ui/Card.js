import { commonComponentProps } from "../../../shared/lib/index.js";

export const Card = (props) => {
    const { getCN, features, data } = { ...commonComponentProps, ...props };

    const baseClass = "card";

    const getClassName = (elem = "", mod = {}) =>  {
        return getCN(baseClass, elem, mod);
    }

    return `
        <article class="${getClassName()}">
            <div class="${getClassName("image-wrapper")}">
                <img src="${data.imageSrc}" alt="image">
            </div>
            <div class="${getClassName("content")}">
                <span class="${getClassName("description")}">
                    ${data.label}
                </span>
                <h3 class="${getClassName("title")}">
                    «${data.productName}»
                </h3>               
                ${ features.addToCart || "" }
            </div>
        </article>
    `;
}