const express = require('express')
const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")
const cors = require('cors')
const sequelize = require('./config/database')
const swagger_options = require('./config/swagger')
const redisClient = require('./config/redis')
const loggerMiddleware = require('./middleware/loggerMiddleware')
const routes = require('./api/v1')
const PORT = 5000;


const app = express()
app.use(cors())
app.use(express.json())
app.use(loggerMiddleware)


const specs = swaggerJsdoc(swagger_options);
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, { explorer: true })
);


app.get("/", (req, res) => {
    res.send("Hello World")
})

app.use("/api/", routes)

sequelize.authenticate().then(async () => {
    console.log("Database Connected successfully.");
    await sequelize.sync();
    console.log("All models were synchronized successfully.")
}).catch((error) => {
    console.log("Unable to connect to the database:", error)
});

(async () => {
    await redisClient.connect();
})();

app.listen(PORT, () => {
    console.log("Server active on port", PORT)
})