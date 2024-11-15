const express = require('express');
const mongoose = require('mongoose');
const app = express();
const stuffRoutes = require("./Core/routes/stuff")
const authRoutes = require("./Core/routes/auth")
const userRoutes = require('./Core/routes/user')
const roleRoutes = require('./Core/routes/role')
const path = require("path")
const swaggerDocs = require("./Config/swagger")
const swaggerUi = require('swagger-ui-express');

mongoose.connect('mongodb+srv://yves:yves2023@cluster0.qba23.mongodb.net/?retryWrites=true&appName=Cluster0')
.then(() => {
  console.log('Connexion réussie à MongoDB');
})
.catch(err => {
  console.error('Erreur de connexion à MongoDB', err);
});
  
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use('/apiCS/', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use("/apiCS/stuff", stuffRoutes)
app.use("/apiCS/user", userRoutes)
app.use("/apiCS/auth", authRoutes)
app.use("/apiCS/role", roleRoutes)


module.exports = app;