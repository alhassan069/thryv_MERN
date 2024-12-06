const swagger_options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "Thryv Api documentation",
            version: "1.0.0",
            description: "This is a simple CRUD API application made with Express and documented with Swagger",
        },
        servers: [
            {
                url: "http://localhost:5000",
            },
        ],
    },
    apis: ["./api/v1/*.js"],
};

module.exports = swagger_options;