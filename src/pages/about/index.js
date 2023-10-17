import { getPage, meta } from "../../shared/lib/index.js";

export default () => {
    return getPage({
        title: "About",
        body: `
            <h1>О нас</h1>
            <br>
            <nav>
                <ul>
                    <li>
                        <a href="/index.html">Главная</a>
                    </li>              
                </ul>
            </nav>
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