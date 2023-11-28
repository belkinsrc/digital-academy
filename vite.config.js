import { defineConfig } from "vite"
import { createHtmlPlugin } from "vite-plugin-html";

import { Index } from "./src/pages/index/index.js";
import { Catalog } from "./src/pages/catalog/index.js";
import { Cart } from "./src/pages/cart/index.js";

const pages = [
    {
        name: "index",
        content: Index()
    },
    {
        name: "catalog",
        content: Catalog()
    },
    {
        name: "cart",
        content: Cart()
    }
]

export default defineConfig({
    plugins: [
        createHtmlPlugin({
            minify: true,
            pages: pages.map(({ name, content }) => ({
                filename: `${name}.html`,
                template: `${name}.html`,
                injectOptions: {
                    data: {
                        injectScript: content,
                    },
                },
            })),
        })
    ]
})