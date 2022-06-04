module.exports = {
  "globalSetup": "./test/jestGlobalSetup.ts",
  "globalTeardown": "./test/jestGlobalTearDown.ts",
  "moduleFileExtensions": [
    "js",
    "json",
    "ts"
  ],
  "testRegex": ".*\\.test\\.ts$",
  "transform": {
    "^.+\\.(t|j)s$": "ts-jest"
  },
  "collectCoverageFrom": [
    "**/*.(t|j)s"
  ],
  "coverageDirectory": "../coverage",
  "testEnvironment": "node"
}