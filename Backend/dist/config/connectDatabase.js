"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const mongoose_1 = __importDefault(require("mongoose"));
function connectMongo() {
    let URI = process.env.DB_URI || "mongodb://localhost:27017/beast";
    mongoose_1.default.connection.on('connected', () => console.log(`Database connection ${chalk_1.default.greenBright(".... ")} ${chalk_1.default.bgGreen(` Ok `)}`));
    mongoose_1.default.connection.on('disconnected', () => console.log(`Database connection ${chalk_1.default.redBright(".... ")} ${chalk_1.default.bgRed(` Fail `)}`));
    mongoose_1.default.connect(URI);
}
exports.default = connectMongo;
//# sourceMappingURL=connectDatabase.js.map