module.exports = {
     setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest"
  },
  moduleFileExtensions: ["js", "jsx"],
  transformIgnorePatterns: [
    "/node_modules/(?!(axios)/)"
  ],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  }
};

