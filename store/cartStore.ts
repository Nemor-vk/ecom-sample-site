import { create } from "zustand";
import { ExtendedProduct } from "@/prisma/extendedModelTypes";
import { CartItemType } from "@/types/types";

// Interface for Zustand store
interface CartItemsInterface {
  cartItems: CartItemType[];
  addToCart: (product: ExtendedProduct) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  onQuantityChange: (productId: string, quantity: number) => void;
}

// Zustand store implementation
export const useCartStore = create<CartItemsInterface>((set) => ({
  cartItems: [],

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
        // Remove item if quantity is zero or negative
        return {
          cartItems: state.cartItems.filter(
            (item) => item.product.id !== productId
          ),
        };
      }

      // Update quantity if item exists
      return {
        cartItems: state.cartItems.map((item) =>
          item.product.id === productId
            ? { ...item, quantity }
            : item
        ),
      };
    }),

}));