import path from "path";
import type { JestConfigWithTsJest } from "ts-jest";

const jestConfig: JestConfigWithTsJest = {
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testEnvironment: "jsdom",
  moduleDirectories: ["node_modules"],
  moduleNameMapper: {
    "^@/(.*)$": `${path.resolve(__dirname)}/src/$1`,
    "\\.(css|less|scss)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ['./setupTests.ts'],
};

export default jestConfig;
