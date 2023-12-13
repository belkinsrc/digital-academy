import { getState } from "../../../shared/api/zustand.js";
import { createUrlBuilder } from "../../../shared/lib/index.js";

import { Card } from "../../../entities/card/index.js";

import { AddToCart } from "../../../features/addToCart/index.js";
import { AddToCartFunctionality } from "../../../features/addToCart/model/index.js";

export class FilterModel {
    static instance = null;

    static selectors = {
        instanceSelector: "[data-js-filter]",
        btnSelector: "[data-js-search-param]",
        cardsSelector: "[data-js-cards]"
    };

    static activeCategoryBtn = null;

    constructor() {
        if (FilterModel.instance) {
            return FilterModel.instance;
        }
        this.node = document.querySelector(FilterModel.selectors.instanceSelector);
        FilterModel.instance = this;

        if (FilterModel.instance.node) {
            this.init();
        }
    }

    registerEventDelegation(instance) {
        instance.addEventListener("change", (event) => {
            const target = event.target;

            if (target && target.closest(FilterModel.selectors.btnSelector)) {

                if (target.parentElement.classList.contains("filter__btn_active")) {
                    return;
                }
                const category = target.getAttribute("data-js-search-param");
                this.renderProductCardsByCategory(category);

                setTimeout(() => {
                    new AddToCartFunctionality()
                        .run();
                }, 300);

                if (FilterModel.activeCategoryBtn) {
                    markAsInactive(FilterModel.activeCategoryBtn);
                }
                markAsActive(target);

                FilterModel.activeCategoryBtn = target;
            }
        });
    }

    init() {
        this.registerEventDelegation(this.node);

        this.renderProductCardsByCategory("all");

        const allCoursesBtn = this.node.querySelector(FilterModel.selectors.btnSelector);
        markAsActive(allCoursesBtn);

        FilterModel.activeCategoryBtn = allCoursesBtn;

        setTimeout(() => {
            new AddToCartFunctionality()
                .run();
        }, 300);
    }

    renderProductCardsByCategory(category) {
        const cardsContainer = this.node.querySelector(FilterModel.selectors.cardsSelector);
        cardsContainer.innerHTML = "";

        this.fetchDataProductCards(category)
            .then(data => {
                data.forEach(itemData => {
                    const addedToCartProps = () => {
                        const { productArray } = { ...getState() };

                        if (productArray.includes(itemData.idProduct.toString())) {
                            return {
                                idProduct: itemData.idProduct,
                                active: true,
                                label: "Уже в корзине"
                            }
                        }
                        return null;
                    }

                    cardsContainer.innerHTML += Card({
                        data: itemData,
                        features: {
                            addToCart: AddToCart(addedToCartProps(itemData) || {
                                idProduct: itemData.idProduct,
                                active: false,
                                label: "В корзину"
                            })
                        },
                        extraClasses: { page: "catalog" }
                    });
                })
            })
    }

    async fetchDataProductCards(category){
        const url = createUrlBuilder("/catalog/productCards")
            .addQueryParam("category", category)
            .build()

        try {
            const response = await fetch(url);
            if (response.ok) {
                return await response.json();
            }
        } catch (error) {
            console.error("Произошла ошибка: ", error)
        }
    }
}

function markAsActive(btn) {
    btn.parentElement.classList.add("filter__btn_active");
    btn.parentElement.setAttribute("disabled", "true");
}

function markAsInactive(btn) {
    btn.parentElement.classList.remove("filter__btn_active");
    btn.parentElement.removeAttribute("disabled");
}

