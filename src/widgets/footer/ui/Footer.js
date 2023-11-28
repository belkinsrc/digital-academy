import { commonComponentProps } from "../../../shared/lib/index.js";

export const Footer = () => {
    const {
        getCN,
        extraClasses = {}
    } = { ...commonComponentProps };

    const baseClass = "footer";

    const getClassName = (elem = "", mod = {}) => {
        return getCN(baseClass, elem, mod);
    }

    return `
        <footer class="${getClassName()}">
            <div class="${extraClasses.container}">
                <div class="${getClassName("nav-section")}">
                    <nav class="${getClassName("nav")}">
                        <ul class="${getClassName("list")}">
                            <li class="${getClassName("item")}">
                                <a href="#" class="${getClassName("link")}">
                                    КУРСЫ
                                </a>                        
                            </li>
                            <li class="${getClassName("item")}">
                                <a href="#" class="${getClassName("link")}">
                                    О НАС
                                </a>                        
                            </li>
                            <li class="${getClassName("item")}">
                                <a href="#" class="${getClassName("link")}">
                                    ОТЗЫВЫ
                                </a>                        
                            </li>
                            <li class="${getClassName("item")}">
                                <a href="#" class="${getClassName("link")}">
                                    КОНТАКТЫ
                                </a>                        
                            </li>
                        </ul>
                    </nav>
                    <span class="${getClassName("policy")}">
                        Политика конфиденциальности
                    </span>
                </div>
                <hr>
                <div class="${getClassName("contact-info")}">
                    <div class="${getClassName("address-block")}">
                        <span class="${getClassName("address-label")}">
                            Наш адрес
                        </span>
                        <p class="${getClassName("address-content")}">
                            г. Челябинск, ул. Лесопарковая 5/2
                        </p>
                    </div>
                    <div class="${getClassName("email-block")}">
                        <span class="${getClassName("email-label")}">
                            Эл. почта
                        </span>
                        <a href="mailto:info@d-element.ru" class="${getClassName("email-content")}">
                            info@d-element.ru
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    `;
}