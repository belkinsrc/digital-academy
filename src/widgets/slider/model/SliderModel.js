// import Swiper from "swiper/bundle";
// import "swiper/css/bundle";

import { createUrlBuilder } from "../../../shared/lib/index.js";

export class SliderModel {

    // static nextButton = document.getElementById("next-button");
    //
    // static prevButton = document.getElementById("prev-button");
    //
    // static cardContainer = document.querySelectorAll(".product-card")

    constructor() {
        // const swiper = new Swiper(".swiper-container", {
        //     loop: true,
        //     navigation: {
        //         nextEl: "#next-button",
        //         prevEl: "#prev-button",
        //     },
        // });

       // SliderModel.nextButton.addEventListener("click", () => {
       //      swiper.slideNext(); // Переключиться на следующий слайд
       //  });
       //
       //  SliderModel.prevButton.addEventListener("click", () => {
       //
       //  });
    }

    async fetchDataProductCards(category){
        const url = createUrlBuilder("/cards")
            .addQueryParam("category", category)
            .build()

        const response = await fetch(url);
        if (response.ok) {
            return await response.json();
        }
    }
}