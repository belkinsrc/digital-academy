import { commonComponentProps } from "../../../shared/lib/index.js";

export const Header = () => {
    const {
        getCN,
        extraClasses
    } = commonComponentProps;

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
                                <svg class="${getClassName("link-icon")}" xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512">
                                        <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm80 256h64c44.2 0 80 35.8 80 80c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16c0-44.2 35.8-80 80-80zm-32-96a64 64 0 1 1 128 0 64 64 0 1 1 -128 0zm256-32H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/>
                                </svg>
                                О НАС
                            </a>                        
                        </li>
                        <li class="${getClassName("item")}">
                            <a href="catalog.html" class="${getClassName("link")}">
                                <svg class="${getClassName("link-icon")}" xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512">
                                    <path d="M547.6 103.8L490.3 13.1C485.2 5 476.1 0 466.4 0H109.6C99.9 0 90.8 5 85.7 13.1L28.3 103.8c-29.6 46.8-3.4 111.9 51.9 119.4c4 .5 8.1 .8 12.1 .8c26.1 0 49.3-11.4 65.2-29c15.9 17.6 39.1 29 65.2 29c26.1 0 49.3-11.4 65.2-29c15.9 17.6 39.1 29 65.2 29c26.2 0 49.3-11.4 65.2-29c16 17.6 39.1 29 65.2 29c4.1 0 8.1-.3 12.1-.8c55.5-7.4 81.8-72.5 52.1-119.4zM499.7 254.9l-.1 0c-5.3 .7-10.7 1.1-16.2 1.1c-12.4 0-24.3-1.9-35.4-5.3V384H128V250.6c-11.2 3.5-23.2 5.4-35.6 5.4c-5.5 0-11-.4-16.3-1.1l-.1 0c-4.1-.6-8.1-1.3-12-2.3V384v64c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V384 252.6c-4 1-8 1.8-12.3 2.3z"/>
                                </svg>
                                ПРОДУКТЫ
                            </a>                        
                        </li>
                        <li class="${getClassName("item")}">
                            <a href="#" class="${getClassName("link")}">
                                <svg class="${getClassName("link-icon")}" xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
                                    <path d="M96 0C60.7 0 32 28.7 32 64V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H96zM208 288h64c44.2 0 80 35.8 80 80c0 8.8-7.2 16-16 16H144c-8.8 0-16-7.2-16-16c0-44.2 35.8-80 80-80zm-32-96a64 64 0 1 1 128 0 64 64 0 1 1 -128 0zM512 80c0-8.8-7.2-16-16-16s-16 7.2-16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V80zM496 192c-8.8 0-16 7.2-16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm16 144c0-8.8-7.2-16-16-16s-16 7.2-16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V336z"/>
                                </svg>
                                КОНТАКТЫ
                            </a>                        
                        </li>
                        <li class="${getClassName("item")}">
                            <a href="cart.html" class="${getClassName("link", { "cart": "btn" })} ${extraClasses.button}">
                                <svg class="${getClassName("link-icon")}" xmlns="http://www.w3.org/2000/svg" height="48" width="48" viewBox="0 0 576 512">
                                    <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/>
                                </svg>
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