const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database');

// HANDLING UNCAUGHT EXCEPTION
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to uncaught exception");
    process.exit(1);

});


//config

dotenv.config({ path: "backend/config/config.env" })

//connecting to database
connectDatabase()


const server = app.listen(process.env.PORT, () => {
    console.log(`server is startiing on http://localhost:${process.env.port}`)
})


// UNHANDLED PROMISE REJECTION

process.on("unhandledRejection", err => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to unhandled promise rejection");
    server.close(() => {
        process.exit(1);
    })
})