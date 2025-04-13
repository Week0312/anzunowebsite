import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";
import { LocalStorage } from "node-localstorage";

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as any;

// Mock localStorage
const localStorage = new LocalStorage("./scratch");
global.localStorage = localStorage;

// Clean up after each test
afterEach(() => {
    localStorage.clear();
});

// Console error/warning suppression for cleaner test output
const originalError = console.error;
const originalWarn = console.warn;

beforeAll(() => {
    console.error = (...args: any[]) => {
        if (args[0].includes("Warning:")) return;
        originalError.call(console, ...args);
    };
    console.warn = (...args: any[]) => {
        if (args[0].includes("Warning:")) return;
        originalWarn.call(console, ...args);
    };
});

afterAll(() => {
    console.error = originalError;
    console.warn = originalWarn;
});
