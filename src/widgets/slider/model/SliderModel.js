import Swiper from "swiper/bundle";
import "swiper/css/bundle";

import { getState } from "../../../shared/api/zustand.js";
import { createUrlBuilder } from "../../../shared/lib/index.js";

import { Card } from "../../../entities/card/index.js";

import { AddToCart } from "../../../features/addToCart/index.js";
import { AddToCartFunctionality } from "../../../features/addToCart/model/index.js";

export class SliderModel {
    static instance;

    constructor() {
        if (SliderModel.instance) {
            return SliderModel.instance;
        }

        this.node = document.querySelector(".swiper-container");
        SliderModel.instance = this;

        if (SliderModel.instance.node) {
            this.init();
            this.renderProductCards();
        }
    }

    init() {
        this.swiper = new Swiper(".swiper-container", {
            slidesPerView: 4,
            spaceBetween: 34,
            loop: true,
            navigation: {
                nextEl: ".next-button",
                prevEl: ".prev-button",
            },
        });
    }

    renderProductCards() {
        const { productArray } = { ...getState() };

        const swiperWrapper = this.node.querySelector(".swiper-wrapper");

        this.fetchDataProductCards()
            .then(data => {
                data.forEach(itemData => {
                    const swiperSlide = document.createElement("div");
                    swiperSlide.classList.add("swiper-slide");

                    const addedToCartProps = () => {
                        if (productArray.includes(itemData.idProduct.toString())) {
                            return {
                                idProduct: itemData.idProduct,
                                active: true,
                                label: "Уже в корзине"
                            }
                        }
                        return null;
                    }

                    swiperSlide.innerHTML = Card({
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
                    swiperWrapper.append(swiperSlide);
                    this.swiper.update();
            })
            new AddToCartFunctionality().run();
        })
    }

    async fetchDataProductCards(){
        const url = createUrlBuilder("/home/productCards")
            .build()

        try {
            const response = await fetch(url);
            if (response.ok) {
                return await response.json();
            }
        } catch (error) {
            console.error("Произошла ошибка: ", error);
        }
    }
}