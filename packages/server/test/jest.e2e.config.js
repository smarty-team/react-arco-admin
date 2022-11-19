const tsconfig = require("../tsconfig.json");
const moduleNameMapper = require("tsconfig-paths-jest")(tsconfig);

module.exports = {
    moduleFileExtensions: [
        "js",
        "json",
        "ts"
    ],
    rootDir: ".",
    testEnvironment: "node",
    testRegex: ".e2e-spec.ts$",
    globals: {
        "ts-jest": {
            tsConfig: "./tsconfig.json",
            diagnostics: true
        },
        NODE_ENV: "test"
    },
    // setupFilesAfterEnv: [`${__dirname}/src/setupTests.ts`],
    moduleDirectories: ["node_modules", 'src'],
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    verbose: true,
    moduleNameMapper
};