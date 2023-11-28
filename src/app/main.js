import { FilterModel } from "../widgets/filter/model/FilterModel.js";
import { CartProductsModel } from "../widgets/cartProducts/model/CartProductsModel.js";
import { CheckoutPanelModel } from "../widgets/checkoutPanel/model/CheckoutPanelModel.js";
import { SliderModel } from "../widgets/slider/model/SliderModel.js";

import { runDeleteFromCartFunctionality } from "../features/deleteFromCart/model/index.js";

const runApp = async () => {
    const runWidgets = async () => {
        new FilterModel();
        new CartProductsModel();
        new CheckoutPanelModel();
        new SliderModel()
        await Promise.all(Object.keys(import.meta.glob("../**/*.pcss", { "query": "?inline" })).map(path => import(`${path}`).then((module) => module?.default ?? module)))
    }
    const runFeatures = async () => {
        runDeleteFromCartFunctionality();
    }
    switch (process.env.NODE_ENV) {
        case "development":
            await import("../shared/api/browser.js")
                .then(async ({ worker }) => {
                    await worker.start().then(() => {
                        console.debug("App dev run")
                        runWidgets()
                        runFeatures()
                    })
                })

    }
}
runApp()
    .catch((err) => {
        console.error(err)
    })
