import { commonComponentProps } from "../../../shared/lib/index.js";

export const Card = (props) => {
    const { data, features = {}, children = {}, extraClasses = {} } = { ...props };

    const baseClass = "card";

    const getClassName = (elem = "", mod = {}) =>  {
        return commonComponentProps.getCN(baseClass, elem, mod);
    }

    return `
        <article class="${getClassName("", extraClasses)}">
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
                ${ features.addToCart || children.courseInfo || "" }
            </div>
            ${ features.deleteFromCart || ""}
        </article>
    `;
}