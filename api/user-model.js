const {
    v1: uuidv1,
} = require('uuid');

function createId() {
    return uuidv1();
}

const initialUsers = () => {
    let initialUsers = [
        {
            id: createId(),
            kullaniciadi: "erhan",
            sifre: "erhan1"
        },
        {
            id: createId(),
            kullaniciadi: "erhan 2",
            sifre: "erhan1"
        },
        {
            id: createId(),
            kullaniciadi: "erhan 3",
            sifre: "erhan1"
        },
        {
            id: createId(),
            kullaniciadi: "erhan 4",
            sifre: "erhan1"
        },
    ];
    return initialUsers;
};

let users = initialUsers();

const getAllUsers = () => {
    return users;
};

const createUser = (user) => {
    user.id = createId();
    users.push(user);
    return Promise.resolve(user);
};

const findUser = (user) => {
    let isExistUser = false;
    users.forEach(userItem => {
        if(user.kullaniciadi === userItem.kullaniciadi && user.sifre === userItem.sifre){
            isExistUser = true;
        }
    });

    return isExistUser;
};

const checkUserName = (kullaniciadi) => {
    let isExistUserName = false;
    for (let index = 0; index < users.length; index++) {
        const userItem = users[index];
        if(userItem.kullaniciadi === kullaniciadi) {
            isExistUserName = true;
            break;
        }
    }
    return isExistUserName;
}


module.exports = {
    getAllUsers,
    createUser,
    findUser,
    checkUserName
}