/** @type {import('jest').Config} */
module.exports = {
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/src/context/__tests__/jest.setup.ts"],
    testPathIgnorePatterns: [
        "<rootDir>/node_modules/",
        "<rootDir>/.next/",
        "babel\\.config\\.test\\.js$",
    ],
    transform: {
        "^.+\\.(ts|tsx)$": "babel-jest",
    },
};
