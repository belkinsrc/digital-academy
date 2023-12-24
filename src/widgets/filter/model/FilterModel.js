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

    static ADD_TO_CART_DELAY = 300;

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
        instance.addEventListener("change", this.handleFilterChange.bind(this));
    }

    handleFilterChange(event) {
        const clickedElement = event.target;

        if (clickedElement && clickedElement.closest(FilterModel.selectors.btnSelector)) {
            if (clickedElement.parentElement.classList.contains("filter__btn_active")) {
                return;
            }

            const category = clickedElement.getAttribute("data-js-search-param");
            this.renderProductCardsByCategory(category);

            setTimeout(() => {
                this.runAddToCartFunctionality();
            }, FilterModel.ADD_TO_CART_DELAY);

            if (FilterModel.activeCategoryBtn) {
                this.markAsInactive(FilterModel.activeCategoryBtn);
            }
            this.markAsActive(clickedElement);

            FilterModel.activeCategoryBtn = clickedElement;
        }
    }

    init() {
        this.registerEventDelegation(this.node);

        this.renderProductCardsByCategory("all");

        const allCoursesBtn = this.node.querySelector(FilterModel.selectors.btnSelector);
        this.markAsActive(allCoursesBtn);

        FilterModel.activeCategoryBtn = allCoursesBtn;

        setTimeout(() => {
            this.runAddToCartFunctionality();
        }, FilterModel.ADD_TO_CART_DELAY);
    }

    renderProductCardsByCategory(category) {
        const cardsContainer = this.node.querySelector(FilterModel.selectors.cardsSelector);
        cardsContainer.innerHTML = "";

        this.fetchDataProductCards(category)
            .then(data => {
                data.forEach(itemData => {
                    const addedToCartProps = this.getAddedToCartProps(itemData);

                    cardsContainer.innerHTML += Card({
                        data: itemData,
                        features: {
                            addToCart: AddToCart(addedToCartProps || this.getDefaultAddToCartProps(itemData))
                        },
                        extraClasses: { page: "catalog" }
                    });
                });
            });
    }

    getAddedToCartProps(itemData) {
        const { productArray } = getState();

        if (productArray.includes(itemData.idProduct.toString())) {
            return {
                idProduct: itemData.idProduct,
                active: true,
                label: "Уже в корзине"
            };
        }
        return null;
    }

    getDefaultAddToCartProps(itemData) {
        return {
            idProduct: itemData.idProduct,
            active: false,
            label: "В корзину"
        };
    }

    async fetchDataProductCards(category) {
        const url = createUrlBuilder("/catalog/productCards")
            .addQueryParam("category", category)
            .build();

        try {
            const response = await fetch(url);
            if (response.ok) {
                return await response.json();
            }
        } catch (error) {
            console.error("Произошла ошибка: ", error);
        }
    }

    runAddToCartFunctionality() {
        new AddToCartFunctionality().run();
    }

    markAsActive(btn) {
        btn.parentElement.classList.add("filter__btn_active");
        btn.parentElement.setAttribute("disabled", "true");
    }

    markAsInactive(btn) {
        btn.parentElement.classList.remove("filter__btn_active");
        btn.parentElement.removeAttribute("disabled");
    }
}


