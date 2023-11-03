import { Card } from "../../../entities/card/index.js";
import { AddToCart } from "../../../features/addToCart/index.js";

export default class FilterModel {
    static instance = null;

    static selectors = {
        instanceSelector: "[data-js-filter]",
        btnSelectors: "[data-js-search-param]",
        cardsSelector: ".filter__cards"
    };

    constructor() {
        if (FilterModel.instance) return FilterModel.instance;
        FilterModel.instance = document.querySelector(FilterModel.selectors.instanceSelector);
        FilterModel.registerEventDelegation(FilterModel.instance);

        this.init();
    }

    static registerEventDelegation(instance) {
        const btnSelectors = FilterModel.selectors.btnSelectors;

        let activeButton = null;

        if (instance) {
            instance.addEventListener("change", (event) => {
                const target = event.target;

                if (target && target.closest(btnSelectors)) {
                    const parentElement = target.parentElement;

                    if (parentElement.classList.contains("filter__btn_active")) {
                        return;
                    }

                    const category = target.getAttribute("data-js-search-param");

                    (async () => {
                        try {
                            const container = document.querySelector(FilterModel.selectors.cardsSelector);

                            const data = await FilterModel.fetchProductCards(category);
                            container.innerHTML = "";

                            data.forEach(itemData => {
                                return container.innerHTML += Card({
                                    data: itemData,
                                    features: {
                                        addToCart: AddToCart()
                                    }
                                });
                            })
                        } catch (error) {
                            console.error("Произошла ошибка:", error);
                        }
                    })();

                    if (activeButton) {
                        activeButton.classList.remove("filter__btn_active");
                        activeButton.removeAttribute("disabled");
                    }

                    parentElement.classList.add(parentElement.className + "_active");
                    parentElement.setAttribute("disabled", "true");

                    activeButton = parentElement;
                }
            });
        }
    }

    async init() {
        const container = document.querySelector(FilterModel.selectors.cardsSelector);

        const data = await FilterModel.fetchProductCards("all")

        data.forEach(cardData => {
            return container.innerHTML += Card({
                data: cardData,
                features: {
                    addToCart: AddToCart()
                }
            })
        })
        document.querySelector(FilterModel.selectors.btnSelectors)
            .parentElement.classList.add("filter__btn_active");
    }

    static async fetchProductCards(category) {
        const url = FilterModel.createUrlBuilder("/cards")
            .addQueryParam("category", category)
            .build()

        const response = await fetch(url);
        if (response.ok) {
            return await response.json();
        }
    }

    static createUrlBuilder(baseURL) {
        const url = new URL(baseURL, "http://localhost:5173");

        const addPath = (path) => {
            url.pathname += path;
            return builder;
        };

        const addQueryParam = (key, value) => {
            url.searchParams.set(key, value);
            return builder;
        };

        const build = () => {
            return url.toString();
        };

        const builder = {
            addPath,
            addQueryParam,
            build,
        };

        return builder;
    }
}