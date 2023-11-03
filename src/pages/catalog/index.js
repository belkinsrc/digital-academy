import { getPage, meta, commonComponentProps } from "../../shared/lib/index.js";
import { category } from "../../shared/api/variables.js";
import { Breadcrumbs } from "../../shared/ui/breadcrumbs/index.js";

import { Header } from "../../widgets/header/index.js";
import { Filter } from "../../widgets/filter/index.js";
import { Footer } from "../../widgets/footer/index.js";

export default () => {
    const { getCN, extraClasses } = { ...commonComponentProps };

    return getPage({
        title: "Каталог",
        content: `
            ${Header()}
            <main class="${getCN("catalog")}">
                <div class="${getCN(extraClasses.container)}">
                    ${Breadcrumbs("Каталог")}
                    ${Filter({ category: category })}
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