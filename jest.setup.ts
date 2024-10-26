import "@testing-library/jest-dom";

// グローバルなモック設定
jest.mock("next/navigation", () => ({
    useRouter() {
        return {
            push: jest.fn(),
            replace: jest.fn(),
            pathname: "",
        };
    },
    useSearchParams() {
        return new URLSearchParams();
    },
}));

// 環境変数の設定
process.env.NEXT_PUBLIC_API_URL = "http://localhost:3000";

// コンソールエラーの抑制（必要に応じて）
const originalError = console.error;
beforeAll(() => {
    console.error = (...args: any[]) => {
        if (
            typeof args[0] === "string" &&
            args[0].includes("Warning: ReactDOM.render is no longer supported")
        ) {
            return;
        }
        originalError.call(console, ...args);
    };
});

afterAll(() => {
    console.error = originalError;
});
