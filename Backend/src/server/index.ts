import app from "./app";
import chalk from "chalk";
import dotenv from "dotenv";
import typeDef from "../schema/shops/typeDefs";
import testShops from "../schema/shops/resolver";
import { ApolloServer } from 'apollo-server-express';
import connectMongo from "../config/connectDatabase";
import { applyMiddleware } from "graphql-middleware";
import { makeExecutableSchema } from '@graphql-tools/schema'

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

// Just for rough use for now
let typeDefs: any[] = [typeDef]
let resolvers: any[] = [{ Query: { testShops } }]
const schema = makeExecutableSchema({
    typeDefs,// typeDefs must be added here
    resolvers, // Resolver must be added here
})

const schemaWithMiddleware = applyMiddleware(schema)
let server = new ApolloServer({ schema: schemaWithMiddleware })

// Apply middleware to the Express app

// Top level await cannot be used 
const startServer = async () =>  await server.start().then(()=> server.applyMiddleware({ app })) 
startServer()

// App listering to specific port
app.listen(port, () => {
    console.log(`Server is up on ${chalk.green(".... ")} ${chalk.bgGreen(" " + port + " ")}`);
})

//Unhandled promise rejection for ex: (if the server is crash because of the string that is added to connect databse)
process.on("unhandledRejection", (err: { message: string }) => {
    console.log("Error", chalk.red(err.message));
    console.log(chalk.red("Shutting down the server"));
    server.stop().then(() => {
        process.exit(1);
    });
})