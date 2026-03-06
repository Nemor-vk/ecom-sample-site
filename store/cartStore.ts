import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ExtendedProduct } from "@/prisma/extendedModelTypes";
import { CartItemType } from "@/types/types";
import { Discount } from "@/generated/prisma";
import { SerializedProduct } from "@/lib/serializers/product.serialize";

// Interface for Zustand store
interface CartItemsInterface {
  cartItems: CartItemType[];
  discount?: Discount | null;
  addToCart: (product: SerializedProduct) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  onQuantityChange: (productId: string, quantity: number) => void;
  setDiscount: (discountObj: Discount | null) => void;
  clearDiscount: () => void;
}

// Zustand store with persistence
export const useCartStore = create<CartItemsInterface>()(
  persist(
    (set) => ({
      cartItems: [],
      discount: null,

      addToCart: (product) =>
        set((state) => {
          const existingItem = state.cartItems.find(
            (item) => item.product.id === product.id
          );

          if (existingItem) {
            return {
              cartItems: state.cartItems.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }

          const newItem: CartItemType = {
            id: product.id,
            product,
            quantity: 1,
          };

          return {
            cartItems: [...state.cartItems, newItem],
          };
        }),

      removeFromCart: (productId) =>
        set((state) => ({
          cartItems: state.cartItems.filter(
            (item) => item.product.id !== productId
          ),
        })),

      clearCart: () => set({ cartItems: [] }),

      increaseQuantity: (productId) =>
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.product.id === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        })),

      decreaseQuantity: (productId) =>
        set((state) => {
          const updated = state.cartItems.map((item) =>
            item.product.id === productId && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );

          return {
            cartItems: updated.filter((item) => item.quantity > 0),
          };
        }),

      onQuantityChange: (productId, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return {
              cartItems: state.cartItems.filter(
                (item) => item.product.id !== productId
              ),
            };
          }

          return {
            cartItems: state.cartItems.map((item) =>
              item.product.id === productId
                ? { ...item, quantity }
                : item
            ),
          };
        }),

      setDiscount: (discountObj: Discount | null) =>
        set(() => ({
          discount: discountObj,
        })),

      clearDiscount: () =>
        set(() => ({
          discount: null,
        })),
    }),
    {
      name: "cart-storage", // unique key in localStorage
      partialize: (state) => ({
        cartItems: state.cartItems,
        discount: state.discount,
      }),
    }
  )
);