import { commonComponentProps } from "../../../shared/lib/index.js";

export const Footer = () => {
    const baseClass = "footer";

    const getClassName = (elem = "", mod = {}) => {
        return commonComponentProps.getCN(baseClass, elem, mod);
    }

    return `
        <footer class="${getClassName("", {})}">
            <nav class="${getClassName("nav", {})}">
                <ul class="${getClassName("list", {})}">
                    <li class="${getClassName("item", {})}">
                        <a href="#" class="${getClassName("link", {})}">
                            Курсы
                        </a>                        
                    </li>
                    <li class="${getClassName("item", {})}">
                        <a href="#" class="${getClassName("link", {})}">
                            О нас
                        </a>                        
                    </li>
                    <li class="${getClassName("item", {})}">
                        <a href="#" class="${getClassName("link", {})}">
                            Отзывы
                        </a>                        
                    </li>
                    <li class="${getClassName("item", {})}">
                        <a href="#" class="${getClassName("link", {})}">
                            Контакты
                        </a>                        
                    </li>
                </ul>
            </nav>
            <span class="${getClassName("policy", {})}">
                Политика конфиденциальности
            </span>
        </footer>
    `;
}