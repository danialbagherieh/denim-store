import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  cartItemId: string;

  id: number;
  name: string;
  image: string;
  price: number;
  color: string;
  size: string;
  quantity: number;
  stock: number;
};

type CartStore = {
  cart: CartItem[];

  addToCart: (item: CartItem) => void;

  removeFromCart: (cartItemId: string) => void;

  updateQuantity: (cartItemId: string, quantity: number) => void;

  clearCart: () => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cart: [],

      addToCart: (item) =>
        set((state) => {
          const existingItem = state.cart.find(
            (cartItem) => cartItem.cartItemId === item.cartItemId,
          );

          if (existingItem) {
            return {
              cart: state.cart.map((cartItem) =>
                cartItem.cartItemId === item.cartItemId
                  ? {
                      ...cartItem,
                      quantity: Math.min(
                        cartItem.quantity + item.quantity,
                        cartItem.stock,
                      ),
                    }
                  : cartItem,
              ),
            };
          }

          return {
            cart: [
              ...state.cart,
              {
                ...item,
                quantity: Math.max(1, Math.min(item.quantity, item.stock)),
              },
            ],
          };
        }),

      removeFromCart: (cartItemId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.cartItemId !== cartItemId),
        })),

      updateQuantity: (cartItemId, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.cartItemId === cartItemId
              ? {
                  ...item,
                  quantity: Math.max(1, Math.min(quantity, item.stock)),
                }
              : item,
          ),
        })),

      clearCart: () =>
        set({
          cart: [],
        }),
    }),
    {
      name: "cart-storage",
    },
  ),
);
