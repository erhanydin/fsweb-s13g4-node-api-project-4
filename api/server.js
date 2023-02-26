const express = require("express");
const { validate } = require("uuid");
const middleware = require("./middleware");
const userModel = require("./user-model");

const server = express();
server.use(express.json());


server.get("/api/kullanicilar", (req, res, next) => {
    let allUsers = userModel.getAllUsers();
    res.json(allUsers);
});

server.post("/api/kayitol", middleware.validateInput, middleware.validateNewUser, async (req, res, next) => {
    try {
        let user = req.user;
        let createdUser = await userModel.createUser(user);
        res.status(201).json(createdUser);
    } catch (error) {
        next(error);
    }
});

server.post("/api/login", middleware.validateInput, middleware.validateLogin, (req, res, next) => {
    try {
        res.json({message: `Hoşgeldin ${req.body.kullaniciadi}`});
    } catch (error) {
        next(error);
    }

});

server.use((err, res, req) => {
    res.status(err.status || 500).json({
        customMessage: "Bir hata oluştu",
        message: err.message
    });
});



server.use(middleware.logger);





module.exports = server;