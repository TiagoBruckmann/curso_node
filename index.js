// imports dos pacotes
const mongoose = require("mongoose");
const express = require("express");
require('dotenv').config()
const app = express()

// import das rotas
const usersRoutes = require("./routes/userRoutes")

// leitura dos JSON com middleware
app.use(
    express.urlencoded({
        extended: true
    })
);

app.use(express.json())

// rotas da API
app.use("/users", usersRoutes);

// acesso ao mongodb
const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

mongoose
    .connect(
        `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cursonode.obejr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
    ).then(
        () => {
            app.listen(3000);
        }
    ).catch((err) => console.log(err));
