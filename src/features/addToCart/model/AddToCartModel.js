import { persist, createJSONStorage } from "zustand/middleware";
import { createStore } from "zustand/vanilla";

export const useCardStore = createStore(
    persist(
        (set, get) => ({
            productArray: [],
            addProduct: (idProduct) => {
                const updatedArray = [ ...get().productArray, idProduct ];
                set({ productArray: updatedArray })
            },
            deleteProduct: (productId) => {
                const updatedArray = get().productArray.filter(id => id !== productId);
                set({ productArray: updatedArray });
            }
        }), {
            name: "product-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
)

export function init() {
    setTimeout(() => {
        const btns = document.querySelectorAll("[data-add-to-cart]");
        const { getState } = useCardStore;
        const addProduct = getState().addProduct;

        btns.forEach(btn => {
            const productId = btn.getAttribute("data-add-to-cart");
            btn.addEventListener("click", () => {
                addProduct(productId)
            })
        })
    }, 300)
}