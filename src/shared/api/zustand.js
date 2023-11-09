import { createStore } from "zustand/vanilla";
import { createJSONStorage, persist } from "zustand/middleware";

const useCardStore = createStore(
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

export const { getState } = useCardStore;