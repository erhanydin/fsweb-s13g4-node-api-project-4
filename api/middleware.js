const userModel = require("./user-model");

function logger(req, res, next) {
    const method = req.method;
    const url = req.originalUrl;
    const timestamp = new Date().toLocaleString();

    console.log(`${method} ${url} ${timestamp}`);
}

// 

function validateInput(req, res, next) {
    const { kullaniciadi, sifre } = req.body;
    if (!kullaniciadi || !sifre) {
        res.status(400).json({ message: "Eksik alanları doldurunuz" });
    } else {
        next();
    }
}

function validateNewUser(req, res, next) {
    const { kullaniciadi, sifre } = req.body;

    let isExistUserName = userModel.checkUserName(kullaniciadi);
    if (isExistUserName) {
        res.status(400).json({ message: `${kullaniciadi} zaten kullanılmış` });
    } else {
        req.user = {kullaniciadi: kullaniciadi, sifre: sifre};
        next();
    }

};


function validateLogin(req, res, next) {

    const { kullaniciadi, sifre } = req.body;
    let isExistUser = userModel.findUser({ kullaniciadi: kullaniciadi, sifre: sifre });
    if (!isExistUser) {
        res.status(404).json({ message: "Böyle bir kullanıcı bulunamadı" });
    } else {
        req.user = {kullaniciadi: kullaniciadi, sifre: sifre};
        next();
    }

}


module.exports = {
    logger,
    validateInput,
    validateNewUser,
    validateLogin
}