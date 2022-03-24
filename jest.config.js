module.exports = {
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
};
