import { getPage, meta, commonComponentProps } from "../../shared/lib/index.js";
import { categories } from "../../shared/api/variables.js";
import { Breadcrumbs } from "../../shared/ui/breadcrumbs/index.js";

import { Header } from "../../widgets/header/index.js";
import { Filter } from "../../widgets/filter/index.js";
import { Footer } from "../../widgets/footer/index.js";

export const Catalog = () => {
    const {
        getCN,
        extraClasses = {}
    } = { ...commonComponentProps };

    const baseClass = "catalog";

    const getClassName = (elem = "", mod = {}) => {
        return getCN(baseClass, elem, mod);
    }

    return getPage({
        title: "Каталог",
        content: `
            ${Header()}
            <main class="${getClassName()}">
                <div class="${extraClasses.container}">
                    ${Breadcrumbs("Каталог")}
                    <h2 class="${getClassName("title")} ${extraClasses.title}">
                        Каталог
                    </h2>
                    ${Filter({ categories })}
                </div>               
            </main>    
            ${Footer()}     
        `,
        meta: [
            meta({
                charset: "UTF-8"
            }),
            meta({
                name: "viewport",
                content: "width=device-width, initial-scale=1.0"
            })
        ]
    })
}