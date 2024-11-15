const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            version: "1.0.0",
            title: "champion security Api",
            description: "nyagoo api documentation",
            contact: {
              name: "nyango technologies",
              email:"nyangotech@gmail.com"
            },
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
        tags: [
            {name: "auth", description: "Everything about Authentification"},
            {name: "Users", description: "Everything about User"},
            {name: "Role", description: "Everything about profil"}
          ]
    },
    apis: [
        './../Core/docs/auth.js',
        "../Core/docs/user.js",
        "../Core/docs/role.js"

    ], // Chemin vers vos fichiers de routes
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
module.exports = swaggerDocs;