import { defineConfig } from "vite"
import { createHtmlPlugin } from "vite-plugin-html";
import mainPage from "./src/pages/index/index.js";
import aboutPage from "./src/pages/about/index.js";

const pages = [
    {
        name: "index",
        content: mainPage()
    },
    {
        name: "about",
        content: aboutPage()
    },
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