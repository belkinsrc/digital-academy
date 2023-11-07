import { getPage, meta, commonComponentProps } from "../../shared/lib/index.js";

import { Header } from "../../widgets/header/index.js";
import { Footer } from "../../widgets/footer/index.js";

export default () => {
    const { getCN, extraClasses } = { ...commonComponentProps };

    const baseClass = "main";

    const getClassName = (elem = "", mod = {}) => {
        return getCN(baseClass, elem, mod);
    }

    return getPage({
        title: "Главная",
        content: `
          ${Header()}
           <main class="${getClassName()}">
                <div class="${extraClasses.container}">
                    <h2 class="${extraClasses.title}">
                        Популярные товары
                    </h2>
                    // Контент ...
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


