import { Card } from "../../../entities/card/index.js";
import { AddToCart } from "../../../features/addToCart/index.js";

import { createUrlBuilder } from "../../../shared/lib/index.js";
import { instance } from "eslint-plugin-react/lib/util/lifecycleMethods.js";

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

        if (FilterModel.instance) {
            FilterModel.registerEventDelegation(FilterModel.instance);
            this.init();
        }
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
                                        addToCart: AddToCart(itemData.idProduct)
                                    },
                                    extraClasses: { page: "catalog" }
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
                    addToCart: AddToCart(cardData.idProduct)
                },
                extraClasses: { page: "catalog" }
            })
        })
        document.querySelector(FilterModel.selectors.btnSelectors)
            .parentElement.classList.add("filter__btn_active");
    }

    static async fetchProductCards(category){
        const url = createUrlBuilder("/cards")
            .addQueryParam("category", category)
            .build()

        const response = await fetch(url);
        if (response.ok) {
            return await response.json();
        }
    }
}