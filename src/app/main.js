import HeaderModel from "../widgets/header/model/HeaderModel.js";
import FilterModel from "../widgets/filter/model/FilterModel.js";

const runApp = async () => {
    const runWidgets = async () => {
        new HeaderModel();
        new FilterModel();
        await Promise.all(Object.keys(import.meta.glob("../**/*.pcss", { "query": "?inline" })).map(path => import(`${path}`).then((module) => module?.default ?? module)))
    }
    switch (process.env.NODE_ENV) {
        case "development":
            await import("../shared/api/browser.js")
                .then(async ({ worker }) => {
                    await worker.start().then(() => {
                        console.debug("App dev run")
                        runWidgets()
                    })
                })

    }
}
runApp()
    .catch((err) => {
        console.error(err)
    })
