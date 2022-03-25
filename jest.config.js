module.exports = {
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json"],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  moduleNameMapper: {
    "^.+\\.css$": "<rootDir>/__mocks__/styleMock.js",
  },
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
};
