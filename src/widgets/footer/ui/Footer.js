import { commonComponentProps } from "../../../shared/lib/index.js";

export const Footer = () => {
    const { getCN, extraClasses } = { ...commonComponentProps };

    const baseClass = "footer";

    const getClassName = (elem = "", mod = {}) => {
        return getCN(baseClass, elem, mod);
    }

    return `
        <footer class="${getClassName("", {})}">
            <div class="${getCN(extraClasses.container)}">
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
            </div>
        </footer>
    `;
}