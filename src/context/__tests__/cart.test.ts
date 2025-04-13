import { renderHook, act } from "@testing-library/react";
import { useCart, CartProvider } from "../../context/CartContext";

const mockProduct = {
    id: "1",
    name: "Test Product",
    price: "1000",
    description: "A test product",
    image: "/test-image.jpg",
};

describe("CartContext", () => {
    beforeEach(() => {
        // テスト前にローカルストレージをクリア
        localStorage.clear();
    });

    it("should add item to cart", () => {
        const { result } = renderHook(() => useCart(), {
            wrapper: CartProvider,
        });

        act(() => {
            result.current.addToCart(mockProduct);
        });

        expect(result.current.cart).toHaveLength(1);
        expect(result.current.cart[0]).toEqual({
            ...mockProduct,
            quantity: 1,
        });
    });

    it("should remove item from cart", () => {
        const { result } = renderHook(() => useCart(), {
            wrapper: CartProvider,
        });

        act(() => {
            result.current.addToCart(mockProduct);
            result.current.removeFromCart(mockProduct.id);
        });

        expect(result.current.cart).toHaveLength(0);
    });

    it("should update item quantity", () => {
        const { result } = renderHook(() => useCart(), {
            wrapper: CartProvider,
        });

        act(() => {
            result.current.addToCart(mockProduct);
            result.current.updateQuantity(mockProduct.id, 3);
        });

        expect(result.current.cart[0].quantity).toBe(3);
    });

    it("should increase quantity when adding same item", () => {
        const { result } = renderHook(() => useCart(), {
            wrapper: CartProvider,
        });

        act(() => {
            result.current.clearCart(); // カートをクリア
            result.current.addToCart(mockProduct);
            result.current.addToCart(mockProduct);
        });

        expect(result.current.cart).toHaveLength(1);
        expect(result.current.cart[0].quantity).toBe(2);
    });

    it("should calculate total items correctly", () => {
        const { result } = renderHook(() => useCart(), {
            wrapper: CartProvider,
        });

        act(() => {
            result.current.clearCart(); // カートをクリア
            result.current.addToCart(mockProduct);
            result.current.addToCart({ ...mockProduct, id: "2" });
        });

        expect(result.current.getTotalItems()).toBe(2);
    });

    it("should calculate total price correctly", () => {
        const { result } = renderHook(() => useCart(), {
            wrapper: CartProvider,
        });

        act(() => {
            result.current.clearCart(); // カートをクリア
            result.current.addToCart(mockProduct);
            result.current.updateQuantity(mockProduct.id, 2);
        });

        expect(result.current.getTotalPrice()).toBe(2000);
    });

    it("should clear cart", () => {
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
