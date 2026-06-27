import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  productId: string;

  variantId?: string;

  name: string;

  slug: string;

  imageUrl?: string | null;

  size?: string | null;

  color?: string | null;

  sku?: string | null;

  price: number;

  originalPrice?: number;

  discountType?: string | null;

  discountValue?: number | null;

  quantity: number;

  stock: number;
}

interface CartStore {
  items: CartItem[];

  addItem: (item: CartItem) => void;

  removeItem: (itemKey: string) => void;

  increaseQuantity: (itemKey: string) => void;

  decreaseQuantity: (itemKey: string) => void;

  clearCart: () => void;

  totalItems: () => number;

  totalPrice: () => number;
}

const getItemKey = (item: CartItem) =>
  `${item.productId}-${item.variantId ?? "default"}`;

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      // ========================
      // ADD ITEM
      // ========================

      addItem: (item) =>
        set((state) => {
          const itemKey = getItemKey(item);

          const existing = state.items.find((i) => getItemKey(i) === itemKey);

          if (existing) {
            return {
              items: state.items.map((i) =>
                getItemKey(i) === itemKey
                  ? {
                      ...i,
                      quantity: Math.min(i.quantity + item.quantity, i.stock),
                    }
                  : i,
              ),
            };
          }

          return {
            items: [...state.items, item],
          };
        }),

      // ========================
      // REMOVE ITEM
      // ========================

      removeItem: (itemKey) =>
        set((state) => ({
          items: state.items.filter((item) => getItemKey(item) !== itemKey),
        })),

      // ========================
      // INCREASE
      // ========================

      increaseQuantity: (itemKey) =>
        set((state) => ({
          items: state.items.map((item) =>
            getItemKey(item) === itemKey
              ? {
                  ...item,
                  quantity: Math.min(item.quantity + 1, item.stock),
                }
              : item,
          ),
        })),

      // ========================
      // DECREASE
      // ========================

      decreaseQuantity: (itemKey) =>
        set((state) => ({
          items: state.items
            .map((item) =>
              getItemKey(item) === itemKey
                ? {
                    ...item,
                    quantity: item.quantity - 1,
                  }
                : item,
            )
            .filter((item) => item.quantity > 0),
        })),

      // ========================
      // CLEAR
      // ========================

      clearCart: () =>
        set({
          items: [],
        }),

      // ========================
      // TOTAL ITEMS
      // ========================

      totalItems: () =>
        get().items.reduce((acc, item) => acc + item.quantity, 0),

      // ========================
      // TOTAL PRICE
      // ========================

      totalPrice: () =>
        get().items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    }),
    {
      name: "cart-storage",
    },
  ),
);
