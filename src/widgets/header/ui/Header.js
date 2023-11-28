import { commonComponentProps } from "../../../shared/lib/index.js";

export const Header = () => {
    const {
        getCN,
        extraClasses = {}
    } = { ...commonComponentProps }

    const baseClass = "header";

    const getClassName = (elem = "", mod = {}) => {
        return getCN(baseClass, elem, mod);
    }

    return `
        <header class="${getClassName()}" data-js-header="">
            <div class="${extraClasses.container}">
                <nav class="${getClassName("nav")}">
                    <a href="index.html" class="${getClassName("logo")}">
                       <img src="./public/images/logo.svg" alt="Логотип сайта">
                    </a>
                    <ul class="${getClassName("list")}">
                        <li class="${getClassName("item")}">
                            <a href="#" class="${getClassName("link")}">
                                О НАС
                            </a>                        
                        </li>
                        <li class="${getClassName("item")}">
                            <a href="catalog.html" class="${getClassName("link")}">
                                ПРОДУКТЫ
                            </a>                        
                        </li>
                        <li class="${getClassName("item")}">
                            <a href="#" class="${getClassName("link")}">
                                КОНТАКТЫ
                            </a>                        
                        </li>
                        <li class="${getClassName("item")}">
                            <a href="cart.html" class="${getClassName("cart")}">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.86902 4H5.90124L6.98144 14.7399C7.02634 15.036 7.17672 15.3058 7.40489 15.4998C7.63305 15.6937 7.92363 15.7986 8.22305 15.7953H16.0452C16.316 15.8094 16.5839 15.7345 16.808 15.5821C17.0323 15.4296 17.2004 15.208 17.2868 14.951L18.9381 9.98456C18.9997 9.79784 19.0161 9.59916 18.9858 9.4049C18.9556 9.21063 18.8797 9.02631 18.7643 8.86711C18.6441 8.69785 18.4833 8.56144 18.2969 8.47033C18.1104 8.37923 17.9039 8.33636 17.6965 8.34563H6.33581" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M15.6902 21.24C14.7956 21.24 14.0702 20.5146 14.0702 19.62C14.0702 18.7254 14.7956 18 15.6902 18C16.5848 18 17.3102 18.7254 17.3102 19.62C17.3102 20.5146 16.5848 21.24 15.6902 21.24Z" fill="white"/>
                                    <path d="M7.61988 21.24C6.72515 21.24 5.99988 20.5146 5.99988 19.62C5.99988 18.7254 6.72515 18 7.61988 18C8.51457 18 9.23988 18.7254 9.23988 19.62C9.23988 20.5146 8.51457 21.24 7.61988 21.24Z" fill="white"/>
                                </svg>
                                Корзина
                            </a>
                        </li>
                    </ul>                  
                </nav>
            </div>                   
        </header>
    `;
}