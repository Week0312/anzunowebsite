import { renderHook, act } from "@testing-library/react";
import { useAppContext, AppProvider } from "@/context/AppContext";

describe("AppContext", () => {
    it("should toggle dark mode", () => {
        const { result } = renderHook(() => useAppContext(), {
            wrapper: AppProvider,
        });

        const initialDarkMode = result.current.darkMode;

        act(() => {
            result.current.toggleDarkMode();
        });

        expect(result.current.darkMode).toBe(!initialDarkMode);
    });

    it("should persist dark mode preference", () => {
        const { result } = renderHook(() => useAppContext(), {
            wrapper: AppProvider,
        });

        act(() => {
            result.current.toggleDarkMode();
        });

        // Re-render to test persistence
        const { result: newResult } = renderHook(() => useAppContext(), {
            wrapper: AppProvider,
        });

        expect(newResult.current.darkMode).toBe(result.current.darkMode);
    });
});
