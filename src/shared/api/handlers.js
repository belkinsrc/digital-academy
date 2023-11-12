import { http, HttpResponse } from "msw";

import { data } from "./variables.js";

export const handlers = [
    http.get("/home/productCards", () => {
        return HttpResponse.json(
            getPopularProductCards(data)
        );
    }),
    http.get("/catalog/productCards", ({ request }) => {
        const url = new URL(request.url);

        const category = url.searchParams.get("category");

        return HttpResponse.json(
            getProductCardsByCategory(data, category)
        );
    }),
    http.get("/cart/productCards", ({ request }) => {
        const url = new URL(request.url);

        const ids = url.searchParams.get("productIds");

        return HttpResponse.json(
            getProductCardsById(data, ids)
        )
    }),
    http.get("/cart/checkoutInfo", ({ request }) => {
        const url = new URL(request.url);

        const ids = url.searchParams.get("productIds");

        const productCards = getProductCardsById(data, ids);

        return HttpResponse.json(
            getCheckoutInfo(productCards)
        )
    })
]

function getProductCardsByCategory(data, category) {
    if (category === "all") {
        return data;
    }
    return data.filter(item => item.category === category);
}

function getProductCardsById(data, ids) {
    return data.filter(item => ids.includes(item.idProduct));
}

function getPopularProductCards(data) {
    return data.filter(item => item.isPopular);
}

function getCheckoutInfo(data) {
    let productCount = 0;
    let totalPrice = 0;

    data.forEach(item => {
        ++productCount;
        totalPrice += item.price;
    })

    return {
        productCount,
        totalPrice
    }
}