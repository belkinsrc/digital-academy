import { commonComponentProps } from "../../../shared/lib/index.js";

export const Filter = (props) => {
    const {
        getCN,
        extraClasses = {},
        category = []
    } = { ...commonComponentProps, ...props };

    const baseClass = "filter";

    const getClassName = (elem = "", mod = {}) => {
        return getCN(baseClass, elem, mod);
    }

    return `
        <section class="${getClassName("", {})}" data-js-filter="">
            <h2 class="${getClassName("title", {})} ${extraClasses.title}">
                Каталог
            </h2>
            <div class="${getClassName("container", {})}">             
                <div class="${getClassName("sidebar", {})}">
                    ${category.map(item => {
                        return (
                            `<label class="${getClassName("btn", {})}">
                               <input type="checkbox" value="" data-js-search-param=${item.category}>
                               ${item.name}
                            </label>`
                        )
                    }).join("")}
                </div>  
                <div class="${getClassName("cards", {})}">
                    
                </div>             
           </div>         
        </section>  
    `;
}