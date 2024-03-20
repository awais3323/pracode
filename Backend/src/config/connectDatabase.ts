import chalk from "chalk";
import mongoose from "mongoose";

export default function connectMongo() {
    let URI = process.env.DB_URI || "mongodb://localhost:27017/beast"

    mongoose.connection.on('connected', () =>
        console.log(`Database connection ${chalk.greenBright(".... ")} ${chalk.bgGreen(` Ok `)}`));
    mongoose.connection.on('disconnected', () =>
        console.log(`Database connection ${chalk.redBright(".... ")} ${chalk.bgRed(` Fail `)}`));
    mongoose.connect(URI)
}