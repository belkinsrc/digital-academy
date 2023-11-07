import { http, HttpResponse } from "msw";

import { data } from "./variables.js";

import { filterCardsByCategory, filterCardsById } from "../lib/index.js";

export const handlers = [
    http.get("/cards", ({ request }) => {
        const url = new URL(request.url);

        const category = url.searchParams.get("category");

        return HttpResponse.json(
            filterCardsByCategory(data, category)
        );
    }),
    http.get("/cart", ({ request }) => {
        const url = new URL(request.url);

        const ids = url.searchParams.get("productIds");

        return HttpResponse.json(
            filterCardsById(data, ids)
        )
    }),
]