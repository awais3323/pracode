import app from "./app";
import chalk from "chalk"
import dotenv from "dotenv"
import connectMongo from "../config/connectDatabase";

//Handling Uncaught Exception
process.on("uncaught Exception", (err) => {
    console.log(chalk.red(`Error ${err.message}`));
    console.log(chalk.red(`Shuting down the server becuase of UnCaught Expression`));
    process.exit(1);
});

dotenv.config({ path: "C:/Users/MIH/Documents/node/project/Backend/src/config/.env" });
let port = process.env.PORT || 3000;

// Database connection
connectMongo();

// Setting and server and assigning it a port
const server = app.listen(port, () => {
    console.log(`Server is up on ${chalk.green(".... ")} ${chalk.bgGreen(" "+ port+ " ")}`);
});


//Unhandled promise rejection for ex: (if the server is crash because of the string that is added to connect databse)
process.on("unhandledRejection", (err: { message: string }) => {
    console.log("Error", chalk.red(err.message));
    console.log(chalk.red("Shutting down the server"));
    server.close(() => {
        process.exit(1);
    });
});