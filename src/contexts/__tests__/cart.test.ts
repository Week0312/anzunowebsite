import { renderHook, act } from "@testing-library/react";
import { useCart, CartProvider } from "@/contexts/CartContext";
import "@testing-library/jest-dom";

const mockProduct = {
    id: "1",
    name: "Test Product",
    price: "1000",
    description: "A test product",
    image: "/test-image.jpg",
};

describe("useCart", () => {
    it("should add an item to the cart", () => {
        const { result } = renderHook(() => useCart(), {
            wrapper: CartProvider,
        });

        act(() => {
            result.current.addToCart(mockProduct);
        });

        expect(result.current.cart).toHaveLength(1);
        expect(result.current.cart[0]).toEqual({ ...mockProduct, quantity: 1 });
    });

    it("should remove an item from the cart", () => {
        const { result } = renderHook(() => useCart(), {
            wrapper: CartProvider,
        });

        act(() => {
            result.current.addToCart(mockProduct);
            result.current.removeFromCart(mockProduct.id);
        });

        expect(result.current.cart).toHaveLength(0);
    });

    it("should update the quantity of an item in the cart", () => {
        const { result } = renderHook(() => useCart(), {
            wrapper: CartProvider,
        });

        act(() => {
            result.current.addToCart(mockProduct);
            result.current.updateQuantity(mockProduct.id, 3);
        });

        expect(result.current.cart[0].quantity).toBe(3);
    });

    it("should clear the cart", () => {
        const { result } = renderHook(() => useCart(), {
            wrapper: CartProvider,
        });

        act(() => {
            result.current.addToCart(mockProduct);
            result.current.clearCart();
        });

        expect(result.current.cart).toHaveLength(0);
    });
});
