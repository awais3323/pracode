"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const chalk_1 = __importDefault(require("chalk"));
const dotenv_1 = __importDefault(require("dotenv"));
const connectDatabase_1 = __importDefault(require("../config/connectDatabase"));
process.on("uncaught Exception", (err) => {
    console.log(chalk_1.default.red(`Error ${err.message}`));
    console.log(chalk_1.default.red(`Shuting down the server becuase of UnCaught Expression`));
    process.exit(1);
});
dotenv_1.default.config({ path: "C:/Users/MIH/Documents/node/project/Backend/src/config/.env" });
let port = process.env.PORT || 3000;
(0, connectDatabase_1.default)();
const server = app_1.default.listen(port, () => {
    console.log(`Server is up on ${chalk_1.default.green(".... ")} ${chalk_1.default.bgGreen(" " + port + " ")}`);
});
process.on("unhandledRejection", (err) => {
    console.log("Error", chalk_1.default.red(err.message));
    console.log(chalk_1.default.red("Shutting down the server"));
    server.close(() => {
        process.exit(1);
    });
});
//# sourceMappingURL=index.js.map