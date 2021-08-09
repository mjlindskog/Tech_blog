const { User } = require('../models');

const userData = [
    {
        "username":"tomtom",
        "email":"tom@aol.com",
        "password":"password123"
    },
    {
        "username":"bambam",
        "email":"bam@gmail.com",
        "password":"password12"
    },
    {
        "username":"ye",
        "email":"kanye@hotmail.com",
        "password":"passwrod1234"
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
