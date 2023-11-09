import { commonComponentProps } from "../../../lib/index.js";

export const Breadcrumbs = (currentPage = "текущая") => {
    const baseClass = "breadcrumbs";

    const getClassName = (elem = "", mod = {}) => {
        return commonComponentProps.getCN(baseClass, elem, mod);
    }

    return `
        <nav class="${getClassName()}">
            <ul class="${getClassName("list")}">
                <li class="${getClassName("item")}">
                    <a href="index.html" class="${getClassName("link")}">
                        ГЛАВНАЯ
                    </a>
                </li>
                <li class="${getClassName("item")}">
                    <span class="${getClassName("separator")}">/</span>
                    ${currentPage.toUpperCase()}
                </li>
            </ul>                     
        </nav>
    `;
}