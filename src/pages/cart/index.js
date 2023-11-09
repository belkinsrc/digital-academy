import { getPage, meta, commonComponentProps } from "../../shared/lib/index.js";
import { Breadcrumbs } from "../../shared/ui/breadcrumbs/index.js";

import { Header } from "../../widgets/header/index.js";
import { Footer } from "../../widgets/footer/index.js";
import { CartProducts } from "../../widgets/cartProducts/index.js";
import { CheckoutPanel } from "../../widgets/checkoutPanel/index.js";

export const Cart = () => {
    const {
        getCN,
        extraClasses = {}
    } = { ...commonComponentProps };

    const baseClass = "cart";

    const getClassName = (elem = "", mod = {}) => {
        return getCN(baseClass, elem, mod);
    }

    return getPage({
        title: "Корзина",
        content: `
            ${Header()}
            <main class="${getClassName()}">
                <div class="${extraClasses.container}">
                    ${Breadcrumbs("Корзина")}
                    <h2 class="${extraClasses.title}">
                        Корзина
                    </h2>
                    <div class="${getClassName("container")}">
                        ${CartProducts()}
                        ${CheckoutPanel()}
                    </div>
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