import { getPage, meta } from "../../shared/lib/index.js";
import Button from "../../shared/ui/button/index.js";
import Input from "../../shared/ui/input/index.js"

export default () => {
    return getPage({
        title: "Главная",
        body: `
            <h1>Главная</h1>
            <br>
            <nav>
                <ul>
                    <li>
                        <a href="/about.html">О нас</a>
                    </li>              
                </ul>
            </nav>   
            <br>
            <form action="#" method="get">
                ${Input({})}
                ${Button({
            type: "submit",
            label: "Кнопка"
        })}
            </form>
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


