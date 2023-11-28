import { commonComponentProps } from "../../../shared/lib/index.js";

export const Filter = (props) => {
    const {
        getCN,
        categories = []
    } = { ...commonComponentProps, ...props };

    const baseClass = "filter";

    const getClassName = (elem = "", mod = {}) => {
        return getCN(baseClass, elem, mod);
    }

    return `
        <section class="${getClassName()}" data-js-filter="">
            <div class="${getClassName("container")}">             
                <div class="${getClassName("sidebar")}">
                    ${categories.map(category => {
                        return (
                            `<label class="${getClassName("btn")}">
                               <input type="checkbox" data-js-search-param=${category.category}>
                               ${category.name}
                            </label>`
                        )
                    }).join("")}
                </div>  
                <div class="${getClassName("cards")}" data-js-cards="">
                    
                </div>             
           </div>         
        </section>  
    `;
}